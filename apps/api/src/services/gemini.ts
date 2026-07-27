import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  type MasterPromptInput,
  type Screenplay,
  type StoryboardScene,
  type AudioPrompt,
  AudioType,
  StoryStyle,
} from '@legenda/shared-types';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  generationConfig: { responseMimeType: 'application/json' },
});

// ── AbortController registry ──────────────────────────────────────────────────
const abortControllers = new Map<string, AbortController>();

export function registerAbort(projectId: string): AbortController {
  const ctrl = new AbortController();
  abortControllers.set(projectId, ctrl);
  return ctrl;
}

export function abortProject(projectId: string): boolean {
  const ctrl = abortControllers.get(projectId);
  if (!ctrl) return false;
  ctrl.abort();
  abortControllers.delete(projectId);
  return true;
}

export function clearAbort(projectId: string) {
  abortControllers.delete(projectId);
}

// ── Screenplay ────────────────────────────────────────────────────────────────

export async function generateScreenplay(
  input: MasterPromptInput,
  signal?: AbortSignal,
): Promise<Screenplay> {
  const styleMap: Record<StoryStyle, string> = {
    [StoryStyle.KLASIK]: 'klasik tradisional dengan bahasa sastra',
    [StoryStyle.SAAT_INI]: 'modern kontemporer masa kini',
    [StoryStyle.FUTURISTIK]: 'futuristik sci-fi dengan teknologi canggih',
    [StoryStyle.SUPER_HERO]: 'superhero epik dengan kekuatan luar biasa',
  };

  const prompt = `
Kamu adalah penulis naskah cerita terbaik Indonesia.
Buatkan naskah cerita lengkap berdasarkan master prompt berikut:

IDE: "${input.ide}"
GAYA: ${styleMap[input.gaya]}
TOKOH UTAMA: ${input.tokohUtama}
ASAL DAERAH: ${input.asalDaerah}
LATAR WAKTU: ${input.latar}${input.latarDetail ? ` - ${input.latarDetail}` : ''}
PLOT: "${input.plot}"

Hasilkan JSON dengan struktur Screenplay lengkap:
- title: judul cerita
- logline: ringkasan 1 kalimat
- genre: genre cerita
- era: era/zaman
- setting: setting umum
- actors: array karakter (name, role, persona, costume, voiceDescription)
- plotOutline: { pembuka, risingAction, klimaks, resolusi }
- conflict: konflik utama
- scenes: array 18-22 scene, tiap scene { sceneNumber, title, setting, timeOfDay, durationSeconds:10, action, voiceOver, musicMood, actors }
- musicTheme: tema musik keseluruhan
- wardrobeNotes: catatan busana/kostum umum

Pastikan scenes membentuk cerita yang koheren minimal 3 menit total (18+ scene × 10 detik).
Gunakan bahasa Indonesia yang kaya dan vivid.
`;

  if (signal?.aborted) throw new Error('Dibatalkan');
  console.log('[Gemini] Calling generateContent...');
  const result = await model.generateContent(prompt);
  console.log('[Gemini] Result:', result ? 'defined' : 'undefined', result?.response ? 'has response' : 'no response');
  if (signal?.aborted) throw new Error('Dibatalkan');
  if (!result || !result.response) throw new Error('Gemini returned empty response');
  const text = result.response.text();
  if (!text) throw new Error('Gemini returned empty text');
  return JSON.parse(text) as Screenplay;
}

// ── Storyboard ────────────────────────────────────────────────────────────────

export async function generateStoryboard(
  screenplay: Screenplay,
  style: StoryStyle,
  signal?: AbortSignal,
): Promise<StoryboardScene[]> {
  const prompt = `
Kamu adalah sutradara film profesional.
Berdasarkan naskah cerita berikut, buat storyboard visual untuk setiap scene.

Judul: "${screenplay.title}"
Gaya: ${style}
Aktor: ${screenplay.actors.map((a) => `${a.name} (${a.costume})`).join(', ')}

Scenes:
${JSON.stringify(screenplay.scenes, null, 2)}

Untuk setiap scene, hasilkan JSON array StoryboardScene:
[{
  sceneNumber: number,
  title: string,
  imagePrompt: string (detail Stable Diffusion / Midjourney prompt 200+ kata, sertakan kostum, pencahayaan, angle),
  videoPrompt: string (instruksi gerakan kamera dan aksi 100+ kata untuk video AI),
  cameraAngle: string (e.g., "wide shot", "close-up", "dutch angle"),
  transition: string (e.g., "cut", "fade", "dissolve"),
  voiceOver: string (kutipan VO dari naskah),
  musicNote: string (instruksi musik spesifik scene ini),
  durationSeconds: 10
}]
`;

  if (signal?.aborted) throw new Error('Dibatalkan');
  const result = await model.generateContent(prompt);
  if (signal?.aborted) throw new Error('Dibatalkan');
  if (!result || !result.response) throw new Error('Gemini returned empty response');
  const text = result.response.text();
  if (!text) throw new Error('Gemini returned empty text');
  return JSON.parse(text) as StoryboardScene[];
}

// ── Audio Prompts ─────────────────────────────────────────────────────────────

export async function generateAudioPrompts(
  screenplay: Screenplay,
  signal?: AbortSignal,
): Promise<AudioPrompt[]> {
  const prompt = `
Berdasarkan naskah cerita berikut, buat 3 prompt audio untuk Suno AI:
Judul: "${screenplay.title}"
Tema Musik: "${screenplay.musicTheme}"
Genre: "${screenplay.genre}"
Era: "${screenplay.era}"

Hasilkan JSON array dengan 3 item:
1. SOUNDTRACK (lagu bertema dengan lirik Indonesia)
2. BACKSOUND (instrumen cinematic tanpa vokal, untuk latar video)
3. VOICE_OVER (deskripsi narator untuk TTS)

Format: [{
  type: "SOUNDTRACK" | "BACKSOUND" | "VOICE_OVER",
  sunoPrompt: string (prompt khusus Suno),
  lyrics: string (hanya untuk SOUNDTRACK),
  mood: string,
  genre: string,
  duration: number (detik)
}]
`;

  if (signal?.aborted) throw new Error('Dibatalkan');
  const result = await model.generateContent(prompt);
  if (signal?.aborted) throw new Error('Dibatalkan');
  if (!result.response) throw new Error('Gemini returned empty response');
  const text = result.response.text();
  if (!text) throw new Error('Gemini returned empty text');
  return JSON.parse(text) as AudioPrompt[];
}
