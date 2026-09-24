import { useState } from "react";

export default function ProcessSection({ process }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!process?.length) return null;

  const activeProcess = process[activeTab];

  return (
    <section className="process-section" id="process">
      <div className="shell">
        <div className="section-heading process-heading">
          <div className="eyebrow">
            <span>05</span>
            OUR PROCESS
          </div>

          <h2>The SkylineDB3 Integrated Process</h2>
        </div>

        <div className="process-tabs" role="tablist">
          {process.map((item, index) => (
            <button
              key={item.slug}
              className={`process-tab ${
                activeTab === index ? "is-active" : ""
              }`}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </button>
          ))}
        </div>

        <div className="process-steps">
          {activeProcess.steps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <div className="process-step-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="process-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
