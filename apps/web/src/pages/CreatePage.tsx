import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryStyle, HistoricalEra, ProjectStatus, type MasterPromptInput } from '@legenda/shared-types';
import { api } from '@/api/client';
import { useProjectStore } from '@/store/projectStore';
import { PipelineProgress } from '@/components/pipeline/PipelineProgress';

const GAYA_OPTIONS: { value: StoryStyle; label: string }[] = [
  { value: StoryStyle.KLASIK, label: 'Klasik' },
  { value: StoryStyle.SAAT_INI, label: 'Saat Ini' },
  { value: StoryStyle.FUTURISTIK, label: 'Futuristik' },
  { value: StoryStyle.SUPER_HERO, label: 'Super Hero' },
];

const LATAR_OPTIONS: { value: HistoricalEra; label: string }[] = [
  { value: HistoricalEra.SEBELUM_MASEHI, label: 'Sebelum Masehi' },
  { value: HistoricalEra.MASEHI, label: 'Masehi' },
];

const DEFAULT_FORM: MasterPromptInput = {
  ide: '',
  gaya: StoryStyle.KLASIK,
  tokohUtama: '',
  asalDaerah: '',
  latar: HistoricalEra.MASEHI,
  latarDetail: '',
  plot: '',
};

export function CreatePage() {
  const navigate = useNavigate();
  const { setCurrentProject, setLoading, setError, isLoading, error } = useProjectStore();
  const [form, setForm] = useState<MasterPromptInput>(DEFAULT_FORM);
  const [pipelineStatus, setPipelineStatus] = useState<string>(ProjectStatus.DRAFT);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [pipelineMessage, setPipelineMessage] = useState('Siap memproses...');
  const [projectId, setProjectId] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Connect WS setelah project dibuat, tunggu sampai COMPLETED/FAILED
  useEffect(() => {
    if (!projectId) return;

    const ws = new WebSocket(`ws://${window.location.host}/ws?projectId=${projectId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setPipelineMessage('Terhubung — pipeline berjalan...');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data as string);
      setPipelineStatus(data.stage);
      setPipelineProgress(data.progress ?? 0);
      setPipelineMessage(data.message ?? '');

      if (data.stage === ProjectStatus.COMPLETED) {
        ws.close();
        setLoading(false);
        navigate(`/project/${projectId}`);
      } else if (data.stage === 'FAILED') {
        ws.close();
        setLoading(false);
        setError('Pipeline gagal. Coba lagi.');
      }
    };

    ws.onerror = () => {
      setPipelineMessage('WebSocket error — pipeline tetap berjalan di server.');
    };

    return () => ws.close();
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = <K extends keyof MasterPromptInput>(key: K, value: MasterPromptInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPipelineStatus(ProjectStatus.STORY_GENERATING);
    setPipelineProgress(5);
    setPipelineMessage('Membuat project...');

    const res = await api.projects.create(form);

    if (res.success && res.data) {
      setCurrentProject(res.data);
      setProjectId(res.data.id); // trigger useEffect → WS connect
    } else {
      setLoading(false);
      setPipelineStatus(ProjectStatus.DRAFT);
      setPipelineProgress(0);
      setPipelineMessage('Gagal memproses.');
      setError(res.error ?? 'Gagal membuat project');
    }
  };

  const isRunning = isLoading || (pipelineProgress > 0 && pipelineProgress < 100);

  return (
    <div className="flex gap-6 min-h-[calc(100vh-80px)]">
      {/* ── Sidebar Kiri: Form ── */}
      <aside className="w-full max-w-md shrink-0">
        <div className="page-card p-6 h-full">
          <h1 className="text-2xl font-bold mb-1">Buat Cerita Baru</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Isi prompt cerita, lalu klik Generate. Progress pipeline akan tampil di kanan.
          </p>

          <fieldset
            disabled={isRunning}
            className="space-y-5 disabled:opacity-60 disabled:pointer-events-none transition-opacity"
          >
            <Field label="Ide Cerita" required>
              <textarea
                className="input min-h-[90px]"
                placeholder="Contoh: Legenda kesatria yang melindungi rakyat dari penjajah..."
                value={form.ide}
                onChange={(e) => set('ide', e.target.value)}
                required
              />
            </Field>

            <Field label="Gaya Cerita" required>
              <select
                className="input"
                value={form.gaya}
                onChange={(e) => set('gaya', e.target.value as StoryStyle)}
                required
              >
                {GAYA_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Tokoh Utama" required>
                <input
                  className="input"
                  placeholder="Contoh: Si Jampang"
                  value={form.tokohUtama}
                  onChange={(e) => set('tokohUtama', e.target.value)}
                  required
                />
              </Field>
              <Field label="Asal Daerah" required>
                <input
                  className="input"
                  placeholder="Contoh: Betawi"
                  value={form.asalDaerah}
                  onChange={(e) => set('asalDaerah', e.target.value)}
                  required
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Latar Waktu" required>
                <select
                  className="input"
                  value={form.latar}
                  onChange={(e) => set('latar', e.target.value as HistoricalEra)}
                  required
                >
                  {LATAR_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Detail Latar (opsional)">
                <input
                  className="input"
                  placeholder="Contoh: Abad ke-18"
                  value={form.latarDetail ?? ''}
                  onChange={(e) => set('latarDetail', e.target.value)}
                />
              </Field>
            </div>

            <Field label="Plot / Konflik Utama" required>
              <textarea
                className="input min-h-[100px]"
                placeholder="Contoh: Si Jampang harus mengalahkan tuan tanah kejam yang menindas rakyat Betawi..."
                value={form.plot}
                onChange={(e) => set('plot', e.target.value)}
                required
              />
            </Field>
          </fieldset>

          {error && (
            <div className="mt-4 rounded-3xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isRunning}
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {isRunning ? 'Memproses...' : '✨ Generate Cerita'}
            </button>
          </div>
        </div>
      </aside>

      {/* ── Panel Kanan: Pipeline ── */}
      <section className="flex-1">
        <div className="page-card p-6 h-full">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Status</p>
            <h2 className="text-xl font-semibold">Pipeline Produksi</h2>
          </div>

          {pipelineProgress === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60%] text-center gap-3 text-muted-foreground">
              <span className="text-4xl">🎬</span>
              <p className="text-sm">
                Pipeline akan berjalan setelah kamu klik <strong>Generate Cerita</strong>.
              </p>
            </div>
          ) : (
            <PipelineProgress
              currentStatus={pipelineStatus}
              progress={pipelineProgress}
              message={pipelineMessage}
            />
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}
