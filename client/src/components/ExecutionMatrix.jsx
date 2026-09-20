
const projectJourneys = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Architecture',
    description:
      'From the first conversation to a finished architectural vision.',
    stages: [
      {
        title: 'Consultation',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Client discussion and early project discovery.',
      },
      {
        title: 'Sketch',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Initial architectural ideas and schematic exploration.',
      },
      {
        title: '2D Plan',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Technical planning through CAD or BIM documentation.',
      },
      {
        title: '3D Model',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Spatial development through a three-dimensional model.',
      },
      {
        title: 'Final Render',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Photorealistic visualization of the completed design.',
      },
    ],
  },

  {
    id: 'commercial',
    number: '02',
    title: 'Commercial Real Estate',
    description:
      'Turning an early commercial concept into coordinated project documentation.',
    stages: [
      {
        title: 'Sketch',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Initial zoning, massing and concept exploration.',
      },
      {
        title: '3D Model',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Building massing and three-dimensional design development.',
      },
      {
        title: 'Final Render',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'A finished commercial visualization in its environment.',
      },
      {
        title: 'Construction Doc',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Technical structural, mechanical or electrical drawings.',
      },
    ],
  },

  {
    id: 'masterplan',
    number: '03',
    title: 'Masterplan Development',
    description:
      'From land strategy to a complete development vision and presentation.',
    stages: [
      {
        title: 'Concept',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Site planning, land use and early development strategy.',
      },
      {
        title: '3D Model',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Block, sector and spatial organization of the development.',
      },
      {
        title: 'Render',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Aerial or pedestrian visualization of the development.',
      },
      {
        title: 'Marketing Content',
        image: 'images/process/commercial/istockphoto-2285343735-1024x1024.webp',
        description: 'Presentation-ready imagery for project communication.',
      },
    ],
  },
];



const ExecutionMatrix = () => {

    const basePath = import.meta.env.BASE_URL



  return (
    <section className="execution-section" id="process">
      <div className="shell">
        <div className="execution-heading">
          <div className="eyebrow">
            <span>03</span>
            EXECUTION MATRIX
          </div>

          <div className="execution-heading-grid">
            <h2>
              See how an idea becomes
              <br />
              something buildable.
            </h2>

            <p>
              Different projects follow different paths. Explore how each type
              moves from early thinking through design development and final
              delivery.
            </p>
          </div>
        </div>

        <div className="execution-journeys">
          {projectJourneys.map((journey) => (
            <article
              className="execution-journey"
              key={journey.id}
            >
              <header className="journey-header">
                <span>{journey.number}</span>

                <div>
                  <h3>{journey.title}</h3>
                  <p>{journey.description}</p>
                </div>
              </header>

              <div className="journey-stages">
                {journey.stages.map((stage, index) => (
                  <div
                    className="execution-stage"
                    key={stage.title}
                  >
                    <div className="execution-image">
                      <img
                        src={`${basePath}${stage.image}`}
                        alt={`${journey.title}: ${stage.title}`}
                      />

                      <span className="stage-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="stage-copy">
                      <h4>{stage.title}</h4>
                      <p>{stage.description}</p>
                    </div>

                    {index < journey.stages.length - 1 && (
                      <span
                        className="stage-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExecutionMatrix