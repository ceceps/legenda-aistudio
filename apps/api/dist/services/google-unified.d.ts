import { type PathLike } from 'fs';
export declare enum GoogleServiceMode {
    DIRECT = "direct",
    COMPOSIO = "composio",
    NONE = "none"
}
export declare function getGoogleServiceMode(): GoogleServiceMode;
export declare function uploadFileToDrive(filePath: PathLike, fileName: string, mimeType: string): Promise<{
    fileId: string;
    shareLink: string;
}>;
export declare function synthesizeVoiceOver(text: string, outputPath: string, languageCode?: string): Promise<string>;
export declare function checkGoogleServicesHealth(): Promise<{
    mode: GoogleServiceMode;
    drive: boolean;
    tts: boolean;
    details: string;
}>;
//# sourceMappingURL=google-unified.d.ts.map