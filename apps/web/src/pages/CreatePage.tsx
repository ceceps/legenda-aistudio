import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryStyle, HistoricalEra, type MasterPromptInput } from '@legenda/shared-types';
import { api } from '@/api/client';
import { useProjectStore } from '@/store/projectStore';

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

  const set = <K extends keyof MasterPromptInput>(key: K, value: MasterPromptInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await api.projects.create(form);
    setLoading(false);
    if (res.success && res.data) {
      setCurrentProject(res.data);
      navigate(`/project/${res.data.id}`);
    } else {
      setError(res.error ?? 'Gagal membuat project');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Buat Cerita Baru</h1>
      <p className="text-muted-foreground mb-8">
        Isi master prompt di bawah — AI akan menghasilkan naskah lengkap dan video otomatis.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* IDE */}
        <Field label="Ide Cerita" required>
          <textarea
            className="input min-h-[80px]"
            placeholder="Contoh: Legenda kesatria yang melindungi rakyat dari penjajah..."
            value={form.ide}
            onChange={(e) => set('ide', e.target.value)}
            required
          />
        </Field>

        {/* GAYA */}
        <Field label="Gaya Cerita" required>
          <select className="input" value={form.gaya} onChange={(e) => set('gaya', e.target.value as StoryStyle)} required>
            {GAYA_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          {/* TOKOH UTAMA */}
          <Field label="Tokoh Utama" required>
            <input
              className="input"
              placeholder="Contoh: Si Jampang"
              value={form.tokohUtama}
              onChange={(e) => set('tokohUtama', e.target.value)}
              required
            />
          </Field>

          {/* ASAL DAERAH */}
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
          {/* LATAR */}
          <Field label="Latar Waktu" required>
            <select className="input" value={form.latar} onChange={(e) => set('latar', e.target.value as HistoricalEra)} required>
              {LATAR_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          {/* LATAR DETAIL */}
          <Field label="Detail Latar (opsional)">
            <input
              className="input"
              placeholder="Contoh: Abad ke-18"
              value={form.latarDetail ?? ''}
              onChange={(e) => set('latarDetail', e.target.value)}
            />
          </Field>
        </div>

        {/* PLOT */}
        <Field label="Plot / Konflik Utama" required>
          <textarea
            className="input min-h-[80px]"
            placeholder="Contoh: Si Jampang harus mengalahkan tuan tanah kejam yang menindas rakyat Betawi..."
            value={form.plot}
            onChange={(e) => set('plot', e.target.value)}
            required
          />
        </Field>

        {error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Memproses...' : '✨ Generate Cerita & Pipeline'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}
