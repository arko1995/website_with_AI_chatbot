import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ProjectVisual from '../components/ProjectVisual.jsx';
import WhatsAppFunnel from '../components/WhatsAppFunnel.jsx';
import ChatWidget from '../components/ChatWidget.jsx';
import Loading from '../components/Loading.jsx';
import { api } from '../api.js';
import { scrollToHash } from '../utils.js';

export default function HomePage() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.content().then((data) => {
      setContent(data);
      setTimeout(scrollToHash, 0);
    }).catch((err) => setError(err.message));
  }, []);

  if (error) return <Loading label={`Could not load site: ${error}`} />;
  if (!content) return <Loading />;

  const { settings, services, projects, posts } = content;
  const whatsappNumber = settings.whatsappNumber || '';

  return (
    <main>
      <Header />

      <section className="hero shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span>01</span>{settings.eyebrow}</div>
            <h1>{settings.heroTitle}</h1>
            <p className="hero-body">{settings.heroBody}</p>
            <div className="hero-actions">
              <a className="button button-lime" href="#contact">Discuss your project <span>↗</span></a>
              <a className="text-link" href="#services">Explore capabilities ↓</a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-plate plate-one" />
            <div className="hero-plate plate-two" />
            <div className="hero-building">
              <span className="window w1"/><span className="window w2"/><span className="window w3"/><span className="window w4"/>
            </div>
            <div className="hero-note"><span>FIG. 01</span><strong>SPACE / STRUCTURE / VALUE</strong></div>
          </div>
        </div>
        <div className="trust-strip">
          <span>MASTERPLANNING</span><span>ARCHITECTURE</span><span>DOCUMENTATION</span><span>VISUALIZATION</span><span>COST STRATEGY</span>
        </div>
      </section>

      <section className="intent-section shell">
        <div className="section-heading">
          <div className="eyebrow"><span>02</span>START WITH THE PROJECT</div>
          <h2>What are you trying to create?</h2>
          <p>You do not need to know the exact service name. Start with the outcome and we’ll route you toward the right expertise.</p>
        </div>
        <div className="intent-grid">
          {[
            ['A home', 'New construction, additions, renovations and private estates.', 'Residential'],
            ['A commercial space', 'Retail, office, hospitality and mixed-use environments.', 'Commercial'],
            ['A development', 'Land strategy, masterplanning and larger development concepts.', 'Development'],
            ['An existing project', 'Drawings, visualization, cost strategy or technical support.', 'Existing project']
          ].map(([title, desc, tag], i) => (
            <a className="intent-card" href="#contact" key={title}>
              <span className="card-index">0{i + 1}</span>
              <div><small>{tag}</small><h3>{title}</h3><p>{desc}</p></div>
              <span className="arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><div className="eyebrow"><span>03</span>CAPABILITIES</div><h2>From site logic to construction-ready decisions.</h2></div>
            <p>Technical depth without making the client journey complicated. Every service has one clear next step: talk to the team about your project.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <Link className="service-row" to={`/services/${service.slug}`} key={service.slug}>
                <span className="service-index">/{service.index}</span>
                <div><h3>{service.title}</h3><p>{service.short}</p></div>
                <span className="circle-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="work-section shell" id="work">
        <div className="section-heading split-heading">
          <div><div className="eyebrow"><span>04</span>SELECTED WORK</div><h2>Projects become easier to trust when people can see the thinking.</h2></div>
          <p>Large visual moments create the proof. The site stays restrained so the work does the persuasion.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, i) => (
            <Link className={`project-card project-${i + 1}`} to={`/projects/${project.slug}`} key={project.slug}>
              <ProjectVisual type={project.visual} label={project.name} />
              <div className="project-caption"><span>{project.type}</span><h3>{project.name}</h3><p>{project.metric}</p></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="shell process-grid">
          <div className="process-intro"><div className="eyebrow light"><span>05</span>HOW IT MOVES</div><h2>Less friction between an idea and a useful next step.</h2></div>
          <div className="process-steps">
            {[
              ['01', 'Tell us what you are planning', 'A few details about project type, location and stage are enough to start.'],
              ['02', 'Get the right technical conversation', 'The team can quickly identify whether you need feasibility, design, documentation, visualization or cost support.'],
              ['03', 'Move toward a buildable scope', 'The next step is framed around decisions, deliverables and project reality — not generic sales talk.']
            ].map(([n,t,d]) => <div className="process-step" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="insights-section shell">
        <div className="section-heading split-heading">
          <div><div className="eyebrow"><span>06</span>INSIGHTS</div><h2>Useful answers before the first call.</h2></div>
          <Link className="text-link" to="/insights">View all insights →</Link>
        </div>
        <div className="post-grid">
          {posts.slice(0, 3).map((post) => (
            <Link className="post-card" to={`/insights/${post.slug}`} key={post.slug}>
              <span className="post-category">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div><span>{post.readingTime}</span><span>Read article ↗</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <div className="eyebrow light"><span>07</span>START A CONVERSATION</div>
            <h2>Have a project in mind?</h2>
            <p>Give us the essentials. We’ll package the context into WhatsApp so a real person can pick up the conversation without making you repeat yourself.</p>
          </div>
          <WhatsAppFunnel number={whatsappNumber} />
        </div>
      </section>

      <Footer location={settings.location} />
      <ChatWidget whatsappNumber={whatsappNumber} />
    </main>
  );
}
