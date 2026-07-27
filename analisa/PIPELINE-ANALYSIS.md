# Analisis Proses Pipeline Project

## Overview
Dokumen ini menganalisis proses lengkap pipeline untuk project ID `cms2ztw9b0000rjiz9cowpbsd` ketika endpoint `POST http://localhost:3001/api/pipeline/:projectId/start` dipanggil.

---

## 1. Entry Point: POST /api/pipeline/:projectId/start

**File:** `apps/api/src/routes/pipeline.ts`

### Proses:
1. **Validasi Project**
   - Cek apakah project dengan ID tersebut ada di database
   - Jika tidak ada, return 404

2. **Validasi Status**
   - Hanya project dengan status berikut yang bisa di-restart:
     - `DRAFT`
     - `FAILED`
     - `STORY_GENERATING`
     - `STORY_DONE`
   - Jika status tidak valid, return 400

3. **Abort & Cleanup**
   - Panggil `abortProject(projectId)` untuk membatalkan proses Gemini yang sedang berjalan
   - Hapus job yang masih waiting/delayed dari queue
   - Delay 500ms untuk memastikan abort selesai

4. **Reset & Start**
   - Update status project ke `STORY_GENERATING`
   - Tambahkan job baru ke `storyQueue` dengan:
     - Job name: `'generate-story'`
     - Data: `{ projectId }`
     - Config: 1 attempt, exponential backoff 5000ms

5. **Response**
   ```json
   {
     "success": true,
     "data": {
       "jobId": "cms2ztw9b0000rjiz9cowpbsd",
       "status": "STORY_GENERATING"
     }
   }
   ```

---

## 2. Queue System Architecture

**File:** `apps/api/src/lib/queue.ts`

### Queue Infrastructure:
- **Redis Connection:** `redis://localhost:6379`
- **Library:** BullMQ dengan IORedis

### Available Queues:
1. `storyQueue` - Generate screenplay & storyboard
2. `assetQueue` - Generate asset prompts
3. `audioQueue` - Generate music & audio
4. `storyboardQueue` - Generate storyboard images
5. `videoQueue` - Generate video clips
6. `assembleQueue` - Final video assembly

---

## 3. Complete Pipeline Flow

### Stage 1: Story Generation (Story Worker)
**File:** `apps/api/src/workers/story.worker.ts`

**Progress:** 5% → 80%

#### Steps:
1. **Register Abort Controller** (5%)
   - Daftarkan AbortController untuk project ini
   - Broadcast: "Memulai generasi naskah dengan Gemini AI..."

2. **Fetch Project Data** (5%)
   - Ambil data project dari database
   - Extract input data:
     ```typescript
     {
       ide: project.ide,
       gaya: project.gaya,
       tokohUtama: project.tokohUtama,
       asalDaerah: project.asalDaerah,
       latar: project.latar,
       latarDetail: project.latarDetail,
       plot: project.plot
     }
     ```

3. **Generate Screenplay** (20% → 50%)
   - **Service:** `generateScreenplay()` di `services/gemini.ts`
   - **Model:** Gemini 2.0 Flash
   - **Master Prompt:**
     ```
     Kamu adalah penulis naskah cerita terbaik Indonesia.
     Buatkan naskah cerita lengkap berdasarkan master prompt berikut:
     
     IDE: "${input.ide}"
     GAYA: ${styleMap[input.gaya]}
     TOKOH UTAMA: ${input.tokohUtama}
     ASAL DAERAH: ${input.asalDaerah}
     LATAR WAKTU: ${input.latar}${input.latarDetail ? ` - ${input.latarDetail}` : ''}
     PLOT: "${input.plot}"
     
     Hasilkan JSON dengan struktur Screenplay lengkap:
     - title, logline, genre, era, setting
     - actors: array karakter
     - plotOutline: { pembuka, risingAction, klimaks, resolusi }
     - conflict
     - scenes: array 18-22 scene
     - musicTheme, wardrobeNotes
     ```
   - **Output:** Object `Screenplay` dengan 18-22 scenes

