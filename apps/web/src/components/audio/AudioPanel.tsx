import { useEffect, useState } from 'react';
import { AudioType } from '@legenda/shared-types';

interface AudioAsset {
  id: string;
  type: AudioType;
  sunoPrompt: string;
  lyrics: string | null;
  mood: string | null;
  genre: string | null;
  audioUrl: string | null;
  status: string;
}

const TYPE_LABELS: Record<AudioType, string> = {
  [AudioType.SOUNDTRACK]: '🎶 Soundtrack',
  [AudioType.BACKSOUND]: '🎼 Backsound Cinematic',
  [AudioType.VOICE_OVER]: '🎙️ Voice Over Narator',
};

interface AudioPanelProps {
  projectId: string;
}

export function AudioPanel({ projectId }: AudioPanelProps) {
  const [assets, setAssets] = useState<AudioAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${projectId}/audio`)
      .then((r) => r.json())
      .then((res) => { if (res.success) setAssets(res.data); })
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) return <p className="text-muted-foreground text-sm">Memuat audio...</p>;
  if (!assets.length) return <p className="text-muted-foreground text-sm">Belum ada audio.</p>;

  return (
    <div className="flex flex-col gap-3">
      {assets.map((asset) => (
        <div key={asset.id} className="rounded-lg border bg-card p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">{TYPE_LABELS[asset.type as AudioType]}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium
              ${asset.status === 'COMPLETED' ? 'bg-green-100 text-green-700'
                : asset.status === 'FAILED' ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'}`}>
              {asset.status}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {asset.mood && <span className="text-[10px] rounded bg-secondary px-2 py-0.5">{asset.mood}</span>}
            {asset.genre && <span className="text-[10px] rounded bg-secondary px-2 py-0.5">{asset.genre}</span>}
          </div>

          <p className="text-[11px] text-muted-foreground line-clamp-2">{asset.sunoPrompt}</p>

          {asset.lyrics && (
            <details className="text-[11px]">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">Lihat Lirik</summary>
              <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">{asset.lyrics}</pre>
            </details>
          )}

          {asset.audioUrl && !asset.audioUrl.startsWith('local:') && (
            <audio controls className="w-full mt-1 h-8" src={asset.audioUrl} />
          )}
        </div>
      ))}
    </div>
  );
}
