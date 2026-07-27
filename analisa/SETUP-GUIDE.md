# Legenda AI Studio - Complete Setup Guide

**Last Updated:** 2026-07-27  
**Purpose:** Step-by-step guide to set up the development environment

---

## Prerequisites

- Node.js 22+
- pnpm 9.15.0+
- PostgreSQL 16+
- Redis 7+
- Podman or Docker (for containerized deployment)

---

## Step 1: Clone and Install Dependencies

```bash
cd /home/ceceps/projects/legenda-aistudio
pnpm install
```

---

## Step 2: Configure Environment Variables

### Create .env file

```bash
cp .env.example .env
```

### Edit .env with your credentials

```bash
nano .env  # or use your preferred editor
```

### Required Variables

```bash
# ── AI API Keys (Get from respective providers) ──
GEMINI_API_KEY=your_actual_gemini_key
NEMOTRON_API_KEY=your_actual_nemotron_key
SUNO_API_KEY=your_actual_suno_key
COMPOSIO_API_KEY=your_actual_composio_key

# ── Database (Local PostgreSQL) ──
DATABASE_URL=postgresql://legendauser:legendapass@localhost:5432/legenda_db

# ── Redis (Local Redis) ──
REDIS_URL=redis://localhost:6379

# ── Google Services (Choose ONE option) ──
# Option A: Using Composio (Recommended)
COMPOSIO_ENTITY_ID=default
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id

# Option B: Using Direct Google Cloud
# GOOGLE_SERVICE_ACCOUNT_JSON=./service-account.json
# GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id

# ── App Config ──
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
```

---

## Step 3: Set Up Local Database

### Option A: Using Podman/Docker (Recommended)

```bash
# Start PostgreSQL and Redis containers
podman-compose -f ./infra/docker-compose.yml up -d postgres redis

# Wait for containers to be healthy (about 10 seconds)
sleep 10

# Verify containers are running
podman ps
```

### Option B: Using Local PostgreSQL

```bash
# Install PostgreSQL (if not installed)
sudo apt install postgresql postgresql-contrib  # Ubuntu/Debian
# or
brew install postgresql@16  # macOS

# Start PostgreSQL service
sudo systemctl start postgresql  # Linux
# or
brew services start postgresql@16  # macOS

# Create database and user
sudo -u postgres psql
```

In PostgreSQL shell:
```sql
CREATE USER legendauser WITH PASSWORD 'legendapass';
CREATE DATABASE legenda_db OWNER legendauser;
GRANT ALL PRIVILEGES ON DATABASE legenda_db TO legendauser;
\q
```

---

## Step 4: Set Up Redis

### Option A: Using Podman/Docker (Already done in Step 3)

### Option B: Using Local Redis

```bash
# Install Redis
sudo apt install redis-server  # Ubuntu/Debian
# or
brew install redis  # macOS

# Start Redis service
sudo systemctl start redis  # Linux
# or
brew services start redis  # macOS

# Verify Redis is running
redis-cli ping  # Should return "PONG"
```

---

## Step 5: Initialize Database Schema

```bash
# Generate Prisma Client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# (Optional) Seed database with sample data
pnpm --filter=@legenda/api seed
```

**Expected Output:**
```
✔ Generated Prisma Client to ./src/generated/prisma
✔ Applied 1 migration(s)
Database schema is up to date!
```

---

## Step 6: Build Packages

```bash
# Build shared types
pnpm --filter=@legenda/shared-types build

# Build API
pnpm --filter=@legenda/api build

# Build Web
pnpm --filter=@legenda/web build
```

---

## Step 7: Start Development Servers

### Terminal 1: API Server
```bash
pnpm --filter=@legenda/api dev
```

**Expected Output:**
```
✅ API server running on http://localhost:3001
✅ Workers registered: story, asset, audio, storyboard, video, assemble
```

### Terminal 2: Web Server
```bash
pnpm --filter=@legenda/web dev
```

**Expected Output:**
```
VITE v6.4.3  ready in 1234 ms
➜  Local:   http://localhost:5173/
```

---

## Step 8: Verify Installation

### Check API Health
```bash
curl http://localhost:3001/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-07-27T06:41:00.000Z"
}
```

### Check Google Services
```bash
curl http://localhost:3001/api/health/google
```

**Expected Response (with Composio):**
```json
{
  "status": "ok",
  "mode": "composio",
  "services": {
    "drive": true,
    "tts": true
  },
  "details": "Composio connected: GOOGLEDRIVE, GOOGLE_TTS"
}
```

