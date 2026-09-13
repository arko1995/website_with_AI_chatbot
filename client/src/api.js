async function request(path, options = {}) {
  const response = await fetch(path, options);
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
  adminGet: (key) => request('/api/admin/content', { headers: { 'x-admin-key': key } }),
  adminSave: (key, content) => request('/api/admin/content', {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'x-admin-key': key },
    body: JSON.stringify(content)
  })
};
