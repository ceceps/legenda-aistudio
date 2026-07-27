import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { generateImage } from '../services/composio.js';
import { JobStatus } from '@legenda/shared-types';
export const assetsRouter = Router();
// GET /api/projects/:id/assets
assetsRouter.get('/:id/assets', async (req, res) => {
    const assets = await prisma.asset.findMany({
        where: { projectId: req.params['id'] },
        orderBy: [{ type: 'asc' }, { name: 'asc' }],
    });
    res.json({ success: true, data: assets });
});
// GET /api/projects/:id/assets/:assetId
assetsRouter.get('/:id/assets/:assetId', async (req, res) => {
    const asset = await prisma.asset.findUnique({ where: { id: req.params['assetId'] } });
    if (!asset) {
        res.status(404).json({ success: false, error: 'Asset not found' });
        return;
    }
    res.json({ success: true, data: asset });
});
// POST /api/projects/:id/assets/:assetId/regenerate
assetsRouter.post('/:id/assets/:assetId/regenerate', async (req, res) => {
    const { assetId } = req.params;
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset) {
        res.status(404).json({ success: false, error: 'Asset not found' });
        return;
    }
    const project = await prisma.project.findUnique({ where: { id: asset.projectId } });
    if (!project) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
    }
    try {
        // Mark as processing
        await prisma.asset.update({
            where: { id: assetId },
            data: { status: JobStatus.PROCESSING, imageUrl: null },
        });
        // Generate image
        const { imageUrl } = await generateImage(asset.imagePrompt, project.gaya);
        // Update with new image URL
        await prisma.asset.update({
            where: { id: assetId },
            data: { imageUrl, status: JobStatus.COMPLETED, updatedAt: new Date() },
        });
        res.json({ success: true, data: { assetId, imageUrl, status: JobStatus.COMPLETED } });
    }
    catch (error) {
        await prisma.asset.update({
            where: { id: assetId },
            data: { status: JobStatus.FAILED },
        });
        res.status(500).json({
            success: false,
            error: `Failed to regenerate asset: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
});
// DELETE /api/projects/:id/assets/:assetId
assetsRouter.delete('/:id/assets/:assetId', async (req, res) => {
    const { assetId } = req.params;
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset) {
        res.status(404).json({ success: false, error: 'Asset not found' });
        return;
    }
    await prisma.asset.delete({ where: { id: assetId } });
    res.json({ success: true, message: 'Asset deleted successfully' });
});
// POST /api/projects/:id/assets/batch-regenerate
assetsRouter.post('/:id/assets/batch-regenerate', async (req, res) => {
    const { id: projectId } = req.params;
    const { assetIds } = req.body;
    if (!assetIds || !Array.isArray(assetIds) || assetIds.length === 0) {
        res.status(400).json({ success: false, error: 'assetIds array is required' });
        return;
    }
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
    }
    const assets = await prisma.asset.findMany({
        where: { id: { in: assetIds }, projectId },
    });
    if (assets.length === 0) {
        res.status(404).json({ success: false, error: 'No assets found' });
        return;
    }
    // Mark all as processing
    await prisma.asset.updateMany({
        where: { id: { in: assetIds } },
        data: { status: JobStatus.PROCESSING },
    });
    // Process in parallel with error handling
    const results = await Promise.allSettled(assets.map(async (asset) => {
        try {
            const { imageUrl } = await generateImage(asset.imagePrompt, project.gaya);
            await prisma.asset.update({
                where: { id: asset.id },
                data: { imageUrl, status: JobStatus.COMPLETED, updatedAt: new Date() },
            });
            return { id: asset.id, status: 'success', imageUrl };
        }
        catch (error) {
            await prisma.asset.update({
                where: { id: asset.id },
                data: { status: JobStatus.FAILED },
            });
            return {
                id: asset.id,
                status: 'failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }));
    const summary = {
        total: results.length,
        successful: results.filter((r) => r.status === 'fulfilled').length,
        failed: results.filter((r) => r.status === 'rejected').length,
    };
    res.json({ success: true, data: { summary, results } });
});
//# sourceMappingURL=assets.js.map