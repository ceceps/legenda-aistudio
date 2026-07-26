import { ProjectStatus } from '@legenda/shared-types';
import { useProjectStore } from '@/store/projectStore';

const STAGES: { status: ProjectStatus; label: string; icon: string }[] = [
  { status: ProjectStatus.STORY_GENERATING,     label: 'Menulis Naskah',      icon: '✍️' },
  { status: ProjectStatus.ASSETS_GENERATING,    label: 'Membuat Aset Visual', icon: '🎨' },
  { status: ProjectStatus.AUDIO_GENERATING,     label: 'Membuat Musik & Audio', icon: '🎵' },
  { status: ProjectStatus.STORYBOARD_GENERATING, label: 'Storyboard',          icon: '🎬' },
  { status: ProjectStatus.VIDEO_GENERATING,     label: 'Render Video Clip',   icon: '📽️' },
  { status: ProjectStatus.ASSEMBLING,           label: 'Assembly Final',      icon: '🔗' },
  { status: ProjectStatus.COMPLETED,            label: 'Selesai!',            icon: '✅' },
];

const STATUS_ORDER = [
  ProjectStatus.DRAFT,
  ProjectStatus.STORY_GENERATING,
  ProjectStatus.STORY_DONE,
  ProjectStatus.ASSETS_GENERATING,
  ProjectStatus.ASSETS_DONE,
  ProjectStatus.AUDIO_GENERATING,
  ProjectStatus.AUDIO_DONE,
  ProjectStatus.STORYBOARD_GENERATING,
  ProjectStatus.STORYBOARD_DONE,
  ProjectStatus.VIDEO_GENERATING,
  ProjectStatus.VIDEO_DONE,
  ProjectStatus.ASSEMBLING,
  ProjectStatus.COMPLETED,
];

function statusIndex(s: string) {
  return STATUS_ORDER.indexOf(s as ProjectStatus);
}

interface PipelineProgressProps {
  currentStatus: string;
  progress: number;
  message: string;
}

export function PipelineProgress({ currentStatus, progress, message }: PipelineProgressProps) {
  const currentIdx = statusIndex(currentStatus);

  return (
    <div className="flex flex-col gap-4">
      {/* Overall bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="font-medium truncate">{message}</span>
          <span className="ml-2 shrink-0">{progress}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stage steps */}
      <ol className="flex flex-col gap-1.5">
        {STAGES.map(({ status, label, icon }) => {
          const idx = statusIndex(status);
          const isDone    = idx < currentIdx;
          const isActive  = status === currentStatus ||
            (status === ProjectStatus.STORY_GENERATING && currentStatus === ProjectStatus.STORY_DONE && progress < 60);

          return (
            <li
              key={status}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors
                ${isActive  ? 'bg-primary/10 text-primary font-semibold' : ''}
                ${isDone    ? 'text-muted-foreground' : ''}
                ${!isActive && !isDone ? 'text-muted-foreground/40' : ''}`}
            >
              <span className="text-base w-6 text-center shrink-0">
                {isDone ? '✓' : icon}
              </span>
              <span>{label}</span>
              {isActive && (
                <span className="ml-auto flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
