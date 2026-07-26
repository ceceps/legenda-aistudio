import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { StoryStyle, HistoricalEra, } from '@legenda/shared-types';
export const projectsRouter = Router();
const CreateProjectSchema = z.object({
    ide: z.string().min(10),
    gaya: z.nativeEnum(StoryStyle),
    tokohUtama: z.string().min(2),
    asalDaerah: z.string().min(2),
    latar: z.nativeEnum(HistoricalEra),
    latarDetail: z.string().optional(),
    plot: z.string().min(10),
});
function toDTO(p) {
    if (!p)
        return null;
    const dto = {
        id: p.id,
        userId: 'anonymous',
        title: p.title,
        status: p.status,
        masterPrompt: {
            ide: p.ide,
            gaya: p.gaya,
            tokohUtama: p.tokohUtama,
            asalDaerah: p.asalDaerah,
            latar: p.latar,
            latarDetail: p.latarDetail ?? undefined,
            plot: p.plot,
        },
        finalVideoUrl: p.finalVideoUrl ?? undefined,
        driveFileId: p.driveFileId ?? undefined,
        driveShareLink: p.driveShareLink ?? undefined,
        totalScenes: p.totalScenes,
        completedScenes: p.completedScenes,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
    };
    if (p.screenplay !== null && p.screenplay !== undefined) {
        dto.screenplay = p.screenplay;
    }
    return dto;
}
// GET /api/projects
projectsRouter.get('/', async (_req, res) => {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    const data = {
        success: true,
        data: projects.map(toDTO).filter(Boolean),
    };
    res.json(data);
});
// GET /api/projects/:id
projectsRouter.get('/:id', async (req, res) => {
    const project = await prisma.project.findUnique({ where: { id: req.params['id'] } });
    if (!project) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
    }
    res.json({ success: true, data: toDTO(project) });
});
// POST /api/projects
projectsRouter.post('/', async (req, res) => {
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
            latarDetail: input.latarDetail,
            plot: input.plot,
        },
    });
    res.status(201).json({ success: true, data: toDTO(project) });
});
// DELETE /api/projects/:id
projectsRouter.delete('/:id', async (req, res) => {
    await prisma.project.delete({ where: { id: req.params['id'] } });
    res.json({ success: true });
});
//# sourceMappingURL=projects.js.map