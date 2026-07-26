import { Queue } from 'bullmq';
import IORedis from 'ioredis';
export declare const connection: IORedis;
export declare const storyQueue: Queue<any, any, string, any, any, string>;
export declare const assetQueue: Queue<any, any, string, any, any, string>;
export declare const audioQueue: Queue<any, any, string, any, any, string>;
export declare const storyboardQueue: Queue<any, any, string, any, any, string>;
export declare const videoQueue: Queue<any, any, string, any, any, string>;
export declare const assembleQueue: Queue<any, any, string, any, any, string>;
export type PipelineJobData = {
    projectId: string;
};
//# sourceMappingURL=queue.d.ts.map