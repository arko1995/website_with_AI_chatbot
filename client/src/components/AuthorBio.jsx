export default function AuthorBio() {
  return (
    <section className="author-section shell">
      <div className="author-section-label">ABOUT THE AUTHOR</div>

      <div className="author-section-grid">
        <div className="author-section-image">
          <img src="/images/author.jpg" alt="Author Name" />
        </div>

        <div className="author-section-content">
          <h2>BENSALEM Taki Eddine</h2>

          <span className="author-section-role">Architectural Designer</span>

          <p>
            As SkylineDB3’s Primary Designer, Bensalem Taki Eddine leads the
            creative and architectural direction behind the company’s projects.
            He translates client ideas, site requirements, and development goals
            into clear, functional design solutions, supporting projects from
            early concept development through visualization and technical
            refinement. His work focuses on creating architecture that is both
            visually compelling and grounded in real-world buildability.
          </p>

          <a
            href="LINKEDIN_URL"
            target="_blank"
            rel="noreferrer"
            className="author-section-link"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
