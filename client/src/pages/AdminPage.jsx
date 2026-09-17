import { useEffect, useState } from 'react';
import { api } from '../api.js';
import '../admin.css';

const emptyPost = {
  slug: '', title: '', excerpt: '', category: 'Project Guides',
  publishedAt: new Date().toISOString().slice(0, 10), readingTime: '5 min', body: ['']
};

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState(null);
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('blog');
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.me()
      .then((data) => { setUser(data.user); return loadAdminData(); })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  async function loadAdminData() {
    const [contentData, leadData] = await Promise.all([api.adminGet(), api.adminLeads()]);
    setContent(contentData);
    setLeads(leadData.leads || []);
  }

  async function login(event) {
    event.preventDefault();
    setStatus('Signing in…');
    try {
      const data = await api.login(email, password);
      setUser(data.user);
      setPassword('');
      await loadAdminData();
      setStatus('');
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function logout() {
    await api.logout();
    setUser(null);
    setContent(null);
    setLeads([]);
    setSelected(null);
  }

  async function save(next = content) {
    setStatus('Saving…');
    try {
      await api.adminSave(next);
      setContent(next);
      setStatus('Saved.');
    } catch (error) {
      setStatus(error.message);
    }
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
    setTab('blog');
  }

  async function removePost(index) {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    const next = structuredClone(content);
    next.posts.splice(index, 1);
    setSelected(null);
    await save(next);
  }

  if (checking) return <main className="admin-login"><div className="admin-login-card"><p>Checking admin session…</p></div></main>;

  if (!user) {
    return (
      <main className="admin-login">
        <form className="admin-login-card" onSubmit={login}>
          <a className="brand" href={import.meta.env.BASE_URL}><span className="brand-mark">S</span><span>SKYLINE<span className="muted">DB3</span></span></a>
          <div><small>ADMIN PORTAL</small><h1>Sign in</h1><p>Manage website articles and incoming project leads.</p></div>
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
          <button className="button button-dark" type="submit">Sign in</button>
          {status && <p>{status}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <a className="brand" href={import.meta.env.BASE_URL}><span className="brand-mark">S</span><span>SKYLINE<span className="muted">DB3</span></span></a>
        <div className="admin-auth"><small>Signed in as</small><strong>{user.email}</strong><button onClick={logout}>Log out</button></div>
        <div className="admin-nav-title">ADMIN</div>
        <nav className="admin-post-list">
          <button className={tab === 'blog' ? 'active' : ''} onClick={() => { setTab('blog'); setSelected(null); }}>Blog posts ({content?.posts?.length || 0})</button>
          <button className={tab === 'leads' ? 'active' : ''} onClick={() => { setTab('leads'); setSelected(null); }}>Leads ({leads.length})</button>
        </nav>
        {tab === 'blog' && content && <><div className="admin-nav-title">POSTS <button onClick={newPost}>＋</button></div><nav className="admin-post-list">{content.posts.map((p, i) => <button className={selected === i ? 'active' : ''} key={`${p.slug}-${i}`} onClick={() => setSelected(i)}><small>{p.category}</small>{p.title || 'Untitled'}</button>)}</nav></>}
      </aside>

      <section className="admin-main">
        <div className="admin-top"><div><small>CONTENT STUDIO</small><h1>SkylineDB3 Admin</h1></div><span>{status}</span></div>

        {tab === 'blog' && content && selected === null && <div className="admin-empty"><h2>Blog management</h2><p>Create, edit and delete articles shown in Insights.</p><button className="button button-dark" onClick={newPost}>Create a post</button></div>}

        {tab === 'blog' && content && selected !== null && content.posts[selected] && (
          <div className="editor-form">
            <div className="editor-toolbar"><div><small>EDITING POST</small><h2>{content.posts[selected].title || 'Untitled post'}</h2></div><div><button className="danger" onClick={() => removePost(selected)}>Delete</button><button className="save" onClick={() => save()}>Save changes</button></div></div>
            <div className="editor-grid">
              <label className="wide">Title<input value={content.posts[selected].title} onChange={(e) => editPost(selected, { title: e.target.value })} /></label>
              <label>Slug<input value={content.posts[selected].slug} onChange={(e) => editPost(selected, { slug: e.target.value })} /></label>
              <label>Category<input value={content.posts[selected].category} onChange={(e) => editPost(selected, { category: e.target.value })} /></label>
              <label>Published date<input type="date" value={content.posts[selected].publishedAt} onChange={(e) => editPost(selected, { publishedAt: e.target.value })} /></label>
              <label>Reading time<input value={content.posts[selected].readingTime} onChange={(e) => editPost(selected, { readingTime: e.target.value })} /></label>
              <label className="wide">Excerpt<textarea rows="3" value={content.posts[selected].excerpt} onChange={(e) => editPost(selected, { excerpt: e.target.value })} /></label>
              <label className="wide">Article body <small>Separate paragraphs with a blank line.</small><textarea rows="15" value={content.posts[selected].body.join('\n\n')} onChange={(e) => editPost(selected, { body: e.target.value.split(/\n\s*\n/).filter(Boolean) })} /></label>
            </div>
          </div>
        )}

        {tab === 'leads' && <div className="editor-form"><div className="editor-toolbar"><div><small>INCOMING</small><h2>Project leads</h2></div></div>{leads.length === 0 ? <p>No leads yet.</p> : <div className="lead-table">{leads.map((lead) => <article className="lead-row" key={lead._id}><div><strong>{lead.projectType || 'Project inquiry'}</strong><small>{lead.source || 'Website'}</small></div><div>{lead.location || 'Location not provided'}</div><div>{lead.service || 'Service not specified'}</div><time>{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ''}</time></article>)}</div>}</div>}
      </section>
    </main>
  );
}
