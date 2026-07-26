# Legenda AI Studio

**AI Agent untuk mengubah 1 ide cerita menjadi video sinematik lengkap** — naskah, karakter, storyboard, musik, voice over, hingga video akhir siap tonton.

> Contoh input: *"Buatkan cerita rakyat Si Jampang dari Betawi, digubah dengan gaya klasik-futuristik, latar masa kini, plot berbeda dari versi aslinya."*

---

## 1. Pemahaman Use Case & Problem Fit

### Masalah
Creator konten cerita (folklore retelling, digital storytelling, konten edukasi budaya) menghadapi bottleneck yang sama tiap kali mau produksi: ide bagus di kepala, tapi proses mengubahnya jadi naskah lengkap → desain karakter → storyboard → musik → video jadi memakan waktu berhari-hari dan butuh banyak skill berbeda (penulis, ilustrator, sound designer, video editor). Akibatnya banyak ide cerita — termasuk cerita rakyat lokal yang berharga secara budaya — tidak pernah selesai diproduksi.

Ini **problem-first**, bukan fitur-first: kami tidak mulai dari "AI bisa generate gambar/video, jadi kita bungkus jadi produk," tapi dari observasi bahwa *jarak antara ide dan hasil jadi* terlalu panjang untuk creator individu atau tim kecil.

### Target User
- Content creator independen yang bikin konten storytelling/edukasi budaya untuk YouTube/media sosial
- Digital agency kecil yang butuh produksi cepat untuk klien (mis. konten campaign berbasis cerita)
- Pelaku UMKM kreatif yang ingin bikin konten branded storytelling tanpa tim produksi besar

### Scope Solusi (didefinisikan jelas)
**Termasuk dalam scope:**
- Input: 1 prompt ide cerita bebas (bahasa Indonesia)
- Output: naskah terstruktur, aset visual (prompt karakter/item/background), storyboard per-scene, prompt musik, dan video akhir tergabung dengan audio

**Di luar scope (versi saat ini):**
- Bukan alat edit video manual (tidak ada timeline editor manual)
- Bukan generator musik penuh otomatis (Suno dipakai semi-manual: agent generate prompt, user generate audio di Suno, upload balik)
- Bukan platform distribusi konten (upload ke YouTube/Drive ada di roadmap, belum di versi demo)

---

## 2. Arsitektur & Layering Prompt

Prinsip desain: **setiap tahap pipeline adalah 1 agent/prompt dengan layer terpisah**, bukan 1 prompt raksasa yang disuruh "generate semuanya sekaligus". Ini penting karena tiap layer punya tanggung jawab dan failure mode yang berbeda — kalau digabung jadi 1 prompt monolitik, sulit di-debug dan hasilnya tidak konsisten.

### Struktur Layer per Agent

Setiap agent dalam pipeline (Story Engine, Asset Generator, Storyboard Generator, dst) dibangun dari 5 layer berikut:

```
┌─────────────────────────────────────────┐
│ 1. PERSONA LAYER                         │  → siapa agent ini, keahlian & sudut pandangnya
├─────────────────────────────────────────┤
│ 2. INSTRUCTION LAYER                     │  → tugas spesifik, format output, batasan
├─────────────────────────────────────────┤
│ 3. FEW-SHOT LAYER                        │  → 1-2 contoh input-output untuk kalibrasi gaya
├─────────────────────────────────────────┤
│ 4. GUARDRAIL LAYER                       │  → aturan keras: apa yang TIDAK boleh dilakukan
├─────────────────────────────────────────┤
│ 5. CHAINING LAYER                        │  → bagaimana output ini jadi input agent berikutnya
└─────────────────────────────────────────┘
```

### Contoh Konkret: Agent "Story Engine" (Naskah Generator)

**Persona Layer:**
```
Kamu adalah script doctor profesional yang mengkhususkan diri pada
reinterpretasi cerita rakyat Nusantara dengan sudut pandang modern,
tanpa menghilangkan nilai budaya aslinya.
```

**Instruction Layer:**
```
Tugas: ubah ide cerita user menjadi naskah lengkap dalam format JSON
dengan struktur: title, premise, plot, conflict, tone, setting,
characters[], key_items[], music_mood, narration_script.
Panjang narration_script harus proporsional dengan target_duration_seconds
yang diberikan (asumsi ±2.5 kata per detik untuk voice over bahasa Indonesia).
```

**Few-shot Layer:**
```
Contoh input: "Malin Kundang tapi settingnya di kota metropolitan modern"
Contoh output (dipotong): { "title": "Anak yang Lupa Jalan Pulang",
"tone": "drama-urban-kontemplatif", "conflict": "kesuksesan karier vs
akar keluarga", ... }
→ Perhatikan: tone & conflict diadaptasi ke konteks modern TANPA
mengubah pesan moral inti cerita asli.
```

