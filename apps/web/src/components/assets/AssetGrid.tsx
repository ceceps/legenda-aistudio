import { useEffect, useState } from 'react';
import { AssetType } from '@legenda/shared-types';

interface Asset {
  id: string;
  type: AssetType;
  name: string;
  description: string;
  imagePrompt: string;
  imageUrl: string | null;
  status: string;
}

interface AssetGridProps {
  projectId: string;
}

const TYPE_LABELS: Record<AssetType, string> = {
  [AssetType.CHARACTER]: 'Karakter',
  [AssetType.ITEM]: 'Item & Properti',
  [AssetType.BACKGROUND]: 'Latar / Background',
};

const TYPE_ICONS: Record<AssetType, string> = {
  [AssetType.CHARACTER]: '🧑',
  [AssetType.ITEM]: '⚔️',
  [AssetType.BACKGROUND]: '🏞️',
};

export function AssetGrid({ projectId }: AssetGridProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<AssetType | 'ALL'>('ALL');

  useEffect(() => {
    fetch(`/api/projects/${projectId}/assets`)
      .then((r) => r.json())
      .then((res) => { if (res.success) setAssets(res.data); })
      .finally(() => setLoading(false));
  }, [projectId]);

  const filtered = filter === 'ALL' ? assets : assets.filter((a) => a.type === filter);
  const groups = Object.values(AssetType);

  if (loading) return <p className="text-muted-foreground text-sm">Memuat aset...</p>;
  if (!assets.length) return <p className="text-muted-foreground text-sm">Belum ada aset.</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('ALL')}
          className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors
            ${filter === 'ALL' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}
        >
          Semua ({assets.length})
        </button>
        {groups.map((type) => {
          const count = assets.filter((a) => a.type === type).length;
          if (!count) return null;
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors
                ${filter === type ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}
            >
              {TYPE_ICONS[type]} {TYPE_LABELS[type]} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((asset) => (
          <div key={asset.id} className="rounded-lg border bg-card overflow-hidden flex flex-col">
            <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
              {asset.imageUrl ? (
                <img src={asset.imageUrl} alt={asset.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">{TYPE_ICONS[asset.type as AssetType]}</span>
              )}
            </div>
            <div className="p-2.5 flex flex-col gap-1">
              <p className="text-xs font-semibold truncate">{asset.name}</p>
              <p className="text-[10px] text-muted-foreground line-clamp-2">{asset.description}</p>
              <span className={`mt-1 w-fit rounded px-1.5 py-0.5 text-[10px] font-medium
                ${asset.status === 'COMPLETED' ? 'bg-green-100 text-green-700'
                  : asset.status === 'FAILED' ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'}`}>
                {asset.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
