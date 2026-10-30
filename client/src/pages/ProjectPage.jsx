import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import Loading from "../components/Loading.jsx";
import { api } from "../api.js";

export default function ProjectPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError("");

    async function loadProject() {
      try {
        const result = await api.project(slug);

        if (!cancelled) {
          setData(result);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.message);
        }
      }
    }

    loadProject();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) return <Loading label={error} />;
  if (!data) return <Loading />;
  const { project, settings } = data;

  const images = (project.slide || []).filter((slide) => slide.src);

  const cover = images[0]?.src || project.thumbnail;

  return (
    <main>
      <Header />

      <article className="impact-project-page">
        <section className="detail-hero shell">
          <div className="eyebrow">
            <span>IMPACT PROJECT</span>
            {project.type}
          </div>

          <h1>{project.name}</h1>
          <p>{project.tagline}</p>
        </section>

        {cover && (
          <section className="impact-project-cover shell">
            <img
              src={cover}
              alt={`${project.name} architectural project`}
              fetchPriority="high"
            />
          </section>
        )}

        <section className="impact-project-overview shell">
          <div>
            <span className="impact-project-label">THE PROJECT</span>

            <h2>Project Overview</h2>

            {project.description && <p>{project.description}</p>}
          </div>

          <aside className="impact-project-facts">
            <span>PROJECT TYPE</span>
            <strong>{project.type}</strong>

            {project.metric && (
              <>
                <span>SCOPE</span>
                <strong>{project.metric}</strong>
              </>
            )}

            {project.services?.length > 0 && (
              <>
                <span>SERVICES</span>
                {project.services.map((service) => (
                  <p key={service}>{service}</p>
                ))}
              </>
            )}
          </aside>
        </section>

        {project.impact && (
          <section className="impact-project-outcome shell">
            <span className="impact-project-label">SKYLINEDB3 IMPACT</span>

            <h2>The Impact</h2>
            <p>{project.impact}</p>
          </section>
        )}

        {images.length > 0 && (
          <section className="impact-project-gallery shell">
            <div className="impact-project-label">PROJECT GALLERY</div>

            <h2>Inside the Project</h2>

            <div className="impact-project-gallery-grid">
              {images.map((image, index) => (
                <figure key={`${image.src}-${index}`}>
                  <img
                    src={image.src}
                    alt={`${project.name} — ${image.label || "Project image"}`}
                    loading="lazy"
                  />

                  {image.label && <figcaption>{image.label}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="impact-project-cta shell">
          <h2>Have a similar project in mind?</h2>

          <Link className="button button-dark" to="/#contact">
            Start a Project →
          </Link>
        </section>
      </article>

      <Footer location={settings.location} />
    </main>
  );
}