**Guardrail Layer:**
```
- JANGAN mengubah nilai moral/pesan inti cerita rakyat asli menjadi
  sesuatu yang bertentangan (mis. mengglorifikasi perilaku yang
  aslinya jadi pelajaran moral negatif)
- JANGAN menyertakan nama tokoh publik nyata sebagai karakter
- JANGAN keluarkan teks lain selain JSON valid
- Jika ide cerita mengandung unsur SARA/kekerasan eksplisit, tolak
  dengan pesan error terstruktur, jangan tetap diproses
```

**Chaining Layer:**
```
Output JSON dari agent ini menjadi input untuk 3 agent berikutnya:
- characters[] → Asset Generator (persona & wardrobe)
- plot + conflict + setting → Storyboard Generator
- music_mood → Music Prompt Generator
Pastikan field names konsisten karena akan di-parse otomatis oleh
agent berikutnya (tidak ada normalisasi manual di antara agent).
```

### Bukti Iterasi: Versi Awal vs Final

| Aspek | Versi Awal (v1) | Versi Final (v3) | Alasan Perubahan |
|---|---|---|---|
| Instruction Layer | "Buatkan cerita berdasarkan ide user" (1 kalimat, tanpa struktur output) | JSON schema eksplisit dengan 8 field wajib | v1 menghasilkan output format bebas yang sulit di-parse otomatis untuk chaining ke agent berikutnya → wajib distrukturkan |
| Guardrail Layer | Belum ada guardrail eksplisit soal nilai moral cerita rakyat | Ditambahkan aturan eksplisit larangan mengubah pesan moral inti | Uji coba awal dengan "Bawang Merah Bawang Putih" gaya futuristik menghasilkan versi yang membalik moral cerita (tokoh antagonis jadi "benar") tanpa disadari — perlu guardrail eksplisit |
| Few-shot Layer | Tidak ada contoh sama sekali | 1 contoh lengkap input-output ditambahkan | Tanpa contoh, tone hasil naskah tidak konsisten (kadang terlalu formal seperti laporan, kadang terlalu santai seperti caption medsos) |
| Chaining Layer | Field JSON dari agent 1 tidak selalu cocok dengan yang diharapkan agent 2 (mis. "actors" vs "characters") | Field name distandarkan lintas semua agent + didokumentasikan di layer chaining | Kegagalan chaining otomatis terjadi berkali-kali saat testing end-to-end sebelum field name distandarkan |

### Agent Kedua: "Asset Consistency Checker" (Layer Guardrail sebagai Agent Terpisah)

Ini bagian yang membedakan arsitektur kami dari pendekatan konvensional: setelah Story Engine menghasilkan daftar karakter, **bukan langsung dipakai**, tapi melewati agent kedua yang tugasnya khusus cross-check konsistensi visual (semua karakter, item, dan background dalam 1 project harus punya "visual style anchor" yang sama — misalnya "cinematic classic-futuristic Betawi aesthetic, warm gold and deep blue palette"). Agent ini murni guardrail/quality-control layer, dipisah dari agent kreatif supaya proses generate ide tidak "terkontaminasi" oleh proses validasi.

---

## 3. Kualitas & Konsistensi Output

- **Akurasi & relevansi:** setiap output di-parse sebagai JSON terstruktur (bukan free text) sehingga bisa divalidasi otomatis terhadap schema sebelum masuk ke tahap berikutnya — jika field wajib hilang, sistem retry otomatis (maksimal 2x) sebelum menandai gagal.
- **Konsistensi format:** seluruh agent memakai instruction layer yang mewajibkan output JSON valid tanpa teks tambahan, diuji pada berbagai skenario input (cerita rakyat, cerita original, cerita dengan setting campuran budaya).
- **Robust pada edge case:** input ambigu (misal ide cerita hanya 3 kata) ditangani dengan agent yang diberi instruksi eksplisit untuk "meminta elaborasi" lewat field `clarification_needed` alih-alih memaksa generate naskah dari informasi minim.
- **Hallucination terkontrol:** guardrail layer melarang agent mengarang detail sejarah/budaya yang diklaim faktual (misal asal-usul cerita rakyat) — agent diinstruksikan menandai bagian yang merupakan reinterpretasi kreatif vs bagian yang mengacu ke versi cerita rakyat umum.
- **Tone sesuai persona:** setiap agent punya persona layer yang berbeda dan diuji agar tidak "bocor" — misal Story Engine (persona: script doctor naratif) tidak menghasilkan output bergaya teknis seperti Asset Generator (persona: art director).

---

## 4. Fungsionalitas & Reliabilitas (Demo)

### Alur End-to-End
```
Input Prompt Ide Cerita
    │
    ▼
[Agent 1: Story Engine] → naskah lengkap (JSON)
    │
    ▼
[Agent 2: Asset Consistency Checker] → persona, wardrobe, item, background (prompt siap pakai)
    │
    ▼
[Agent 3: Storyboard Generator] → scene per 10 detik dengan video prompt
    │
    ▼
[Integrasi eksternal: video-gen API] → render tiap scene
    │
    ▼
[Assembly Service] → gabung video + voice over + backsound
    │
    ▼
Video Akhir (preview + download)
```

