import { useState } from "react";

const packageGroups = [
  {
    title: "New Build & Custom Design",
    packages: [
      {
        name: "The Spatial Starter",
        target: "The essential foundation for spatial planning and structure.",
        includes: "Complete 2D Floor Plans + Basic 3D Model.",
        separatePrice: 1800,
        packagePrice: 1450,
        savings: 350,
      },
      {
        name: "The Builder’s Standard",
        target: "The sweet spot for permits, bank financing, and pre-sales.",
        includes:
          "Complete 2D Floor Plans + Basic 3D Model + Photorealistic 3D Renders.",
        separatePrice: 2550,
        packagePrice: 1950,
        savings: 600,
        popular: true,
      },
      {
        name: "The Immersive Suite",
        target: "The ultimate luxury design and marketing experience.",
        includes:
          "2D Floor Plans + Basic 3D Model + 3D Renders + Interactive Walkthrough Video.",
        separatePrice: 3750,
        packagePrice: 2950,
        savings: 800,
      },
    ],
  },
  {
    title: "Renovation & Permitting",
    packages: [
      {
        name: "The Renovation & Permit Package",
        target:
          "The fastest way to get measured, legally approved, and ready for demolition.",
        includes:
          "High-Precision Site Survey & As-Builts + Construction Documents (Permit Set).",
        separatePrice: 2700,
        packagePrice: 2350,
        savings: 350,
      },
    ],
  },
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState(0);

  const activeGroup = packageGroups[activeTab];

  return (
    <section className="pricing-section" id="pricing">
      <div className="shell">
        <div className="section-heading pricing-heading">
          <div className="eyebrow">
            <span>06</span>
            PRICING & PACKAGES
          </div>

          <h2>Pricing & Packages</h2>

          <p>
            Whether you are remodeling an existing property or designing a
            custom home from scratch, our pricing is straightforward.
          </p>
        </div>

        <div className="pricing-note">
          <strong>Note:</strong> All package and individual prices are based on
          projects up to 2,500 sq. ft. (under roof). For larger custom homes and
          commercial projects, an additional rate of $1.00 per square foot
          applies.
        </div>

        <div className="pricing-tabs" role="tablist">
          {packageGroups.map((group, index) => (
            <button
              key={group.title}
              type="button"
              role="tab"
              aria-selected={activeTab === index}
              className={`pricing-tab ${
                activeTab === index ? "is-active" : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {group.title}
            </button>
          ))}
        </div>

        <div
          className={`pricing-cards ${
            activeGroup.packages.length === 1 ? "is-single" : ""
          }`}
        >
          {activeGroup.packages.map((item) => (
            <article
              key={item.name}
              className={`pricing-card ${item.popular ? "is-popular" : ""}`}
            >
              {item.popular && (
                <div className="pricing-popular">★ MOST POPULAR</div>
              )}

              <h3>{item.name}</h3>

              <p className="pricing-target">{item.target}</p>

              <div className="pricing-includes">
                <span>INCLUDES</span>
                <p>{item.includes}</p>
              </div>

              <div className="pricing-price">
                <span className="pricing-original">
                  ${item.separatePrice.toLocaleString()}
                </span>

                <strong>${item.packagePrice.toLocaleString()}</strong>

                <span className="pricing-save">
                  Save ${item.savings.toLocaleString()}
                </span>
              </div>

              <button type="button" className="button button-dark">
                Select Package
                <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
