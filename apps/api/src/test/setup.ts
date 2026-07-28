import { vi } from 'vitest';

// ── Hoisted mocks (runs before imports) ──────────────────────────────────────
const mockPrisma: {
  project: {
    findUnique: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  scene: { createMany: ReturnType<typeof vi.fn> };
  audioAsset: { createMany: ReturnType<typeof vi.fn> };
  $transaction: ReturnType<typeof vi.fn>;
} = vi.hoisted(() => ({
  project: {
    findUnique: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
  scene: {
    createMany: vi.fn(),
  },
  audioAsset: {
    createMany: vi.fn(),
  },
  $transaction: vi.fn(async (cb: any) => cb(mockPrisma)),
}));

const mockQueue: { add: ReturnType<typeof vi.fn>; getJobs: ReturnType<typeof vi.fn> } = vi.hoisted(() => ({
  add: vi.fn(),
  getJobs: vi.fn().mockResolvedValue([]),
}));

const mockBroadcastProgress: ReturnType<typeof vi.fn> = vi.hoisted(() => vi.fn());

const mockGenerateContent: ReturnType<typeof vi.fn> = vi.hoisted(() => vi.fn());

// Create a mock model instance that has generateContent
const mockModelInstance = vi.hoisted(() => ({
  generateContent: mockGenerateContent,
}));

// Mock GoogleGenerativeAI class constructor to return object with getGenerativeModel
const MockGoogleGenerativeAI = vi.hoisted(() =>
  class MockGoogleGenerativeAI {
    getGenerativeModel() {
      return mockModelInstance;
    }
  }
);

// Mock AbortController registry from gemini.ts
const mockAbortControllers = vi.hoisted(() => new Map<string, AbortController>());

vi.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));
vi.mock('@/lib/queue', () => ({ connection: {}, storyQueue: mockQueue, assetQueue: mockQueue }));
vi.mock('@/lib/websocket', () => ({ broadcastProgress: mockBroadcastProgress }));
vi.mock('@google/generative-ai', () => ({ GoogleGenerativeAI: MockGoogleGenerativeAI }));

// Mock gemini service functions (registerAbort, abortProject, clearAbort)
vi.mock('@/services/gemini', async (importOriginal) => {
  const actual: Record<string, any> = await importOriginal();
  return {
    ...actual,
    registerAbort: vi.fn((projectId: string) => {
      const ctrl = new AbortController();
      mockAbortControllers.set(projectId, ctrl);
      return ctrl;
    }),
    abortProject: vi.fn((projectId: string) => {
      const ctrl = mockAbortControllers.get(projectId);
      if (!ctrl) return false;
      ctrl.abort();
      mockAbortControllers.delete(projectId);
      return true;
    }),
    clearAbort: vi.fn((projectId: string) => {
      mockAbortControllers.delete(projectId);
    }),
  };
});

process.env.GEMINI_API_KEY = 'test-api-key';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.PORT = '3001';
process.env.FRONTEND_URL = 'http://localhost:5173';

export function resetMocks() {
  vi.clearAllMocks();
  mockGenerateContent.mockReset();
  mockQueue.add.mockResolvedValue({ id: 'job-1' });
  mockQueue.getJobs.mockResolvedValue([]);
  mockPrisma.project.findUnique.mockReset();
  mockPrisma.project.update.mockReset();
  mockPrisma.project.create.mockReset();
  mockPrisma.scene.createMany.mockReset();
  mockPrisma.audioAsset.createMany.mockReset();
  mockAbortControllers.clear();
}

export function mockGeminiResponses(screenplay: any, storyboard: any, audioPrompts: any) {
  mockGenerateContent
    .mockResolvedValueOnce({ response: { text: () => JSON.stringify(screenplay) } })
    .mockResolvedValueOnce({ response: { text: () => JSON.stringify(storyboard) } })
    .mockResolvedValueOnce({ response: { text: () => JSON.stringify(audioPrompts) } });
}

export function mockProject(data: Partial<any> = {}) {
  return {
    id: 'test-project-1',
    ide: 'Test ide',
    gaya: 'KLASIK',
    tokohUtama: 'Si Test',
    asalDaerah: 'Test',
    latar: 'MASEHI',
    latarDetail: 'Abad 21',
    plot: 'Test plot',
    status: 'DRAFT',
    ...data,
  };
}

export { mockPrisma, mockQueue, mockGenerateContent, mockBroadcastProgress, mockAbortControllers };