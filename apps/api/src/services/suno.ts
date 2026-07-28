import { type AudioPrompt, AudioType } from '@legenda/shared-types';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUNO_API_BASE = `${process.env.AIRFORCE_BASE_URL ?? 'https://api.airforce/v1'}`;
const SOUNDTRACK_DIR = path.resolve(__dirname, './assets/projects/project-name/audios/');
const soundTrack = path.join(SOUNDTRACK_DIR, 'soundtrack.mp3');

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
      'Authorization': `Bearer ${process.env.AIRFORCE_API_KEY ?? ''}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Suno API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<SunoJobResponse>;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function generateSoundtrack(prompt: AudioPrompt): Promise<SunoJobResponse> {
  const res = await sunoFetch('/generate', {
    prompt: prompt.sunoPrompt,
    lyrics: prompt.lyrics,
    duration: prompt.duration,
    instrumental: false,
    tags: `${prompt.genre}, ${prompt.mood}`,
    title: 'Legenda AI Soundtrack',
  });

  // This is the soundtrack
  ensureDir(SOUNDTRACK_DIR);
  if (res.audio_url) {
    const audioRes = await fetch(res.audio_url);
    if (audioRes.ok) {
      const buffer = Buffer.from(await audioRes.arrayBuffer());
      await fs.promises.writeFile(soundTrack, buffer);
    }
  }
  return res;
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