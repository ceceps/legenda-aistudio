export declare function uploadFileToDriveViaComposio(fileContent: Buffer | string, fileName: string, mimeType: string, folderId?: string): Promise<{
    fileId: string;
    shareLink: string;
}>;
export declare function synthesizeVoiceOverViaComposio(text: string, languageCode?: string, voiceName?: string): Promise<Buffer>;
export declare function isComposioGoogleConfigured(): boolean;
export declare function getComposioGoogleConnectionStatus(): Promise<{
    connected: boolean;
    integrations: string[];
}>;
//# sourceMappingURL=composio-google.d.ts.map