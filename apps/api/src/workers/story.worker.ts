import { Worker } from 'bullmq';
import { connection, assetQueue } from '../lib/queue.js';
import { prisma } from '../lib/prisma.js';
import { broadcastProgress } from '../lib/websocket.js';
import {
  generateScreenplay,
  generateStoryboard,
  generateAudioPrompts,
  registerAbort,
  clearAbort,
} from '../services/gemini.js';
import { ProjectStatus, AudioType } from '@legenda/shared-types';
import { type PipelineJobData } from '../lib/queue.js';

// ── Exported pure function for testing ─────────────────────────────────────────
export async function processStoryJob(job: { id: string; data: PipelineJobData }) {
  const { projectId } = job.data;
  const ctrl = registerAbort(projectId);
  const signal = ctrl.signal;

  try {
    broadcastProgress({
      projectId,
      stage: ProjectStatus.STORY_GENERATING,
      progress: 5,
      message: 'Memulai generasi naskah dengan Gemini AI...',
      timestamp: new Date().toISOString(),
    });

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new Error(`Project ${projectId} not found`);

    if (signal.aborted) throw new Error('Dibatalkan oleh pengguna');

    const input = {
      ide: project.ide,
      gaya: project.gaya as any,
      tokohUtama: project.tokohUtama,
      asalDaerah: project.asalDaerah,
      latar: project.latar as any,
      latarDetail: project.latarDetail ?? undefined,
      plot: project.plot,
    };

    broadcastProgress({
      projectId,
      stage: ProjectStatus.STORY_GENERATING,
      progress: 20,
      message: 'Gemini sedang menulis naskah lengkap...',
      timestamp: new Date().toISOString(),
    });

    const screenplay = await generateScreenplay(input, signal);

    if (signal.aborted) throw new Error('Dibatalkan oleh pengguna');

    broadcastProgress({
      projectId,
      stage: ProjectStatus.STORY_GENERATING,
      progress: 50,
      message: 'Menyimpan naskah & membuat storyboard...',
      timestamp: new Date().toISOString(),
    });

    const storyboardScenes = await generateStoryboard(screenplay, input.gaya, signal);

    if (signal.aborted) throw new Error('Dibatalkan oleh pengguna');

    broadcastProgress({
      projectId,
      stage: ProjectStatus.STORY_GENERATING,
      progress: 70,
      message: 'Membuat audio prompts...',
      timestamp: new Date().toISOString(),
    });

    const audioPrompts = await generateAudioPrompts(screenplay, signal);

    if (signal.aborted) throw new Error('Dibatalkan oleh pengguna');

    // Persist to DB
    await prisma.$transaction(async (tx: any) => {
      await tx.project.update({
        where: { id: projectId },
        data: {
          screenplay: screenplay as any,
          totalScenes: storyboardScenes.length,
          status: ProjectStatus.STORY_DONE,
        },
      });

      await tx.scene.createMany({
        data: storyboardScenes.map((s) => ({
          projectId,
          sceneNumber: s.sceneNumber,
          title: s.title,
          setting: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.setting ?? '',
          action: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.action ?? '',
          voiceOver: s.voiceOver,
          musicMood: s.musicNote,
          actors: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.actors ?? [],
          imagePrompt: s.imagePrompt,
          videoPrompt: s.videoPrompt,
          cameraAngle: s.cameraAngle,
          transition: s.transition,
        })),
      });

      await tx.audioAsset.createMany({
        data: audioPrompts.map((a) => ({
          projectId,
          type: a.type as any,
          sunoPrompt: a.sunoPrompt,
          lyrics: a.lyrics,
          mood: a.mood,
          genre: a.genre,
        })),
      });
    });

    broadcastProgress({
      projectId,
      stage: ProjectStatus.STORY_DONE,
      progress: 80,
      message: `Naskah selesai! ${storyboardScenes.length} scene dibuat. Memulai generasi aset...`,
      timestamp: new Date().toISOString(),
    });

    await assetQueue.add(
      'generate-assets',
      { projectId },
      { attempts: 3, backoff: { type: 'exponential', delay: 5000 } },
    );

    await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.ASSETS_GENERATING },
    });
  } finally {
    clearAbort(projectId);
  }
}

