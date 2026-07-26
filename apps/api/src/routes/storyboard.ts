import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const storyboardRouter: ReturnType<typeof Router> = Router();

// GET /api/projects/:id/storyboard
storyboardRouter.get('/:id/storyboard', async (req: Request, res: Response) => {
  const scenes = await prisma.scene.findMany({
    where: { projectId: req.params['id'] },
    orderBy: { sceneNumber: 'asc' },
  });

  if (!scenes.length) {
    res.status(404).json({ success: false, error: 'No storyboard scenes found' });
    return;
  }

  const data = scenes.map(
    (s: {
      sceneNumber: number;
      title: string;
      imagePrompt: string | null;
      videoPrompt: string | null;
      cameraAngle: string | null;
      transition: string | null;
      voiceOver: string;
      musicMood: string | null;
      durationSeconds: number;
      storyboardUrl: string | null;
      clipUrl: string | null;
      status: string;
    }) => ({
      sceneNumber: s.sceneNumber,
      title: s.title,
      imagePrompt: s.imagePrompt ?? '',
      videoPrompt: s.videoPrompt ?? '',
      cameraAngle: s.cameraAngle ?? '',
      transition: s.transition ?? '',
      voiceOver: s.voiceOver,
      musicNote: s.musicMood ?? '',
      durationSeconds: s.durationSeconds,
      storyboardUrl: s.storyboardUrl,
      clipUrl: s.clipUrl,
      status: s.status,
    }),
  );

  res.json({ success: true, data });
});
