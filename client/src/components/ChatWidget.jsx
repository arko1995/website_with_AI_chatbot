import { useMemo, useState } from 'react';
import { api } from '../api.js';
import { whatsappLink } from '../utils.js';

const welcome = {
  role: 'assistant',
  content: "Hi — I’m Skyline’s project assistant. Tell me what you’re planning and I’ll help narrow down what you may need."
};

export default function ChatWidget({ whatsappNumber = '' }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcome]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);

  const transcript = useMemo(() => messages.slice(1).map((m) => `${m.role === 'user' ? 'Me' : 'Assistant'}: ${m.content}`).join('\n'), [messages]);

  async function send(text = input) {
    const clean = text.trim();
    if (!clean || busy) return;
    const next = [...messages, { role: 'user', content: clean }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const data = await api.chat(next);
      setMessages([...next, { role: 'assistant', content: data.reply || 'Tell me a little more about the project.' }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'I could not reach the project assistant just now. You can still continue directly with the team on WhatsApp.' }]);
    } finally {
      setBusy(false);
    }
  }

  const wa = whatsappLink(whatsappNumber, `Hi SkylineDB3,\n\nI used the website project assistant. Here is the conversation summary:\n\n${transcript}\n\nI'd like to continue with a person.`);

  return (
    <>
      <button className="chat-launcher" onClick={() => setOpen(!open)} aria-label="Open project assistant">
        <span className="chat-dot" /> {open ? 'Close' : 'Ask Skyline AI'}
      </button>
      {open && (
        <section className="chat-panel" aria-label="Skyline project assistant">
          <div className="chat-head"><div><small>PROJECT ASSISTANT</small><strong>Skyline AI</strong></div><span className="online">● online</span></div>
          <div className="chat-log">
            {messages.map((m, i) => <div key={i} className={`bubble ${m.role}`}>{m.content}</div>)}
            {busy && <div className="bubble assistant typing">Thinking…</div>}
          </div>
          <div className="quick-prompts">
            {['I need house plans', 'I have land', 'I need 3D renders'].map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}
          </div>
          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe your project…" />
            <button aria-label="Send">↑</button>
          </form>
          <a className={`chat-handoff ${!whatsappNumber ? 'disabled-link' : ''}`} href={wa} target={whatsappNumber ? '_blank' : undefined} rel="noreferrer" onClick={(e) => { if (!whatsappNumber) e.preventDefault(); }}>
            Continue with a human on WhatsApp ↗
          </a>
        </section>
      )}
    </>
  );
}
