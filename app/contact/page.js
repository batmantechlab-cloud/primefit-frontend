import ContactForm from '../../components/ContactForm';
export const metadata = { alternates: { canonical: '/contact' }, title: 'Contact PrimeFit', description: 'Contact the PrimeFit team with questions, feedback, accessibility requests or privacy concerns.' };
export default function ContactPage() { return <section className="page-shell"><div className="page-intro"><p className="eyebrow">CONTACT</p><h1>We're listening<span className="period">.</span></h1><p>Questions, feedback or something we should improve? Send us a note.</p></div><ContactForm /></section>; }
