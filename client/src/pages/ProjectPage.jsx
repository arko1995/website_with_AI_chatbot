import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProjectVisual from '../components/ProjectVisual.jsx';
import Loading from '../components/Loading.jsx';
import { api } from '../api.js';

export default function ProjectPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api.project(slug).then(setData).catch((e) => setError(e.message)); }, [slug]);
  if (error) return <Loading label={error} />;
  if (!data) return <Loading />;
  const { project, settings } = data;
  return <main><Header/><section className="detail-hero shell"><div className="eyebrow"><span>WORK</span>{project.type}</div><h1>{project.name}</h1><p>{project.tagline}</p></section><section className="project-detail shell"><ProjectVisual type={project.visual} label={project.name}/><div className="project-facts"><span>SCOPE</span><strong>{project.metric}</strong><p>This project page is intentionally structured so the client can replace the abstract placeholder with real renders, plans, photography and a concise case-study narrative.</p><a className="button button-dark" href="/#contact">Start a similar project ↗</a></div></section><Footer location={settings.location}/></main>;
}
