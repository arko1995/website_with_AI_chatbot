import ShowcaseSlider from "./ShowcaseSlider.jsx";

export default function HeroSection({ settings }) {
  return (
    <section className="hero shell">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span>01</span>
            {settings.eyebrow}
          </div>

          <h1>{settings.heroTitle}</h1>

          <p className="hero-body">{settings.heroBody}</p>

          <div className="hero-actions">
            <a className="button button-lime" href="#work">
              View Our Projects <span>↗</span>
            </a>

            <a className="text-link" href="#contact">
              Discuss Your Vision ↓
            </a>
          </div>
        </div>

        <ShowcaseSlider />
      </div>

      <div className="trust-strip">
        <span>MASTERPLANNING</span>
        <span>ARCHITECTURE</span>
        <span>DOCUMENTATION</span>
        <span>VISUALIZATION</span>
        <span>COST STRATEGY</span>
      </div>
    </section>
  );
}
