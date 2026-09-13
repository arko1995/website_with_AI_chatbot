const fallbackRules = [
  { keys: ['masterplan', 'land', 'site'], reply: 'For land or development work, SkylineDB3 can help with site feasibility, masterplanning and development-scale spatial strategy. If you share the site location and approximate acreage, I can prepare a handoff for the team.' },
  { keys: ['drawing', 'permit', 'architect', 'design'], reply: 'SkylineDB3 supports architectural concept design, design development and construction documents. Tell me whether this is residential, commercial or mixed-use and where the project is located.' },
  { keys: ['render', '3d', 'visual'], reply: 'The studio provides high-fidelity exterior/interior rendering, walkthroughs and developer-facing marketing visuals. If you already have plans or a model, mention that in your WhatsApp handoff.' },
  { keys: ['cost', 'budget', 'estimate', 'price'], reply: 'SkylineDB3 includes pre-construction estimation and value-engineering support. Exact fees and project costs depend on scope, location and project stage, so I can help package those details for a human conversation.' }
];

export function fallbackReply(text) {
  const normalized = String(text || '').toLowerCase();
  const rule = fallbackRules.find((entry) => entry.keys.some((key) => normalized.includes(key)));
  return rule?.reply || 'I can help narrow down the right SkylineDB3 service. Tell me what you are planning to build, where the project is located, and whether you are at idea, design, permitting or construction stage.';
}

export async function askPythonAgent(messages, content) {
  if (!process.env.PYTHON_AGENT_URL) return null;
  try {
    const response = await fetch(process.env.PYTHON_AGENT_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        messages,
        context: {
          services: content.services,
          projects: content.projects,
          settings: content.settings
        }
      }),
      signal: AbortSignal.timeout(6000)
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.reply || null;
  } catch (error) {
    console.warn(`[agent] Python agent unavailable: ${error.message}`);
    return null;
  }
}
