import { Worker } from 'bullmq';
import { connection, storyboardQueue } from '../lib/queue.js';
import { prisma } from '../lib/prisma.js';
import { broadcastProgress } from '../lib/websocket.js';
import { generateSoundtrack, generateBacksound, waitForSunoJob } from '../services/suno.js';
import { ProjectStatus, AudioType } from '@legenda/shared-types';
export const audioWorker = new Worker('audio', async (job) => {
    const { projectId } = job.data;
    broadcastProgress({
        projectId,
        stage: ProjectStatus.AUDIO_GENERATING,
        progress: 74,
        message: 'Membuat musik & audio via Suno...',
        timestamp: new Date().toISOString(),
    });
    const audioAssets = await prisma.audioAsset.findMany({ where: { projectId } });
    const soundtrackAsset = audioAssets.find((a) => a.type === AudioType.SOUNDTRACK);
    const backsoundAsset = audioAssets.find((a) => a.type === AudioType.BACKSOUND);
    const results = [];
    if (soundtrackAsset) {
        const job = await generateSoundtrack({
            type: AudioType.SOUNDTRACK,
            sunoPrompt: soundtrackAsset.sunoPrompt,
            lyrics: soundtrackAsset.lyrics ?? undefined,
            mood: soundtrackAsset.mood ?? 'epic',
            genre: soundtrackAsset.genre ?? 'cinematic',
            duration: 180,
        });
        await prisma.audioAsset.update({
            where: { id: soundtrackAsset.id },
            data: { sunoJobId: job.id, status: 'PROCESSING' },
        });
        const audioUrl = await waitForSunoJob(job.id);
        results.push({ id: soundtrackAsset.id, audioUrl });
    }
    if (backsoundAsset) {
        const job = await generateBacksound({
            type: AudioType.BACKSOUND,
            sunoPrompt: backsoundAsset.sunoPrompt,
            mood: backsoundAsset.mood ?? 'cinematic',
            genre: backsoundAsset.genre ?? 'orchestral',
            duration: 200,
        });
        await prisma.audioAsset.update({
            where: { id: backsoundAsset.id },
            data: { sunoJobId: job.id, status: 'PROCESSING' },
        });
        const audioUrl = await waitForSunoJob(job.id);
        results.push({ id: backsoundAsset.id, audioUrl });
    }
    // Update audio urls
    await Promise.all(results.map((r) => prisma.audioAsset.update({
        where: { id: r.id },
        data: { audioUrl: r.audioUrl, status: 'COMPLETED' },
    })));
    await prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.AUDIO_DONE },
    });
    broadcastProgress({
        projectId,
        stage: ProjectStatus.AUDIO_DONE,
        progress: 80,
        message: 'Audio selesai. Memulai render video...',
        timestamp: new Date().toISOString(),
    });
    // Chain to video
    await storyboardQueue.add('generate-storyboard', { projectId }, {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
    });
    await prisma.project.update({
        where: { id: projectId },
        data: { status: ProjectStatus.STORYBOARD_GENERATING },
    });
}, { connection, concurrency: 1 });
audioWorker.on('failed', async (job, err) => {
    if (!job)
        return;
    const { projectId } = job.data;
    await prisma.project.update({ where: { id: projectId }, data: { status: ProjectStatus.FAILED } });
    broadcastProgress({
        projectId,
        stage: ProjectStatus.FAILED,
        progress: 0,
        message: `Audio worker gagal: ${err.message}`,
        timestamp: new Date().toISOString(),
    });
});
//# sourceMappingURL=audio.worker.js.map