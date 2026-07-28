import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { generateSoundtrack, generateBacksound, waitForSunoJob } from '../services/suno.js';
import { synthesizeVoiceOver } from '../services/tts.js';
import { uploadFileToDrive } from '../services/drive.js';
import { JobStatus, AudioType } from '@legenda/shared-types';
import { randomUUID } from 'crypto';
import { unlinkSync } from 'fs';

export const audioRouter: ReturnType<typeof Router> = Router();

// GET /api/projects/:id/audio
audioRouter.get('/:id/audio', async (req: Request, res: Response) => {
  const projectId = req.params['id'] as string;
  const audio = await prisma.audioAsset.findMany({
    where: { projectId },
    orderBy: { type: 'asc' },
  });
  res.json({ success: true, data: audio });
});

// GET /api/projects/:id/audio/:audioId
audioRouter.get('/:id/audio/:audioId', async (req: Request, res: Response) => {
  const audioId = req.params['audioId'] as string;
  const audio = await prisma.audioAsset.findUnique({ where: { id: audioId } });
  if (!audio) {
    res.status(404).json({ success: false, error: 'Audio asset not found' });
    return;
  }
  res.json({ success: true, data: audio });
});

// POST /api/projects/:id/audio/:audioId/regenerate
audioRouter.post('/:id/audio/:audioId/regenerate', async (req: Request, res: Response) => {
  const audioId = req.params['audioId'] as string;

  const audio = await prisma.audioAsset.findUnique({ where: { id: audioId } });
  if (!audio) {
    res.status(404).json({ success: false, error: 'Audio asset not found' });
    return;
  }

  try {
    // Mark as processing
    await prisma.audioAsset.update({
      where: { id: audioId },
      data: { status: JobStatus.PROCESSING, audioUrl: null, sunoJobId: null },
    });

    let audioUrl: string;

    if (audio.type === AudioType.VOICE_OVER) {
      // Generate TTS voice over
      const tmpPath = `/tmp/${audioId}-vo.mp3`;
      await synthesizeVoiceOver(audio.sunoPrompt, tmpPath);
      const { shareLink } = await uploadFileToDrive(
        tmpPath,
        `vo-${audioId}.mp3`,
        'audio/mpeg',
      );
      audioUrl = shareLink;
      unlinkSync(tmpPath);
    } else if (audio.type === AudioType.SOUNDTRACK) {
      // Generate soundtrack via Suno
      const job = await generateSoundtrack({
        type: AudioType.SOUNDTRACK,
        sunoPrompt: audio.sunoPrompt,
        ...(audio.lyrics !== null && audio.lyrics !== undefined && { lyrics: audio.lyrics }),
        mood: audio.mood ?? 'epic',
        genre: audio.genre ?? 'cinematic',
        duration: 180,
      });
      await prisma.audioAsset.update({
        where: { id: audioId },
        data: { sunoJobId: job.id },
      });
      audioUrl = await waitForSunoJob(job.id);
    } else {
      // Generate backsound via Suno
      const job = await generateBacksound({
        type: AudioType.BACKSOUND,
        sunoPrompt: audio.sunoPrompt,
        mood: audio.mood ?? 'cinematic',
        genre: audio.genre ?? 'orchestral',
        duration: 200,
      });
      await prisma.audioAsset.update({
        where: { id: audioId },
        data: { sunoJobId: job.id },
      });
      audioUrl = await waitForSunoJob(job.id);
    }

    // Update with new audio URL
    await prisma.audioAsset.update({
      where: { id: audioId },
      data: { audioUrl, status: JobStatus.COMPLETED, updatedAt: new Date() },
    });

    res.json({ success: true, data: { audioId, audioUrl, status: JobStatus.COMPLETED } });
  } catch (error) {
    await prisma.audioAsset.update({
      where: { id: audioId },
      data: { status: JobStatus.FAILED },
    });
    res.status(500).json({
      success: false,
      error: `Failed to regenerate audio: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
});

// DELETE /api/projects/:id/audio/:audioId
audioRouter.delete('/:id/audio/:audioId', async (req: Request, res: Response) => {
  const audioId = req.params['audioId'] as string;

  const audio = await prisma.audioAsset.findUnique({ where: { id: audioId } });
  if (!audio) {
    res.status(404).json({ success: false, error: 'Audio asset not found' });
    return;
  }

  await prisma.audioAsset.delete({ where: { id: audioId } });
  res.json({ success: true, message: 'Audio asset deleted successfully' });
});

// POST /api/projects/:id/audio/batch-regenerate
audioRouter.post('/:id/audio/batch-regenerate', async (req: Request, res: Response) => {
  const projectId = req.params['id'] as string;
  const { audioIds } = req.body as { audioIds?: string[] };

  if (!audioIds || !Array.isArray(audioIds) || audioIds.length === 0) {
    res.status(400).json({ success: false, error: 'audioIds array is required' });
    return;
  }

  const audioAssets = await prisma.audioAsset.findMany({
    where: { id: { in: audioIds }, projectId },
  });

  if (audioAssets.length === 0) {
    res.status(404).json({ success: false, error: 'No audio assets found' });
    return;
  }

  // Mark all as processing
  await prisma.audioAsset.updateMany({
    where: { id: { in: audioIds } },
    data: { status: JobStatus.PROCESSING },
  });

  // Process in parallel with error handling
  const results = await Promise.allSettled(
    audioAssets.map(async (audio) => {
      try {
        let audioUrl: string;

        if (audio.type === AudioType.VOICE_OVER) {
          const tmpPath = `/tmp/${audio.id}-vo.mp3`;
          await synthesizeVoiceOver(audio.sunoPrompt, tmpPath);
          const { shareLink } = await uploadFileToDrive(
            tmpPath,
            `vo-${audio.id}.mp3`,
            'audio/mpeg',
          );
          audioUrl = shareLink;
          unlinkSync(tmpPath);
        } else if (audio.type === AudioType.SOUNDTRACK) {
          const job = await generateSoundtrack({
            type: AudioType.SOUNDTRACK,
            sunoPrompt: audio.sunoPrompt,
            ...(audio.lyrics !== null && audio.lyrics !== undefined && { lyrics: audio.lyrics }),
            mood: audio.mood ?? 'epic',
            genre: audio.genre ?? 'cinematic',
            duration: 180,
          });
          audioUrl = await waitForSunoJob(job.id);
        } else {
          const job = await generateBacksound({
            type: AudioType.BACKSOUND,
            sunoPrompt: audio.sunoPrompt,
            mood: audio.mood ?? 'cinematic',
            genre: audio.genre ?? 'orchestral',
            duration: 200,
          });
          audioUrl = await waitForSunoJob(job.id);
        }

        await prisma.audioAsset.update({
          where: { id: audio.id },
          data: { audioUrl, status: JobStatus.COMPLETED, updatedAt: new Date() },
        });
        return { id: audio.id, status: 'success', audioUrl };
      } catch (error) {
        await prisma.audioAsset.update({
          where: { id: audio.id },
          data: { status: JobStatus.FAILED },
        });
        return {
          id: audio.id,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }),
  );

  const summary = {
    total: results.length,
    successful: results.filter((r) => r.status === 'fulfilled').length,
    failed: results.filter((r) => r.status === 'rejected').length,
  };

  res.json({ success: true, data: { summary, results } });
});
