import { Link } from 'react-router-dom';
import { Film, Sparkles, Clapperboard, Music, Video } from 'lucide-react';

const steps = [
  { icon: Sparkles, label: 'Input Ide Cerita', desc: 'Masukkan ide, tokoh, gaya, latar, dan plot' },
  { icon: Film, label: 'Generate Naskah', desc: 'Gemini AI membuat screenplay lengkap' },
  { icon: Clapperboard, label: 'Storyboard & Aset', desc: 'Karakter, background, dan storyboard per scene' },
  { icon: Music, label: 'Musik & Audio', desc: 'Soundtrack, backsound, dan voice over via Suno' },
  { icon: Video, label: 'Video Final', desc: 'Semua scene digabung jadi video 3+ menit' },
];

export function HomePage() {
  return (
    <div className="flex flex-col items-center gap-12">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Dari Ide ke Video dalam Satu Klik
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Masukkan master prompt cerita kamu — Legenda AI Studio akan menghasilkan naskah, aset visual,
          musik, storyboard, hingga video final secara otomatis.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Mulai Buat Cerita
        </Link>
      </section>

      <section className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-center mb-8">Pipeline Otomatis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {steps.map(({ icon: Icon, label, desc }, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg border bg-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-medium text-sm">{label}</span>
              <span className="text-xs text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
