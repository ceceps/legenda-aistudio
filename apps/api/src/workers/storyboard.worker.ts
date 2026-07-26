import { Worker } from 'bullmq';
import { connection, videoQueue } from '../lib/queue.js';
import { prisma } from '../lib/prisma.js';
import { broadcastProgress } from '../lib/websocket.js';
import { generateImage } from '../services/composio.js';
import { ProjectStatus, StoryStyle } from '@legenda/shared-types';
import { type PipelineJobData } from '../lib/queue.js';

export const storyboardWorker = new Worker<PipelineJobData>(
  'storyboard',
  async (job) => {
    const { projectId } = job.data;

    broadcastProgress({
      projectId, stage: ProjectStatus.STORYBOARD_GENERATING, progress: 82,
      message: 'Membuat gambar storyboard per scene...', timestamp: new Date().toISOString(),
    });

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new Error(`Project ${projectId} not found`);

    const scenes = await prisma.scene.findMany({
      where: { projectId },
      orderBy: { sceneNumber: 'asc' },
    });

    const styleLabel = project.gaya === StoryStyle.FUTURISTIK
      ? 'futuristic sci-fi digital art'
      : project.gaya === StoryStyle.SUPER_HERO
      ? 'superhero comic book art'
      : project.gaya === StoryStyle.KLASIK
      ? 'classical Indonesian painting, batik-inspired'
      : 'modern cinematic photography';

    let done = 0;
    for (const scene of scenes) {
      if (!scene.imagePrompt) continue;
      try {
        const { imageUrl } = await generateImage(scene.imagePrompt, styleLabel);
        await prisma.scene.update({
          where: { id: scene.id },
          data: { storyboardUrl: imageUrl },
        });
        done++;
        broadcastProgress({
          projectId,
          stage: ProjectStatus.STORYBOARD_GENERATING,
          progress: Math.round(82 + (done / scenes.length) * 6),
          message: `Storyboard scene ${scene.sceneNumber}/${scenes.length} selesai`,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error(`Storyboard scene ${scene.sceneNumber} failed:`, err);
      }
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.STORYBOARD_DONE },
    });

    broadcastProgress({
      projectId, stage: ProjectStatus.STORYBOARD_DONE, progress: 88,
      message: 'Storyboard selesai. Memulai render video clip...', timestamp: new Date().toISOString(),
    });

    await videoQueue.add('generate-video', { projectId }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 10000 },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.VIDEO_GENERATING },
    });
  },
  { connection, concurrency: 1 },
);

storyboardWorker.on('failed', async (job, err) => {
  if (!job) return;
  const { projectId } = job.data;
  await prisma.project.update({ where: { id: projectId }, data: { status: ProjectStatus.FAILED } });
  broadcastProgress({
    projectId, stage: ProjectStatus.FAILED, progress: 0,
    message: `Storyboard worker gagal: ${err.message}`, timestamp: new Date().toISOString(),
  });
});
