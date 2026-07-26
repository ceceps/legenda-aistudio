import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '@/store/projectStore';
import { api } from '@/api/client';

export function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const { currentProject, setCurrentProject, isLoading, setLoading } = useProjectStore();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.projects.get(id).then((res) => {
      if (res.success && res.data) setCurrentProject(res.data);
      setLoading(false);
    });
  }, [id, setCurrentProject, setLoading]);

  if (isLoading) return <p className="text-muted-foreground">Memuat...</p>;
  if (!currentProject) return <p className="text-muted-foreground">Project tidak ditemukan.</p>;

  const { finalVideoUrl, driveShareLink, title } = currentProject;

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{title}</h1>

      {finalVideoUrl ? (
        <>
          <video
            controls
            className="w-full rounded-xl border bg-black aspect-video"
            src={finalVideoUrl}
          />
          <div className="flex gap-3">
            <a
              href={finalVideoUrl}
              download
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ⬇ Download Video
            </a>
            {driveShareLink && (
              <a
                href={driveShareLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Buka di Google Drive
              </a>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          Video belum selesai diproses.
        </div>
      )}
    </div>
  );
}
