import Header from '../components/Header.jsx';
export default function NotFoundPage() {
  return <main><Header/><section className="inner-hero shell"><div className="eyebrow"><span>404</span>NOT FOUND</div><h1>That page does not exist.</h1><p><a className="text-link" href="/">Return to the homepage →</a></p></section></main>;
}
