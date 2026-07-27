// Composio Google Integration - Alternative to direct Google Cloud credentials
// Uses Composio as a proxy for Google Drive and TTS operations
// Docs: https://docs.composio.dev/docs/providers/google

const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY ?? '';
const COMPOSIO_ENTITY_ID = process.env.COMPOSIO_ENTITY_ID ?? 'default';

interface ComposioResponse<T = any> {
  successfull: boolean;
  data: T;
  error?: string;
}

// ── Google Drive via Composio ─────────────────────────────────────────────────

export async function uploadFileToDriveViaComposio(
  fileContent: Buffer | string,
  fileName: string,
  mimeType: string,
  folderId?: string,
): Promise<{ fileId: string; shareLink: string }> {
  // Convert file content to base64 if it's a Buffer
  const base64Content =
    typeof fileContent === 'string'
      ? Buffer.from(fileContent).toString('base64')
      : fileContent.toString('base64');

  const res = await fetch('https://api.composio.dev/api/v1/actions/GOOGLEDRIVE_CREATE_FILE/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': COMPOSIO_API_KEY,
    },
    body: JSON.stringify({
      entityId: COMPOSIO_ENTITY_ID,
      input: {
        name: fileName,
        mimeType,
        content: base64Content,
        parents: folderId ? [folderId] : undefined,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Composio Drive upload error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as ComposioResponse<{ id: string; webViewLink: string }>;

  if (!data.successfull || !data.data?.id) {
    throw new Error(`Composio Drive upload failed: ${data.error ?? 'Unknown error'}`);
  }

  // Make file publicly readable
  await makeFilePublicViaComposio(data.data.id);

  const shareLink = data.data.webViewLink ?? `https://drive.google.com/file/d/${data.data.id}/view`;
  return { fileId: data.data.id, shareLink };
}

async function makeFilePublicViaComposio(fileId: string): Promise<void> {
  const res = await fetch('https://api.composio.dev/api/v1/actions/GOOGLEDRIVE_CREATE_PERMISSION/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': COMPOSIO_API_KEY,
    },
    body: JSON.stringify({
      entityId: COMPOSIO_ENTITY_ID,
      input: {
        fileId,
        role: 'reader',
        type: 'anyone',
      },
    }),
  });

  if (!res.ok) {
    console.warn(`Failed to make file ${fileId} public via Composio`);
  }
}

// ── Google Text-to-Speech via Composio ───────────────────────────────────────

export async function synthesizeVoiceOverViaComposio(
  text: string,
  languageCode = 'id-ID',
  voiceName = 'id-ID-Wavenet-B',
): Promise<Buffer> {
  const res = await fetch('https://api.composio.dev/api/v1/actions/GOOGLE_TTS_SYNTHESIZE/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': COMPOSIO_API_KEY,
    },
    body: JSON.stringify({
      entityId: COMPOSIO_ENTITY_ID,
      input: {
        text,
        languageCode,
        voiceName,
        audioEncoding: 'MP3',
        speakingRate: 0.9,
        pitch: -2.0,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Composio TTS error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as ComposioResponse<{ audioContent: string }>;

  if (!data.successfull || !data.data?.audioContent) {
    throw new Error(`Composio TTS failed: ${data.error ?? 'Unknown error'}`);
  }

  // audioContent is base64 encoded
  return Buffer.from(data.data.audioContent, 'base64');
}

// ── Helper: Check if Composio Google integration is configured ───────────────

export function isComposioGoogleConfigured(): boolean {
  return Boolean(COMPOSIO_API_KEY && COMPOSIO_ENTITY_ID);
}

// ── Helper: Get Composio connection status ───────────────────────────────────

export async function getComposioGoogleConnectionStatus(): Promise<{
  connected: boolean;
  integrations: string[];
}> {
  try {
    const res = await fetch(
      `https://api.composio.dev/api/v1/connectedAccounts?entityId=${COMPOSIO_ENTITY_ID}`,
      {
        headers: { 'x-api-key': COMPOSIO_API_KEY },
      },
    );

    if (!res.ok) return { connected: false, integrations: [] };

    const data = (await res.json()) as { items: Array<{ integrationId: string; status: string }> };
    const googleIntegrations = data.items
      .filter((item) => item.integrationId.toLowerCase().includes('google') && item.status === 'ACTIVE')
      .map((item) => item.integrationId);

    return {
      connected: googleIntegrations.length > 0,
      integrations: googleIntegrations,
    };
  } catch (error) {
    console.error('Failed to check Composio connection:', error);
    return { connected: false, integrations: [] };
  }
}
