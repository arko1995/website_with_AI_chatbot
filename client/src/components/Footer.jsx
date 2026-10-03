import { Link } from "react-router-dom";

export default function Footer({ location = "Memphis, TN" }) {
  return (
    <footer className="footer">
      <div>
        <Link to="/" className="footer-logo" aria-label="SkylineDB3 home">
          <img
            src={`${import.meta.env.BASE_URL}images/SkylineDB3.png`}
            alt="SkylineDB3"
          />
        </Link>
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
