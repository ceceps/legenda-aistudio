import { create } from 'zustand';
import { type ProjectDTO, type PipelineProgressEvent } from '@legenda/shared-types';

interface ProjectStore {
  projects: ProjectDTO[];
  currentProject: ProjectDTO | null;
  pipelineProgress: PipelineProgressEvent | null;
  isLoading: boolean;
  error: string | null;
  setProjects: (projects: ProjectDTO[]) => void;
  setCurrentProject: (project: ProjectDTO | null) => void;
  setPipelineProgress: (event: PipelineProgressEvent) => void;
  resetPipelineProgress: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateProjectInList: (project: ProjectDTO) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  currentProject: null,
  pipelineProgress: null,
  isLoading: false,
  error: null,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setPipelineProgress: (event) => set({ pipelineProgress: event }),
  resetPipelineProgress: () => set({ pipelineProgress: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  updateProjectInList: (project) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
      currentProject: state.currentProject?.id === project.id ? project : state.currentProject,
    })),
}));

