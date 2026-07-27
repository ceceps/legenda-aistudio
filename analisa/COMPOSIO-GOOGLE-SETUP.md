# Composio Google Integration Setup Guide

**Last Updated:** 2026-07-27  
**Purpose:** Use Composio as a proxy for Google Drive and Text-to-Speech instead of direct Google Cloud credentials

---

## Why Use Composio for Google Services?

### Benefits:
- ✅ **No service account JSON file needed** - Composio handles authentication
- ✅ **Easier setup** - Connect via OAuth in Composio dashboard
- ✅ **Unified API management** - All external APIs in one place
- ✅ **Better security** - No credential files to manage
- ✅ **Automatic token refresh** - Composio handles OAuth token lifecycle

### What You Need:
1. Composio API Key
2. Google account with Drive and TTS access
3. Composio Entity ID (optional, defaults to "default")

---

## Setup Steps

### Step 1: Get Composio API Key

1. Go to https://app.composio.dev
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Copy your API key

### Step 2: Connect Google Account to Composio

#### Option A: Via Composio Dashboard (Recommended)

1. Go to https://app.composio.dev/integrations
2. Search for "Google Drive"
3. Click "Connect"
4. Authorize with your Google account
5. Grant permissions for:
   - Google Drive (file upload, read, write)
   - Google Cloud Text-to-Speech (if available)

#### Option B: Via API

```bash
# Get authorization URL
curl -X POST https://api.composio.dev/api/v1/connectedAccounts \
  -H "x-api-key: YOUR_COMPOSIO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "integrationId": "googledrive",
    "entityId": "default"
  }'

# Follow the returned redirectUrl to authorize
```

### Step 3: Configure Environment Variables

Update your `.env` or `docker-compose.yml`:

```bash
# Required
COMPOSIO_API_KEY=your_composio_api_key_here

# Optional (defaults to "default")
COMPOSIO_ENTITY_ID=default

# Optional: Google Drive folder ID for uploads
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
```

### Step 4: Remove Old Service Account File

```bash
# Remove the directory (if it exists)
rm -rf /home/ceceps/projects/legenda-aistudio/service-account.json

# No need to create a new file - Composio handles authentication!
```

### Step 5: Verify Connection

```bash
# Start your API server
cd /home/ceceps/projects/legenda-aistudio
pnpm --filter=@legenda/api dev

# Check health endpoint
curl http://localhost:3001/api/health/google
```

Expected response:
```json
{
  "mode": "composio",
  "drive": true,
  "tts": true,
  "details": "Composio connected: GOOGLEDRIVE, GOOGLE_TTS"
}
```

---

## How It Works

### Architecture

```
┌─────────────────┐
│  Legenda API    │
│   (Your App)    │
└────────┬────────┘
         │
         │ Uses unified service
         ▼
┌─────────────────────────────────┐
│  google-unified.ts              │
│  (Auto-detects best method)     │
└────────┬────────────────────────┘
         │
         ├─── Has service-account.json? ──► Direct Google Cloud API
         │
         └─── Has Composio API key? ──────► Composio Proxy
                                              │
                                              ▼
                                        ┌──────────────┐
                                        │   Composio   │
                                        │   Platform   │
                                        └──────┬───────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │   Google     │
                                        │   Services   │
                                        └──────────────┘
```

### Service Detection Priority

1. **Direct Google Cloud** (if `GOOGLE_SERVICE_ACCOUNT_JSON` exists)
2. **Composio Proxy** (if `COMPOSIO_API_KEY` exists)
3. **Error** (if neither is configured)

---

## API Usage

### Upload File to Drive

```typescript
import { uploadFileToDrive } from './services/google-unified.js';

// Works with both direct and Composio methods
const result = await uploadFileToDrive(
  '/tmp/my-video.mp4',
  'final-video.mp4',
  'video/mp4'
);

console.log('File uploaded:', result.shareLink);
```

### Generate Voice Over

```typescript
import { synthesizeVoiceOver } from './services/google-unified.js';

// Works with both direct and Composio methods
const audioPath = await synthesizeVoiceOver(
  'Ini adalah narasi cerita legenda',
  '/tmp/voice-over.mp3',
  'id-ID'
);

console.log('Audio generated:', audioPath);
```

### Check Service Health

```typescript
import { checkGoogleServicesHealth } from './services/google-unified.js';

const health = await checkGoogleServicesHealth();
console.log('Mode:', health.mode); // 'direct' | 'composio' | 'none'
console.log('Drive available:', health.drive);
console.log('TTS available:', health.tts);
```

---

## Composio Actions Used

### Google Drive Actions