export const storyWorker = new Worker<PipelineJobData>(
  'story',
  async (job) => {
    const { projectId } = job.data;
    const ctrl = registerAbort(projectId);
    const signal = ctrl.signal;

    try {
      broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_GENERATING,
        progress: 5,
        message: 'Memulai generasi naskah dengan Gemini AI...',
        timestamp: new Date().toISOString(),
      });

      const project = await prisma.project.findUnique({ where: { id: projectId } });
      if (!project) throw new Error(`Project ${projectId} not found`);

      if (signal.aborted) throw new Error('Dibatalkan oleh pengguna');

      const input = {
        ide: project.ide,
        gaya: project.gaya as any,
        tokohUtama: project.tokohUtama,
        asalDaerah: project.asalDaerah,
        latar: project.latar as any,
        latarDetail: project.latarDetail ?? undefined,
        plot: project.plot,
      };

      broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_GENERATING,
        progress: 20,
        message: 'Gemini sedang menulis naskah lengkap...',
        timestamp: new Date().toISOString(),
      });

      const screenplay = await generateScreenplay(input, signal);

      if (signal.aborted) throw new Error('Dibatalkan oleh pengguna');

      broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_GENERATING,
        progress: 50,
        message: 'Menyimpan naskah & membuat storyboard...',
        timestamp: new Date().toISOString(),
      });

      const storyboardScenes = await generateStoryboard(screenplay, input.gaya, signal);

      if (signal.aborted) throw new Error('Dibatalkan oleh pengguna');

      broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_GENERATING,
        progress: 70,
        message: 'Membuat audio prompts...',
        timestamp: new Date().toISOString(),
      });

      const audioPrompts = await generateAudioPrompts(screenplay, signal);

      if (signal.aborted) throw new Error('Dibatalkan oleh pengguna');

      // Persist to DB
      await prisma.$transaction(async (tx: any) => {
        await tx.project.update({
          where: { id: projectId },
          data: {
            screenplay: screenplay as any,
            totalScenes: storyboardScenes.length,
            status: ProjectStatus.STORY_DONE,
          },
        });

        await tx.scene.createMany({
          data: storyboardScenes.map((s) => ({
            projectId,
            sceneNumber: s.sceneNumber,
            title: s.title,
            setting: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.setting ?? '',
            action: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.action ?? '',
            voiceOver: s.voiceOver,
            musicMood: s.musicNote,
            actors: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.actors ?? [],
            imagePrompt: s.imagePrompt,
            videoPrompt: s.videoPrompt,
            cameraAngle: s.cameraAngle,
            transition: s.transition,
          })),
        });

        await tx.audioAsset.createMany({
          data: audioPrompts.map((a) => ({
            projectId,
            type: a.type as any,
            sunoPrompt: a.sunoPrompt,
            lyrics: a.lyrics,
            mood: a.mood,
            genre: a.genre,
          })),
        });
      });

      broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_DONE,
        progress: 80,
        message: `Naskah selesai! ${storyboardScenes.length} scene dibuat. Memulai generasi aset...`,
        timestamp: new Date().toISOString(),
      });

      await assetQueue.add(
        'generate-assets',
        { projectId },
        { attempts: 3, backoff: { type: 'exponential', delay: 5000 } },
      );

      await prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.ASSETS_GENERATING },
      });
    } finally {
      clearAbort(projectId);
    }
  },
  { connection, concurrency: 2 },
);

storyWorker.on('failed', async (job, err) => {
  if (!job) return;
  const { projectId } = job.data;

  // Jika masih ada attempts tersisa dan bukan cancel — biarkan BullMQ retry
  // Jika cancel atau no more attempts — set FAILED
  const isCancelled = err.message.includes('Dibatalkan');
  const noMoreAttempts = job.attemptsMade >= (job.opts.attempts ?? 1);

  if (!isCancelled && !noMoreAttempts) return; // BullMQ akan retry sendiri

  await prisma.project.update({
    where: { id: projectId },
    data: { status: ProjectStatus.FAILED },
  });

  broadcastProgress({
    projectId,
    stage: ProjectStatus.FAILED,
    progress: 0,
    message: isCancelled ? 'Pipeline dibatalkan oleh pengguna.' : `Gagal: ${err.message}`,
    timestamp: new Date().toISOString(),
  });
});
