import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjectStore } from '@/store/projectStore';
import { api } from '@/api/client';
import { ProjectStatus, type ProjectDTO } from '@legenda/shared-types';
import { Plus, Film } from 'lucide-react';

const STATUS_COLOR: Partial<Record<ProjectStatus, string>> = {
  [ProjectStatus.COMPLETED]: 'bg-green-100 text-green-700',
  [ProjectStatus.FAILED]:    'bg-red-100 text-red-700',
  [ProjectStatus.DRAFT]:     'bg-secondary text-secondary-foreground',
  [ProjectStatus.STORY_DONE]: 'bg-blue-100 text-blue-700',
};

// Hitung progress berdasarkan status
function getProjectProgress(project: ProjectDTO): number {
  if (project.status === ProjectStatus.COMPLETED) return 100;
  if (project.status === ProjectStatus.FAILED) return 0;
  if (project.status === ProjectStatus.DRAFT) return 0;

  // Status dengan screenplay (STORY_DONE+) — hitung progress berdasarkan status
  if (project.screenplay) {
    const statusOrder = [
      ProjectStatus.STORY_DONE,
      ProjectStatus.ASSETS_GENERATING, ProjectStatus.ASSETS_DONE,
      ProjectStatus.AUDIO_GENERATING, ProjectStatus.AUDIO_DONE,
      ProjectStatus.STORYBOARD_GENERATING, ProjectStatus.STORYBOARD_DONE,
      ProjectStatus.VIDEO_GENERATING, ProjectStatus.VIDEO_DONE,
      ProjectStatus.ASSEMBLING,
    ];
    const idx = statusOrder.indexOf(project.status as ProjectStatus);
    if (idx >= 0) return Math.round((idx / (statusOrder.length - 1)) * 100);
  }

  // Status tanpa screenplay (STORY_GENERATING) — progress dari enum order
  const idx = [...Object.values(ProjectStatus)].indexOf(project.status as ProjectStatus);
  return Math.round((idx / (Object.values(ProjectStatus).length - 1)) * 100);
}

export function ProjectsPage() {
  const { projects, setProjects, isLoading, setLoading } = useProjectStore();

  useEffect(() => {
    setLoading(true);
    api.projects.list().then((res) => {
      if (res.success && res.data) setProjects(res.data);
      setLoading(false);
    });
  }, [setProjects, setLoading]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Semua Project</h1>
        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Buat Baru
        </Link>
      </div>

      {isLoading && <p className="text-muted-foreground">Memuat project...</p>}

      {!isLoading && projects.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed p-16 text-center">
          <Film className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-muted-foreground">Belum ada project. Mulai dengan membuat cerita baru!</p>
          <Link
            to="/create"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Buat Cerita Pertama
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {projects.map((project) => {
          const progress = getProjectProgress(project);
          const hasProgress = progress > 0 && progress < 100;
          const hasScreenplay = !!project.screenplay;

          return (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="rounded-lg border bg-card p-4 flex items-center gap-4 hover:bg-accent transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Film className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{project.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {project.masterPrompt.tokohUtama} · {project.masterPrompt.asalDaerah} · {project.masterPrompt.gaya}
                </p>
                {hasScreenplay && (
                  <p className="text-xs text-muted-foreground/80 truncate">
                    {project.completedScenes || 0}/{project.totalScenes || 0} scene
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {hasProgress && (
                  <div className="w-24">
                    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium
                    ${STATUS_COLOR[project.status as ProjectStatus] ?? 'bg-primary/10 text-primary'}`}
                >
                  {project.status}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
