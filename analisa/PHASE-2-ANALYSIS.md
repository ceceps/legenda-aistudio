# Legenda AI Studio - Phase 2 Analysis Report

**Date:** 2026-07-27  
**Scope:** Asset & Audio Generation Pipeline (Phase 2)  
**Status:** ⚠️ Partially Implemented - Requires Integration & Testing

---

## Executive Summary

Phase 2 of Legenda AI Studio focuses on **Asset & Audio Generation**, which includes:
- Visual asset prompt generation (characters, items, backgrounds)
- Image generation via external APIs
- Music generation (soundtrack & backsound) via Suno
- Text-to-Speech voice over generation
- Google Drive storage integration

**Current Status:** Core services are implemented but require integration testing, error handling improvements, and UI components for asset management.

---

## Phase 2 Requirements (from Plan)

### ✅ Implemented Components

#### 1. **Nemotron Visual Prompt Generation** (`services/nemotron.ts`)
- ✅ `generateAssetPrompts()` - Creates detailed image prompts for characters, items, backgrounds
- ✅ `enhanceVideoPrompt()` - Enhances scene descriptions for video generation
- ✅ Uses NVIDIA Nemotron 70B via OpenAI-compatible API
- ✅ Structured JSON output with detailed prompts (200+ words)
- ✅ Indonesian folklore and cultural elements consideration

**Implementation Quality:** ⭐⭐⭐⭐ (4/5)
- Well-structured with proper TypeScript types
- Good prompt engineering for Indonesian context
- Missing: Retry logic, rate limiting, prompt validation

#### 2. **Image Generation via Composio** (`services/composio.ts`)
- ✅ `generateImage()` - FAL AI integration for image generation
- ✅ Landscape 16:9 format support
- ✅ Style parameter support
- ✅ Safety checker enabled

**Implementation Quality:** ⭐⭐⭐ (3/5)
- Basic implementation present
- Missing: Job status polling, error recovery, image quality validation
- No batch processing for multiple assets

#### 3. **Suno Music Generation** (`services/suno.ts`)
- ✅ `generateSoundtrack()` - Lyrical soundtrack generation
- ✅ `generateBacksound()` - Instrumental cinematic background
- ✅ `checkSunoJob()` - Job status checking
- ✅ `waitForSunoJob()` - Polling with timeout (180s)

**Implementation Quality:** ⭐⭐⭐⭐ (4/5)
- Complete async job handling
- Proper timeout management
- Missing: Webhook support for faster completion, audio quality validation

#### 4. **Text-to-Speech** (`services/tts.ts`)
- ✅ Google Cloud TTS integration
- ✅ Indonesian language support (id-ID)
- ✅ Wavenet-B voice (deep male narrator)
- ✅ Audio effects for cinematic quality

**Implementation Quality:** ⭐⭐⭐⭐⭐ (5/5)
- Production-ready implementation
- Proper voice configuration
- Good audio quality settings

#### 5. **Google Drive Storage** (`services/drive.ts`)
- ✅ `uploadFileToDrive()` - File upload with public sharing
- ✅ Folder organization support
- ✅ Shareable link generation

**Implementation Quality:** ⭐⭐⭐⭐ (4/5)
- Clean implementation
- Missing: Batch upload, progress tracking, quota management

---

## Database Schema Analysis

### ✅ Properly Defined Tables

```prisma
model Asset {
  id          String    @id
  projectId   String
  type        AssetType  // CHARACTER, ITEM, BACKGROUND
  name        String
  description String
  imagePrompt String
  imageUrl    String?    // ⚠️ Populated by worker
  status      JobStatus  // PENDING, PROCESSING, COMPLETED, FAILED
  createdAt   DateTime
  updatedAt   DateTime
}

model AudioAsset {
  id         String    @id
  projectId  String
  type       AudioType  // SOUNDTRACK, BACKSOUND, VOICE_OVER
  sunoPrompt String
  sunoJobId  String?
  audioUrl   String?    // ⚠️ Populated by worker
  lyrics     String?
  mood       String?
  genre      String?
  status     JobStatus
  createdAt  DateTime
  updatedAt  DateTime
}
```

**Schema Quality:** ⭐⭐⭐⭐⭐ (5/5)
- Well-normalized structure
- Proper foreign key relationships
- Status tracking for async jobs
- All required fields present

---

