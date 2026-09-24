import { useState } from "react";

export default function ServicesSection({ services }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleService = (index) => {
    setActiveIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="services-section" id="services">
      <div className="shell">
        <div className="section-heading services-heading">
          <div className="eyebrow light">
            <span>04</span>
            CORE SERVICES
          </div>

          <h2>From early strategy to construction-ready decisions.</h2>
        </div>

        <div className="services-accordion">
          {services.map((service, index) => {
            const isOpen = activeIndex === index;

            return (
              <article
                className={`service-accordion-item ${isOpen ? "is-open" : ""}`}
                key={service.slug}
              >
                <button
                  className="service-accordion-trigger"
                  type="button"
                  onClick={() => toggleService(index)}
                  aria-expanded={isOpen}
                >
                  <span className="service-index">
                    {service.index || String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="service-accordion-title">
                    <h3>{service.title}</h3>
                    <p>{service.short}</p>
                  </div>

                  <span className="service-toggle">{isOpen ? "−" : "+"}</span>
                </button>

                <div className="service-accordion-panel">
                  <div className="service-accordion-content">
                    <div />
                    <p>{service.body}</p>

                    <div className="service-deliverables">
                      <span>KEY DELIVERABLES</span>

                      <ul>
                        {service.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
