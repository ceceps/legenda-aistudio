import { google } from 'googleapis';
import { createReadStream, type PathLike } from 'fs';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
    scopes: SCOPES,
  });
  return google.drive({ version: 'v3', auth });
}

export async function uploadFileToDrive(
  filePath: PathLike,
  fileName: string,
  mimeType: string,
): Promise<{ fileId: string; shareLink: string }> {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: folderId ? [folderId] : undefined,
    },
    media: {
      mimeType,
      body: createReadStream(filePath),
    },
    fields: 'id, webViewLink, webContentLink',
  });

  const fileId = res.data.id!;

  // Make file publicly readable
  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
  });

  const shareLink = res.data.webViewLink ?? `https://drive.google.com/file/d/${fileId}/view`;
  return { fileId, shareLink };
}
