import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { CreatePage } from '@/pages/CreatePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectPage } from '@/pages/ProjectPage';
import { StoryboardPage } from '@/pages/StoryboardPage';
import { PreviewPage } from '@/pages/PreviewPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/project/:id/storyboard" element={<StoryboardPage />} />
        <Route path="/project/:id/preview" element={<PreviewPage />} />
      </Routes>
    </Layout>
  );
}
