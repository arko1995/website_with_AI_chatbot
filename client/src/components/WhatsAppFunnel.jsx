import { useMemo, useState } from 'react';
import { api } from '../api.js';
import { whatsappLink } from '../utils.js';

const options = {
  projectType: ['Residential', 'Commercial', 'Development / Land', 'Existing project'],
  service: ['Architecture', 'Masterplanning', '3D Visualization', 'Cost / Value Engineering', 'Not sure yet']
};

export default function WhatsAppFunnel({ number = '' }) {
  const [form, setForm] = useState({ projectType: 'Residential', location: '', service: 'Architecture' });
  const message = useMemo(() => [
    'Hi SkylineDB3,', '',
    'I came from your website and would like to discuss a project.',
    `Project: ${form.projectType}`,
    `Location: ${form.location || 'Not specified yet'}`,
    `Service: ${form.service}`,
    '', 'What would be the best next step?'
  ].join('\n'), [form]);

  async function capture(event) {
    if (!number) event.preventDefault();
    try { await api.lead({ ...form, source: 'WhatsApp funnel' }); } catch { /* conversion should not be blocked by CRM logging */ }
  }

  return (
    <div className="funnel-card">
      <div className="funnel-grid">
        <label>What are you building?
          <select value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
            {options.projectType.map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>
        <label>Where is the project?
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Memphis, TN" />
        </label>
        <label>What do you need?
          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
            {options.service.map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>
      </div>
      <a
        className={`button button-lime button-wide ${!number ? 'disabled-link' : ''}`}
        href={whatsappLink(number, message)}
        target={number ? '_blank' : undefined}
        rel="noreferrer"
        onClick={capture}
      >
        {number ? 'Continue on WhatsApp' : 'Add WHATSAPP_NUMBER in server/.env'} <span>↗</span>
      </a>
    </div>
  );
}
