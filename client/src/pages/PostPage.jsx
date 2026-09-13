import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Loading from '../components/Loading.jsx';
import { api } from '../api.js';
import { whatsappLink } from '../utils.js';

export default function PostPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api.post(slug).then(setData).catch((e) => setError(e.message)); }, [slug]);
  if (error) return <Loading label={error} />;
  if (!data) return <Loading />;
  const { post, settings } = data;
  const message = `Hi SkylineDB3, I read “${post.title}” on your website and would like to discuss a project.`;
  const href = whatsappLink(settings.whatsappNumber, message);
  return <main><Header/><article className="article shell"><header><span className="post-category">{post.category}</span><h1>{post.title}</h1><p className="article-deck">{post.excerpt}</p><div className="article-meta">{post.publishedAt} · {post.readingTime}</div></header><div className="article-body">{post.body.map((p,i)=><p key={i}>{p}</p>)}</div><div className="article-cta" id="contact"><small>PLANNING SOMETHING SIMILAR?</small><h2>Turn the question into a project conversation.</h2><a className={`button button-lime ${!settings.whatsappNumber ? 'disabled-link' : ''}`} href={href} target={settings.whatsappNumber ? '_blank' : undefined} rel="noreferrer">Discuss it on WhatsApp ↗</a></div></article><Footer location={settings.location}/></main>;
}
