import { Worker } from 'bullmq';
import { connection, audioQueue } from '../lib/queue.js';
import { prisma } from '../lib/prisma.js';
import { broadcastProgress } from '../lib/websocket.js';
import { generateAssetPrompts } from '../services/nemotron.js';
import { ProjectStatus, AssetType } from '@legenda/shared-types';
import { type PipelineJobData } from '../lib/queue.js';
import { randomUUID } from 'crypto';

export const assetWorker = new Worker<PipelineJobData>(
  'asset',
  async (job) => {
    const { projectId } = job.data;

    broadcastProgress({
      projectId, stage: ProjectStatus.ASSETS_GENERATING, progress: 62,
      message: 'Nemotron AI membuat prompt visual aset...', timestamp: new Date().toISOString(),
    });

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project?.screenplay) throw new Error('No screenplay found');

    const screenplay = project.screenplay as any;
    const assetPrompts = await generateAssetPrompts(screenplay);

    broadcastProgress({
      projectId, stage: ProjectStatus.ASSETS_GENERATING, progress: 70,
      message: `${assetPrompts.length} prompt aset dibuat. Menyimpan...`, timestamp: new Date().toISOString(),
    });

    const now = new Date();
    await prisma.asset.createMany({
      data: assetPrompts.map((a) => ({
        id: randomUUID(),
        projectId,
        type: a.type as AssetType,
        name: a.name,
        description: a.description,
        imagePrompt: a.imagePrompt,
        createdAt: now,
        updatedAt: now,
      })),
    });

    await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.ASSETS_DONE },
    });

    broadcastProgress({
      projectId, stage: ProjectStatus.ASSETS_DONE, progress: 72,
      message: 'Aset visual selesai. Memulai generasi musik...', timestamp: new Date().toISOString(),
    });

    // Chain to audio
    await audioQueue.add('generate-audio', { projectId }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: { status: ProjectStatus.AUDIO_GENERATING },
    });
  },
  { connection, concurrency: 2 },
);

assetWorker.on('failed', async (job, err) => {
  if (!job) return;
  const { projectId } = job.data;
  await prisma.project.update({ where: { id: projectId }, data: { status: ProjectStatus.FAILED } });
  broadcastProgress({
    projectId, stage: ProjectStatus.FAILED, progress: 0,
    message: `Asset worker gagal: ${err.message}`, timestamp: new Date().toISOString(),
  });
});
