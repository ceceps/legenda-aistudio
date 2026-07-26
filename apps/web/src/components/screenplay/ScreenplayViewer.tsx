import { type Screenplay } from '@legenda/shared-types';
import { useState } from 'react';

interface ScreenplayViewerProps {
  screenplay: Screenplay;
}

export function ScreenplayViewer({ screenplay }: ScreenplayViewerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'cast' | 'scenes'>('overview');

  const tabs = [
    { id: 'overview' as const, label: '📋 Ringkasan' },
    { id: 'cast'     as const, label: '🧑 Pemeran' },
    { id: 'scenes'   as const, label: `🎬 Scene (${screenplay.scenes.length})` },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {tabs.map((tab) => (
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

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-card border p-4">
            <h3 className="font-bold text-lg">{screenplay.title}</h3>
            <p className="text-muted-foreground text-sm mt-1 italic">"{screenplay.logline}"</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              <Chip>{screenplay.genre}</Chip>
              <Chip>{screenplay.era}</Chip>
              <Chip>{screenplay.setting}</Chip>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard title="Konflik Utama" text={screenplay.conflict} />
            <InfoCard title="Tema Musik" text={screenplay.musicTheme} />
            <InfoCard title="Catatan Kostum" text={screenplay.wardrobeNotes} />
          </div>
          <div className="rounded-lg border bg-card p-4 flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Plot Outline</h4>
            <PlotItem label="📖 Pembuka"       text={screenplay.plotOutline.pembuka} />
            <PlotItem label="📈 Rising Action" text={screenplay.plotOutline.risingAction} />
            <PlotItem label="⚡ Klimaks"       text={screenplay.plotOutline.klimaks} />
            <PlotItem label="🌅 Resolusi"      text={screenplay.plotOutline.resolusi} />
          </div>
        </div>
      )}

      {/* Cast */}
      {activeTab === 'cast' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {screenplay.actors.map((actor) => (
            <div key={actor.name} className="rounded-lg border bg-card p-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧑</span>
                <div>
                  <p className="font-semibold text-sm">{actor.name}</p>
                  <p className="text-xs text-muted-foreground">{actor.role}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{actor.persona}</p>
              <div className="mt-1 flex flex-col gap-0.5">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Kostum</span>
                <p className="text-xs">{actor.costume}</p>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Suara</span>
                <p className="text-xs">{actor.voiceDescription}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scenes */}
      {activeTab === 'scenes' && (
        <div className="flex flex-col gap-3">
          {screenplay.scenes.map((scene) => (
            <div key={scene.sceneNumber} className="rounded-lg border bg-card p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 justify-between">
                <span className="font-semibold text-sm">
                  Scene {scene.sceneNumber} — {scene.title}
                </span>
                <span className="text-xs text-muted-foreground">{scene.durationSeconds}s</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Chip>{scene.setting}</Chip>
                <Chip>{scene.timeOfDay}</Chip>
                <Chip>🎵 {scene.musicMood}</Chip>
              </div>
              <p className="text-xs text-muted-foreground">{scene.action}</p>
              <div className="border-l-2 border-primary/30 pl-3">
                <p className="text-[11px] text-muted-foreground italic">VO: "{scene.voiceOver}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] text-secondary-foreground">
      {children}
    </span>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border bg-card p-3 flex flex-col gap-1">
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{title}</span>
      <p className="text-xs">{text}</p>
    </div>
  );
}

function PlotItem({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-semibold">{label}</span>
      <p className="text-xs text-muted-foreground">{text}</p>
    </div>
  );
}
