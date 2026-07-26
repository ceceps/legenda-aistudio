#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# postCreate.sh — runs once after Codespace container is created
# ──────────────────────────────────────────────────────────────────────────────
set -e

cd /workspaces/legenda-aistudio

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   Legenda AI Studio — Codespace Setup            ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── 1. Install pnpm ───────────────────────────────────────────────────────────
echo "▶ [1/6] Installing pnpm..."
npm install -g pnpm@9.15.0 --silent
echo "  pnpm $(pnpm --version) ✓"

# ── 2. Install turbo globally ─────────────────────────────────────────────────
echo "▶ [2/6] Installing turbo..."
npm install -g turbo --silent
echo "  turbo $(turbo --version) ✓"

# ── 3. Install ffmpeg ─────────────────────────────────────────────────────────
echo "▶ [3/6] Installing ffmpeg..."
sudo apt-get update -qq && sudo apt-get install -y -qq ffmpeg > /dev/null 2>&1
echo "  ffmpeg $(ffmpeg -version 2>&1 | head -1 | awk '{print $3}') ✓"

# ── 4. Install project dependencies ──────────────────────────────────────────
echo "▶ [4/6] Installing project dependencies (pnpm install)..."
pnpm install

# ── 5. Setup .env ─────────────────────────────────────────────────────────────
echo "▶ [5/6] Setting up .env..."
if [ ! -f .env ]; then
  cp .env.example .env
  # Override with Codespaces-ready values (connect to docker compose services)
  sed -i 's|DATABASE_URL=.*|DATABASE_URL=postgresql://legendauser:legendapass@localhost:5432/legenda_db|' .env
  sed -i 's|REDIS_URL=.*|REDIS_URL=redis://localhost:6379|' .env
  sed -i 's|FRONTEND_URL=.*|FRONTEND_URL=http://localhost:5173|' .env
  echo "  .env created from .env.example ✓"
else
  echo "  .env already exists, skipping ✓"
fi

# ── 6. Generate Prisma client ─────────────────────────────────────────────────
echo "▶ [6/6] Generating Prisma client..."
pnpm db:generate
echo "  Prisma client generated ✓"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   ✅ Setup complete!                             ║"
echo "║                                                  ║"
echo "║   Next steps:                                    ║"
echo "║   1. Fill in API keys in .env                    ║"
echo "║   2. pnpm db:migrate  (run DB migrations)        ║"
echo "║   3. pnpm dev         (start web + api)          ║"
echo "║                                                  ║"
echo "║   Ports:                                         ║"
echo "║   • Web  → http://localhost:5173                 ║"
echo "║   • API  → http://localhost:3001                 ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
