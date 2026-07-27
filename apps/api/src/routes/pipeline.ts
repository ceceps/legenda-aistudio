import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { storyQueue } from '../lib/queue.js';
import { abortProject } from '../services/gemini.js';
import { ProjectStatus } from '@legenda/shared-types';

export const pipelineRouter: ReturnType<typeof Router> = Router();

const RESTARTABLE_STATUSES = new Set([
  ProjectStatus.DRAFT,
  ProjectStatus.FAILED,
  ProjectStatus.STORY_GENERATING,
  ProjectStatus.STORY_DONE,
]);

// POST /api/pipeline/:projectId/start
pipelineRouter.post('/:projectId/start', async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found' });
    return;
  }

  if (!RESTARTABLE_STATUSES.has(project.status as ProjectStatus)) {
    res.status(400).json({
      success: false,
      error: `Tidak bisa restart dari status: ${project.status}`,
    });
    return;
  }

  // Abort existing run if any
  abortProject(projectId);

  // Drain pending story jobs for this project
  const waiting = await storyQueue.getJobs(['waiting', 'active', 'delayed']);
  for (const job of waiting) {
    if (job.data.projectId === projectId) {
      await job.remove().catch(() => {});
    }
  }

  await storyQueue.add(
    'generate-story',
    { projectId },
    { attempts: 3, backoff: { type: 'exponential', delay: 5000 } },
  );

  await prisma.project.update({
    where: { id: projectId },
    data: { status: ProjectStatus.STORY_GENERATING },
  });

  res.json({ success: true, data: { jobId: projectId, status: ProjectStatus.STORY_GENERATING } });
});

// POST /api/pipeline/:projectId/cancel
pipelineRouter.post('/:projectId/cancel', async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found' });
    return;
  }

  // Abort in-flight Gemini calls
  abortProject(projectId);

  // Remove queued jobs
  const waiting = await storyQueue.getJobs(['waiting', 'active', 'delayed']);
  for (const job of waiting) {
    if (job.data.projectId === projectId) {
      await job.remove().catch(() => {});
    }
  }

  await prisma.project.update({
    where: { id: projectId },
    data: { status: ProjectStatus.FAILED },
  });

  res.json({ success: true, data: { status: ProjectStatus.FAILED } });
});

// GET /api/pipeline/:projectId/status
pipelineRouter.get('/:projectId/status', async (req: Request, res: Response) => {
  const project = await prisma.project.findUnique({ where: { id: req.params['projectId'] } });
  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found' });
    return;
  }
  res.json({
    success: true,
    data: {
      status: project.status,
      completedScenes: project.completedScenes,
      totalScenes: project.totalScenes,
    },
  });
});
