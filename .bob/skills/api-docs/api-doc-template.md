# API Endpoint Template

> Salin file/template ini setiap kali menambah endpoint baru ke Legenda AI Studio API, supaya format dokumentasi konsisten dengan `api-style-guide.md`. Hapus komentar `> ...` sebelum publish.

---

## [Nama Endpoint]

> Contoh: "Generate Naskah", "Get Storyboard", "Schedule YouTube Upload"

[Deskripsi singkat 1-2 kalimat: apa yang dilakukan endpoint ini dan kapan dipanggil dalam alur pipeline]

**`[METHOD] /[path/:param]`**

> Contoh: `POST /projects/:id/generate-script`

### Auth
- [ ] Tidak butuh autentikasi (publik)
- [ ] Bearer token wajib
- [ ] Bearer token + koneksi eksternal aktif: [sebutkan layanan, mis. Google Drive / YouTube]

### Precondition
[Kondisi status/state yang harus terpenuhi sebelum endpoint ini bisa dipanggil, kalau ada. Contoh: `project.status == "script_ready"`. Kalau tidak ada precondition, tulis "Tidak ada".]

Jika precondition tidak terpenuhi → `409 Conflict` dengan `error.code = "INVALID_STATE"`.

### Request

**Headers** *(tambahkan hanya yang relevan di luar `Authorization` dan `Content-Type` standar)*

| Header | Wajib | Keterangan |
|---|---|---|
| `Idempotency-Key` | tidak | UUID untuk mencegah job duplikat (untuk endpoint yang trigger job async) |

**Path Params**

| Param | Tipe | Keterangan |
|---|---|---|
| `id` | string | ID project |

**Query Params** *(hapus section ini kalau tidak ada)*

| Param | Tipe | Wajib | Default | Keterangan |
|---|---|---|---|---|
| `limit` | integer | tidak | `20` | ... |

**Body Schema** *(hapus section ini untuk endpoint GET tanpa body)*

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `field_name` | string | ya | ... |

```json
{
  "field_name": "contoh nilai"
}
```

### Response

**`[status code] [nama status]`**

```json
{
  "success": true,
  "data": {
    
  },
  "meta": { "timestamp": "2026-07-27T10:00:00Z" }
}
```

| Field response | Tipe | Keterangan |
|---|---|---|
| `data.field_name` | string | ... |

### Error Responses

| Status | `error.code` | Kapan Terjadi |
|---|---|---|
| `400` | `VALIDATION_ERROR` | ... |
| `404` | `NOT_FOUND` | ... |
| `409` | `INVALID_STATE` | ... |

**Contoh error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "[pesan error dalam Bahasa Indonesia, jelas dan actionable]",
    "details": null
  },
  "meta": { "timestamp": "2026-07-27T10:00:00Z" }
}
```

### Rate Limit
[Sebutkan kategori dari tabel Bagian 12 `api-style-guide.md` yang berlaku, mis. "Generate endpoints: 10 request/menit per user"]

### Catatan Tambahan
[Opsional — hal khusus yang perlu diketahui developer: efek samping, job async yang di-trigger, field yang di-deprecate, dsb]

---

## Checklist Sebelum Merge Dokumentasi Endpoint Baru

- [ ] Method + path sudah sesuai konvensi REST (`/resource/:id/sub-resource`, huruf kecil, kebab-case untuk multi-word)
- [ ] Semua field request/response didokumentasikan dengan tipe data yang benar
- [ ] Precondition status project dicantumkan jika relevan
- [ ] Minimal 1 contoh error response yang paling mungkin terjadi
- [ ] Response envelope mengikuti format standar (`success`, `data`/`error`, `meta.timestamp`)
- [ ] Endpoint sudah ditambahkan ke tabel status lifecycle di `api-style-guide.md` Bagian 13, jika endpoint ini mengubah `project.status`
- [ ] Rate limit kategori sudah ditentukan
