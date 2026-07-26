import { Worker } from 'bullmq';
import { connection, assembleQueue } from '../lib/queue.js';
import { prisma } from '../lib/prisma.js';
import { broadcastProgress } from '../lib/websocket.js';
import { generateVideoClip, waitForVideoClip } from '../services/composio.js';
import { ProjectStatus } from '@legenda/shared-types';
import { type PipelineJobData } from '../lib/queue.js';

export const videoWorker = new Worker<PipelineJobData>(
  'video',
  async (job) => {
    const { projectId } = job.data;

    broadcastProgress({
      projectId, stage: ProjectStatus.VIDEO_GENERATING, progress: 88,
      message: 'Merender video clip per scene...', timestamp: new Date().toISOString(),
    });

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) throw new Error(`Project ${projectId} not found`);

    const scenes = await prisma.scene.findMany({
      where: { projectId },
      orderBy: { sceneNumber: 'asc' },
    });

    const styleLabel = project.gaya.toLowerCase().replace('_', ' ');
    let completedScenes = 0;

    for (const scene of scenes) {
      // Use storyboard image as input frame for video generation
      const imageUrl = scene.storyboardUrl;
      const videoPrompt = scene.videoPrompt ?? scene.action;
      if (!imageUrl || !videoPrompt) {
        console.warn(`Scene ${scene.sceneNumber}: missing imageUrl or videoPrompt, skipping`);
        continue;
      }

      try {
        const result = await generateVideoClip(videoPrompt, imageUrl, styleLabel);

        let clipUrl: string;
        if (result.status === 'completed' && result.videoUrl) {
          clipUrl = result.videoUrl;
        } else {
          // Poll until done
          clipUrl = await waitForVideoClip(result.jobId);
        }

        completedScenes++;
        await prisma.scene.update({
          where: { id: scene.id },
          data: { clipUrl, status: 'COMPLETED' },
        });
        await prisma.project.update({
          where: { id: projectId },
          data: { completedScenes },
        });

        broadcastProgress({
          projectId,
          stage: ProjectStatus.VIDEO_GENERATING,
          progress: Math.round(88 + (completedScenes / scenes.length) * 7),
          message: `Video scene ${scene.sceneNumber}/${scenes.length} selesai`,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error(`Video scene ${scene.sceneNumber} failed:`, err);
        await prisma.scene.update({ where: { id: scene.id }, data: { status: 'FAILED' } });
      }
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.VIDEO_DONE },
    });

    broadcastProgress({
      projectId, stage: ProjectStatus.VIDEO_DONE, progress: 95,
      message: 'Semua video clip selesai. Mulai assembly final...', timestamp: new Date().toISOString(),
    });

    await assembleQueue.add('assemble-video', { projectId }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.ASSEMBLING },
    });
  },
  { connection, concurrency: 1 },
);

videoWorker.on('failed', async (job, err) => {
  if (!job) return;
  const { projectId } = job.data;
  await prisma.project.update({ where: { id: projectId }, data: { status: ProjectStatus.FAILED } });
  broadcastProgress({
    projectId, stage: ProjectStatus.FAILED, progress: 0,
    message: `Video worker gagal: ${err.message}`, timestamp: new Date().toISOString(),
  });
});
