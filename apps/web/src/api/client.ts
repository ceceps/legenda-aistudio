import { type ProjectDTO, type MasterPromptInput, type ApiResponse } from '@legenda/shared-types';

// In production (Vercel): VITE_API_URL = https://your-api.railway.app
// In development: empty string → Vite proxy forwards /api/* to localhost:3001
const API_BASE = (import.meta.env.VITE_API_URL ?? '') + '/api';

// WebSocket base: wss:// in production, ws:// in dev
const WS_BASE = (() => {
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (apiUrl) {
    // Convert https://... → wss://...
    return apiUrl.replace(/^http/, 'ws');
  }
  return `ws://${window.location.host}`;
})();

export const WS_URL = `${WS_BASE}/ws`;

async function request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  return res.json() as Promise<ApiResponse<T>>;
}

export const api = {
  projects: {
    list: () => request<ProjectDTO[]>('/projects'),
    get: (id: string) => request<ProjectDTO>(`/projects/${id}`),
    create: (data: MasterPromptInput) =>
      request<ProjectDTO>('/projects', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/projects/${id}`, { method: 'DELETE' }),
  },
  pipeline: {
    start: (projectId: string) =>
      request<{ jobId: string }>(`/pipeline/${projectId}/start`, { method: 'POST' }),
    status: (projectId: string) => request<ProjectDTO>(`/pipeline/${projectId}/status`),
  },
};
