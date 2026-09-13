import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Loading from '../components/Loading.jsx';
import { api } from '../api.js';
import { whatsappLink } from '../utils.js';

export default function ServicePage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api.service(slug).then(setData).catch((e) => setError(e.message)); }, [slug]);
  if (error) return <Loading label={error} />;
  if (!data) return <Loading />;
  const { service, settings } = data;
  const href = whatsappLink(settings.whatsappNumber, `Hi SkylineDB3, I'm interested in ${service.title}. I'd like to discuss my project.`);
  return <main><Header/><section className="detail-hero shell"><div className="eyebrow"><span>{service.index}</span>CAPABILITY</div><h1>{service.title}</h1><p>{service.short}</p></section><section className="detail-body shell"><div><p className="lead-paragraph">{service.body}</p><a className={`button button-lime ${!settings.whatsappNumber ? 'disabled-link' : ''}`} href={href} target={settings.whatsappNumber ? '_blank' : undefined} rel="noreferrer">Discuss this service ↗</a></div><div className="feature-panel"><small>WHAT THIS CAN INCLUDE</small>{service.features.map((f,i)=><div className="feature-row" key={f}><span>0{i+1}</span>{f}</div>)}</div></section><Footer location={settings.location}/></main>;
}