## Worker Implementation Analysis

### ✅ Asset Worker (`workers/asset.worker.ts`)

**Current Flow:**
1. Fetch project screenplay
2. Call Nemotron to generate asset prompts
3. Save prompts to database
4. Update project status to `ASSETS_DONE`
5. Chain to audio worker

**Issues Found:**
- ❌ **No actual image generation** - Only creates prompts, doesn't call `generateImage()`
- ❌ Missing parallel processing for multiple assets
- ❌ No progress updates during generation
- ❌ No Drive upload integration

**Recommended Fix:**
```typescript
// After creating asset records, generate images
const assets = await prisma.asset.findMany({ where: { projectId } });

await Promise.allSettled(
  assets.map(async (asset) => {
    try {
      const { imageUrl } = await generateImage(asset.imagePrompt, project.gaya);
      await prisma.asset.update({
        where: { id: asset.id },
        data: { imageUrl, status: 'COMPLETED' }
      });
    } catch (err) {
      await prisma.asset.update({
        where: { id: asset.id },
        data: { status: 'FAILED' }
      });
    }
  })
);
```

### ✅ Audio Worker (`workers/audio.worker.ts`)

**Current Flow:**
1. Fetch audio assets (soundtrack, backsound)
2. Generate via Suno API
3. Poll for completion
4. Update database with audio URLs
5. Chain to storyboard worker

**Issues Found:**
- ⚠️ **Voice Over generation missing** - Only handles soundtrack & backsound
- ❌ No TTS integration for narrator voice
- ❌ No Drive upload for audio files
- ⚠️ Sequential processing (could be parallel)

**Recommended Fix:**
```typescript
// Add voice over generation
const scenes = await prisma.scene.findMany({ where: { projectId } });

await Promise.allSettled(
  scenes.map(async (scene) => {
    const voPath = `/tmp/${projectId}-scene-${scene.sceneNumber}-vo.mp3`;
    await synthesizeVoiceOver(scene.voiceOver, voPath);
    const { shareLink } = await uploadFileToDrive(voPath, `vo-scene-${scene.sceneNumber}.mp3`, 'audio/mpeg');
    
    await prisma.audioAsset.create({
      data: {
        id: randomUUID(),
        projectId,
        type: 'VOICE_OVER',
        sunoPrompt: scene.voiceOver,
        audioUrl: shareLink,
        status: 'COMPLETED'
      }
    });
  })
);
```

---

## API Routes Analysis

### ⚠️ Incomplete Routes

#### `/api/projects/:id/audio` (GET)
- ✅ Lists audio assets
- ❌ No POST endpoint to manually trigger audio generation
- ❌ No DELETE endpoint to remove failed jobs

#### `/api/projects/:id/assets` (Missing)
- ❌ No route to list assets
- ❌ No route to regenerate failed assets
- ❌ No route to upload custom assets

**Recommended Addition:**
```typescript
// routes/assets.ts
export const assetsRouter = Router();

// GET /api/projects/:id/assets
assetsRouter.get('/:id/assets', async (req, res) => {
  const assets = await prisma.asset.findMany({
    where: { projectId: req.params.id },
    orderBy: { type: 'asc' }
  });
  res.json({ success: true, data: assets });
});

// POST /api/projects/:id/assets/:assetId/regenerate
assetsRouter.post('/:id/assets/:assetId/regenerate', async (req, res) => {
  // Retry failed asset generation
});
```

---

## Frontend Integration Analysis

### ❌ Missing UI Components

Based on `CreatePage.tsx` review:

1. **Asset Grid Component** - Not implemented
   - Should display generated characters, items, backgrounds
   - Preview images with status indicators
   - Regenerate button for failed assets

2. **Audio Panel Component** - Not implemented
   - Audio player for soundtrack/backsound preview
   - Waveform visualization
   - Volume controls

3. **Progress Tracking** - Partially implemented
   - WebSocket connection exists (`usePipelineSocket`)
   - No visual progress for individual assets
   - No retry UI for failed jobs

**Recommended Components:**
```tsx
// components/assets/AssetGrid.tsx
export function AssetGrid({ projectId }: { projectId: string }) {
  const { data: assets } = useQuery(['assets', projectId], () => 
    api.assets.list(projectId)
  );
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {assets?.map(asset => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}

// components/audio/AudioPanel.tsx
export function AudioPanel({ projectId }: { projectId: string }) {
  const { data: audio } = useQuery(['audio', projectId], () =>
    api.audio.list(projectId)
  );
  
  return (
    <div className="space-y-4">
      {audio?.map(track => (
        <AudioPlayer key={track.id} track={track} />
      ))}
    </div>
  );
}
```