- **Response time:** tiap agent (Gemini/Nemotron call) di-desain untuk selesai dalam hitungan detik; tahap yang memakan waktu lama (video rendering) dijalankan sebagai background job (queue), bukan blocking request, dengan progress bar live di frontend.
- **Error handling graceful:** setiap kegagalan panggilan API eksternal (Gemini, video-gen provider) tidak membuat seluruh pipeline gagal — tahap yang error ditandai statusnya di database, user bisa retry tahap tersebut saja tanpa mengulang dari awal.
- **Integrasi tools/API eksternal:** Gemini AI (text generation), NVIDIA Nemotron (consistency reasoning), Suno (music, semi-manual), video-gen provider (via Composio connector).

---

## 5. Kreativitas & Inovasi Solusi

- **Wow factor dibanding template konvensional:** kebanyakan tool "story-to-video" yang ada di pasaran hanya text-to-video 1 langkah (1 prompt → 1 klip pendek). Legenda AI Studio membangun **pipeline multi-agent dengan layer konsistensi eksplisit**, sehingga karakter yang sama tetap terlihat "sama" di scene 1 dan scene 10 — masalah yang paling sering gagal di tool sejenis.
- **Nilai tambah terukur:** proses yang manual (naskah + storyboard + asset brief) biasanya makan waktu 1-2 hari kerja bagi tim kreatif kecil; dengan pipeline ini, dari ide ke storyboard siap render bisa selesai dalam hitungan menit — efisiensi waktu produksi pra-produksi diperkirakan >90%.
- **Personalisasi:** setiap output disesuaikan dengan tone/gaya yang diminta user di prompt awal (mis. "klasik-futuristik"), bukan template gaya visual yang fixed.

---

## 6. Dokumentasi & Presentasi

### Alur Demo (Problem → Design → Hasil)
1. **Problem:** tunjukkan gap antara ide cerita dan hasil produksi jadi (storytelling lambat & butuh banyak skill)
2. **Design:** jelaskan arsitektur layering prompt (persona/instruction/few-shot/guardrail/chaining) dan kenapa dipisah per agent, bukan 1 prompt monolitik
3. **Hasil:** demo live input prompt → naskah → aset → storyboard → video akhir

### Refleksi & Lesson Learned
- Prompt monolitik ("generate semuanya sekaligus") awalnya terlihat lebih sederhana untuk dibangun, tapi hasilnya jauh lebih tidak konsisten dan sulit di-debug dibanding memecahnya jadi agent-agent kecil dengan tanggung jawab jelas.
- Guardrail soal nilai budaya/moral cerita rakyat baru terlihat perlu **setelah** melihat hasil uji coba yang salah arah — pelajarannya: guardrail sensitif budaya tidak bisa diasumsikan "AI pasti paham konteks", harus dieksplisitkan.
- Chaining antar agent gagal berkali-kali di awal karena field JSON tidak distandarkan — pelajaran: desain contract data antar-agent harus dilakukan di awal, bukan menyusul setelah tiap agent selesai dibuat sendiri-sendiri.

---

## 7. Responsible AI Awareness

- **Sensitivitas budaya:** karena use case utama adalah reinterpretasi cerita rakyat, guardrail layer secara eksplisit melarang perubahan yang membalikkan pesan moral asli atau merendahkan unsur budaya sumber — ini ditempatkan di layer guardrail Story Engine, bukan sebagai post-filter setelah generate.
- **Potensi penyalahgunaan:** sistem menolak untuk memproses ide cerita yang mengandung SARA eksplisit atau kekerasan grafis, dengan pesan error terstruktur (bukan silent fail atau dipaksa diproses dengan sensor kasar).
- **Privasi & IP:** guardrail melarang penggunaan nama tokoh publik nyata sebagai karakter dalam cerita yang digenerate, untuk menghindari isu representasi/pencemaran nama baik.
- **Transparansi ke user:** hasil naskah membedakan secara eksplisit mana bagian yang merupakan referensi ke cerita rakyat umum vs reinterpretasi kreatif AI, supaya user (dan penonton akhir) tidak salah kira konten AI sebagai fakta sejarah/budaya yang akurat.
- **Konteks sensitif lain:** karena aplikasi ini tidak masuk ranah medis/finansial, tidak ada guardrail khusus di area tersebut — namun prinsip yang sama (guardrail eksplisit di layer prompt, bukan diasumsikan implisit) dirancang agar mudah direplikasi ke domain sensitif lain di masa depan.

---

## Tech Stack
IBM BOB IDE, Gemini AI, NVIDIA Nemotron, Suno, Composio API, PostgreSQL, React + Vite + TypeScript, Docker, GitHub
