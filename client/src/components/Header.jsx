import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const home = import.meta.env.BASE_URL;

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="SkylineDB3 home">
          <img
            className="brand-logo"
            src={`${home}images/SkylineDB3.png`}
            alt="logo"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href={`${home}#services`}>Services</a>
          <a href={`${home}#projects`}>Projects</a>
          <Link to="/insights">Insights</Link>
          <a href={`${home}#contact`}>Contact</a>
          <a href={`${home}#pricing`}>Pricing</a>
        </nav>
        <button
          type="button"
          className={`mobile-menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
        <a className="header-cta" href={`${home}#contact`}>
          Start a project <span>↗</span>
        </a>
      </header>
      <nav
        className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile Nnvigation"
      >
        <a href={`${home}#services`} onClick={() => setMenuOpen(false)}>
          Services
        </a>

        <a href={`${home}#projects`} onClick={() => setMenuOpen(false)}>
          Projects
        </a>

        <Link to="/insights" onClick={() => setMenuOpen(false)}>
          Insights
        </Link>

        <a href={`${home}#pricing`} onClick={() => setMenuOpen(false)}>
          Pricing
        </a>

        <a href={`${home}#contact`} onClick={() => setMenuOpen(false)}>
          Contact
        </a>

        <a
          className="mobile-nav-cta"
          href={`${home}#contact`}
          onClick={() => setMenuOpen(false)}
        >
          Start a project <span>↗</span>
        </a>
      </nav>
    </>
  );
}