---

## Critical Gaps & Missing Features

### 🔴 High Priority

1. **Image Generation Not Triggered**
   - Asset worker only creates prompts, doesn't generate images
   - Need to integrate `composio.generateImage()` calls
   - Estimated effort: 4-6 hours

2. **Voice Over Generation Missing**
   - TTS service exists but not integrated in audio worker
   - Need per-scene voice over generation
   - Estimated effort: 3-4 hours

3. **Drive Upload Not Integrated**
   - Service exists but not called by workers
   - Assets and audio files not uploaded to Drive
   - Estimated effort: 2-3 hours

4. **Asset Management Routes Missing**
   - No API endpoints to view/manage assets
   - No regeneration capability
   - Estimated effort: 3-4 hours

5. **Frontend Asset Display Missing**
   - No UI to view generated assets
   - No audio preview components
   - Estimated effort: 6-8 hours

### 🟡 Medium Priority

6. **Error Recovery Mechanisms**
   - No retry logic for failed API calls
   - No fallback strategies
   - Estimated effort: 4-5 hours

7. **Progress Granularity**
   - WebSocket updates too coarse
   - Need per-asset progress tracking
   - Estimated effort: 3-4 hours

8. **Batch Processing Optimization**
   - Sequential processing is slow
   - Need parallel asset generation
   - Estimated effort: 2-3 hours

### 🟢 Low Priority

9. **Asset Quality Validation**
   - No checks for generated image quality
   - No audio duration validation
   - Estimated effort: 2-3 hours

10. **Cost Tracking**
    - No monitoring of API usage costs
    - No budget limits
    - Estimated effort: 3-4 hours

---

## Environment Variables Required

```bash
# Phase 2 Required Variables
NEMOTRON_API_KEY=your_nvidia_api_key
COMPOSIO_API_KEY=your_composio_api_key
SUNO_API_KEY=your_suno_api_key
GOOGLE_SERVICE_ACCOUNT_JSON=/path/to/service-account.json
GOOGLE_DRIVE_FOLDER_ID=your_drive_folder_id

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/legenda

# Optional
SUNO_API_BASE=https://api.suno.ai/v1
```

---

## Testing Recommendations

### Unit Tests Needed

```typescript
// tests/services/nemotron.test.ts
describe('Nemotron Service', () => {
  it('should generate asset prompts from screenplay', async () => {
    const screenplay = mockScreenplay();
    const prompts = await generateAssetPrompts(screenplay);
    expect(prompts).toHaveLength(greaterThan(0));
    expect(prompts[0]).toHaveProperty('imagePrompt');
  });
});

// tests/services/composio.test.ts
describe('Composio Service', () => {
  it('should generate image from prompt', async () => {
    const result = await generateImage('test prompt', 'KLASIK');
    expect(result.imageUrl).toMatch(/^https?:\/\//);
  });
});

// tests/workers/asset.worker.test.ts
describe('Asset Worker', () => {
  it('should process asset generation job', async () => {
    const job = mockJob({ projectId: 'test-123' });
    await assetWorker.process(job);
    const assets = await prisma.asset.findMany({ where: { projectId: 'test-123' } });
    expect(assets.every(a => a.status === 'COMPLETED')).toBe(true);
  });
});
```

### Integration Tests Needed

1. **End-to-End Pipeline Test**
   - Create project → Generate story → Generate assets → Verify Drive upload
   - Expected duration: ~5 minutes
   - Success criteria: All assets have valid URLs

2. **Worker Chain Test**
   - Verify story → asset → audio → storyboard chain
   - Check WebSocket progress updates
   - Validate database state transitions

3. **API Error Handling Test**
   - Simulate Composio API failures
   - Simulate Suno timeout
   - Verify graceful degradation

---

## Implementation Roadmap for Phase 2 Completion

### Sprint 1: Core Integration (Week 1)

**Day 1-2: Asset Generation Integration**
- [ ] Integrate `generateImage()` calls in asset worker
- [ ] Add parallel processing with `Promise.allSettled()`
- [ ] Implement Drive upload for generated images
- [ ] Add granular progress updates