4. **Generate Storyboard** (50% → 70%)
   - **Service:** `generateStoryboard()` di `services/gemini.ts`
   - **Input:** Screenplay + style
   - **Prompt:** Membuat visual prompt untuk setiap scene
   - **Output:** Array `StoryboardScene[]` dengan:
     - `imagePrompt` (200+ kata untuk Stable Diffusion)
     - `videoPrompt` (100+ kata untuk video AI)
     - `cameraAngle`, `transition`, `voiceOver`, dll

5. **Generate Audio Prompts** (70%)
   - **Service:** `generateAudioPrompts()` di `services/gemini.ts`
   - **Output:** 3 audio prompts:
     - `SOUNDTRACK` - Lagu dengan lirik
     - `BACKSOUND` - Instrumental cinematic
     - `VOICE_OVER` - Deskripsi narator

6. **Persist to Database** (70% → 80%)
   - Transaction untuk menyimpan:
     - Update `project.screenplay` dan `totalScenes`
     - Create multiple `Scene` records
     - Create multiple `AudioAsset` records
   - Update status ke `STORY_DONE`

7. **Chain to Next Stage** (80%)
   - Add job ke `assetQueue`
   - Update status ke `ASSETS_GENERATING`
   - Broadcast: "Naskah selesai! X scene dibuat. Memulai generasi aset..."

---

### Stage 2: Asset Generation (Asset Worker)
**File:** `apps/api/src/workers/asset.worker.ts`

**Progress:** 62% → 72%

#### Steps:
1. **Generate Asset Prompts** (62% → 70%)
   - **Service:** `generateAssetPrompts()` di `services/nemotron.js`
   - **Input:** Screenplay dari database
   - **Output:** Array asset prompts untuk:
     - `CHARACTER` - Karakter utama & pendukung
     - `ITEM` - Properti penting
     - `BACKGROUND` - Latar tempat

2. **Save to Database** (70%)
   - Create multiple `Asset` records
   - Update status ke `ASSETS_DONE`

3. **Chain to Audio** (72%)
   - Add job ke `audioQueue`
   - Update status ke `AUDIO_GENERATING`

---

### Stage 3: Audio Generation (Audio Worker)
**File:** `apps/api/src/workers/audio.worker.ts`

**Progress:** 74% → 80%

#### Steps:
1. **Fetch Audio Assets** (74%)
   - Ambil semua `AudioAsset` untuk project
   - Filter berdasarkan type: `SOUNDTRACK` dan `BACKSOUND`

2. **Generate Soundtrack** (74% → 77%)
   - **Service:** `generateSoundtrack()` di `services/suno.js`
   - **Platform:** Suno AI
   - **Input:** sunoPrompt, lyrics, mood, genre
   - Update `sunoJobId` dan status ke `PROCESSING`
   - **Wait:** `waitForSunoJob()` sampai selesai
   - Save `audioUrl`

3. **Generate Backsound** (77% → 80%)
   - **Service:** `generateBacksound()` di `services/suno.js`
   - **Platform:** Suno AI
   - **Input:** sunoPrompt, mood, genre (instrumental)
   - Update `sunoJobId` dan status ke `PROCESSING`
   - **Wait:** `waitForSunoJob()` sampai selesai
   - Save `audioUrl`

4. **Update Database** (80%)
   - Update semua `audioUrl` dan status ke `COMPLETED`
   - Update project status ke `AUDIO_DONE`

5. **Chain to Storyboard** (80%)
   - Add job ke `storyboardQueue`
   - Update status ke `STORYBOARD_GENERATING`

---

### Stage 4: Storyboard Image Generation (Storyboard Worker)
**File:** `apps/api/src/workers/storyboard.worker.ts`

**Progress:** 82% → 88%

#### Steps:
1. **Fetch Scenes** (82%)
   - Ambil semua `Scene` untuk project (ordered by sceneNumber)
   - Tentukan style label berdasarkan `project.gaya`:
     - `FUTURISTIK` → "futuristic sci-fi digital art"
     - `SUPER_HERO` → "superhero comic book art"
     - `KLASIK` → "classical Indonesian painting, batik-inspired"
     - `SAAT_INI` → "modern cinematic photography"

2. **Generate Images per Scene** (82% → 88%)
   - Loop setiap scene:
     - **Service:** `generateImage()` di `services/composio.js`
     - **Input:** `scene.imagePrompt` + styleLabel
     - **Platform:** Composio (Stable Diffusion/Midjourney)
     - **Output:** `imageUrl`
     - Update `scene.storyboardUrl`
     - Broadcast progress per scene

