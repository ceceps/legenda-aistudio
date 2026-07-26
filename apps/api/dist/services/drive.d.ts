import { type PathLike } from 'fs';
export declare function uploadFileToDrive(filePath: PathLike, fileName: string, mimeType: string): Promise<{
    fileId: string;
    shareLink: string;
}>;
//# sourceMappingURL=drive.d.ts.map