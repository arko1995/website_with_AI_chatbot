import { Link } from 'react-router-dom';

export default function Header() {
  const home = import.meta.env.BASE_URL;

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="SkylineDB3 home">
        <span className="brand-mark">S</span>
        <span>SKYLINE<span className="muted">DB3</span></span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href={`${home}#services`}>Services</a>
        <a href={`${home}#work`}>Work</a>
        <Link to="/insights">Insights</Link>
        <a href={`${home}#contact`}>Contact</a>
      </nav>
      <a className="header-cta" href={`${home}#contact`}>Start a project <span>↗</span></a>
    </header>
  );
}
