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

async function drainProjectJobs(projectId: string) {
  // Only remove non-active jobs — active jobs are stopped via AbortController
  const jobs = await storyQueue.getJobs(['waiting', 'delayed', 'prioritized']);
  for (const job of jobs) {
    if (job.data.projectId === projectId) {
      await job.remove().catch(() => {});
    }
  }
}

function getProjectId(req: Request): string {
  return req.params['projectId'] as string;
}

// POST /api/pipeline/:projectId/start
pipelineRouter.post('/:projectId/start', async (req: Request, res: Response) => {
  const projectId = getProjectId(req);

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

  // Abort in-flight Gemini call — worker will catch abort and mark FAILED
  abortProject(projectId);

  // Remove waiting/delayed jobs (active job handled by abort above)
  await drainProjectJobs(projectId);

  // Small delay to let active job abort and finish its failed handler
  await new Promise((r) => setTimeout(r, 500));

  // Reset project status first
  await prisma.project.update({
    where: { id: projectId },
    data: { status: ProjectStatus.STORY_GENERATING },
  });

  await storyQueue.add(
    'generate-story',
    { projectId },
    { attempts: 1, backoff: { type: 'exponential', delay: 5000 } },
  );

  res.json({ success: true, data: { jobId: projectId, status: ProjectStatus.STORY_GENERATING } });
});

// POST /api/pipeline/:projectId/cancel
pipelineRouter.post('/:projectId/cancel', async (req: Request, res: Response) => {
  const projectId = getProjectId(req);

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found' });
    return;
  }

  abortProject(projectId);
  await drainProjectJobs(projectId);

  await prisma.project.update({
    where: { id: projectId },
    data: { status: ProjectStatus.FAILED },
  });

  res.json({ success: true, data: { status: ProjectStatus.FAILED } });
});

// GET /api/pipeline/:projectId/status
pipelineRouter.get('/:projectId/status', async (req: Request, res: Response) => {
  const projectId = getProjectId(req);
  const project = await prisma.project.findUnique({ where: { id: projectId } });
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