3. **Update Status** (88%)
   - Update project status ke `STORYBOARD_DONE`

4. **Chain to Video** (88%)
   - Add job ke `videoQueue`
   - Update status ke `VIDEO_GENERATING`

---

### Stage 5: Video Clip Generation (Video Worker)
**File:** `apps/api/src/workers/video.worker.ts`

**Progress:** 88% → 95%

#### Steps:
1. **Fetch Scenes** (88%)
   - Ambil semua `Scene` dengan `storyboardUrl`

2. **Generate Video per Scene** (88% → 95%)
   - Loop setiap scene:
     - **Service:** `generateVideoClip()` di `services/composio.js`
     - **Input:** 
       - `videoPrompt` (atau fallback ke `action`)
       - `imageUrl` (dari storyboardUrl sebagai first frame)
       - `styleLabel`
     - **Platform:** Composio (Video AI)
     - **Process:**
       - Submit job
       - Jika belum selesai, poll dengan `waitForVideoClip()`
     - **Output:** `clipUrl`
     - Update `scene.clipUrl` dan status ke `COMPLETED`
     - Update `project.completedScenes`
     - Broadcast progress per scene

3. **Update Status** (95%)
   - Update project status ke `VIDEO_DONE`

4. **Chain to Assembly** (95%)
   - Add job ke `assembleQueue`
   - Update status ke `ASSEMBLING`

---

### Stage 6: Final Assembly (Assemble Worker)
**File:** `apps/api/src/workers/assemble.worker.ts`

**Progress:** 95% → 100%

#### Steps:
1. **Fetch All Data** (95%)
   - Fetch project, scenes, audioAssets dari database

2. **Download Video Clips** (96%)
   - Loop semua scenes dengan `clipUrl`
   - **Service:** `downloadFile()` di `services/ffmpeg.js`
   - Download ke temporary path: `/tmp/project_id/scene_X.mp4`
   - Collect semua `clipPaths[]`

3. **Download Audio Files** (96%)
   - Download `backsound.audioUrl` → `backsound.mp3`
   - Download `soundtrack.audioUrl` → `soundtrack.mp3`

4. **Generate Voice Over** (97%)
   - **Service:** `synthesizeVoiceOver()` di `services/tts.js`
   - **Input:** Gabungan semua `scene.voiceOver` dari screenplay
   - **Platform:** Google TTS atau ElevenLabs
   - **Output:** `voiceover.mp3`
   - Update `audioAsset.audioUrl` dengan local path

5. **FFmpeg Merge** (98%)
   - **Service:** `mergeVideoWithAudio()` di `services/ffmpeg.js`
   - **Input:**
     - `clipPaths[]` - Semua video clips
     - `backsoundPath` (optional)
     - `soundtrackPath` (optional)
     - `voiceOverPath` (optional)
   - **Process:**
     - Concatenate semua video clips
     - Mix audio tracks (backsound + soundtrack + voiceover)
     - Sync audio dengan video
     - Apply transitions antar scene
   - **Output:** `final.mp4`

6. **Upload to Google Drive** (99%)
   - **Service:** `uploadFileToDrive()` di `services/drive.js`
   - **Filename:** `legenda-{tokohUtama}-{timestamp}.mp4`
   - **Output:** 
     - `fileId` - Google Drive file ID
     - `shareLink` - Public share link

7. **Finalize Project** (100%)
   - Update database:
     ```typescript
     {
       status: ProjectStatus.COMPLETED,
       finalVideoUrl: shareLink,
       driveFileId: fileId,
       driveShareLink: shareLink
     }
     ```
   - Broadcast: "🎉 Video selesai! Tersimpan di Google Drive. Durasi: X menit."

---

## 4. Error Handling

### Abort Mechanism
- Setiap stage dapat dibatalkan via `abortProject(projectId)`
- AbortController signal diteruskan ke Gemini API calls
- Worker akan catch abort dan set status ke `FAILED`

### Retry Strategy
- Setiap queue job memiliki retry attempts (1-3x)
- Exponential backoff: 5000ms - 10000ms
- Jika semua attempts gagal, worker `on('failed')` handler:
  - Update project status ke `FAILED`
  - Broadcast error message