### Open Web Interface
```bash
# Open in browser
xdg-open http://localhost:5173  # Linux
# or
open http://localhost:5173  # macOS
```

---

## Troubleshooting

### Issue: "Environment variable not found: DATABASE_URL"

**Solution:**
```bash
# Ensure .env file exists in project root
ls -la .env

# If missing, create from example
cp .env.example .env

# Edit with your values
nano .env
```

### Issue: "Connection refused" to PostgreSQL

**Solution:**
```bash
# Check if PostgreSQL is running
podman ps | grep postgres
# or
sudo systemctl status postgresql

# Check connection
psql -h localhost -U legendauser -d legenda_db
# Password: legendapass
```

### Issue: "Connection refused" to Redis

**Solution:**
```bash
# Check if Redis is running
podman ps | grep redis
# or
sudo systemctl status redis

# Test connection
redis-cli ping
```

### Issue: Prisma migration fails

**Solution:**
```bash
# Reset database (WARNING: Deletes all data)
pnpm --filter=@legenda/api db:reset-and-seed

# Or manually drop and recreate
psql -h localhost -U legendauser -d postgres
DROP DATABASE legenda_db;
CREATE DATABASE legenda_db OWNER legendauser;
\q

# Then run migrations again
pnpm db:migrate
```

### Issue: "Port already in use"

**Solution:**
```bash
# Find process using port 3001
lsof -i :3001
# or
netstat -tulpn | grep 3001

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=3002
```

---

## Production Deployment with Docker

### Step 1: Configure Production Environment

```bash
# Create production .env
cp .env.example .env.production

# Edit with production values
nano .env.production
```

### Step 2: Update docker-compose.yml

Edit `infra/docker-compose.yml` to use your production environment variables.

### Step 3: Build and Deploy

```bash
# Stop any running containers
podman-compose -f ./infra/docker-compose.yml down

# Build and start all services
podman-compose -f ./infra/docker-compose.yml up -d --build

# Check logs
podman logs -f infra_api_1
podman logs -f infra_web_1
```

### Step 4: Run Migrations in Container

```bash
# Execute migration inside API container
podman exec -it infra_api_1 sh -c "cd /app/apps/api && npx prisma migrate deploy"
```

### Step 5: Verify Deployment

```bash
# Check all containers are running
podman ps

# Test API
curl http://localhost:3001/api/health

# Test Web
curl http://localhost:5173
```

---

## API Keys Setup Guide

### 1. Gemini API Key
1. Go to https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy to `GEMINI_API_KEY` in .env

### 2. NVIDIA Nemotron API Key
1. Go to https://build.nvidia.com/
2. Sign up and get API key
3. Copy to `NEMOTRON_API_KEY` in .env

### 3. Suno API Key
1. Go to https://suno.ai/
2. Sign up for API access
3. Copy to `SUNO_API_KEY` in .env

### 4. Composio API Key
1. Go to https://app.composio.dev
2. Sign up and navigate to Settings → API Keys
3. Copy to `COMPOSIO_API_KEY` in .env
4. Connect Google account in Integrations section

### 5. Google Drive Folder ID
1. Create a folder in Google Drive
2. Open the folder
3. Copy ID from URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`
4. Paste to `GOOGLE_DRIVE_FOLDER_ID` in .env

---

## Development Workflow

### Daily Development

```bash
# Start services
pnpm dev

# In separate terminals:
# Terminal 1: API
pnpm --filter=@legenda/api dev

# Terminal 2: Web
pnpm --filter=@legenda/web dev

# Terminal 3: Database Studio (optional)
pnpm db:studio
```

### Making Database Changes

```bash
# 1. Edit schema
nano apps/api/prisma/schema.prisma

# 2. Create migration
pnpm db:migrate

# 3. Regenerate client
pnpm db:generate
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm --filter=@legenda/api test
```

### Code Quality

```bash
# Lint all packages
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

---

## Next Steps

1. ✅ Complete environment setup
2. ✅ Verify all services are running
3. 📝 Read `PHASE-2-ANALYSIS.md` for project status
4. 📝 Read `API-ROUTES-DOCUMENTATION.md` for API reference
5. 📝 Read `COMPOSIO-GOOGLE-SETUP.md` for Google integration
6. 🚀 Start building Phase 2 features!

---

## Support

- **Documentation:** See `*.md` files in project root
- **Issues:** Check troubleshooting section above
- **API Reference:** `API-ROUTES-DOCUMENTATION.md`
- **Phase 2 Status:** `PHASE-2-ANALYSIS.md`

---

**Setup complete! Happy coding! 🚀**
