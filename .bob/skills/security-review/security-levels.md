# Severity Levels — Security Code Review Classification

**Digunakan oleh:** skill `security-review` — panduan klasifikasi tingkat keparahan (severity) untuk temuan hasil review kode berbasis keamanan.

---

## 1. Tujuan

Dokumen ini mendefinisikan 4 tingkat severity (**Critical, High, Medium, Low**) yang dipakai untuk mengklasifikasikan setiap temuan dari security code review, supaya penilaian konsisten antar reviewer dan antar sesi review, tidak bergantung pada penilaian subjektif masing-masing orang.

Setiap temuan diklasifikasikan berdasarkan kombinasi 2 faktor:

- **Impact** — seberapa parah dampaknya jika vulnerability ini dieksploitasi (kebocoran data, pengambilalihan sistem, dsb)
- **Exploitability** — seberapa mudah vulnerability ini dieksploitasi (butuh akses khusus? butuh interaksi user? bisa dieksploitasi dari luar tanpa autentikasi?)

---

## 2. Matriks Klasifikasi

| Impact \ Exploitability | Mudah (tanpa auth, remote, otomatis) | Sedang (butuh auth/interaksi user) | Sulit (butuh akses lokal/kondisi spesifik) |
|---|---|---|---|
| **Parah** (kompromi penuh sistem/data, RCE, akses data seluruh user) | 🔴 **Critical** | 🔴 **Critical** | 🟠 **High** |
| **Signifikan** (akses data 1 user lain, bypass otorisasi parsial) | 🔴 **Critical** | 🟠 **High** | 🟡 **Medium** |
| **Sedang** (kebocoran informasi terbatas, DoS parsial) | 🟠 **High** | 🟡 **Medium** | 🟢 **Low** |
| **Minor** (informasi non-sensitif, best-practice violation) | 🟡 **Medium** | 🟢 **Low** | 🟢 **Low** |

---

## 3. Definisi Tiap Level

### 🔴 Critical

**Definisi:** Vulnerability yang bisa dieksploitasi untuk mengambil alih sistem, mengakses/memodifikasi/menghapus data seluruh user, atau bypass autentikasi/otorisasi sepenuhnya — **tanpa** memerlukan akses istimewa.

**Kriteria:**
- Bisa dieksploitasi remote, tanpa autentikasi, atau dengan autentikasi level terendah
- Dampak mencakup lebih dari 1 user/tenant (bukan cuma data milik penyerang sendiri)
- Tidak ada mitigasi lain di lapisan sistem yang menghalangi eksploitasi

**Contoh konkret:**
- SQL injection pada endpoint publik yang memungkinkan dump seluruh tabel `users` (termasuk password hash)
- Broken authentication yang memungkinkan bypass login tanpa kredensial valid
- Remote Code Execution (RCE) lewat input yang tidak divalidasi (mis. `eval()` terhadap input user)
- API key/secret production ter-hardcode di repo publik

**SLA respons:** perbaikan wajib sebelum deploy ke production; jika sudah live, hotfix darurat dalam hitungan jam.

---

### 🟠 High

**Definisi:** Vulnerability yang berdampak signifikan tapi butuh kondisi tambahan untuk dieksploitasi (autentikasi level user biasa, interaksi user tertentu, atau kondisi konfigurasi spesifik), atau dampaknya besar tapi terbatas pada 1 user/resource.

**Kriteria:**
- Butuh autentikasi (walau cuma level user biasa) atau social engineering ringan
- Bisa membocorkan/memodifikasi data milik user lain (bukan seluruh sistem)
- Bisa dipakai sebagai batu loncatan menuju exploit Critical (chaining)

**Contoh konkret:**
- Insecure Direct Object Reference (IDOR) — user A bisa akses `/projects/:id` milik user B hanya dengan mengganti ID di URL, tanpa cek kepemilikan
- Stored XSS yang dieksekusi ke user lain saat membuka halaman tertentu
- JWT tanpa validasi signature yang benar (mis. accept algorithm `none`)
- Sensitive data exposure: response API mengembalikan field seperti `password_hash` atau API key pihak ketiga yang seharusnya tidak dikirim ke client

**SLA respons:** perbaikan sebelum rilis berikutnya; prioritas tinggi di sprint saat ini.

---

### 🟡 Medium

**Definisi:** Vulnerability dengan dampak terbatas atau butuh kondisi eksploitasi yang cukup spesifik/sulit, atau merupakan pelanggaran best practice yang meningkatkan risiko tapi belum langsung dieksploitasi.

**Kriteria:**
- Dampak terbatas pada informasi non-kritis, atau butuh kombinasi beberapa langkah untuk dieksploitasi
- Reflected XSS yang butuh user mengklik link tertentu (bukan stored/otomatis)
- Missing rate limiting pada endpoint yang tidak langsung sensitif tapi bisa disalahgunakan (mis. brute-force lambat)

