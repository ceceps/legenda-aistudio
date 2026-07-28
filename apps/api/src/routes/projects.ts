import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import {
  StoryStyle,
  HistoricalEra,
  type ApiResponse,
  type ProjectDTO,
  type Screenplay,
} from '@legenda/shared-types';

export const projectsRouter: ReturnType<typeof Router> = Router();

const CreateProjectSchema = z.object({
  ide: z.string().min(10),
  gaya: z.nativeEnum(StoryStyle),
  tokohUtama: z.string().min(2),
  asalDaerah: z.string().min(2),
  latar: z.nativeEnum(HistoricalEra),
  latarDetail: z.string().optional(),
  plot: z.string().min(10),
});

function toDTO(p: Awaited<ReturnType<typeof prisma.project.findUnique>>): ProjectDTO | null {
  if (!p) return null;

  const dto: ProjectDTO = {
    id: p.id,
    userId: 'anonymous',
    title: p.title,
    status: p.status as ProjectDTO['status'],
    masterPrompt: {
      ide: p.ide,
      gaya: p.gaya as ProjectDTO['masterPrompt']['gaya'],
      tokohUtama: p.tokohUtama,
      asalDaerah: p.asalDaerah,
      latar: p.latar as ProjectDTO['masterPrompt']['latar'],
      latarDetail: p.latarDetail ?? '',
      plot: p.plot,
    },
    totalScenes: p.totalScenes,
    completedScenes: p.completedScenes,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };

  if (p.finalVideoUrl) dto.finalVideoUrl = p.finalVideoUrl;
  if (p.driveFileId) dto.driveFileId = p.driveFileId;
  if (p.driveShareLink) dto.driveShareLink = p.driveShareLink;

  if (p.screenplay !== null && p.screenplay !== undefined) {
    dto.screenplay = p.screenplay as unknown as Screenplay;
  }

  return dto;
}

// GET /api/projects
projectsRouter.get('/', async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  const data: ApiResponse<ProjectDTO[]> = {
    success: true,
    data: projects.map(toDTO).filter(Boolean) as ProjectDTO[],
  };
  res.json(data);
});

// GET /api/projects/:id
projectsRouter.get('/:id', async (req: Request, res: Response) => {
  const projectId = req.params['id'] as string;
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) {
    res.status(404).json({ success: false, error: 'Project not found' });
    return;
  }
  res.json({ success: true, data: toDTO(project) });
});

// POST /api/projects
projectsRouter.post('/', async (req: Request, res: Response) => {
  const parse = CreateProjectSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ success: false, error: parse.error.message });
    return;
  }
  const input = parse.data;
  const title = `${input.tokohUtama} — ${input.gaya} (${input.asalDaerah})`;

  const project = await prisma.project.create({
    data: {
      title,
      ide: input.ide,
      gaya: input.gaya,
      tokohUtama: input.tokohUtama,
      asalDaerah: input.asalDaerah,
      latar: input.latar,
      latarDetail: input.latarDetail ?? null,
      plot: input.plot,
    },
  });

  res.status(201).json({ success: true, data: toDTO(project) });
});

// DELETE /api/projects/:id
projectsRouter.delete('/:id', async (req: Request, res: Response) => {
  const projectId = req.params['id'] as string;
  await prisma.project.delete({ where: { id: projectId } });
  res.json({ success: true });
});
