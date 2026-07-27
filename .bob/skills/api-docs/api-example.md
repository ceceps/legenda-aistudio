# API Endpoint Example — Contoh Penerapan Template

> File ini adalah **contoh terisi** dari `api-template.md`, mengikuti seluruh konvensi yang didefinisikan di `api-style-guide.md` (format response, kode error, status HTTP, rate limit, dsb). Dipakai sebagai referensi saat mendokumentasikan endpoint baru — salin struktur di bawah, bukan isinya.
>
> Dua contoh dipilih supaya mewakili 2 pola paling umum di API ini:
> 1. **POST dengan job async + precondition + body request** — `Generate Naskah`
> 2. **GET sederhana tanpa body** — `Get Storyboard`

---

# Contoh 1: Generate Naskah

Memicu Story Engine (Gemini) untuk menghasilkan naskah cerita lengkap dari master prompt yang sudah tersimpan di project. Ini adalah entry point pipeline setelah project dibuat — hasilnya jadi dasar untuk seluruh tahap berikutnya (asset generation, storyboard, dst).

**`POST /projects/:id/generate-script`**

### Auth
- [x] Bearer token wajib
- [ ] Bearer token + koneksi eksternal aktif

### Precondition
`project.status == "draft"`

Jika precondition tidak terpenuhi → `409 Conflict` dengan `error.code = "INVALID_STATE"`.

### Request

**Headers**

| Header | Wajib | Keterangan |
|---|---|---|
| `Idempotency-Key` | tidak | Disarankan dipakai — mencegah 2 job naskah dibuat kalau request diulang karena timeout jaringan |

**Path Params**

| Param | Tipe | Keterangan |
|---|---|---|
| `id` | string | ID project (mis. `proj_8f3a2c`) |

**Body Schema**

Tidak ada — seluruh parameter (`ide`, `gaya`, `tokoh_utama`, `asal_daerah`, `latar`, `plot`, `target_duration_seconds`) sudah tersimpan di project saat `POST /projects` dipanggil sebelumnya.

```json
{}
```

### Response

**`202 Accepted`**

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

| Field response | Tipe | Keterangan |
|---|---|---|
| `data.job_id` | string | ID job untuk tracking (opsional, bisa dipoll lewat log job internal) |
| `data.status` | string | Selalu `"processing"` saat request diterima |

Hasil akhir naskah **tidak** dikembalikan langsung di response ini (karena diproses async). Poll lewat `GET /projects/:id` — perhatikan `data.status` berubah jadi `"script_ready"` saat selesai — lalu ambil detail naskah lewat `GET /projects/:id/script`.

### Error Responses

| Status | `error.code` | Kapan Terjadi |
|---|---|---|
| `404` | `NOT_FOUND` | `project_id` tidak ditemukan atau bukan milik user ini |
| `409` | `INVALID_STATE` | Project sudah pernah generate naskah (`status != "draft"`) |
| `422` | `AI_GENERATION_FAILED` | Gemini gagal menghasilkan JSON valid setelah 2x retry |
| `503` | `EXTERNAL_SERVICE_ERROR` | Gemini API sedang down/unreachable |

**Contoh error — project sudah pernah generate naskah:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_STATE",
    "message": "Project ini sudah memiliki naskah. Buat project baru untuk generate ulang.",
    "details": { "current_status": "script_ready" }
  },
  "meta": { "timestamp": "2026-07-27T10:01:00Z" }
}
```

**Contoh error — Gemini gagal generate JSON valid:**
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

### Rate Limit
Kategori "Generate (script/assets/music/storyboard)": **10 request/menit per user**

### Catatan Tambahan
- Endpoint ini men-trigger job async di BullMQ — response `202` dikirim segera setelah job masuk antrean, bukan setelah Gemini selesai memproses
- Jika sukses, hasil naskah otomatis disimpan ke tabel `scripts`, `characters`, `items`, `voiceover_scripts`, dan `project.status` berubah jadi `script_ready`
- Endpoint ini **mengubah `project.status`** — sudah tercatat di tabel status lifecycle `api-style-guide.md` Bagian 13 (`draft → script_ready`)

---

# Contoh 2: Get Storyboard

Mengambil seluruh scene storyboard yang sudah digenerate untuk sebuah project, ditampilkan sebagai timeline di frontend (`StoryboardPage`).

**`GET /projects/:id/storyboard`**

### Auth
- [x] Bearer token wajib

### Precondition
Tidak ada — endpoint ini bisa dipanggil kapan saja setelah project dibuat. Kalau storyboard belum digenerate, `data` dikembalikan sebagai array kosong (bukan error).

### Request

**Path Params**

| Param | Tipe | Keterangan |
|---|---|---|
| `id` | string | ID project |

**Query Params**

Tidak ada.

**Body Schema**

Tidak ada — endpoint `GET`.

### Response

**`200 OK`**

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

| Field response | Tipe | Keterangan |
|---|---|---|
| `data[].id` | string | ID scene |
| `data[].scene_number` | integer | Urutan scene, mulai dari 1 |
| `data[].status` | enum | `pending` \| `generating` \| `done` \| `failed` |
| `data[].video_url` | string \| null | `null` sampai video scene selesai dirender (lihat `POST /projects/:id/render-scenes`) |
| `meta.total_scenes` | integer | Total jumlah scene di storyboard ini |
| `meta.total_duration_seconds` | integer | Estimasi total durasi (jumlah scene × 10 detik) |

### Error Responses

| Status | `error.code` | Kapan Terjadi |
|---|---|---|
| `404` | `NOT_FOUND` | `project_id` tidak ditemukan atau bukan milik user ini |

**Contoh error:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Project tidak ditemukan",
    "details": null
  },
  "meta": { "timestamp": "2026-07-27T10:08:45Z" }
}
```

### Rate Limit
Kategori "Read endpoints (GET)": **60 request/menit per user**

### Catatan Tambahan
- Endpoint ini aman untuk dipoll secara berkala oleh frontend (mis. tiap 3-5 detik) selama `storyboard_scenes` masih berstatus `generating`, untuk menampilkan progress render per-scene secara live
- Endpoint ini **tidak** mengubah `project.status` — murni read-only

---

## Ringkasan Pola yang Didemonstrasikan

| Aspek | Contoh 1 (POST async) | Contoh 2 (GET sederhana) |
|---|---|---|
| Status code sukses | `202 Accepted` (job async) | `200 OK` (data langsung) |
| Precondition | Ada (`status == "draft"`) | Tidak ada |
| Body request | Kosong (`{}`) | Tidak ada (GET) |
| Mengubah `project.status`? | Ya — wajib dicatat di Bagian 13 style guide | Tidak |
| Idempotency-Key relevan? | Ya, disarankan | Tidak relevan (GET selalu idempotent) |
| Rate limit kategori | Generate (10/menit) | Read (60/menit) |

Gunakan tabel ini sebagai panduan cepat: sebelum mengisi `api-template.md` untuk endpoint baru, tentukan dulu endpoint ini lebih mirip pola mana, lalu sesuaikan bagian mana yang perlu diisi lengkap vs boleh ditulis "Tidak ada".
