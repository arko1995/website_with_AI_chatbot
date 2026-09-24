import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import WhatsAppFunnel from "../components/WhatsAppFunnel.jsx";
import ChatWidget from "../components/ChatWidget.jsx";
import Loading from "../components/Loading.jsx";
import { api } from "../api.js";
import { scrollToHash } from "../utils.js";
import HeroSection from "../components/HeroSection.jsx";
import ExecutionMatrix from "../components/ExecutionMatrix.jsx";
import LeadershipTeam from "../components/LeadershipTeam.jsx";
import AudienceSection from "../components/AudienceSection.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import ProcessSection from "../components/ProcessSection.jsx";
import FeaturedProjects from "../components/FeaturedProjects.jsx";
export default function HomePage() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .content()
      .then((data) => {
        setContent(data);
        setTimeout(scrollToHash, 0);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <Loading label={`Could not load site: ${error}`} />;
  if (!content) return <Loading />;

  const { settings, services, projects, posts, process } = content;
  const whatsappNumber = settings.whatsappNumber || "";

  return (
    <main>
      <Header />

      <HeroSection settings={settings} />

      <AudienceSection />
      <ExecutionMatrix />

      <ServicesSection services={services} />
      <ProcessSection process={process} />
      <FeaturedProjects projects={projects} />
      <section className="insights-section shell">
        <div className="section-heading split-heading">
          <div>
            <div className="eyebrow">
              <span>06</span>INSIGHTS
            </div>
            <h2>Useful answers before the first call.</h2>
          </div>
          <Link className="text-link" to="/insights">
            View all insights →
          </Link>
        </div>
        <div className="post-grid">
          {posts.slice(0, 3).map((post) => (
            <Link
              className="post-card"
              to={`/insights/${post.slug}`}
              key={post.slug}
            >
              <span className="post-category">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div>
                <span>{post.readingTime}</span>
                <span>Read article ↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <div className="eyebrow light">
              <span>07</span>START A CONVERSATION
            </div>
            <h2>Have a project in mind?</h2>
            <p>
              Give us the essentials. We’ll package the context into WhatsApp so
              a real person can pick up the conversation without making you
              repeat yourself.
            </p>
          </div>
          <WhatsAppFunnel number={whatsappNumber} />
        </div>
      </section>

      <Footer location={settings.location} />
      <ChatWidget whatsappNumber={whatsappNumber} />
    </main>
  );
}
