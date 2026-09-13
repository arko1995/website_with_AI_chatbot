import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import InsightsPage from './pages/InsightsPage.jsx';
import PostPage from './pages/PostPage.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/insights/:slug" element={<PostPage />} />
      <Route path="/services/:slug" element={<ServicePage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
