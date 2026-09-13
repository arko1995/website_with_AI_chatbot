import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="SkylineDB3 home">
        <span className="brand-mark">S</span>
        <span>SKYLINE<span className="muted">DB3</span></span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/#services">Services</a>
        <a href="/#work">Work</a>
        <Link to="/insights">Insights</Link>
        <a href="/#contact">Contact</a>
      </nav>
      <a className="header-cta" href="/#contact">Start a project <span>↗</span></a>
    </header>
  );
}
