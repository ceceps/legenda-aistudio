
# Legenda AI Studio — API Style Guide

**Base URL:** `https://api.legenda-aistudio.app/v1` (ganti sesuai environment: `http://localhost:3000/api` untuk lokal)
**Format:** JSON (`Content-Type: application/json`) kecuali endpoint upload file (`multipart/form-data`) dan endpoint download (`application/octet-stream`)
**Versi dokumen:** 1.0

---

## 1. Konvensi Umum

### 1.1 Format Response Standar

Semua response sukses mengikuti struktur:

```json
{
  "success": true,
  "data": { ... },
  "meta": { "timestamp": "2026-07-27T10:00:00Z" }
}
```

Semua response error mengikuti struktur:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Field 'inputPrompt' wajib diisi",
    "details": null
  },
  "meta": { "timestamp": "2026-07-27T10:00:00Z" }
}
```

### 1.2 HTTP Status Code

| Code | Arti | Kapan Dipakai |
|---|---|---|
| `200 OK` | Sukses, data dikembalikan | GET berhasil, POST yang tidak membuat resource baru |
| `201 Created` | Resource baru berhasil dibuat | POST create project |
| `202 Accepted` | Request diterima, diproses async (job queue) | Trigger generate/render/assemble |
| `400 Bad Request` | Input tidak valid | Validasi gagal |
| `401 Unauthorized` | Token tidak ada/invalid | Semua endpoint terproteksi tanpa token valid |
| `403 Forbidden` | Token valid tapi tidak punya akses ke resource | Akses project milik user lain |
| `404 Not Found` | Resource tidak ditemukan | project_id tidak ada |
| `409 Conflict` | State tidak sesuai untuk aksi ini | Generate storyboard sebelum naskah selesai |
| `422 Unprocessable Entity` | Request valid secara format tapi gagal diproses AI | Gemini/Nemotron gagal parse JSON setelah retry |
| `429 Too Many Requests` | Rate limit terlampaui | Terlalu banyak request generate dalam waktu singkat |
| `500 Internal Server Error` | Error tak terduga di server | Kegagalan sistem umum |
| `503 Service Unavailable` | Dependency eksternal down | Gemini/Composio/Suno API down |

### 1.3 Kode Error Standar

| `error.code` | Keterangan |
|---|---|
| `VALIDATION_ERROR` | Body/parameter request tidak valid |
| `UNAUTHORIZED` | Token tidak ada atau expired |
| `FORBIDDEN` | Tidak punya akses ke resource |
| `NOT_FOUND` | Resource tidak ditemukan |
| `INVALID_STATE` | Project tidak dalam status yang tepat untuk aksi ini |
| `AI_GENERATION_FAILED` | Gemini/Nemotron gagal generate output valid setelah retry |
| `EXTERNAL_SERVICE_ERROR` | Suno/Composio/video-gen provider/YouTube API error |
| `RATE_LIMITED` | Melebihi batas request |

### 1.4 Penomoran Halaman (Pagination)

Endpoint list (`GET /projects`) memakai cursor-based pagination:

```
GET /projects?limit=20&cursor=eyJpZCI6IjEyMyJ9
```

Response menyertakan `meta.next_cursor` (nullable jika halaman terakhir).

### 1.5 Idempotency

Endpoint yang men-trigger job async (`generate-script`, `render-scenes`, `assemble-video`, dll) menerima header opsional `Idempotency-Key` untuk mencegah job duplikat jika request diulang karena timeout jaringan.

```
Idempotency-Key: 7c9e6679-7425-40de-944b-e07fc1f90ae7
```

---

## 2. Autentikasi

### 2.1 Metode

Semua endpoint (kecuali `GET /health`) membutuhkan **Bearer Token** (JWT) di header:

```
Authorization: Bearer <access_token>
```

Token didapat dari flow login/registrasi (di luar cakupan dokumen ini — asumsikan sistem auth standar email/password atau OAuth pihak ketiga).

### 2.2 Autentikasi Tambahan untuk Integrasi Eksternal

Beberapa endpoint membutuhkan koneksi OAuth terpisah **per user** ke layanan pihak ketiga (bukan API key aplikasi), dikelola lewat Composio:

| Layanan | Endpoint Connect | Dibutuhkan untuk |
|---|---|---|
| Google Drive | `GET /auth/google-drive/connect` | Upload video ke Drive |
| YouTube | `GET /auth/youtube/connect` | Upload/jadwal video ke channel user |

Jika endpoint yang butuh koneksi ini dipanggil sebelum user connect, response akan `403 Forbidden` dengan `error.code = "EXTERNAL_AUTH_REQUIRED"` dan `error.details.connect_url` berisi link untuk memulai flow OAuth.

### 2.3 Contoh Header Lengkap

```
POST /projects/proj_8f3a2c/generate-script HTTP/1.1
Host: api.legenda-aistudio.app
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Idempotency-Key: 7c9e6679-7425-40de-944b-e07fc1f90ae7
```

---

## 3. Endpoint — Projects

### 3.1 Create Project

Membuat project baru dari master prompt input.

**`POST /projects`**

**Auth:** Bearer token wajib

**Request Body:**
```json
{
  "ide": "Cerita rakyat yang diubah dengan latar masa kini",
  "gaya": "klasik_futuristik",
  "tokoh_utama": "Si Jampang",
  "asal_daerah": "Betawi",
  "latar": "masehi_2026",
  "plot": "plot berbeda dari versi aslinya, tetap mempertahankan nilai moral",
  "target_duration_seconds": 180
}
```

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `ide` | string | ya | Free-text ide cerita |
| `gaya` | enum | ya | `klasik` \| `saat_ini` \| `futuristik` \| `super_hero` |
| `tokoh_utama` | string | ya | Nama tokoh utama |
| `asal_daerah` | string | ya | Asal daerah cerita |
| `latar` | string | ya | `sebelum_masehi` atau `masehi_<tahun>` |
| `plot` | string | ya | Ringkasan plot/konflik |
| `target_duration_seconds` | integer | tidak | Default `180`, minimum `60` |

**Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "id": "proj_8f3a2c",
    "status": "draft",
    "ide": "Cerita rakyat yang diubah dengan latar masa kini",
    "gaya": "klasik_futuristik",
    "tokoh_utama": "Si Jampang",
    "asal_daerah": "Betawi",
    "latar": "masehi_2026",
    "plot": "plot berbeda dari versi aslinya, tetap mempertahankan nilai moral",
    "target_duration_seconds": 180,
    "created_at": "2026-07-27T10:00:00Z"
  },
  "meta": { "timestamp": "2026-07-27T10:00:00Z" }
}
```

