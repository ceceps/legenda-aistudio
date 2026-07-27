# API Routes Documentation - Asset & Audio Management

**Last Updated:** 2026-07-27  
**Version:** 1.0.0

---

## Overview

This document describes the newly implemented API endpoints for managing assets and audio in the Legenda AI Studio Phase 2 pipeline.

---

## Asset Management Endpoints

### Base Path: `/api/projects/:id/assets`

#### 1. List All Assets
**GET** `/api/projects/:id/assets`

Lists all assets for a specific project.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "projectId": "uuid",
      "type": "CHARACTER" | "ITEM" | "BACKGROUND",
      "name": "string",
      "description": "string",
      "imagePrompt": "string",
      "imageUrl": "string | null",
      "status": "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

---

#### 2. Get Single Asset
**GET** `/api/projects/:id/assets/:assetId`

Retrieves details of a specific asset.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "projectId": "uuid",
    "type": "CHARACTER",
    "name": "Si Jampang",
    "description": "Main character description",
    "imagePrompt": "Detailed image generation prompt...",
    "imageUrl": "https://drive.google.com/...",
    "status": "COMPLETED",
    "createdAt": "2026-07-27T04:00:00Z",
    "updatedAt": "2026-07-27T04:15:00Z"
  }
}
```

---

#### 3. Regenerate Single Asset
**POST** `/api/projects/:id/assets/:assetId/regenerate`

Regenerates the image for a specific asset. Useful for failed assets or when user wants a different result.

**Process:**
1. Marks asset as `PROCESSING`
2. Calls Composio image generation API
3. Updates asset with new image URL
4. Sets status to `COMPLETED` or `FAILED`

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "assetId": "uuid",
    "imageUrl": "https://drive.google.com/...",
    "status": "COMPLETED"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Failed to regenerate asset: API rate limit exceeded"
}
```

---

#### 4. Batch Regenerate Assets
**POST** `/api/projects/:id/assets/batch-regenerate`

Regenerates multiple assets in parallel. Useful for bulk retry of failed assets.

**Request Body:**
```json
{
  "assetIds": ["uuid1", "uuid2", "uuid3"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 3,
      "successful": 2,
      "failed": 1
    },
    "results": [
      {
        "status": "fulfilled",
        "value": {
          "id": "uuid1",
          "status": "success",
          "imageUrl": "https://..."
        }
      },
      {
        "status": "fulfilled",
        "value": {
          "id": "uuid2",
          "status": "failed",
          "error": "API timeout"
        }
      }
    ]
  }
}
```

---

#### 5. Delete Asset
**DELETE** `/api/projects/:id/assets/:assetId`

Deletes a specific asset from the project.

**Response:**
```json
{
  "success": true,
  "message": "Asset deleted successfully"
}
```

---

## Audio Management Endpoints

### Base Path: `/api/projects/:id/audio`

#### 1. List All Audio Assets
**GET** `/api/projects/:id/audio`

Lists all audio assets for a specific project.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "projectId": "uuid",
      "type": "SOUNDTRACK" | "BACKSOUND" | "VOICE_OVER",
      "sunoPrompt": "string",
      "sunoJobId": "string | null",
      "audioUrl": "string | null",
      "lyrics": "string | null",
      "mood": "string | null",
      "genre": "string | null",
      "status": "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

---

#### 2. Get Single Audio Asset
**GET** `/api/projects/:id/audio/:audioId`

Retrieves details of a specific audio asset.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "projectId": "uuid",
    "type": "SOUNDTRACK",
    "sunoPrompt": "Epic cinematic orchestral music...",
    "sunoJobId": "suno_job_123",
    "audioUrl": "https://cdn.suno.ai/...",
    "lyrics": "Verse 1: ...",
    "mood": "epic",
    "genre": "cinematic",
    "status": "COMPLETED",
    "createdAt": "2026-07-27T04:00:00Z",
    "updatedAt": "2026-07-27T04:15:00Z"
  }
}
```

---

#### 3. Regenerate Single Audio Asset
**POST** `/api/projects/:id/audio/:audioId/regenerate`

Regenerates audio for a specific asset. Handles three types:
- **VOICE_OVER**: Uses Google TTS, uploads to Drive
- **SOUNDTRACK**: Uses Suno API with lyrics
- **BACKSOUND**: Uses Suno API instrumental only

**Process:**
1. Marks audio as `PROCESSING`
2. Generates audio based on type:
   - Voice Over: TTS → Drive upload
   - Soundtrack/Backsound: Suno API → Poll for completion
3. Updates audio with new URL
4. Sets status to `COMPLETED` or `FAILED`

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "audioId": "uuid",
    "audioUrl": "https://cdn.suno.ai/...",
    "status": "COMPLETED"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Failed to regenerate audio: Suno job timeout"
}
```

