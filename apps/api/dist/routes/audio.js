import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
export const audioRouter = Router();
// GET /api/projects/:id/audio
audioRouter.get('/:id/audio', async (req, res) => {
    const audio = await prisma.audioAsset.findMany({
        where: { projectId: req.params['id'] },
        orderBy: { type: 'asc' },
    });
    res.json({ success: true, data: audio });
});
//# sourceMappingURL=audio.js.map