import { type ProjectDTO, type MasterPromptInput, type ApiResponse } from '@legenda/shared-types';

const API_BASE = '/api';

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
    cancel: (projectId: string) =>
      request<{ status: string }>(`/pipeline/${projectId}/cancel`, { method: 'POST' }),
    status: (projectId: string) => request<ProjectDTO>(`/pipeline/${projectId}/status`),
  },
};
