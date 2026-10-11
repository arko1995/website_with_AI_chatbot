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
            Author Name writes SkylineDB3’s insights on architecture,
            visualization, design strategy, and turning ideas into buildable
            outcomes.
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
