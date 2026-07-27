import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryStyle, HistoricalEra, ProjectStatus, type MasterPromptInput, type Screenplay } from '@legenda/shared-types';
import { api } from '@/api/client';
import { useProjectStore } from '@/store/projectStore';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  const [showEditor, setShowEditor] = useState(false);
  const [generationStep, setGenerationStep] = useState<'idle' | 'generating' | 'complete' | 'error'>('idle');
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hasil cerita AI akan muncul di sini setelah generate...</p>',
    editable: false,
  });

  const set = <K extends keyof MasterPromptInput>(key: K, value: MasterPromptInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGenerationStep('generating');
    setPipelineStatus(ProjectStatus.STORY_GENERATING);
    setPipelineProgress(10);
    setPipelineMessage('Membuat project...');

    try {
      // 1. Create project first
      const projectRes = await api.projects.create(form);
      if (!projectRes.success || !projectRes.data) {
        throw new Error(projectRes.error ?? 'Gagal membuat project');
      }

      const project = projectRes.data;
      setCurrentProject(project);
      setProjectId(project.id);
      setPipelineProgress(20);
      setPipelineMessage('Project dibuat. Menghubungkan ke Gemini AI...');

      // 2. Generate story directly via API (no worker, no WS)
      setPipelineProgress(30);
      setPipelineMessage('Menghubungi Gemini AI...');

      const storyRes = await api.story.generate({ ...form, projectId: project.id });

      if (!storyRes.success || !storyRes.data) {
        throw new Error(storyRes.error ?? 'Gagal generate story');
      }

      setPipelineProgress(60);
      setPipelineMessage('Hasil diterima. Menyiapkan editor...');

      // 3. Save markdown to state for TipTap
      const markdown = storyRes.data.markdown;
      setGeneratedMarkdown(markdown);
      setShowEditor(true);

      // Convert markdown to HTML for TipTap
      const html = markdownToHtml(markdown);
      if (editor) {
        editor.commands.setContent(html);
      }

      // 4. Complete
      setPipelineStatus(ProjectStatus.STORY_DONE);
      setPipelineProgress(100);
      setPipelineMessage('Generate story selesai! Silakan review di editor.');
      setGenerationStep('complete');
      setLoading(false);

      // Optionally navigate to project page after a delay
      setTimeout(() => {
        navigate(`/project/${project.id}`);
      }, 1500);
    } catch (err: any) {
      setPipelineStatus(ProjectStatus.FAILED);
      setPipelineProgress(0);
      setPipelineMessage('Gagal memproses.');
      setGenerationStep('error');
      setError(err.message);
      setLoading(false);
    }
  };

  const isFormDisabled = isLoading || generationStep === 'generating';

  return (
    <div className="flex gap-6 min-h-[calc(100vh-80px)]">
      {/* ── Sidebar Kiri: Form ── */}
      <aside className="w-full max-w-md shrink-0">
        <div className="page-card p-6 h-full">
          <h1 className="text-2xl font-bold mb-1">Buat Cerita Baru</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Isi prompt cerita, lalu klik Generate. Progress akan tampil di kanan.
          </p>

          <fieldset
            disabled={isFormDisabled}
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
              disabled={isFormDisabled}
              className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {generationStep === 'generating' ? 'Memproses...' : '✨ Generate Cerita'}
            </button>
          </div>

          {/* Response message below button */}
          {pipelineMessage && (
            <div className={`mt-4 p-3 rounded-xl text-sm transition-all ${
              generationStep === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : generationStep === 'complete'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {generationStep === 'error'
                    ? '❌ Error'
                    : generationStep === 'complete'
                    ? '✅ Selesai'
                    : '⏳ Proses...'}
                </span>
              </div>
              <div className="mt-1 text-sm">
                {simplifyMessage(pipelineMessage)}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Panel Kanan: Progress + Editor ── */}
      <section className="flex-1">
        <div className="page-card p-6 h-full flex flex-col">
          {/* Progress Section */}
          <div className="mb-5 flex-shrink-0">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Progres Live</p>
            <h2 className="text-xl font-semibold">Generate Story</h2>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {/* Section 1: Progress */}
            <div className="shrink-0">
              <PipelineProgress
                currentStatus={generationStep === 'generating' ? ProjectStatus.STORY_GENERATING : ProjectStatus.DRAFT}
                progress={pipelineProgress}
                message={pipelineMessage}
              />
            </div>

            {/* Section 2: TipTap Editor (show when done) */}
            {showEditor && generatedMarkdown && (
              <div className="flex-1 border rounded-3xl bg-background overflow-hidden flex flex-col">
                <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Hasil Generate Story (Markdown Preview)</h3>
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedMarkdown)}
                    className="text-xs text-primary hover:underline"
                  >
                    Copy Markdown
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto prose max-w-none">
                  <MarkdownRenderer markdown={generatedMarkdown} />
                </div>
              </div>
            )}
          </div>
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

// Simple markdown renderer for preview
function MarkdownRenderer({ markdown }: { markdown: string }) {
  const html = markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br/>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function simplifyMessage(message: string): string {
  // Extract key info from long technical messages
  if (message.includes('Gemini') || message.includes('generativelanguage')) {
    return 'Menghubungi AI...';
  }
  if (message.includes('Membuat project')) return 'Membuat project...';
  if (message.includes('Menghubungkan')) return 'Menghubungkan ke AI...';
  if (message.includes('Menyimpan')) return 'Menyimpan hasil...';
  if (message.includes('Selesai')) return 'Generate story selesai!';
  if (message.includes('Error') || message.includes('Gagal')) return message;
  return message.length > 60 ? message.slice(0, 60) + '...' : message;
}

function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br/>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}