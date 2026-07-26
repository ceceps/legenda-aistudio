import { Queue } from 'bullmq';
import IORedis from 'ioredis';
const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
export const connection = new IORedis(REDIS_URL, { maxRetriesPerRequest: null });
// ── Queues ────────────────────────────────────────────────────────────────────
export const storyQueue = new Queue('story', { connection });
export const assetQueue = new Queue('asset', { connection });
export const audioQueue = new Queue('audio', { connection });
export const storyboardQueue = new Queue('storyboard', { connection });
export const videoQueue = new Queue('video', { connection });
export const assembleQueue = new Queue('assemble', { connection });
//# sourceMappingURL=queue.js.map