import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { generateScreenplay } from '../services/gemini.js';
import { StoryStyle, HistoricalEra, ProjectStatus, type Screenplay, type MasterPromptInput, type ApiResponse } from '@legenda/shared-types';

export const storyRouter: ReturnType<typeof Router> = Router();

const GenerateStorySchema = z.object({
  ide: z.string().min(10),
  gaya: z.nativeEnum(StoryStyle),
  tokohUtama: z.string().min(2),
  asalDaerah: z.string().min(2),
  latar: z.nativeEnum(HistoricalEra),
  latarDetail: z.string().optional(),
  plot: z.string().min(10),
  projectId: z.string().optional(),
});

// POST /api/story/generate - Generate story directly via Gemini (no worker)
storyRouter.post('/generate', async (req: Request, res: Response) => {
  const parse = GenerateStorySchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ success: false, error: parse.error.message });
    return;
  }

  const { projectId, ...promptInput } = parse.data;
  const input: MasterPromptInput = {
    ide: promptInput.ide,
    gaya: promptInput.gaya,
    tokohUtama: promptInput.tokohUtama,
    asalDaerah: promptInput.asalDaerah,
    latar: promptInput.latar,
    plot: promptInput.plot,
    ...(promptInput.latarDetail !== undefined && { latarDetail: promptInput.latarDetail }),
  };

  try {
    // If projectId provided, update its status
    if (projectId) {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.STORY_GENERATING },
      });
    }

    // Generate screenplay via Gemini
    const screenplay = await generateScreenplay(input);

    // Convert to markdown for TipTap editor
    const markdown = screenplayToMarkdown(screenplay);

    // If projectId provided, save screenplay to project
    if (projectId) {
      await prisma.project.update({
        where: { id: projectId },
        data: {
          screenplay: screenplay as any,
          totalScenes: screenplay.scenes.length,
          status: ProjectStatus.STORY_DONE,
        },
      });
    }

    res.json({ success: true, data: { screenplay, markdown } });
  } catch (error: any) {
    console.error('Story generation error:', error);
    if (projectId) {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.FAILED },
      }).catch(() => {});
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

function screenplayToMarkdown(screenplay: Screenplay): string {
  const lines: string[] = [];

  lines.push(`# ${screenplay.title}`);
  lines.push('');
  lines.push(`**Logline:** ${screenplay.logline}`);
  lines.push(`**Genre:** ${screenplay.genre}`);
  lines.push(`**Era:** ${screenplay.era}`);
  lines.push(`**Setting:** ${screenplay.setting}`);
  lines.push(`**Conflict:** ${screenplay.conflict}`);
  lines.push('');
  lines.push('## Characters');
  lines.push('');

  for (const actor of screenplay.actors) {
    lines.push(`### ${actor.name}`);
    lines.push(`- **Role:** ${actor.role}`);
    lines.push(`- **Persona:** ${actor.persona}`);
    lines.push(`- **Costume:** ${actor.costume}`);
    lines.push(`- **Voice:** ${actor.voiceDescription}`);
    lines.push('');
  }

  lines.push('## Plot Outline');
  lines.push(`- **Pembuka:** ${screenplay.plotOutline.pembuka}`);
  lines.push(`- **Rising Action:** ${screenplay.plotOutline.risingAction}`);
  lines.push(`- **Klimaks:** ${screenplay.plotOutline.klimaks}`);
  lines.push(`- **Resolusi:** ${screenplay.plotOutline.resolusi}`);
  lines.push('');

  lines.push(`## Music Theme: ${screenplay.musicTheme}`);
  lines.push(`## Wardrobe Notes: ${screenplay.wardrobeNotes}`);
  lines.push('');

  lines.push('## Scenes');
  lines.push('');

  for (const scene of screenplay.scenes) {
    lines.push(`### Scene ${scene.sceneNumber}: ${scene.title}`);
    lines.push(`- **Setting:** ${scene.setting}`);
    lines.push(`- **Time:** ${scene.timeOfDay}`);
    lines.push(`- **Duration:** ${scene.durationSeconds}s`);
    lines.push(`- **Action:** ${scene.action}`);
    lines.push(`- **Voice Over:** ${scene.voiceOver}`);
    lines.push(`- **Music Mood:** ${scene.musicMood}`);
    lines.push(`- **Actors:** ${scene.actors.join(', ')}`);
    lines.push('');
  }

  return lines.join('\n');
}