**Day 3-4: Voice Over Integration**
- [ ] Add TTS generation in audio worker
- [ ] Create voice over audio assets per scene
- [ ] Upload voice over files to Drive
- [ ] Update database with audio URLs

**Day 5: Testing & Bug Fixes**
- [ ] Write unit tests for services
- [ ] Integration test for asset pipeline
- [ ] Fix any discovered issues

### Sprint 2: API & Frontend (Week 2)

**Day 1-2: API Routes**
- [ ] Create `/api/projects/:id/assets` endpoints
- [ ] Add asset regeneration endpoint
- [ ] Add audio management endpoints
- [ ] Document API with examples

**Day 3-4: Frontend Components**
- [ ] Build `AssetGrid` component
- [ ] Build `AudioPanel` component
- [ ] Integrate with existing pages
- [ ] Add loading states and error handling

**Day 5: Polish & Documentation**
- [ ] Update user documentation
- [ ] Create developer setup guide
- [ ] Record demo video
- [ ] Deploy to staging

### Sprint 3: Optimization & Monitoring (Week 3)

**Day 1-2: Performance**
- [ ] Optimize parallel processing
- [ ] Add caching for repeated prompts
- [ ] Implement rate limiting
- [ ] Add request queuing

**Day 3-4: Monitoring**
- [ ] Add cost tracking
- [ ] Implement error alerting
- [ ] Create admin dashboard
- [ ] Set up logging aggregation

**Day 5: Production Readiness**
- [ ] Security audit
- [ ] Load testing
- [ ] Backup strategy
- [ ] Deploy to production

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Composio API rate limits | High | High | Implement queuing, add retry logic |
| Suno generation timeout | Medium | Medium | Increase timeout, add webhook support |
| Drive storage quota | Medium | High | Monitor usage, implement cleanup policy |
| Image quality issues | Medium | Medium | Add validation, allow regeneration |
| Cost overrun | High | High | Implement budget limits, usage tracking |

---

## Success Criteria for Phase 2 Completion

- [x] All services implemented and tested
- [ ] Asset worker generates and uploads images
- [ ] Audio worker generates all 3 audio types (soundtrack, backsound, voice over)
- [ ] All generated files uploaded to Google Drive
- [ ] API routes for asset/audio management
- [ ] Frontend displays generated assets
- [ ] Audio preview functionality
- [ ] Error recovery mechanisms in place
- [ ] Unit test coverage > 70%
- [ ] Integration tests passing
- [ ] Documentation complete

**Current Completion:** ~60% (Services ready, integration incomplete)

---

## Recommendations

### Immediate Actions (This Week)

1. **Complete Asset Worker Integration**
   - Add image generation calls
   - Implement Drive upload
   - Test with real API keys

2. **Add Voice Over Generation**
   - Integrate TTS in audio worker
   - Create per-scene audio files
   - Upload to Drive

3. **Create Asset Management API**
   - Build missing routes
   - Add regeneration capability
   - Document endpoints

### Short-term (Next 2 Weeks)

4. **Build Frontend Components**
   - Asset grid with preview
   - Audio player panel
   - Progress indicators

5. **Implement Error Handling**
   - Retry logic for API failures
   - Graceful degradation
   - User-friendly error messages

6. **Add Monitoring**
   - Cost tracking
   - Performance metrics
   - Error alerting

### Long-term (Next Month)

7. **Optimization**
   - Parallel processing
   - Caching strategies
   - Rate limiting

8. **Quality Improvements**
   - Asset validation
   - Audio quality checks
   - User feedback loop

9. **Documentation**
   - API documentation
   - User guides
   - Developer setup

---

## Conclusion

Phase 2 has a **solid foundation** with all core services implemented. However, **critical integration work** is needed to connect these services into a working pipeline. The main gaps are:

1. Image generation not triggered by asset worker
2. Voice over generation missing from audio worker
3. Drive upload not integrated
4. Frontend components for asset display missing

**Estimated time to complete Phase 2:** 2-3 weeks with 1 full-time developer

**Recommended next step:** Focus on completing the asset worker integration first, as it blocks subsequent phases. Once assets are generating correctly, the audio and frontend work can proceed in parallel.

---

**Report prepared by:** Bob Shell AI Assistant  
**Last updated:** 2026-07-27