### 3.2 Get Project Detail

**`GET /projects/:id`**

**Auth:** Bearer token wajib (harus pemilik project)

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": "proj_8f3a2c",
    "status": "storyboard_ready",
    "input_prompt": "Buatkan cerita ... tentang Si Jampang dari Betawi ...",
    "final_video_url": null,
    "drive_file_id": null,
    "created_at": "2026-07-27T10:00:00Z",
    "updated_at": "2026-07-27T10:14:22Z"
  },
  "meta": { "timestamp": "2026-07-27T10:14:22Z" }
}
```

### 3.3 List Projects

**`GET /projects?limit=20&cursor=<cursor>&status=<status>`**

**Auth:** Bearer token wajib

**Query Params:**

| Param | Tipe | Keterangan |
|---|---|---|
| `limit` | integer | Default `20`, max `100` |
| `cursor` | string | Cursor dari response sebelumnya |
| `status` | enum | Filter opsional: `draft`, `script_ready`, `assets_ready`, `storyboard_ready`, `rendering`, `assembling`, `done`, `failed` |

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    { "id": "proj_8f3a2c", "status": "storyboard_ready", "ide": "...", "created_at": "2026-07-27T10:00:00Z" },
    { "id": "proj_1a9b7d", "status": "done", "ide": "...", "created_at": "2026-07-25T08:30:00Z" }
  ],
  "meta": { "timestamp": "2026-07-27T10:14:22Z", "next_cursor": "eyJpZCI6InByb2pfMWE5YjdkIn0=" }
}
```

---

## 4. Endpoint — Story Engine

### 4.1 Generate Naskah

Memanggil Gemini untuk generate naskah lengkap dari master prompt project.

**`POST /projects/:id/generate-script`**

