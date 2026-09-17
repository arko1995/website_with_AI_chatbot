import { Link } from 'react-router-dom';

export default function Footer({ location = 'Memphis, TN' }) {
  return (
    <footer className="footer">
      <div>
        <div className="brand footer-brand"><span className="brand-mark">S</span><span>SKYLINE<span className="muted">DB3</span></span></div>
        <p>Architecture that moves from idea to buildable reality.</p>
      </div>
      <div className="footer-links">
        <Link to="/insights">Insights</Link>
        <a href={`${import.meta.env.BASE_URL}#services`}>Services</a>
        <a href={`${import.meta.env.BASE_URL}#contact`}>Start a project</a>
        <Link to="/admin">Admin</Link>
      </div>
      <div className="footer-meta">
        <span>{location}</span>
        <span>© {new Date().getFullYear()} SkylineDB3</span>
      </div>
    </footer>
  );
}
