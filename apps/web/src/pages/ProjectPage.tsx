import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjectStore } from '@/store/projectStore';
import { usePipelineSocket } from '@/hooks/usePipelineSocket';
import { api } from '@/api/client';
import { ProjectStatus } from '@legenda/shared-types';

const STAGE_LABELS: Record<string, string> = {
  DRAFT: 'Menunggu',
  STORY_GENERATING: 'Membuat Naskah...',
  STORY_DONE: 'Naskah Selesai',
  ASSETS_GENERATING: 'Membuat Aset Visual...',
  ASSETS_DONE: 'Aset Selesai',
  AUDIO_GENERATING: 'Membuat Musik & Audio...',
  AUDIO_DONE: 'Audio Selesai',
  STORYBOARD_GENERATING: 'Membuat Storyboard...',
  STORYBOARD_DONE: 'Storyboard Selesai',
  VIDEO_GENERATING: 'Merender Video Scene...',
  VIDEO_DONE: 'Video Scene Selesai',
  ASSEMBLING: 'Menggabungkan Video Final...',
  COMPLETED: 'Selesai! 🎉',
  FAILED: 'Gagal ❌',
};

const STAGE_ORDER = Object.keys(STAGE_LABELS);

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { currentProject, setCurrentProject, pipelineProgress, setLoading, isLoading } = useProjectStore();
  usePipelineSocket(id ?? null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.projects.get(id).then((res) => {
      if (res.success && res.data) setCurrentProject(res.data);
      setLoading(false);
    });
  }, [id, setCurrentProject, setLoading]);

  const handleStartPipeline = async () => {
    if (!id) return;
    await api.pipeline.start(id);
  };

  const project = currentProject;
  if (isLoading) return <p className="text-muted-foreground">Memuat project...</p>;
  if (!project) return <p className="text-muted-foreground">Project tidak ditemukan.</p>;

  const currentStageIdx = STAGE_ORDER.indexOf(project.status);
  const progress = pipelineProgress?.progress ?? Math.round((currentStageIdx / (STAGE_ORDER.length - 1)) * 100);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {project.masterPrompt.tokohUtama} · {project.masterPrompt.asalDaerah} · {project.masterPrompt.gaya}
        </p>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {STAGE_LABELS[project.status] ?? project.status}
        </span>
        <span className="text-sm text-muted-foreground">
          {project.completedScenes}/{project.totalScenes} scene
        </span>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{pipelineProgress?.message ?? 'Pipeline Progress'}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stage Timeline */}
      <div className="flex flex-col gap-2">
        {STAGE_ORDER.filter(s => s !== 'DRAFT').map((stage, i) => {
          const stageIdx = STAGE_ORDER.indexOf(stage);
          const done = stageIdx < currentStageIdx;
          const active = stageIdx === currentStageIdx;
          return (
            <div key={stage} className={`flex items-center gap-3 text-sm px-3 py-2 rounded-md ${active ? 'bg-primary/10 font-medium' : done ? 'text-muted-foreground' : 'text-muted-foreground/50'}`}>
              <span className={`h-2 w-2 rounded-full ${active ? 'bg-primary' : done ? 'bg-green-500' : 'bg-muted'}`} />
              {STAGE_LABELS[stage]}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {project.status === ProjectStatus.DRAFT && (
          <button onClick={handleStartPipeline} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            🚀 Mulai Pipeline
          </button>
        )}
        {project.status === ProjectStatus.STORY_DONE && (
          <Link to={`/project/${id}/storyboard`} className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors">
            Lihat Storyboard
          </Link>
        )}
        {project.status === ProjectStatus.COMPLETED && (
          <Link to={`/project/${id}/preview`} className="rounded-lg bg-green-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-green-700 transition-colors">
            🎬 Lihat Video Final
          </Link>
        )}
      </div>
    </div>
  );
}
