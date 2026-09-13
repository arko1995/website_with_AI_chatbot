# SkylineDB3 — MERN + Python Lead-Generation Website

No Next.js is used anywhere in this project.

## Stack

- **React + Vite** — public site, blog, admin UI and chatbot widget
- **Express + Node.js** — REST API, admin authentication, WhatsApp lead capture and AI proxy
- **MongoDB + Mongoose** — site content and leads
- **Python + FastAPI** — optional AI/RAG/agent service

The Node server is the only backend the browser talks to. The Python service is private behind Node and can be replaced with your own agent code.

## Folder structure

```text
skylinedb3-mern/
├── client/                  # React/Vite
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── api.js
│       └── styles.css
│
├── server/                  # Express/MongoDB
│   ├── data/content.json    # local demo fallback + Mongo seed
│   └── src/
│       ├── index.js         # REST routes
│       ├── db.js
│       ├── models.js
│       ├── store.js
│       └── chat.js
│
└── agent/                   # Python/FastAPI
    ├── main.py
    └── requirements.txt
```

## Request flow

```text
React (5173)
    |
    | /api/*
    v
Express (5000) -----------------> MongoDB
    |
    | POST /chat (optional)
    v
FastAPI (8000)
    |
    v
Your LLM / RAG / agent code
```

WhatsApp remains the final conversion endpoint. The AI assistant qualifies the lead and passes the conversation context into a pre-filled WhatsApp message.

## 1. Install Node dependencies

From the project root:

```bash
npm install
npm run install:all
```

You can also install manually:

```bash
cd server && npm install
cd ../client && npm install
```

## 2. Configure Express

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/skylinedb3
WHATSAPP_NUMBER=19015551234
ADMIN_KEY=replace-with-a-long-random-secret
PYTHON_AGENT_URL=http://127.0.0.1:8000/chat
```

For MongoDB Atlas, replace `MONGODB_URI` with the Atlas connection string.

### Demo mode without MongoDB

If `MONGODB_URI` is blank or MongoDB cannot be reached, the app uses:

```text
server/data/content.json
```

That means you can run the whole site before setting up MongoDB. Admin edits also write to that JSON file in demo mode.

## 3. Run the MERN app

From the root:

```bash
npm run dev
```

Or separately:

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Open:

```text
http://localhost:5173
```

Admin:

```text
http://localhost:5173/admin
```

The admin key is whatever you set as `ADMIN_KEY` in `server/.env`.

## 4. Run the optional Python AI service

The site still works without Python; Express falls back to a small rule-based project assistant.

To enable the Python service:

```bash
cd agent
python -m venv .venv
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Then:

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

`server/.env` should contain:

```env
PYTHON_AGENT_URL=http://127.0.0.1:8000/chat
```

### Plugging in your own AI agent

Open:

```text
agent/main.py
```

Replace only:

```python
def compose_reply(payload: ChatRequest) -> str:
    ...
```

with your own agent/RAG/tool-calling pipeline. Express sends the Python service:

```json
{
  "messages": [],
  "context": {
    "services": [],
    "projects": [],
    "settings": {}
  }
}
```

Return:

```json
{
  "reply": "your assistant response"
}
```

This keeps API keys and AI logic away from the React frontend.

## API overview

Public:

```text
GET  /api/health
GET  /api/content
GET  /api/services/:slug
GET  /api/projects/:slug
GET  /api/posts/:slug
POST /api/leads
POST /api/chat
```

Admin:

```text
GET /api/admin/content
PUT /api/admin/content
```

Admin routes require:

```text
x-admin-key: <ADMIN_KEY>
```

## MongoDB collections

The starter uses two collections:

```text
sitecontents
leads
```

`sitecontents` holds the editable site content in one document. That is deliberate: this is a small lead-generation site, so there is no reason to build an elaborate CMS schema yet.

`leads` stores lightweight funnel submissions before the user opens WhatsApp.

You can later split services/projects/posts into their own collections if the content volume justifies it.

## Blog workflow

Visit `/admin`, enter the admin key, and you can:

- create posts
- edit posts
- edit slugs/categories/dates
- change excerpts
- change article paragraphs
- delete posts

Click **Save changes** and Express persists the content to MongoDB (or JSON fallback).

## WhatsApp funnel

Set `WHATSAPP_NUMBER` in `server/.env` using country code + number, for example:

```env
WHATSAPP_NUMBER=19015551234
```

The React site never needs the number hard-coded. Express injects the runtime number into the public site settings.

The project form generates contextual messages like:

```text
Hi SkylineDB3,

I came from your website and would like to discuss a project.
Project: Residential
Location: Memphis, TN
Service: Architecture

What would be the best next step?
```

The AI widget passes its conversation transcript into a WhatsApp handoff as well.

## Production build

Build React:

```bash
npm run build
```

This creates:

```text
client/dist
```

The Express server is already configured to serve that directory in production, including React Router's SPA fallback.

Then:

```bash
npm start
```

and expose the Express port through your host/reverse proxy.

## Where to replace the placeholder project art

The starter intentionally uses CSS-generated architectural artwork instead of copying third-party/project images from the web.

Replace `ProjectVisual.jsx` with client-owned images/renders when SkylineDB3 gives you the originals. The surrounding project cards and detail layouts can stay unchanged.

## Suggested next upgrades

1. Replace placeholder project visuals with real SkylineDB3 renders.
2. Add image upload/storage to the admin (Cloudinary or S3 is enough).
3. Replace `compose_reply()` with your actual agent/RAG stack.
4. Store chat-qualified lead summaries in MongoDB.
5. Add analytics events for service click → form → WhatsApp conversion.
6. Move the simple admin-key auth to JWT/session auth if multiple editors need access.

The current version stays intentionally simple because the business objective is not to become a SaaS product — it is to move qualified traffic into a human WhatsApp conversation.
