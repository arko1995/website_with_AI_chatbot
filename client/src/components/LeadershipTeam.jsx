const teamMembers = [
  {
    name: "Ashif Jahan",
    role: "CEO",
    image: "images/team/istockphoto-2285343735-1024x1024.webp",
    description:
      "Leading SkylineDB3 across strategy, client relationships and project direction.",
  },
  {
    name: "Jeff Blackledge",
    role: "Senior Architect",
    image: "images/team/istockphoto-2285343735-1024x1024.webp",
    description:
      "Focused on architectural thinking, design development and technical execution.",
  },
  {
    name: "Core Support Team",
    role: "Architecture · Delivery · Coordination",
    image: "images/team/istockphoto-2285343735-1024x1024.webp",
    description:
      "Supporting projects through coordination, documentation and delivery.",
  },
];

const LeadershipTeam = () => {
  const basePath = import.meta.env.BASE_URL;

  return (
    <div>
      <section className="leadership-section" id="leadership">
        <div className="shell">
          <div className="leadership-heading">
            <div className="eyebrow">
              <span>05</span>
              THE LEADERSHIP TEAM
            </div>
            <div className="leadership-heading-grid">
              <h2>
                The People Behind
                <br />
                the work
              </h2>
              <p>
                Architecture is collaborative. Meet the people guiding the
                thinking, coordination and delivery behind SkylineDB3 projects.
              </p>
            </div>
          </div>

          <div className="leadership-grid">
            {teamMembers.map((member, index) => (
              <article className="team-member" key={member.name}>
                <div className="team-image">
                  <img
                    src={`${basePath}${member.image}`}
                    alt={`${member.name}, ${member.role}`}
                  />

                  <span className="team-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="team-copy">
                  <span>{member.role}</span>
                  <h3>{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipTeam;