**Auth:** Bearer token wajib
**Precondition:** `project.status == "draft"`, kalau tidak → `409 Conflict` (`INVALID_STATE`)

**Request Body:** *(kosong — parameter diambil dari data project)*
```json
{}
```

**Response `202 Accepted`:**
```json
{
  "success": true,
  "data": {
    "job_id": "job_scr_4471",
    "status": "processing"
  },
  "meta": { "timestamp": "2026-07-27T10:01:00Z" }
}
```

**Response setelah selesai** — diambil lewat `GET /projects/:id` (status berubah jadi `script_ready`) atau `GET /projects/:id/script`:
```json
{
  "success": true,
  "data": {
    "title": "Anak Betawi dari Masa Depan",
    "premise": "Si Jampang hidup kembali di Jakarta 2026...",
    "plot": "Babak 1: ... Babak 2: ... Babak 3: ...",
    "conflict": "Konflik antara tradisi dan teknologi...",
    "tone": "klasik-futuristik",
    "setting": { "time_period": "2026", "locations": ["Jakarta", "Betawi Tempo Dulu"] },
    "characters": [
      { "name": "Si Jampang", "role": "protagonis", "persona_description": "...", "wardrobe_description": "..." }
    ],
    "key_items": [
      { "name": "Golok Betawi", "description": "...", "symbolic_meaning": "..." }
    ],
    "music_mood": "heroik-mistis dengan sentuhan synth futuristik",
    "narration_script": "Di tengah gemerlap kota Jakarta yang tak pernah tidur..."
  },
  "meta": { "timestamp": "2026-07-27T10:01:18Z" }
}
```

**Error Response contoh** (Gemini gagal generate JSON valid setelah 2x retry):
```json
{
  "success": false,
  "error": {
    "code": "AI_GENERATION_FAILED",
    "message": "Gagal menghasilkan naskah valid setelah 2 kali percobaan",
    "details": { "attempts": 2 }
  },
  "meta": { "timestamp": "2026-07-27T10:01:45Z" }
}
```

---

## 5. Endpoint — Asset Generation

### 5.1 Generate Character Assets

**`POST /projects/:id/generate-character-assets`**

**Auth:** Bearer token wajib
**Precondition:** `project.status == "script_ready"`

**Request Body:** *(kosong)*

**Response `202 Accepted`:**
```json
{ "success": true, "data": { "job_id": "job_char_9021", "status": "processing" }, "meta": { "timestamp": "2026-07-27T10:02:00Z" } }
```

**Hasil akhir** (`GET /projects/:id/characters`):
```json
{
  "success": true,
  "data": [
    {
      "id": "char_001",
      "name": "Si Jampang",
      "role": "protagonis",
      "persona_description": "Pendekar Betawi dengan aura tenang namun tegas...",
      "wardrobe_description": "Baju pangsi hitam modern dengan aksen metalik...",
      "image_prompt": "cinematic portrait of a Betawi warrior, black modern pangsi with metallic accents, warm gold lighting, classic-futuristic aesthetic, 16:9",
      "image_url": null
    }
  ],
  "meta": { "timestamp": "2026-07-27T10:02:35Z" }
}
```

### 5.2 Generate Item Assets

**`POST /projects/:id/generate-item-assets`** — struktur identik dengan 5.1, resource `items`.

### 5.3 Generate Background Assets

**`POST /projects/:id/generate-background-assets`** — struktur identik dengan 5.1, resource `backgrounds`.

---

## 6. Endpoint — Music & Voice Over

### 6.1 Generate Music Prompts

**`POST /projects/:id/generate-music-prompts`**

