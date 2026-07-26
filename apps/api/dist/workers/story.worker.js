import { Worker } from 'bullmq';
import { connection, assetQueue } from '../lib/queue.js';
import { prisma } from '../lib/prisma.js';
import { broadcastProgress } from '../lib/websocket.js';
import { generateScreenplay, generateStoryboard, generateAudioPrompts, } from '../services/gemini.js';
import { ProjectStatus } from '@legenda/shared-types';
export const storyWorker = new Worker('story', async (job) => {
    const { projectId } = job.data;
    broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_GENERATING,
        progress: 5,
        message: 'Memulai generasi naskah dengan Gemini AI...',
        timestamp: new Date().toISOString(),
    });
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project)
        throw new Error(`Project ${projectId} not found`);
    const input = {
        ide: project.ide,
        gaya: project.gaya,
        tokohUtama: project.tokohUtama,
        asalDaerah: project.asalDaerah,
        latar: project.latar,
        latarDetail: project.latarDetail ?? undefined,
        plot: project.plot,
    };
    broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_GENERATING,
        progress: 20,
        message: 'Gemini sedang menulis naskah lengkap...',
        timestamp: new Date().toISOString(),
    });
    const screenplay = await generateScreenplay(input);
    broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_GENERATING,
        progress: 50,
        message: 'Menyimpan naskah & membuat storyboard...',
        timestamp: new Date().toISOString(),
    });
    // Generate storyboard scenes
    const storyboardScenes = await generateStoryboard(screenplay, input.gaya);
    // Generate audio prompts
    const audioPrompts = await generateAudioPrompts(screenplay);
    // Persist to DB
    await prisma.$transaction(async (tx) => {
        // Save screenplay
        await tx.project.update({
            where: { id: projectId },
            data: {
                screenplay: screenplay,
                totalScenes: storyboardScenes.length,
                status: ProjectStatus.STORY_DONE,
            },
        });
        // Save scenes
        await tx.scene.createMany({
            data: storyboardScenes.map((s) => ({
                projectId,
                sceneNumber: s.sceneNumber,
                title: s.title,
                setting: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.setting ?? '',
                action: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.action ?? '',
                voiceOver: s.voiceOver,
                musicMood: s.musicNote,
                actors: screenplay.scenes.find((sc) => sc.sceneNumber === s.sceneNumber)?.actors ?? [],
                imagePrompt: s.imagePrompt,
                videoPrompt: s.videoPrompt,
                cameraAngle: s.cameraAngle,
                transition: s.transition,
            })),
        });
        // Save audio prompts
        await tx.audioAsset.createMany({
            data: audioPrompts.map((a) => ({
                projectId,
                type: a.type,
                sunoPrompt: a.sunoPrompt,
                lyrics: a.lyrics,
                mood: a.mood,
                genre: a.genre,
            })),
        });
    });
    broadcastProgress({
        projectId,
        stage: ProjectStatus.STORY_DONE,
        progress: 60,
        message: `Naskah selesai! ${storyboardScenes.length} scene dibuat. Memulai generasi aset...`,
        timestamp: new Date().toISOString(),
    });
    // Chain to asset generation
    await assetQueue.add('generate-assets', { projectId }, {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
    });
    await prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.ASSETS_GENERATING },
    });
}, { connection, concurrency: 2 });
storyWorker.on('failed', async (job, err) => {
    if (!job)
        return;
    const { projectId } = job.data;
    await prisma.project.update({ where: { id: projectId }, data: { status: ProjectStatus.FAILED } });
    broadcastProgress({
        projectId,
        stage: ProjectStatus.FAILED,
        progress: 0,
        message: `Gagal: ${err.message}`,
        timestamp: new Date().toISOString(),
    });
});
//# sourceMappingURL=story.worker.js.map