**Contoh konkret:**
- Reflected XSS di parameter query yang butuh user mengklik link crafted
- Error message yang menampilkan stack trace/detail internal (informasi untuk reconnaissance, bukan langsung eksploitasi)
- Missing security header (`Content-Security-Policy`, `X-Frame-Options`)
- Session token tidak di-invalidate setelah logout
- Rate limiting tidak ada pada endpoint non-kritis (bukan login/reset password)

**SLA respons:** dijadwalkan diperbaiki dalam 1-2 sprint ke depan.

---

### 🟢 Low

**Definisi:** Deviasi dari best practice keamanan yang risikonya minim dalam konteks saat ini, atau butuh akses lokal/kondisi yang sangat tidak realistis untuk dieksploitasi.

**Kriteria:**
- Tidak ada jalur eksploitasi langsung yang teridentifikasi
- Bersifat pencegahan (defense-in-depth) atau kepatuhan terhadap standar, bukan mitigasi terhadap ancaman aktif

**Contoh konkret:**
- Versi dependency yang outdated tapi belum ada CVE yang relevan dengan cara pakai di kode ini
- Logging yang mencatat informasi sedikit berlebihan tapi tidak sensitif (mis. mencatat `user_id` di log request biasa)
- Komentar kode berisi TODO terkait keamanan tanpa risiko langsung
- Tidak ada `helmet`/security header default di server Express (defense-in-depth, bukan celah aktif)

**SLA respons:** backlog, diperbaiki saat ada kapasitas atau sekalian saat refactor terkait.

---

## 4. Panduan Klasifikasi per Kategori Vulnerability

### 4.1 SQL Injection
| Kondisi | Severity |
|---|---|
| Raw query dengan string concatenation dari input user, endpoint publik tanpa auth | Critical |
| Raw query dengan input user tapi endpoint butuh auth level admin | High |
| ORM/query builder dipakai tapi ada 1 raw query tanpa parameterized binding di path yang jarang dilalui | Medium |
| Parameterized query benar tapi ada inconsistency minor di validasi tipe input | Low |

> Catatan khusus project ini: karena stack pakai **Prisma ORM**, SQL injection klasik seharusnya sudah dimitigasi oleh parameterized query bawaan Prisma — cek khusus di titik mana pun yang memakai `$queryRawUnsafe` atau raw SQL manual di service seperti `storyEngine.service.ts`, `videoAssembly.service.ts`.

### 4.2 XSS (Cross-Site Scripting)
| Kondisi | Severity |
|---|---|
| Stored XSS di field yang ditampilkan ke semua user (mis. `scene_description` ditampilkan tanpa sanitasi di halaman publik) | High-Critical (tergantung jangkauan) |
| Reflected XSS di parameter yang butuh interaksi klik user | Medium |
| DOM-based XSS di komponen frontend yang render `dangerouslySetInnerHTML` tanpa sanitasi | High |
| Output encoding kurang konsisten tapi framework (React) sudah auto-escape by default | Low |

### 4.3 Authentication/Authorization
| Kondisi | Severity |
|---|---|
| Endpoint tanpa middleware auth yang seharusnya terproteksi (mis. `/projects/:id/download` bisa diakses tanpa token) | Critical |
| IDOR — akses resource milik user lain tanpa cek kepemilikan (`project.user_id !== req.user.id`) | High |
| Token JWT tidak diverifikasi expiry-nya dengan benar | High |
| Role-based access control ada tapi granularitasnya kurang detail untuk 1 endpoint minor | Medium |

### 4.4 Sensitive Data Exposure
| Kondisi | Severity |
|---|---|
| API key eksternal (`GEMINI_API_KEY`, `COMPOSIO_API_KEY`, dll) ter-hardcode di kode/commit ke repo | Critical |
| Response API mengembalikan field sensitif yang tidak perlu dikirim ke client | High |
| Log aplikasi mencatat isi penuh request body yang berisi data pribadi | Medium |
| `.env.example` berisi placeholder yang terlihat seperti key asli (bukan key asli, tapi format membingungkan) | Low |

### 4.5 Input Validation
| Kondisi | Severity |
|---|---|
| Tidak ada validasi sama sekali pada body request yang diteruskan langsung ke query/command eksternal | High-Critical |
| Validasi ada tapi tidak lengkap (mis. cek tipe tapi tidak cek panjang/format) | Medium |
| Validasi sudah baik tapi pesan error terlalu detail mengekspos struktur internal | Low |

### 4.6 Output Encoding
| Kondisi | Severity |
|---|---|
| Output ke HTML tanpa escaping pada konteks yang render langsung ke browser | High |
| Output ke JSON API — umumnya risiko rendah karena JSON di-escape otomatis, kecuali dikonsumsi ulang sebagai HTML di client | Medium-Low |

