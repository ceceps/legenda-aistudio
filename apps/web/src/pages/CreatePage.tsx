import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryStyle, HistoricalEra, type MasterPromptInput } from '@legenda/shared-types';
import { api } from '@/api/client';
import { useProjectStore } from '@/store/projectStore';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import DOMPurify from 'dompurify';
import {
  Bold,
  Italic,
  Strikethrough,
  Type,
  List as ListIcon,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

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
  const [activeStep, setActiveStep] = useState(0);
  const [generatedScreenplay, setGeneratedScreenplay] = useState<string>('');
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [activeScene, setActiveScene] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: generatedHtml || '<p>Hasil cerita AI akan muncul di sini setelah generate...</p>',
    onUpdate: ({ editor }) => setGeneratedHtml(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && generatedHtml) {
      editor.commands.setContent(generatedHtml);
    }
  }, [generatedHtml, editor]);

  const steps = [
    'Cerita',
    'Scene',
    'Aktor & Utility',
    'Storyboard',
    'Sound Track',
    'Video per Scene',
    'Video Akhir',
  ];

  const outputSmall = steps[activeStep];
  const outputHeading = `Hasil ${steps[activeStep]}`;

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
      const screenplayText = res.data.screenplay
        ? JSON.stringify(res.data.screenplay, null, 2)
        : '';
      setGeneratedScreenplay(screenplayText);
      setGeneratedHtml(
        `<div><h2>${res.data.title}</h2><p>${res.data.masterPrompt.plot}</p><div>${screenplayText
          .replace(/\n/g, '<br/>')
          .replace(/\s\s+/g, ' ')}</div></div>`,
      );
      navigate(`/project/${res.data.id}`);
    } else {
      setError(res.error ?? 'Gagal membuat project');
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="page-step grid grid-cols-7 gap-3">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`flex flex-col items-start rounded-3xl border px-4 py-3 text-left transition ${
                activeStep === index ? 'page-step-active' : 'bg-background/70'
              }`}
            >
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mt-2 text-sm font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <aside className="col-span-12 lg:col-span-5">
        <div className="page-card p-6">
          <h1 className="text-2xl font-bold mb-2">Buat Cerita Baru</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Gunakan panel ini untuk memasukkan prompt cerita. Hasil AI akan muncul di panel kanan.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Ide Cerita" required>
              <textarea
                className="input min-h-[100px]"
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
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
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
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
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

            {error && (
              <div className="rounded-3xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading ? 'Memproses...' : '✨ Generate Cerita'}
              </button>
            </div>
          </form>
        </div>
      </aside>

      <section className="col-span-12 lg:col-span-7 space-y-6">
        <div className="page-card p-6 min-h-[calc(100vh-220px)]">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                {outputSmall}
              </p>
              <h2 className="text-xl font-semibold">{outputHeading}</h2>
            </div>
            <div className="rounded-full border border-input/30 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
              Step {activeStep + 1} dari {steps.length}
            </div>
          </div>

          {activeStep === 0 && (
            <div className="space-y-4">
              <div className="rounded-3xl border border-input/30 bg-background/80 p-4 shadow-sm">
                {/** TipTap editor with toolbar */}
                <div className="mb-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    aria-label="Bold"
                    className={`rounded p-2 ${editor?.isActive('bold') ? 'bg-primary/20' : 'bg-background/60'}`}
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    aria-label="Italic"
                    className={`rounded p-2 ${editor?.isActive('italic') ? 'bg-primary/20' : 'bg-background/60'}`}
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    aria-label="Strikethrough"
                    className={`rounded p-2 ${editor?.isActive('strike') ? 'bg-primary/20' : 'bg-background/60'}`}
                  >
                    <Strikethrough className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    aria-label="Heading"
                    className={`rounded p-2 ${editor?.isActive('heading', { level: 2 }) ? 'bg-primary/20' : 'bg-background/60'}`}
                  >
                    <Type className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    aria-label="Bullet list"
                    className={`rounded p-2 ${editor?.isActive('bulletList') ? 'bg-primary/20' : 'bg-background/60'}`}
                  >
                    <ListIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    aria-label="Ordered list"
                    className={`rounded p-2 ${editor?.isActive('orderedList') ? 'bg-primary/20' : 'bg-background/60'}`}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    aria-label="Blockquote"
                    className={`rounded p-2 ${editor?.isActive('blockquote') ? 'bg-primary/20' : 'bg-background/60'}`}
                  >
                    <Quote className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.prompt('Masukkan URL');
                      if (url) editor?.chain().focus().setLink({ href: url }).run();
                    }}
                    aria-label="Link"
                    className={`rounded p-2 ${editor?.isActive('link') ? 'bg-primary/20' : 'bg-background/60'}`}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().undo().run()}
                    aria-label="Undo"
                    className="rounded p-2 bg-background/60"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().redo().run()}
                    aria-label="Redo"
                    className="rounded p-2 bg-background/60"
                  >
                    <RotateCw className="h-4 w-4" />
                  </button>
                </div>
                <EditorContent
                  editor={editor}
                  className="min-h-[420px] rounded-3xl bg-background prose"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!editor) return;
                    const raw = editor.getHTML();
                    const clean = DOMPurify.sanitize(raw);
                    setGeneratedHtml(clean);
                  }}
                  className="rounded-full border border-input/30 bg-background px-5 py-3 text-sm text-foreground transition hover:border-primary"
                >
                  Simpan (sanitize)
                </button>
                <button
                  type="button"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Simpan & Next
                </button>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-3xl border border-input/30 bg-background/80 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold">Scene 1</p>
                  <p className="text-sm text-muted-foreground">
                    Pengantar cerita dan latar belakang karakter utama.
                  </p>
                </div>
                <button className="ml-auto rounded-full border border-input/30 bg-background px-3 py-1 text-xs text-muted-foreground transition hover:border-primary">
                  Edit
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-input/30 bg-background/80 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold">Scene 2</p>
                  <p className="text-sm text-muted-foreground">
                    Konflik mulai meningkat dan pilihan tokoh utama diuji.
                  </p>
                </div>
                <button className="ml-auto rounded-full border border-input/30 bg-background px-3 py-1 text-xs text-muted-foreground transition hover:border-primary">
                  Edit
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-input/30 bg-background/80 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold">Scene 3</p>
                  <p className="text-sm text-muted-foreground">Klimaks dan resolusi cerita.</p>
                </div>
                <button className="ml-auto rounded-full border border-input/30 bg-background px-3 py-1 text-xs text-muted-foreground transition hover:border-primary">
                  Edit
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Simpan & Next
                </button>
              </div>
            </div>
          )}

          {activeStep >= 2 && (
            <div className="rounded-3xl border border-input/30 bg-background/80 p-8 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-3">Tahap {steps[activeStep]}</p>
              <p>Konten untuk tahap ini akan tersedia nanti.</p>
            </div>
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
