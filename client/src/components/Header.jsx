import { Link } from "react-router-dom";

export default function Header() {
  const home = import.meta.env.BASE_URL;

  return (
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
      <a className="header-cta" href={`${home}#contact`}>
        Start a project <span>↗</span>
      </a>
    </header>
  );
}