### 4.7 Secure Configuration
| Kondisi | Severity |
|---|---|
| CORS diset `*` (allow semua origin) pada endpoint yang butuh auth/cookie | High |
| Environment production memakai konfigurasi debug/development (stack trace terbuka, dsb) | High |
| Docker image berjalan sebagai `root` tanpa alasan kuat | Medium |
| Dependency versi lama tanpa CVE aktif yang relevan | Low |

### 4.8 Error Handling
| Kondisi | Severity |
|---|---|
| Error handler mengembalikan stack trace lengkap ke client di production | Medium |
| Error message membocorkan informasi struktur database/internal (mis. nama tabel, versi software) | Medium |
| Try-catch generik yang menelan error tanpa logging (bukan risiko keamanan langsung, tapi menghambat deteksi insiden) | Low |
| Error handling yang gagal rollback transaksi database (bisa menyebabkan data korup, bukan celah keamanan langsung) | Medium (dampak integritas data) |

---

## 5. Referensi Standar

Setiap temuan sebaiknya dikaitkan ke standar berikut saat relevan, bukan hanya diberi severity secara subjektif:

| Standar | Kegunaan |
|---|---|
| **OWASP Top 10** (2021 atau versi terbaru) | Kategori risiko web app paling umum, referensi utama untuk klasifikasi awal |
| **CWE (Common Weakness Enumeration)** | ID spesifik jenis kelemahan kode, mis. `CWE-89` (SQL Injection), `CWE-79` (XSS), `CWE-798` (Hardcoded Credentials) |
| **CVSS (Common Vulnerability Scoring System)** | Skor numerik 0.0-10.0 untuk vulnerability yang butuh presisi lebih (opsional, dipakai untuk kasus kompleks/ambigu) |
| **OWASP ASVS (Application Security Verification Standard)** | Checklist verifikasi lebih detail untuk review mendalam |

**Pemetaan CVSS ke level severity dokumen ini** (jika tim memilih menghitung skor CVSS untuk temuan tertentu):

| Skor CVSS | Level |
|---|---|
| 9.0 - 10.0 | Critical |
| 7.0 - 8.9 | High |
| 4.0 - 6.9 | Medium |
| 0.1 - 3.9 | Low |

---

## 6. Format Pelaporan Temuan

Setiap temuan dari security review harus dilaporkan dengan format berikut (sesuai step 3 skill `security-review`):

```markdown
### [Severity] — [Judul Singkat Temuan]

**Severity:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low
**Lokasi:** `path/to/file.ts:baris`
**Kategori:** SQL Injection | XSS | Auth/Authz | Sensitive Data Exposure | Input Validation | Output Encoding | Secure Config | Error Handling
**Referensi:** OWASP [kategori] · CWE-[nomor]

**Deskripsi:**
[Penjelasan singkat apa masalahnya dan kenapa berbahaya]

**Rekomendasi Fix:**
[Langkah konkret perbaikan, sertakan contoh kode kalau perlu]
```

**Contoh terisi:**

```markdown
### High — IDOR pada endpoint download video

**Severity:** 🟠 High
**Lokasi:** `apps/api/src/routes/projects.ts:142`
**Kategori:** Auth/Authz
**Referensi:** OWASP A01:2021 (Broken Access Control) · CWE-639

**Deskripsi:**
Endpoint `GET /projects/:id/download` mengambil `project_id` dari path parameter tanpa memverifikasi bahwa project tersebut milik user yang sedang login (`req.user.id`). User mana pun yang tahu/menebak `project_id` valid bisa mendownload video milik user lain.

**Rekomendasi Fix:**
Tambahkan pengecekan kepemilikan sebelum stream file:
\`\`\`typescript
const project = await db.project.findUnique({ where: { id: projectId } });
if (project.user_id !== req.user.id) {
  return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Tidak punya akses ke project ini' } });
}
\`\`\`
```

---

## 7. Prinsip Pengambilan Keputusan Saat Ambigu

- Kalau ragu antara 2 level, **pilih yang lebih tinggi** sampai ada informasi tambahan yang memastikan level lebih rendah aman dipakai (fail-safe, bukan fail-permissive)
- Severity dinilai berdasarkan **kondisi kode saat ini**, bukan asumsi mitigasi di lapisan lain yang belum diverifikasi (mis. jangan turunkan severity SQL injection hanya karena "biasanya ada WAF di depan" tanpa konfirmasi WAF benar-benar aktif dan mengcover kasus ini)
- Untuk aplikasi yang menangani integrasi API key pihak ketiga dan job async (seperti Legenda AI Studio dengan Gemini/Composio/Suno/YouTube), perlakukan kebocoran API key sebagai **Critical** secara default — API key yang bocor bisa dipakai pihak lain untuk membebankan biaya/menyalahgunakan kuota atas nama akun project
