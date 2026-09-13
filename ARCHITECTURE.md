# Architecture notes

## Why this is conventional MERN

The browser is a plain React SPA built with Vite. React Router handles client-side routes. There are no React server components and no framework-owned backend conventions.

Express is the application server and exposes every API route explicitly. Mongoose is the persistence layer for MongoDB. FastAPI is isolated as a separate AI service so AI experimentation does not affect the core web stack.

## Boundaries

### React owns

- rendering and routing
- public landing page
- service/project/blog views
- WhatsApp message composition
- admin editor UI
- chatbot UI

### Express owns

- all public API endpoints
- content persistence
- lead persistence
- admin-key enforcement
- runtime configuration such as WhatsApp number
- Python agent forwarding
- fallback chatbot logic
- production static hosting

### MongoDB owns

- editable site content
- captured leads

### Python owns

- optional AI reasoning/RAG/tool use only

This boundary is useful because the site remains a normal MERN app even when the AI service is stopped.
