import { type AudioPrompt } from '@legenda/shared-types';
interface SunoJobResponse {
    id: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    audio_url?: string;
    error?: string;
}
export declare function generateSoundtrack(prompt: AudioPrompt): Promise<SunoJobResponse>;
export declare function generateBacksound(prompt: AudioPrompt): Promise<SunoJobResponse>;
export declare function checkSunoJob(jobId: string): Promise<SunoJobResponse>;
export declare function waitForSunoJob(jobId: string, maxWaitMs?: number): Promise<string>;
export {};
//# sourceMappingURL=suno.d.ts.map