### Worker Error Handlers
Setiap worker memiliki `on('failed')` handler yang:
1. Update project status ke `FAILED`
2. Broadcast error message dengan detail
3. Cleanup resources jika perlu

---

## 5. Progress Broadcasting

### WebSocket System
**File:** `apps/api/src/lib/websocket.ts`

Setiap stage broadcast progress via WebSocket dengan format:
```typescript
{
  projectId: string,
  stage: ProjectStatus,
  progress: number,      // 0-100
  message: string,
  timestamp: string      // ISO 8601
}
```

### Progress Milestones:
- 5% - Story generation start
- 20% - Gemini writing screenplay
- 50% - Creating storyboard
- 70% - Creating audio prompts
- 80% - Story done, starting assets
- 62% - Nemotron generating asset prompts
- 72% - Assets done, starting audio
- 74% - Suno generating music
- 80% - Audio done, starting storyboard images
- 82% - Generating storyboard images
- 88% - Storyboard done, starting video clips
- 95% - Video done, starting assembly
- 96% - Downloading clips
- 97% - Generating voice over
- 98% - FFmpeg merging
- 99% - Uploading to Drive
- 100% - Completed!

---

## 6. Database Schema Changes

### Project Status Flow:
```
DRAFT
  ↓
STORY_GENERATING
  ↓
STORY_DONE
  ↓
ASSETS_GENERATING
  ↓
ASSETS_DONE
  ↓
AUDIO_GENERATING
  ↓
AUDIO_DONE
  ↓
STORYBOARD_GENERATING
  ↓
STORYBOARD_DONE
  ↓
VIDEO_GENERATING
  ↓
VIDEO_DONE
  ↓
ASSEMBLING
  ↓
COMPLETED (or FAILED)
```

### Tables Updated:
1. **Project** - status, screenplay, totalScenes, completedScenes, finalVideoUrl, driveFileId, driveShareLink
2. **Scene** - created with screenplay data, updated with storyboardUrl, clipUrl, status
3. **AudioAsset** - created with prompts, updated with sunoJobId, audioUrl, status
4. **Asset** - created with prompts from Nemotron

---

## 7. External Services Integration

### AI Services:
1. **Gemini 2.0 Flash** - Screenplay, storyboard prompts, audio prompts
2. **Nemotron** - Asset visual prompts
3. **Suno AI** - Music generation (soundtrack & backsound)
4. **Composio** - Image generation (Stable Diffusion) & Video generation
5. **Google TTS / ElevenLabs** - Voice over synthesis

### Storage & Processing:
1. **FFmpeg** - Video concatenation, audio mixing, format conversion
2. **Google Drive API** - Final video upload & sharing
3. **Redis** - Queue management (BullMQ)
4. **PostgreSQL** - Data persistence (Prisma)

---

## 8. Performance Considerations

### Concurrency:
- Story Worker: 2 concurrent jobs
- Asset Worker: 2 concurrent jobs
- Audio Worker: 1 concurrent job (Suno rate limits)
- Storyboard Worker: 1 concurrent job
- Video Worker: 1 concurrent job
- Assemble Worker: 1 concurrent job

### Estimated Timeline:
- Story Generation: 2-5 minutes
- Asset Generation: 1-2 minutes
- Audio Generation: 3-5 minutes (Suno processing)
- Storyboard Images: 5-10 minutes (18-22 images)
- Video Clips: 15-30 minutes (18-22 clips)
- Assembly: 2-5 minutes
- **Total: ~30-60 minutes per project**

---

## 9. Monitoring & Debugging

### WebSocket Events:
Client dapat subscribe ke `ws://localhost:3001` untuk real-time progress updates.

### Queue Monitoring:
BullMQ provides built-in monitoring via Redis:
- Active jobs
- Waiting jobs
- Failed jobs
- Completed jobs

### Logs:
- Console logs di setiap worker untuk debugging
- Error logs dengan stack trace
- Progress broadcasts untuk user feedback

---

## Kesimpulan

Pipeline ini adalah sistem kompleks yang mengorkestrasikan 6 worker berbeda, 5+ AI services, dan multiple storage systems untuk menghasilkan video legenda otomatis dari input user. Setiap stage memiliki error handling, retry mechanism, dan progress tracking yang robust untuk memastikan reliability dan user experience yang baik.
