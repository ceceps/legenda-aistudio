import { Worker } from 'bullmq';
import { connection } from '../lib/queue.js';
import { prisma } from '../lib/prisma.js';
import { broadcastProgress } from '../lib/websocket.js';
import { mergeVideoWithAudio, downloadFile, getTmpPath } from '../services/ffmpeg.js';
import { synthesizeVoiceOver } from '../services/tts.js';
import { uploadFileToDrive } from '../services/drive.js';
import { ProjectStatus, AudioType } from '@legenda/shared-types';
import { type PipelineJobData } from '../lib/queue.js';

export const assembleWorker = new Worker<PipelineJobData>(
  'assemble',
  async (job) => {
    const { projectId } = job.data;

    broadcastProgress({
      projectId,
      stage: ProjectStatus.ASSEMBLING,
      progress: 95,
      message: 'Mengunduh clip & audio, menyiapkan assembly...',
      timestamp: new Date().toISOString(),
    });

    // ── Fetch all data ────────────────────────────────────────────────────────
    const [project, scenes, audioAssets] = await Promise.all([
      prisma.project.findUnique({ where: { id: projectId } }),
      prisma.scene.findMany({ where: { projectId }, orderBy: { sceneNumber: 'asc' } }),
      prisma.audioAsset.findMany({ where: { projectId } }),
    ]);

    if (!project) throw new Error(`Project ${projectId} not found`);

    // ── Download video clips ──────────────────────────────────────────────────
    broadcastProgress({
      projectId,
      stage: ProjectStatus.ASSEMBLING,
      progress: 96,
      message: 'Mengunduh video clip...',
      timestamp: new Date().toISOString(),
    });

    const clipPaths: string[] = [];
    for (const scene of scenes) {
      if (!scene.clipUrl) continue;
      const localPath = getTmpPath(projectId, `scene_${scene.sceneNumber}.mp4`);
      await downloadFile(scene.clipUrl, localPath);
      clipPaths.push(localPath);
    }

    if (clipPaths.length === 0) throw new Error('No video clips available for assembly');

    // ── Download / generate audio ─────────────────────────────────────────────
    let backsoundPath: string | undefined;
    let soundtrackPath: string | undefined;
    let voiceOverPath: string | undefined;

    const backsound = audioAssets.find(
      (a: { type: AudioType; audioUrl?: string | null }) =>
        a.type === AudioType.BACKSOUND && a.audioUrl,
    );
    const soundtrack = audioAssets.find(
      (a: { type: AudioType; audioUrl?: string | null }) =>
        a.type === AudioType.SOUNDTRACK && a.audioUrl,
    );
    const voAsset = audioAssets.find((a: { type: AudioType }) => a.type === AudioType.VOICE_OVER);

    if (backsound?.audioUrl) {
      backsoundPath = getTmpPath(projectId, 'backsound.mp3');
      await downloadFile(backsound.audioUrl, backsoundPath);
    }
    if (soundtrack?.audioUrl) {
      soundtrackPath = getTmpPath(projectId, 'soundtrack.mp3');
      await downloadFile(soundtrack.audioUrl, soundtrackPath);
    }

    // ── Generate Voice Over (TTS) ─────────────────────────────────────────────
    if (voAsset) {
      broadcastProgress({
        projectId,
        stage: ProjectStatus.ASSEMBLING,
        progress: 97,
        message: 'Membuat voice over narator...',
        timestamp: new Date().toISOString(),
      });
      const screenplay = project.screenplay as { scenes?: { voiceOver: string }[] } | null;
      const narrationText =
        screenplay?.scenes?.map((s, i) => `Scene ${i + 1}: ${s.voiceOver}`).join('\n\n') ?? '';

      if (narrationText) {
        voiceOverPath = getTmpPath(projectId, 'voiceover.mp3');
        try {
          await synthesizeVoiceOver(narrationText, voiceOverPath);
          await prisma.audioAsset.update({
            where: { id: voAsset.id },
            data: { audioUrl: `local:${voiceOverPath}`, status: 'COMPLETED' },
          });
        } catch (e) {
          console.warn('TTS failed, skipping voice over:', e);
          voiceOverPath = undefined;
        }
      }
    }

    // ── FFmpeg merge ──────────────────────────────────────────────────────────
    broadcastProgress({
      projectId,
      stage: ProjectStatus.ASSEMBLING,
      progress: 98,
      message: 'FFmpeg menggabungkan video & audio...',
      timestamp: new Date().toISOString(),
    });

    const outputPath = getTmpPath(projectId, 'final.mp4');
    const mergeOptions: Parameters<typeof mergeVideoWithAudio>[0] = {
      projectId,
      clipPaths,
      outputPath,
    };
    if (backsoundPath) mergeOptions.backsoundPath = backsoundPath;
    if (soundtrackPath) mergeOptions.soundtrackPath = soundtrackPath;
    if (voiceOverPath) mergeOptions.voiceOverPath = voiceOverPath;

    await mergeVideoWithAudio(mergeOptions);

    // ── Upload to Google Drive ────────────────────────────────────────────────
    broadcastProgress({
      projectId,
      stage: ProjectStatus.ASSEMBLING,
      progress: 99,
      message: 'Mengunggah video ke Google Drive...',
      timestamp: new Date().toISOString(),
    });

    const fileName = `legenda-${project.tokohUtama.replace(/\s+/g, '-')}-${Date.now()}.mp4`;
    const { fileId, shareLink } = await uploadFileToDrive(outputPath, fileName, 'video/mp4');

    // ── Finalize project ──────────────────────────────────────────────────────
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: ProjectStatus.COMPLETED,
        finalVideoUrl: shareLink,
        driveFileId: fileId,
        driveShareLink: shareLink,
      },
    });

    broadcastProgress({
      projectId,
      stage: ProjectStatus.COMPLETED,
      progress: 100,
      message: `🎉 Video selesai! Tersimpan di Google Drive. Durasi: ${Math.round((clipPaths.length * 10) / 60)} menit.`,
      timestamp: new Date().toISOString(),
    });
  },
  { connection, concurrency: 1 },
);

assembleWorker.on('failed', async (job, err) => {
  if (!job) return;
  const { projectId } = job.data;
  await prisma.project.update({ where: { id: projectId }, data: { status: ProjectStatus.FAILED } });
  broadcastProgress({
    projectId,
    stage: ProjectStatus.FAILED,
    progress: 0,
    message: `Assembly gagal: ${err.message}`,
    timestamp: new Date().toISOString(),
  });
});