| Action | Purpose | Endpoint |
|--------|---------|----------|
| `GOOGLEDRIVE_CREATE_FILE` | Upload files | `/api/v1/actions/GOOGLEDRIVE_CREATE_FILE/execute` |
| `GOOGLEDRIVE_CREATE_PERMISSION` | Make files public | `/api/v1/actions/GOOGLEDRIVE_CREATE_PERMISSION/execute` |

### Google TTS Actions

| Action | Purpose | Endpoint |
|--------|---------|----------|
| `GOOGLE_TTS_SYNTHESIZE` | Generate speech | `/api/v1/actions/GOOGLE_TTS_SYNTHESIZE/execute` |

---

## Environment Variables Reference

```bash
# ── Composio Configuration ────────────────────────────────────────────────────
COMPOSIO_API_KEY=comp_xxxxxxxxxxxxx          # Required for Composio mode
COMPOSIO_ENTITY_ID=default                    # Optional, defaults to "default"

# ── Google Drive (Optional) ───────────────────────────────────────────────────
GOOGLE_DRIVE_FOLDER_ID=1abc123def456          # Optional: Target folder for uploads

# ── Direct Google Cloud (Alternative) ─────────────────────────────────────────
GOOGLE_SERVICE_ACCOUNT_JSON=/path/to/key.json # Only if NOT using Composio
```

---

## Troubleshooting

### Issue: "No Google services configured"

**Cause:** Neither Composio nor direct credentials are set up.

**Solution:**
```bash
# Check environment variables
echo $COMPOSIO_API_KEY
echo $GOOGLE_SERVICE_ACCOUNT_JSON

# At least one should be set
```

### Issue: "Composio connection failed"

**Cause:** Google account not connected in Composio.

**Solution:**
1. Go to https://app.composio.dev/integrations
2. Check if Google Drive is connected
3. Reconnect if needed
4. Verify entity ID matches `COMPOSIO_ENTITY_ID`

### Issue: "Permission denied" when uploading

**Cause:** Insufficient Google Drive permissions.

**Solution:**
1. Reconnect Google account in Composio
2. Grant all requested permissions
3. Ensure Drive API is enabled in Google Cloud Console

### Issue: "TTS not available via Composio"

**Cause:** Google TTS integration not yet available in Composio.

**Solution:**
- Use direct Google Cloud credentials for TTS
- Or wait for Composio to add TTS support
- System will automatically fall back to direct method if available

---

## Migration from Direct Credentials

If you're currently using `service-account.json`:

### Step 1: Keep Both During Transition
```bash
# Keep service-account.json temporarily
# Add Composio credentials
COMPOSIO_API_KEY=your_key
```

### Step 2: Test Composio
```bash
# Temporarily rename service account to force Composio mode
mv service-account.json service-account.json.backup

# Test your application
pnpm --filter=@legenda/api dev
```

### Step 3: Remove Old Credentials
```bash
# Once confirmed working, remove backup
rm service-account.json.backup
```

---

## Cost Comparison

### Direct Google Cloud
- **Drive:** Free (15GB), then $1.99/month per 100GB
- **TTS:** $4 per 1M characters (Standard), $16 per 1M (WaveNet)

### Via Composio
- **Composio:** Free tier available, then usage-based
- **Google costs:** Same as above (passed through)
- **Benefit:** Unified billing, easier management

---

## Security Best Practices

### ✅ Do:
- Use environment variables for API keys
- Rotate Composio API keys regularly
- Use separate entity IDs for dev/staging/prod
- Monitor Composio usage dashboard

### ❌ Don't:
- Commit API keys to version control
- Share entity IDs across projects
- Use production keys in development
- Expose Composio API key in frontend

---

## Advanced: Multiple Google Accounts

If you need to use different Google accounts for different projects:

```typescript
// Use custom entity ID per project
const result = await uploadFileToDriveViaComposio(
  fileContent,
  'file.mp4',
  'video/mp4',
  folderId,
  'project-123' // Custom entity ID
);
```

Configure in Composio:
1. Create multiple entities in dashboard
2. Connect different Google accounts to each
3. Pass entity ID in API calls

---

## Support & Resources

- **Composio Docs:** https://docs.composio.dev/docs/providers/google
- **Composio Dashboard:** https://app.composio.dev
- **Google Drive API:** https://developers.google.com/drive
- **Google TTS API:** https://cloud.google.com/text-to-speech

---

## Summary

✅ **Easier Setup:** No JSON files, just OAuth  
✅ **Better Security:** Composio manages tokens  
✅ **Unified Management:** All APIs in one place  
✅ **Automatic Fallback:** Works with direct credentials too  

**Next Steps:**
1. Get Composio API key
2. Connect Google account
3. Set environment variables
4. Remove service-account.json
5. Test and deploy!

---

**Documentation maintained by:** Development Team  
**Last tested:** 2026-07-27
