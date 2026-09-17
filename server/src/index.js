import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase, databaseConnected } from './db.js';
import { Lead } from './models.js';
import { getContent, saveContent } from './store.js';
import { askPythonAgent, fallbackReply } from './chat.js';
import {
  authenticateAdmin,
  clearAdminSessionCookie,
  createAdminSession,
  ensureInitialAdmin,
  requireAdmin,
  setAdminSessionCookie
} from './auth.js';

const app = express();
const port = Number(process.env.PORT || 5000);
const host = process.env.HOST || '127.0.0.1';
const here = path.dirname(fileURLToPath(import.meta.url));

app.set('trust proxy', 1);
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mongo: databaseConnected(), pythonAgentConfigured: Boolean(process.env.PYTHON_AGENT_URL) });
});

app.get('/api/content', async (req, res, next) => {
  try { res.json(await getContent()); } catch (error) { next(error); }
});

app.get('/api/services/:slug', async (req, res, next) => {
  try {
    const content = await getContent();
    const service = content.services.find((item) => item.slug === req.params.slug);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ service, settings: content.settings });
  } catch (error) { next(error); }
});

app.get('/api/projects/:slug', async (req, res, next) => {
  try {
    const content = await getContent();
    const project = content.projects.find((item) => item.slug === req.params.slug);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ project, settings: content.settings });
  } catch (error) { next(error); }
});

app.get('/api/posts/:slug', async (req, res, next) => {
  try {
    const content = await getContent();
    const post = content.posts.find((item) => item.slug === req.params.slug);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ post, settings: content.settings });
  } catch (error) { next(error); }
});

app.post('/api/leads', async (req, res, next) => {
  try {
    const lead = { ...req.body, createdAt: new Date() };
    if (databaseConnected()) {
      await Lead.create(lead);
    } else {
      console.log('[lead][demo-mode]', JSON.stringify(lead));
    }
    res.status(201).json({ ok: true });
  } catch (error) { next(error); }
});

app.post('/api/chat', async (req, res, next) => {
  try {
    const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
    const content = await getContent();
    const agentReply = await askPythonAgent(messages, content);
    if (agentReply) return res.json({ reply: agentReply, source: 'python' });
    const last = messages.at(-1)?.content || '';
    res.json({ reply: fallbackReply(last), source: 'node-fallback' });
  } catch (error) { next(error); }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const user = await authenticateAdmin(req.body?.email, req.body?.password);
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
    setAdminSessionCookie(res, createAdminSession(user));
    res.json({ user: { email: user.email, role: user.role } });
  } catch (error) { next(error); }
});

app.post('/api/auth/logout', (req, res) => {
  clearAdminSessionCookie(res);
  res.json({ ok: true });
});

app.get('/api/auth/me', requireAdmin, (req, res) => {
  res.json({ user: { email: req.admin.email, role: 'admin' } });
});

app.get('/api/admin/content', requireAdmin, async (req, res, next) => {
  try { res.json(await getContent()); } catch (error) { next(error); }
});

app.put('/api/admin/content', requireAdmin, async (req, res, next) => {
  const incoming = req.body;
  if (!incoming || !Array.isArray(incoming.posts) || !Array.isArray(incoming.services) || !Array.isArray(incoming.projects)) {
    return res.status(400).json({ error: 'Invalid content payload.' });
  }
  try {
    await saveContent(incoming);
    res.json({ ok: true });
  } catch (error) { next(error); }
});

app.get('/api/admin/leads', requireAdmin, async (req, res, next) => {
  try {
    if (!databaseConnected()) return res.json({ leads: [] });
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(250).lean();
    res.json({ leads });
  } catch (error) { next(error); }
});

const clientDist = path.resolve(here, '../../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (error) => error && next());
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message });
});

await connectDatabase();
await ensureInitialAdmin();
app.listen(port, host, () => console.log(`[server] http://${host}:${port}`));
