export declare function getTmpPath(projectId: string, filename: string): string;
export interface MergeOptions {
    projectId: string;
    clipPaths: string[];
    backsoundPath?: string;
    soundtrackPath?: string;
    voiceOverPath?: string;
    outputPath: string;
}
export declare function mergeVideoWithAudio(opts: MergeOptions): Promise<string>;
export declare function downloadFile(url: string, destPath: string): Promise<void>;
//# sourceMappingURL=ffmpeg.d.ts.map