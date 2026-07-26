interface ImageGenResult {
    imageUrl: string;
    revised_prompt?: string;
}
interface VideoGenResult {
    jobId: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    videoUrl?: string;
}
export declare function generateImage(prompt: string, style: string): Promise<ImageGenResult>;
export declare function generateVideoClip(videoPrompt: string, imageUrl: string, style: string): Promise<VideoGenResult>;
export declare function waitForVideoClip(requestId: string, maxWaitMs?: number): Promise<string>;
export {};
//# sourceMappingURL=composio.d.ts.map