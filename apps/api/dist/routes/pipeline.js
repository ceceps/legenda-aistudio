import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { storyQueue } from '../lib/queue.js';
import { ProjectStatus } from '@legenda/shared-types';
export const pipelineRouter = Router();
// POST /api/pipeline/:projectId/start
pipelineRouter.post('/:projectId/start', async (req, res) => {
    const { projectId } = req.params;
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
    }
    if (project.status !== ProjectStatus.DRAFT) {
        res
            .status(400)
            .json({ success: false, error: `Pipeline already started (status: ${project.status})` });
        return;
    }
    // Kick off with story generation job (workers chain subsequent stages)
    await storyQueue.add('generate-story', { projectId }, {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
    });
    await prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.STORY_GENERATING },
    });
    res.json({ success: true, data: { jobId: projectId, status: ProjectStatus.STORY_GENERATING } });
});
// GET /api/pipeline/:projectId/status
pipelineRouter.get('/:projectId/status', async (req, res) => {
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
//# sourceMappingURL=pipeline.js.map