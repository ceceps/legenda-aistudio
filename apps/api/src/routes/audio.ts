import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const audioRouter: ReturnType<typeof Router> = Router();

// GET /api/projects/:id/audio
audioRouter.get('/:id/audio', async (req: Request, res: Response) => {
  const audio = await prisma.audioAsset.findMany({
    where: { projectId: req.params['id'] },
    orderBy: { type: 'asc' },
  });
  res.json({ success: true, data: audio });
});
