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

const customServices = [
  {
    name: "Site Survey & As-Built Documentation",
    price: 900,
  },
  {
    name: "Complete 2D Floor Plans",
    price: 1200,
  },
  {
    name: "Basic 3D Model",
    price: 600,
  },
  {
    name: "Construction Documents (Permit Set)",
    price: 1800,
  },
  {
    name: "Photorealistic 3D Renders (Set of 3)",
    price: 750,
  },
  {
    name: "Immersive 3D Walkthrough Video",
    price: 1200,
  },
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState(0);

  const [builderOpen, setBuilderOpen] = useState(false);
  const [squareFeet, setSquareFeet] = useState("");
  const [selectedService, setSelectedService] = useState([]);

  const activeGroup = packageGroups[activeTab];

  const toggleService = (serviceName) => {
    setSelectedService((current) =>
      current.includes(serviceName)
        ? current.filter((name) => name !== serviceName)
        : [...current, serviceName],
    );
  };

  const serviceTotal = customServices
    .filter((service) => selectedService.includes(service.name))
    .reduce((total, service) => total + service.price, 0);

  const projectSize = Number(squareFeet) || 0;

  const extraSquareFeet = Math.max(projectSize - 2500, 0);
  const squareFootSurcharge = extraSquareFeet * 1;
  const estimatedTotal = serviceTotal + squareFootSurcharge;

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

        <div className={`custom-builder ${builderOpen ? "is-open" : ""}`}>
          <button
            type="button"
            className="custom-builder-trigger"
            onClick={() => setBuilderOpen((current) => !current)}
          >
            <span>
              {builderOpen ? "-" : "+"} Prefer to pick individual services?
              Build your custom scope here.
            </span>

            <span className="custom-builder-arrow">
              {builderOpen ? "↑" : "↓"}
            </span>
          </button>

          {builderOpen && (
            <div className="custom-builder-content">
              <div className="custom-builder-heading">
                <div>
                  <span className="custom-builder-label">
                    CUSTOM SERVICE BUILDER
                  </span>
                  <h3>Build your project scope</h3>
                </div>

                <label className="square-feet-field">
                  <span>PROJECT SIZE</span>
                  <div>
                    <input
                      type="number"
                      min="0"
                      value={squareFeet}
                      onChange={(event) => setSquareFeet(event.target.value)}
                    />
                    <span>SQ. FT.</span>
                  </div>
                </label>
              </div>

              <div className="custom-service-list">
                {customServices.map((service) => {
                  const isSelected = selectedService.includes(service.name);

                  return (
                    <label
                      className={`custom-service ${isSelected ? "is-selected" : ""}`}
                      key={service.name}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleService(service.name)}
                      />

                      <span className="custom-service-check">
                        {isSelected ? "✓" : ""}
                      </span>
                      <span className="custom-service-name">
                        {service.name}
                      </span>
                      <strong>${service.price.toLocaleString()}</strong>
                    </label>
                  );
                })}
              </div>

              <div className="custom-builder-footer">
                <div className="custom-builder-total">
                  <span>TOTAL ESTIMATED COST</span>
                  <strong>${estimatedTotal.toLocaleString()}</strong>

                  {squareFootSurcharge > 0 && (
                    <small>
                      Includes ${squareFootSurcharge.toLocaleString()} for{" "}
                      {extraSquareFeet.toLocaleString()} sq. ft. above 2,500.
                    </small>
                  )}
                </div>

                <button type="button" className="button button-dark">
                  Request Custom Proposal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
