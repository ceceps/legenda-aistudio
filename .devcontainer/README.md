# Legenda AI Studio — GitHub Codespaces

## Quick Start

1. Buka repo di GitHub → **Code** → **Codespaces** → **New codespace on main**
2. Tunggu setup otomatis selesai (~3–5 menit pertama kali)
3. Isi API keys di `.env`:
   ```
   GEMINI_API_KEY=...
   NEMOTRON_API_KEY=...
   SUNO_API_KEY=...
   COMPOSIO_API_KEY=...
   GOOGLE_DRIVE_FOLDER_ID=...
   GOOGLE_SERVICE_ACCOUNT_JSON=...
   ```
4. Jalankan migrasi database:
   ```bash
   pnpm db:migrate
   ```
5. Start development server:
   ```bash
   pnpm dev
   ```
   - **Web** → port `5173` (auto-open di browser)
   - **API** → port `3001`

## Yang Otomatis Di-setup

| Step | Aksi |
|------|------|
| Node 22 | Via devcontainer feature |
| pnpm 9.15 | Install global di `postCreate.sh` |
| turbo | Install global di `postCreate.sh` |
| ffmpeg | `apt-get install ffmpeg` |
| PostgreSQL 16 | Docker Compose service (port 5432) |
| Redis 7 | Docker Compose service (port 6379) |
| `pnpm install` | Semua workspace dependencies |
| `.env` | Copy dari `.env.example` + patch URL database/redis |
| Prisma generate | `pnpm db:generate` |
| VS Code extensions | ESLint, Prettier, Prisma, Tailwind, Docker, SQLTools, GitLens |

## Ports yang Di-forward

| Port | Service |
|------|---------|
| 5173 | Vite Dev Server (Web) |
| 3001 | Express API |
| 5432 | PostgreSQL |
| 6379 | Redis |

## Codespace Secrets (Opsional)

Agar API keys tidak perlu diisi manual setiap buat Codespace baru,
simpan di **GitHub → Settings → Codespaces → Secrets**:

```
GEMINI_API_KEY
NEMOTRON_API_KEY
SUNO_API_KEY
COMPOSIO_API_KEY
GOOGLE_DRIVE_FOLDER_ID
GOOGLE_SERVICE_ACCOUNT_JSON
```

Secrets tersebut otomatis tersedia sebagai environment variable di Codespace.
