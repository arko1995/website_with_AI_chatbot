import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Loading from '../components/Loading.jsx';
import { api } from '../api.js';

export default function InsightsPage() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api.content().then(setContent).catch((e) => setError(e.message)); }, []);
  if (error) return <Loading label={error} />;
  if (!content) return <Loading />;

  return <main><Header/><section className="inner-hero shell"><div className="eyebrow"><span>JOURNAL</span>SKYLINE INSIGHTS</div><h1>Decisions before drawings.</h1><p>Practical notes on architecture, development, project preparation, visualization and cost strategy.</p></section><section className="shell archive-grid">{content.posts.map((post) => <Link className="post-card archive-card" to={`/insights/${post.slug}`} key={post.slug}><span className="post-category">{post.category}</span><h2>{post.title}</h2><p>{post.excerpt}</p><div><span>{post.publishedAt} · {post.readingTime}</span><span>Read ↗</span></div></Link>)}</section><Footer location={content.settings.location}/></main>;
}
