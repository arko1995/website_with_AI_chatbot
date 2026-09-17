const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${base}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  return response.json();
}

export const api = {
  content: () => request('/api/content'),
  service: (slug) => request(`/api/services/${encodeURIComponent(slug)}`),
  project: (slug) => request(`/api/projects/${encodeURIComponent(slug)}`),
  post: (slug) => request(`/api/posts/${encodeURIComponent(slug)}`),
  chat: (messages) => request('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages })
  }),
  lead: (lead) => request('/api/leads', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(lead)
  }),
  login: (email, password) => request('/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  me: () => request('/api/auth/me'),
  adminGet: () => request('/api/admin/content'),
  adminSave: (content) => request('/api/admin/content', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(content)
  }),
  adminLeads: () => request('/api/admin/leads')
};