---

#### 4. Batch Regenerate Audio Assets
**POST** `/api/projects/:id/audio/batch-regenerate`

Regenerates multiple audio assets in parallel.

**Request Body:**
```json
{
  "audioIds": ["uuid1", "uuid2", "uuid3"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 3,
      "successful": 3,
      "failed": 0
    },
    "results": [
      {
        "status": "fulfilled",
        "value": {
          "id": "uuid1",
          "status": "success",
          "audioUrl": "https://..."
        }
      }
    ]
  }
}
```

---

#### 5. Delete Audio Asset
**DELETE** `/api/projects/:id/audio/:audioId`

Deletes a specific audio asset from the project.

**Response:**
```json
{
  "success": true,
  "message": "Audio asset deleted successfully"
}
```

---

## Error Handling

All endpoints follow consistent error response format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET/POST/DELETE |
| 400 | Bad Request | Invalid request body or parameters |
| 404 | Not Found | Asset/Audio/Project not found |
| 500 | Internal Server Error | API failures, generation errors |

---

## Integration Notes

### Asset Generation Flow
1. Asset worker creates asset records with prompts
2. Frontend can trigger regeneration via `/regenerate` endpoint
3. Composio API generates images
4. Images stored with URLs in database
5. Frontend displays images from URLs

### Audio Generation Flow
1. Audio worker creates audio asset records
2. Frontend can trigger regeneration via `/regenerate` endpoint
3. For Voice Over: TTS → Drive upload
4. For Music: Suno API → Poll → Store URL
5. Frontend plays audio from URLs

### Batch Operations
- Use batch endpoints for bulk retry of failed jobs
- Parallel processing with `Promise.allSettled()`
- Individual error handling per asset
- Summary statistics in response

---

## Usage Examples

### Example 1: Regenerate Failed Assets

```typescript
// Get all failed assets
const { data: assets } = await fetch('/api/projects/proj-123/assets');
const failedIds = assets
  .filter(a => a.status === 'FAILED')
  .map(a => a.id);

// Batch regenerate
const response = await fetch('/api/projects/proj-123/assets/batch-regenerate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ assetIds: failedIds })
});

const result = await response.json();
console.log(`Regenerated ${result.data.summary.successful} assets`);
```

### Example 2: Regenerate Single Audio

```typescript
// Regenerate a specific soundtrack
const response = await fetch('/api/projects/proj-123/audio/audio-456/regenerate', {
  method: 'POST'
});

const result = await response.json();
if (result.success) {
  console.log('New audio URL:', result.data.audioUrl);
}
```

### Example 3: Delete and Recreate Asset

```typescript
// Delete old asset
await fetch('/api/projects/proj-123/assets/asset-789', {
  method: 'DELETE'
});

// Create new asset (via worker or manual endpoint)
// Then regenerate
await fetch('/api/projects/proj-123/assets/asset-new/regenerate', {
  method: 'POST'
});
```

---

## Security Considerations

1. **Authentication**: Add authentication middleware before production
2. **Rate Limiting**: Implement rate limiting for regenerate endpoints
3. **Input Validation**: Validate all request parameters and body
4. **Error Messages**: Don't expose internal errors to clients
5. **CORS**: Configure CORS properly for production domain

---

## Performance Optimization

1. **Parallel Processing**: Batch operations use `Promise.allSettled()`
2. **Async Jobs**: Long-running tasks don't block API responses
3. **Polling**: Suno jobs polled with 5-8 second intervals
4. **Timeouts**: Configurable timeouts prevent hanging requests
5. **Caching**: Consider caching asset/audio lists for frequently accessed projects

---

## Future Enhancements

- [ ] Webhook support for Suno completion (faster than polling)
- [ ] Asset quality validation before marking as completed
- [ ] Automatic retry with exponential backoff
- [ ] Cost tracking per asset/audio generation
- [ ] Admin dashboard for monitoring generation jobs
- [ ] Asset versioning (keep history of regenerations)
- [ ] Custom TTS voice selection
- [ ] Audio mixing preview before final render

---

**Documentation maintained by:** Development Team  
**Contact:** For issues or questions, refer to PHASE-2-ANALYSIS.md
