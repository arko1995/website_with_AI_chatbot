const audiences = [
  {
    number: "01",
    title: "Homeowners",
    subtitle: "See your dream home before it is built.",
    description:
      "From custom builds to renovations, we turn your ideas into photorealistic 3D models and precise plans so you can make confident decisions before construction begins.",
  },
  {
    number: "02",
    title: "Landowners",
    subtitle: "Unlock the full potential of your property.",
    description:
      "We evaluate feasibility, zoning, and masterplanning opportunities to help you understand what your land can support and how to maximize its potential.",
  },
  {
    number: "03",
    title: "Real Estate Developers",
    subtitle: "Protect your ROI and speed up your timeline.",
    description:
      "We align design decisions with budgets, development goals, and market-ready 3D deliverables to support efficient planning and confident execution.",
  },
  {
    number: "04",
    title: "Builders & General Contractors",
    subtitle: "Execute with absolute precision.",
    description:
      "Clear 2D documentation, value engineering, and accurate 3D models help reduce uncertainty and support precise construction.",
  },
  {
    number: "05",
    title: "Community & Municipal Leaders",
    subtitle: "Build with purpose and economic strength.",
    description:
      "We help shape sustainable, cohesive, and appropriately zoned environments that support communities and long-term economic development.",
  },
  {
    number: "06",
    title: "Investors & Financiers",
    subtitle: "Validate the future before you fund it.",
    description:
      "Cost estimations, financial strategies, and photorealistic 3D showrooms provide greater clarity before capital is committed.",
  },
];

export default function AudienceSection() {
  return (
    <section className="audience-section shell" id="audience">
      <div className="section-heading">
        <div className="eyebrow">
          <span>02</span>
          WHO WE SERVE
        </div>

        <h2>Built around the people making the decisions.</h2>
      </div>

      <div className="audience-grid">
        {audiences.map((audience) => (
          <article className="audience-card" key={audience.title}>
            <div className="audience-card-inner">
              {/* FRONT */}
              <div className="audience-card-front">
                <span className="audience-number">{audience.number}</span>

                <div className="audience-card-content">
                  <h3>{audience.title}</h3>
                  <p>{audience.subtitle}</p>
                </div>

                <span className="audience-hint">EXPLORE +</span>
              </div>

              {/* BACK */}
              <div className="audience-card-back">
                <span className="audience-number">{audience.number}</span>

                <div className="audience-card-content">
                  <p>{audience.description}</p>
                </div>

                <span className="audience-hint">↗</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
