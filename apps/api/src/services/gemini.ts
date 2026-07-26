import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  type MasterPromptInput,
  type Screenplay,
  type StoryboardScene,
  type AudioPrompt,
  AudioType,
  StoryStyle,
} from '@legenda/shared-types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  generationConfig: { responseMimeType: 'application/json' },
});

// ── Screenplay ────────────────────────────────────────────────────────────────

export async function generateScreenplay(input: MasterPromptInput): Promise<Screenplay> {
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

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text) as Screenplay;
}

// ── Storyboard ────────────────────────────────────────────────────────────────

export async function generateStoryboard(
  screenplay: Screenplay,
  style: StoryStyle,
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

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text) as StoryboardScene[];
}

// ── Audio Prompts ─────────────────────────────────────────────────────────────

export async function generateAudioPrompts(screenplay: Screenplay): Promise<AudioPrompt[]> {
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

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text) as AudioPrompt[];
}
