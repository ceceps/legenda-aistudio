import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type StoryboardScene } from '@legenda/shared-types';
import { api } from '@/api/client';

export function StoryboardPage() {
  const { id } = useParams<{ id: string }>();
  const [scenes, setScenes] = useState<StoryboardScene[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/projects/${id}/storyboard`)
      .then((r) => r.json())
      .then((res) => { if (res.success) setScenes(res.data); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-muted-foreground">Memuat storyboard...</p>;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Storyboard</h1>
      <p className="text-muted-foreground text-sm">{scenes.length} scene · masing-masing 10 detik</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenes.map((scene) => (
          <div key={scene.sceneNumber} className="rounded-lg border bg-card overflow-hidden flex flex-col">
            {/* Placeholder image */}
            <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground text-xs p-3 text-center">
              {scene.imagePrompt.slice(0, 100)}...
            </div>
            <div className="p-3 flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Scene {scene.sceneNumber}</span>
                <span className="text-xs text-muted-foreground">{scene.durationSeconds}s</span>
              </div>
              <p className="text-xs font-medium">{scene.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{scene.voiceOver}</p>
              <div className="flex gap-2 mt-1">
                <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">{scene.cameraAngle}</span>
                <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">{scene.transition}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
