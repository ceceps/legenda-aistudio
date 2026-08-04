import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjectStore } from '@/store/projectStore';
import { usePipelineSocket } from '@/hooks/usePipelineSocket';
import { api } from '@/api/client';
import { ProjectStatus, type Screenplay } from '@legenda/shared-types';
import { PipelineProgress } from '@/components/pipeline/PipelineProgress';
import { ScreenplayViewer } from '@/components/screenplay/ScreenplayViewer';
import { AssetGrid } from '@/components/assets/AssetGrid';
import { AudioPanel } from '@/components/audio/AudioPanel';

type Tab = 'pipeline' | 'screenplay' | 'assets' | 'audio';

// Status yang memerlukan tindakan eksplisit dari pengguna (tidak auto-start)
const VIEW_ONLY_STATUSES = new Set<string>([
  ProjectStatus.DRAFT,
  ProjectStatus.STORY_DONE,
  ProjectStatus.ASSETS_DONE,
  ProjectStatus.AUDIO_DONE,
  ProjectStatus.STORYBOARD_DONE,
  ProjectStatus.VIDEO_DONE,
  ProjectStatus.COMPLETED,
  ProjectStatus.FAILED,
]);

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { currentProject, setCurrentProject, pipelineProgress, resetPipelineProgress, setLoading, isLoading, setPipelineProgress, updateProjectInList } =
    useProjectStore();
  const [activeTab, setActiveTab] = useState<Tab>('pipeline');
  const [pipelineError, setPipelineError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.projects.get(id).then((res) => {
      if (res.success && res.data) setCurrentProject(res.data);
      setLoading(false);
    });
  }, [id, setCurrentProject, setLoading]);

  usePipelineSocket(id ?? null, currentProject?.status ?? null, (event) => {
    // Update project jika pipeline mencapai terminal stage — update di store saja (project udah di-get di useEffect awal)
    if (event.stage === ProjectStatus.STORY_DONE) {
      updateProjectInList(event as any); // event udah nyamar jadi project data via WebSocket
    }
  });

  // Auto-switch ke tab Naskah saat status STORY_DONE
  useEffect(() => {
    if (currentProject?.status === ProjectStatus.STORY_DONE && !!currentProject.screenplay) {
      setActiveTab('screenplay');
    }
  }, [currentProject?.status, currentProject?.screenplay]);

  const handleStartPipeline = async () => {
    if (!id || !currentProject) return;
    setPipelineError(null);
    resetPipelineProgress();
    setCurrentProject({ ...currentProject, status: ProjectStatus.STORY_GENERATING });
    const res = await api.pipeline.start(id);
    if (!res.success) {
      setCurrentProject(currentProject);
      setPipelineError(res.error ?? 'Gagal memulai pipeline. Silakan coba lagi.');
    }
  };

  const handleContinuePipeline = async () => {
    if (!id || !currentProject) return;
    setPipelineError(null);
    resetPipelineProgress();
    setCurrentProject({ ...currentProject, status: ProjectStatus.ASSETS_GENERATING });
    const res = await api.pipeline.continue(id);
    if (!res.success) {
      setCurrentProject(currentProject);
      setPipelineError(res.error ?? 'Gagal melanjutkan ke generasi aset. Silakan coba lagi.');
    }
  };

  const handleCancelPipeline = async () => {
    if (!id || !currentProject) return;
    await api.pipeline.cancel(id);
    resetPipelineProgress();
    setCurrentProject({ ...currentProject, status: ProjectStatus.FAILED });
  };

  const project = currentProject;
  if (isLoading) return <p className="text-muted-foreground">Memuat project...</p>;
  if (!project) return <p className="text-muted-foreground">Project tidak ditemukan.</p>;

  const hasScreenplay = !!project.screenplay;

  const isGenerating = [
    ProjectStatus.STORY_GENERATING,
    ProjectStatus.ASSETS_GENERATING,
    ProjectStatus.AUDIO_GENERATING,
    ProjectStatus.STORYBOARD_GENERATING,
    ProjectStatus.VIDEO_GENERATING,
    ProjectStatus.ASSEMBLING,
  ].includes(project.status as ProjectStatus);

  const isViewOnly = VIEW_ONLY_STATUSES.has(project.status);
  const isTerminal = project.status === ProjectStatus.FAILED || project.status === ProjectStatus.DRAFT;
  const effectiveProgress = isTerminal ? null : pipelineProgress;

  const currentStatus = effectiveProgress?.stage ?? project.status;
  const progress = effectiveProgress?.progress ?? (isTerminal ? 0 : Math.round(
    ([...Object.values(ProjectStatus)].indexOf(project.status as ProjectStatus) /
      (Object.values(ProjectStatus).length - 1)) * 100,
  ));
  const message = effectiveProgress?.message ?? `Status: ${project.status}`;
  const hasAssets = [
    ProjectStatus.ASSETS_GENERATING, ProjectStatus.ASSETS_DONE,
    ProjectStatus.AUDIO_GENERATING, ProjectStatus.AUDIO_DONE,
    ProjectStatus.STORYBOARD_GENERATING, ProjectStatus.STORYBOARD_DONE,
    ProjectStatus.VIDEO_GENERATING, ProjectStatus.VIDEO_DONE,
    ProjectStatus.ASSEMBLING, ProjectStatus.COMPLETED,
  ].includes(project.status as ProjectStatus);

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: 'pipeline',   label: '⚡ Pipeline',   show: true },
    { id: 'screenplay', label: '📄 Naskah',     show: hasScreenplay },
    { id: 'assets',     label: '🎨 Aset',       show: hasAssets },
    { id: 'audio',      label: '🎵 Audio',      show: hasAssets },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {project.masterPrompt.tokohUtama} · {project.masterPrompt.asalDaerah} · {project.masterPrompt.gaya}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* DRAFT: tombol Proses untuk memulai pipeline */}
          {project.status === ProjectStatus.DRAFT && (
            <button
              onClick={handleStartPipeline}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              🚀 Proses
            </button>
          )}
          {/* STORY_DONE: naskah sudah selesai, user perlu klik Proses Selanjutnya untuk lanjut ke aset */}
          {project.status === ProjectStatus.STORY_DONE && (
            <button
              onClick={handleContinuePipeline}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ▶️ Proses Selanjutnya
            </button>
          )}
          {/* FAILED: tombol Coba Lagi */}
          {project.status === ProjectStatus.FAILED && (
            <button
              onClick={handleStartPipeline}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              🔄 Coba Lagi
            </button>
          )}
          {isGenerating && (
            <>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                Sedang diproses...
              </span>
              <button
                onClick={handleCancelPipeline}
                className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors"
              >
                ✕ Batal
              </button>
            </>
          )}
          {project.status === ProjectStatus.COMPLETED && (
            <Link
              to={`/project/${id}/preview`}
              className="rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700 transition-colors"
            >
              🎬 Lihat Video
            </Link>
          )}
          {[ProjectStatus.STORYBOARD_DONE, ProjectStatus.VIDEO_GENERATING,
            ProjectStatus.VIDEO_DONE, ProjectStatus.ASSEMBLING, ProjectStatus.COMPLETED
          ].includes(project.status as ProjectStatus) && (
            <Link
              to={`/project/${id}/storyboard`}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              🎬 Storyboard
            </Link>
          )}
        </div>
      </div>

      {/* Error banner (Indonesian) */}
      {pipelineError && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          ⚠️ {pipelineError}
        </div>
      )}

      {/* View-only notice */}
      {isViewOnly && !isGenerating && project.status !== ProjectStatus.COMPLETED && (
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          📋 Mode pratinjau — tekan <strong>Proses</strong> atau <strong>Coba Lagi</strong> di atas untuk melanjutkan.
        </div>
      )}

      {/* Status badge */}
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-medium
          ${project.status === ProjectStatus.COMPLETED ? 'bg-green-100 text-green-700'
            : project.status === ProjectStatus.FAILED ? 'bg-red-100 text-red-700'
            : project.status === ProjectStatus.STORY_DONE ? 'bg-blue-100 text-blue-700'
            : 'bg-primary/10 text-primary'}`}>
          {project.status}
        </span>
        <span className="text-sm text-muted-foreground">
          {project.completedScenes}/{project.totalScenes} scene
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b">
        {tabs.filter((t) => t.show).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px
              ${activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'pipeline' && (
          <PipelineProgress
            currentStatus={currentStatus}
            progress={progress}
            message={message}
          />
        )}
        {activeTab === 'screenplay' && hasScreenplay && (
          <ScreenplayViewer screenplay={project.screenplay as unknown as Screenplay} />
        )}
        {activeTab === 'assets' && (
          <AssetGrid projectId={project.id} />
        )}
        {activeTab === 'audio' && (
          <AudioPanel projectId={project.id} />
        )}
      </div>
    </div>
  );
}
