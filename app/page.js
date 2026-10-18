import Link from 'next/link';
import AmbientVideo from '../components/AmbientVideo';
import Reveal from '../components/Reveal';
import TrendingRail from '../components/TrendingRail';
import { GUIDES } from '../lib/guides';
import { jsonLd } from '../lib/site';

export const metadata = {
  title: { absolute: 'PrimeFit — Personal Menswear Stylist for Indian Men' },
  description: "Tell us your age, height, build and skin tone. PrimeFit's stylist picks menswear that suits you from Levi's, Rare Rabbit, Jack & Jones and more.",
  alternates: { canonical: '/' },
};

const occasions = [
  { n: '01', name: 'Everyday', detail: 'Easy pieces for the days that make up your life.', href: '/discover?occasion=everyday' },
  { n: '02', name: 'Work', detail: 'A sharper look, without overthinking it.', href: '/discover?occasion=work' },
  { n: '03', name: 'Date night', detail: 'Put-together, still completely you.', href: '/discover?occasion=date-night' },
  { n: '04', name: 'Events', detail: 'Weddings, festive, parties. Dress for the moment.', href: '/discover?occasion=events' },
];

const stores = ["Levi's", 'Rare Rabbit', 'Jack & Jones', 'Campus'];

const inputs = [
  { n: '01', title: 'Your age', detail: 'So the looks feel right for where you are in life.' },
  { n: '02', title: 'Your height', detail: 'Decides the fits and lengths that balance your frame.' },
  { n: '03', title: 'Your build', detail: 'Slim, average, athletic or broad. We pick cuts that flatter.' },
  { n: '04', title: 'Your skin tone', detail: 'The single biggest factor in which colours make you glow.' },
];

const faqs = [
  { q: 'What is PrimeFit?', a: "PrimeFit is a free personal menswear stylist. You answer four questions about yourself (age, height, build and skin tone) and it picks clothes that suit you from brands like Levi's, Rare Rabbit, Jack & Jones and Campus." },
  { q: 'Do I need to know about fashion to use it?', a: 'No. PrimeFit never asks about styles or trends. You only share facts you already know about yourself, and our styling rules work out the colours, fits and pieces that suit you.' },
  { q: 'How does PrimeFit decide what suits me?', a: 'Your skin tone decides which colours flatter you, your build and height decide the fits and patterns, your age guides the overall look, and your occasions decide the type of clothing. Every pick shows the reason, for example "Navy flatters wheatish skin".' },
  { q: 'Is PrimeFit free?', a: 'Yes. You buy directly from the brand at its normal price. PrimeFit may earn a small commission from the retailer, at no extra cost to you.' },
  { q: 'Where do the clothes come from?', a: "Directly from official brand stores such as Levi's, Rare Rabbit, Jack & Jones and Campus. Prices, stock and returns are handled by the brand." },
];