**Auth:** Bearer token wajib

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "lyric_song": {
      "suno_prompt_text": "epic Indonesian ballad, heroic orchestral pop, male vocal, tempo 90bpm, gamelan-fusion elements",
      "suno_lyrics": "Verse 1:\nDi bawah langit Jakarta yang berpendar\n...\nChorus:\n..."
    },
    "instrumental_backsound": {
      "suno_prompt_text": "cinematic orchestral instrumental, no vocals, building tension with traditional Betawi percussion fused with synth pads, dynamic build-up to climax"
    }
  },
  "meta": { "timestamp": "2026-07-27T10:05:00Z" }
}
```

### 6.2 Upload Hasil Audio Suno

**`POST /projects/:id/upload-music`**

**Auth:** Bearer token wajib
**Content-Type:** `multipart/form-data`

**Form Fields:**

| Field | Tipe | Keterangan |
|---|---|---|
| `type` | string | `lyric_song` atau `instrumental_backsound` |
| `file` | file | File audio (mp3/wav), max 20MB |

**Response `200 OK`:**
```json
{
  "success": true,
  "data": { "id": "music_002", "type": "instrumental_backsound", "generated_audio_url": "https://storage.legenda-aistudio.app/audio/music_002.mp3" },
  "meta": { "timestamp": "2026-07-27T10:07:12Z" }
}
```

---

## 7. Endpoint — Storyboard

### 7.1 Generate Storyboard

**`POST /projects/:id/generate-storyboard`**

**Auth:** Bearer token wajib
**Precondition:** `project.status == "assets_ready"`

**Response `202 Accepted`:**
```json
{ "success": true, "data": { "job_id": "job_sb_2210", "status": "processing" }, "meta": { "timestamp": "2026-07-27T10:08:00Z" } }
```

### 7.2 Get Storyboard

**`GET /projects/:id/storyboard`**

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "scene_01",
      "scene_number": 1,
      "start_time_seconds": 0,
      "duration_seconds": 10,
      "scene_description": "Si Jampang berdiri di atap gedung memandang kota Jakarta di malam hari",
      "camera_angle": "wide shot, low angle",
      "characters_in_scene": ["Si Jampang"],
      "video_prompt": "cinematic wide shot, Betawi warrior standing on rooftop overlooking Jakarta skyline at night, cape flowing in wind, classic-futuristic lighting, 10 seconds, slow push-in camera movement",
      "video_url": null,
      "status": "pending"
    }
  ],
  "meta": { "timestamp": "2026-07-27T10:08:45Z", "total_scenes": 18, "total_duration_seconds": 180 }
}
```

---

## 8. Endpoint — Video Rendering

### 8.1 Trigger Render Semua Scene

**`POST /projects/:id/render-scenes`**

**Auth:** Bearer token wajib
**Precondition:** `project.status == "storyboard_ready"`

**Response `202 Accepted`:**
```json
{ "success": true, "data": { "job_id": "job_render_5533", "status": "processing", "total_scenes": 18 }, "meta": { "timestamp": "2026-07-27T10:09:00Z" } }
```

### 8.2 Cek Status Render

**`GET /projects/:id/render-status`**

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "total_scenes": 18,
    "completed": 12,
    "failed": 0,
    "pending": 6,
    "percentage": 66.7
  },
  "meta": { "timestamp": "2026-07-27T10:15:30Z" }
}
```

---

## 9. Endpoint — Video Assembly

### 9.1 Trigger Assembly

**`POST /projects/:id/assemble-video`**

**Auth:** Bearer token wajib
**Precondition:** semua `storyboard_scenes.status == "done"`, kalau tidak → `409 Conflict`

**Response `202 Accepted`:**
```json
{ "success": true, "data": { "job_id": "job_asm_7719", "status": "processing", "stage": "downloading" }, "meta": { "timestamp": "2026-07-27T10:20:00Z" } }
```

`data.stage` akan berubah seiring progress: `downloading` → `concatenating` → `mixing_audio` → `padding` → `exporting` → `done`.

---

## 10. Endpoint — Delivery (Drive & Download)

### 10.1 Upload ke Google Drive

**`POST /projects/:id/upload-to-drive`**

**Auth:** Bearer token wajib + koneksi Google Drive aktif (lihat 2.2)
**Precondition:** `project.status == "done"` (video akhir sudah jadi)

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "google_drive_file_id": "1A2b3C4d5E6f7G8h9I0j",
    "google_drive_link": "https://drive.google.com/file/d/1A2b3C4d5E6f7G8h9I0j/view"
  },
  "meta": { "timestamp": "2026-07-27T10:31:00Z" }
}
```

