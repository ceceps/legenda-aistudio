import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const assetsRouter: ReturnType<typeof Router> = Router();

// GET /api/projects/:id/assets
assetsRouter.get('/:id/assets', async (req: Request, res: Response) => {
  const assets = await prisma.asset.findMany({
    where: { projectId: req.params['id'] },
    orderBy: [{ type: 'asc' }, { name: 'asc' }],
  });
  res.json({ success: true, data: assets });
});

// GET /api/projects/:id/assets/:assetId
assetsRouter.get('/:id/assets/:assetId', async (req: Request, res: Response) => {
  const asset = await prisma.asset.findUnique({ where: { id: req.params['assetId'] } });
  if (!asset) {
    res.status(404).json({ success: false, error: 'Asset not found' });
    return;
  }
  res.json({ success: true, data: asset });
});
