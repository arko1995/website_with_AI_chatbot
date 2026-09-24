import { useState } from "react";

export default function FeaturedProjects({ projects }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  if (!projects?.length) return null;

  const activeProject = projects[activeProjectIndex];
  const slides = activeProject.slides || [];
  const activeSlide = slides[activeSlideIndex];

  const selectProject = (index) => {
    setActiveProjectIndex(index);
    setActiveSlideIndex(0);
  };

  const previousSlide = () => {
    if (!slides.length) return;

    setActiveSlideIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const nextSlide = () => {
    if (!slides.length) return;

    setActiveSlideIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="featured-projects" id="projects">
      <div className="shell">
        <div className="section-heading featured-projects-heading">
          <div className="eyebrow">
            <span>06</span>
            FEATURED PROJECTS
          </div>

          <h2>Featured Projects</h2>
        </div>

        <div className="featured-project-main">
          <div className="featured-project-media">
            {activeSlide?.src ? (
              <img
                src={activeSlide.src}
                alt={`${activeProject.name} — ${activeSlide.label}`}
              />
            ) : (
              <div className="featured-project-placeholder">
                <span>{activeSlide?.label || "Project Image"}</span>
              </div>
            )}

            {slides.length > 1 && (
              <div className="featured-project-controls">
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous project image"
                >
                  ←
                </button>

                <span>
                  {String(activeSlideIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(slides.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next project image"
                >
                  →
                </button>
              </div>
            )}
          </div>

          <div className="featured-project-overlay">
            <span className="featured-project-type">{activeProject.type}</span>

            <h3>{activeProject.name}</h3>

            <p>{activeProject.tagline}</p>

            {activeProject.services?.length > 0 && (
              <div className="featured-project-services">
                {activeProject.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="featured-project-thumbnails">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className={`featured-project-thumbnail ${
                activeProjectIndex === index ? "is-active" : ""
              }`}
              onClick={() => selectProject(index)}
            >
              <div className="featured-thumbnail-image">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt="" />
                ) : (
                  <span>{String(index + 1).padStart(2, "0")}</span>
                )}
              </div>

              <div>
                <span>{project.type}</span>
                <strong>{project.name}</strong>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
