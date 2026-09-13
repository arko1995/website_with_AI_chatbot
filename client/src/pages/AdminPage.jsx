import { useEffect, useState } from 'react';
import { api } from '../api.js';

const emptyPost = { slug: '', title: '', excerpt: '', category: 'Project Guides', publishedAt: new Date().toISOString().slice(0,10), readingTime: '5 min', body: [''] };

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [content, setContent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('Enter the admin key to load content.');

  useEffect(() => { setKey(sessionStorage.getItem('skyline-admin-key') || ''); }, []);

  async function load() {
    setStatus('Loading…');
    try {
      const data = await api.adminGet(key);
      sessionStorage.setItem('skyline-admin-key', key);
      setContent(data);
      setStatus('Content loaded.');
    } catch (error) { setStatus(error.message); }
  }

  async function save(next = content) {
    setStatus('Saving…');
    try {
      await api.adminSave(key, next);
      setContent(next);
      setStatus('Saved.');
    } catch (error) { setStatus(error.message); }
  }

  function editPost(index, patch) {
    const next = structuredClone(content);
    next.posts[index] = { ...next.posts[index], ...patch };
    setContent(next);
  }

  function newPost() {
    const next = structuredClone(content);
    next.posts.unshift({ ...emptyPost, slug: `new-post-${Date.now()}` });
    setContent(next);
    setSelected(0);
  }

  function removePost(index) {
    const next = structuredClone(content);
    next.posts.splice(index, 1);
    setContent(next);
    setSelected(null);
  }

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <a className="brand" href="/"><span className="brand-mark">S</span><span>SKYLINE<span className="muted">DB3</span></span></a>
        <div className="admin-auth"><label>Admin key<input type="password" value={key} onChange={(e)=>setKey(e.target.value)} placeholder="ADMIN_KEY"/></label><button onClick={load}>Load content</button></div>
        {content && <><div className="admin-nav-title">BLOG POSTS <button onClick={newPost}>＋</button></div><nav className="admin-post-list">{content.posts.map((p,i)=><button className={selected===i?'active':''} key={`${p.slug}-${i}`} onClick={()=>setSelected(i)}><small>{p.category}</small>{p.title || 'Untitled'}</button>)}</nav></>}
      </aside>
      <section className="admin-main">
        <div className="admin-top"><div><small>CONTENT STUDIO</small><h1>SkylineDB3 Admin</h1></div><span>{status}</span></div>
        {!content && <div className="admin-empty"><h2>Dynamic content, still plain MERN.</h2><p>The Express API reads and writes MongoDB when configured. For local demos without MongoDB it falls back to <code>server/data/content.json</code>.</p></div>}
        {content && selected === null && <div className="admin-empty"><h2>Select a post to edit.</h2><p>The public insights pages read from the same Express API, so saved content is available immediately.</p><button className="button button-dark" onClick={newPost}>Create a post</button></div>}
        {content && selected !== null && content.posts[selected] && <div className="editor-form"><div className="editor-toolbar"><div><small>EDITING POST</small><h2>{content.posts[selected].title || 'Untitled post'}</h2></div><div><button className="danger" onClick={()=>removePost(selected)}>Delete</button><button className="save" onClick={()=>save()}>Save changes</button></div></div><div className="editor-grid"><label className="wide">Title<input value={content.posts[selected].title} onChange={e=>editPost(selected,{title:e.target.value})}/></label><label>Slug<input value={content.posts[selected].slug} onChange={e=>editPost(selected,{slug:e.target.value})}/></label><label>Category<input value={content.posts[selected].category} onChange={e=>editPost(selected,{category:e.target.value})}/></label><label>Published date<input type="date" value={content.posts[selected].publishedAt} onChange={e=>editPost(selected,{publishedAt:e.target.value})}/></label><label>Reading time<input value={content.posts[selected].readingTime} onChange={e=>editPost(selected,{readingTime:e.target.value})}/></label><label className="wide">Excerpt<textarea rows="3" value={content.posts[selected].excerpt} onChange={e=>editPost(selected,{excerpt:e.target.value})}/></label><label className="wide">Article body <small>Separate paragraphs with a blank line.</small><textarea rows="15" value={content.posts[selected].body.join('\n\n')} onChange={e=>editPost(selected,{body:e.target.value.split(/\n\s*\n/).filter(Boolean)})}/></label></div></div>}
      </section>
    </main>
  );
}
