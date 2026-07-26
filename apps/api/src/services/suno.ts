import { type AudioPrompt, AudioType } from '@legenda/shared-types';

const SUNO_API_BASE = 'https://api.suno.ai/v1'; // update if official endpoint changes

interface SunoGenerateRequest {
  prompt: string;
  lyrics?: string;
  duration?: number;
  instrumental?: boolean;
  tags?: string;
  title?: string;
}

interface SunoJobResponse {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  audio_url?: string;
  error?: string;
}

async function sunoFetch(path: string, body: object): Promise<SunoJobResponse> {
  const res = await fetch(`${SUNO_API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SUNO_API_KEY ?? ''}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Suno API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<SunoJobResponse>;
}

export async function generateSoundtrack(prompt: AudioPrompt): Promise<SunoJobResponse> {
  return sunoFetch('/generate', {
    prompt: prompt.sunoPrompt,
    lyrics: prompt.lyrics,
    duration: prompt.duration,
    instrumental: false,
    tags: `${prompt.genre}, ${prompt.mood}`,
    title: 'Legenda AI Soundtrack',
  });
}

export async function generateBacksound(prompt: AudioPrompt): Promise<SunoJobResponse> {
  return sunoFetch('/generate', {
    prompt: `${prompt.sunoPrompt}, no vocals, instrumental only, cinematic`,
    duration: prompt.duration,
    instrumental: true,
    tags: `${prompt.genre}, cinematic, ${prompt.mood}, no vocals`,
    title: 'Legenda AI Backsound',
  });
}

export async function checkSunoJob(jobId: string): Promise<SunoJobResponse> {
  const res = await fetch(`${SUNO_API_BASE}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${process.env.SUNO_API_KEY ?? ''}` },
  });
  return res.json() as Promise<SunoJobResponse>;
}

// ── Poll until done ───────────────────────────────────────────────────────────

export async function waitForSunoJob(
  jobId: string,
  maxWaitMs = 180_000,
): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const job = await checkSunoJob(jobId);
    if (job.status === 'completed' && job.audio_url) return job.audio_url;
    if (job.status === 'failed') throw new Error(`Suno job ${jobId} failed: ${job.error}`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error(`Suno job ${jobId} timed out`);
}