export default function HomePage() {
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />

    <section className="video-hero">
      <AmbientVideo name="hero" poster="/media/hero-poster.jpg" className="video-hero-media" />
      <div className="video-hero-shade" />
      <div className="video-hero-content">
        <div className="eyebrow reveal-up"><span className="eyebrow-line" /> YOUR PERSONAL MENSWEAR STYLIST</div>
        <h1 className="hero-title">
          <span className="line"><span>Dress well.</span></span>
          <span className="line"><em>Without the guesswork.</em></span>
        </h1>
        <p className="hero-intro reveal-up" style={{ animationDelay: '.45s' }}>No fashion knowledge needed. Tell us your age, height, build and skin tone. Our stylist picks the colours, fits and pieces that suit you.</p>
        <div className="hero-actions reveal-up" style={{ animationDelay: '.6s' }}>
          <Link className="button button-light" href="/my-style">Style me in 2 minutes <span>↗</span></Link>
          <Link className="text-link text-link-light" href="/discover">Browse the edit <span>→</span></Link>
        </div>
      </div>
      <div className="video-hero-foot reveal-up" style={{ animationDelay: '.9s' }}>
        <span><strong>4</strong> simple questions</span>
        <span><strong>5,000+</strong> pieces from top brands</span>
        <span><strong>0</strong> fashion jargon</span>
      </div>
    </section>

    <div className="store-marquee" aria-label="Stores in the edit">
      <div className="marquee-track">{[...stores, ...stores, ...stores, ...stores].map((store, index) => <span key={index} aria-hidden={index >= stores.length}>{store}<i>✦</i></span>)}</div>
    </div>

    <section className="section-wrap inputs-section" aria-labelledby="inputs-title">
      <Reveal className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> HOW YOUR STYLIST THINKS</p><h2 id="inputs-title">You know yourself.<br /><em>We know what suits you.</em></h2></div><p className="section-aside">Four facts you already know.<br />The styling rules are on us.</p></Reveal>
      <div className="inputs-grid">{inputs.map((item, index) => <Reveal key={item.n} delay={index * 100} className="input-card"><span>{item.n}</span><h3>{item.title}</h3><p>{item.detail}</p></Reveal>)}</div>
    </section>

    <TrendingRail />

    <section className="video-band">
      <AmbientVideo name="rail" poster="/media/rail-poster.jpg" className="video-band-media" />
      <div className="video-band-shade" />
      <Reveal className="video-band-content">
        <p className="eyebrow">REAL STORES. REAL PRICES.</p>
        <h2>Every piece is from a brand<br />you <em>already trust.</em></h2>
        <p>Buy straight from Levi's, Rare Rabbit, Jack & Jones and more, at their price, with their returns. We just help you choose.</p>
        <Link className="button button-light" href="/discover">Shop my edit <span>↗</span></Link>
      </Reveal>
    </section>

    <section className="occasion-section section-wrap" aria-labelledby="occasion-title">
      <Reveal className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> DRESS FOR YOUR DAY</p><h2 id="occasion-title">Where are you <em>headed?</em></h2></div><p className="section-aside">Start with the occasion.<br />We'll take it from there.</p></Reveal>
      <div className="occasion-grid">{occasions.map((item, index) => <Reveal key={item.n} delay={index * 90} className="occasion-cell"><Link className="occasion-card" href={item.href}><span className="occasion-number">{item.n}</span><span className="occasion-arrow">↗</span><div><h3>{item.name}</h3><p>{item.detail}</p></div></Link></Reveal>)}</div>
    </section>

    <section className="how-section section-wrap"><Reveal><p className="eyebrow"><span className="eyebrow-line" /> A BETTER WAY TO GET DRESSED</p></Reveal><div className="how-grid">
      <Reveal delay={0}><span>01</span><h3>Answer four questions</h3><p>Age, height, build, skin tone. Plus where you'll wear it and what you like to spend.</p></Reveal>
      <Reveal delay={120}><span>02</span><h3>See your edit</h3><p>Every piece is scored against your profile, with a plain-English reason like "Navy flatters wheatish skin".</p></Reveal>
      <Reveal delay={240}><span>03</span><h3>Buy from the brand</h3><p>Checkout happens on the brand's own site. We may earn a small commission, at no extra cost to you.</p></Reveal>
    </div></section>

    <section className="section-wrap home-guides" aria-labelledby="guides-title">
      <Reveal className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> FREE STYLE GUIDES</p><h2 id="guides-title">Answers to what men <em>actually ask.</em></h2></div><Link className="text-link" href="/style-guide">All style guides <span>→</span></Link></Reveal>
      <div className="guide-cards">{GUIDES.filter((guide) => ['best-colours-for-wheatish-skin-men', 'how-to-dress-for-a-broad-or-heavy-body-men', 'how-short-men-should-dress', 'office-wear-for-men'].includes(guide.slug)).map((guide, index) => <Reveal key={guide.slug} delay={index * 80}>
        <Link href={`/style-guide/${guide.slug}`} className="guide-card"><strong>{guide.title}</strong><p>{guide.description}</p><em>Read guide →</em></Link>
      </Reveal>)}</div>
    </section>

    <section className="section-wrap home-faq" aria-labelledby="faq-title">
      <Reveal><p className="eyebrow"><span className="eyebrow-line" /> QUESTIONS</p><h2 id="faq-title" className="faq-title">Good to <em>know.</em></h2></Reveal>
      <div className="guide-faq">{faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div>
    </section>

    <section className="cta-band section-wrap"><Reveal className="cta-inner"><p className="eyebrow">READY WHEN YOU ARE</p><h2>Two minutes from now,<br />you'll <em>know what suits you.</em></h2><Link className="button button-dark" href="/my-style">Start my profile <span>↗</span></Link></Reveal></section>
  </>;
}