**Error jika belum connect Drive** (`403 Forbidden`):
```json
{
  "success": false,
  "error": {
    "code": "EXTERNAL_AUTH_REQUIRED",
    "message": "Akun Google Drive belum terhubung",
    "details": { "connect_url": "https://api.legenda-aistudio.app/v1/auth/google-drive/connect" }
  },
  "meta": { "timestamp": "2026-07-27T10:31:00Z" }
}
```

### 10.2 Get Final Video Info

**`GET /projects/:id/final-video`**

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "video_url": "https://storage.legenda-aistudio.app/videos/proj_8f3a2c-final.mp4",
    "duration_seconds": 183,
    "google_drive_link": "https://drive.google.com/file/d/1A2b3C4d5E6f7G8h9I0j/view"
  },
  "meta": { "timestamp": "2026-07-27T10:31:10Z" }
}
```

### 10.3 Download Video

**`GET /projects/:id/download`**

**Response `200 OK`** — file stream dengan header:
```
Content-Type: video/mp4
Content-Disposition: attachment; filename="legenda-ai-studio-proj_8f3a2c.mp4"
```

---

## 11. Endpoint — YouTube Distribution

### 11.1 Connect Akun YouTube

**`GET /auth/youtube/connect`** — redirect ke OAuth flow Composio
**`GET /auth/youtube/callback`** — callback handler, redirect balik ke frontend setelah sukses

### 11.2 Jadwalkan Upload

**`POST /projects/:id/schedule-youtube-upload`**

**Auth:** Bearer token wajib + koneksi YouTube aktif
**Precondition:** `final_videos` untuk project ini harus sudah ada

**Request Body:**
```json
{
  "title": "Legenda Si Jampang: Kisah Betawi di Masa Depan",
  "description": "Reinterpretasi cerita rakyat Betawi dengan gaya klasik-futuristik...",
  "tags": ["cerita rakyat", "betawi", "ai video", "si jampang"],
  "privacy_status": "unlisted",
  "scheduled_at": "2026-08-01T09:00:00+07:00"
}
```

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `title` | string | ya | Max 100 karakter (batas YouTube) |
| `description` | string | ya | Max 5000 karakter |
| `tags` | string[] | tidak | Max 500 karakter total |
| `privacy_status` | enum | ya | `private` \| `unlisted` \| `public` |
| `scheduled_at` | ISO 8601 datetime | ya | Tidak boleh di masa lalu |

**Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "id": "yt_upload_331",
    "status": "scheduled",
    "scheduled_at": "2026-08-01T09:00:00+07:00"
  },
  "meta": { "timestamp": "2026-07-27T10:35:00Z" }
}
```

**Error validasi** (`400 Bad Request`):
```json
{
  "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "scheduled_at tidak boleh di masa lalu", "details": { "field": "scheduled_at" } },
  "meta": { "timestamp": "2026-07-27T10:35:00Z" }
}
```

### 11.3 Cek Status Upload YouTube

**`GET /projects/:id/youtube-status`**

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "status": "uploaded",
    "youtube_video_id": "dQw4w9WgXcQ",
    "youtube_link": "https://youtube.com/watch?v=dQw4w9WgXcQ"
  },
  "meta": { "timestamp": "2026-08-01T09:02:14Z" }
}
```

---

## 12. Rate Limits

| Kategori Endpoint | Limit |
|---|---|
| Generate (script/assets/music/storyboard) | 10 request/menit per user |
| Render & assembly trigger | 5 request/menit per user |
| Read endpoints (GET) | 60 request/menit per user |
| Upload file | 20 request/jam per user |

Response saat rate limit terlampaui (`429 Too Many Requests`):
```json
{
  "success": false,
  "error": { "code": "RATE_LIMITED", "message": "Terlalu banyak request, coba lagi dalam 45 detik", "details": { "retry_after_seconds": 45 } },
  "meta": { "timestamp": "2026-07-27T10:40:00Z" }
}
```

---

## 13. Status Lifecycle Project

```
draft → script_ready → assets_ready → storyboard_ready → rendering → assembling → done
                                                                              ↘ failed
```

Setiap transisi status hanya bisa terjadi lewat endpoint generate/render/assemble yang sesuai secara berurutan. Memanggil endpoint di luar urutan (mis. `generate-storyboard` sebelum `script_ready`) akan mengembalikan `409 Conflict` dengan `error.code = "INVALID_STATE"`.
