import Link from 'next/link';

export const metadata = {
  title: 'Personal Fashion Recommendations for Men',
  description: 'Find clothing that fits your proportions, preferences, budget and occasions. Build a style profile and discover more relevant pieces with PrimeFit.',
  alternates: { canonical: '/' },
};

const occasions = [
  { n: '01', name: 'Everyday', detail: 'Easy pieces for the days that make up your life.', href: '/discover?occasion=everyday' },
  { n: '02', name: 'Work', detail: 'A sharper look, without overthinking it.', href: '/discover?occasion=work' },
  { n: '03', name: 'Date night', detail: 'Put-together, still completely you.', href: '/discover?occasion=date-night' },
  { n: '04', name: 'Events', detail: 'Considered outfits for the moments that matter.', href: '/discover?occasion=events' },
];

export default function HomePage() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
  const schema = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'PrimeFit', url: siteUrl, description: 'Personalized menswear discovery based on fit, style, budget and occasion.' };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="hero-section">
      <div className="hero-copy reveal-up">
        <div className="eyebrow"><span className="eyebrow-line" /> PERSONAL STYLE, LESS GUESSWORK</div>
        <h1>Good style.<br /><em>Made personal.</em></h1>
        <p className="hero-intro">Clothes that make sense for your body, your taste and your life. No endless scrolling. Just a better place to start.</p>
        <div className="hero-actions"><Link className="button button-dark" href="/my-style">Find my style <span>↗</span></Link><Link className="text-link" href="/discover">Explore the edit <span>→</span></Link></div>
        <div className="hero-note"><span className="status-dot" /> No account needed to get started</div>
      </div>
      <div className="hero-art" aria-label="Abstract sculptural 3D forms representing personal style">
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <div className="sculpture sculpture-back" /><div className="sculpture sculpture-main" /><div className="sculpture sculpture-front" />
        <div className="art-caption"><span>THE PRIMEFIT EDIT</span><span>01 — PERSONAL</span></div>
        <div className="art-stamp">PF<br /><span>STUDIO</span></div>
      </div>
    </section>

    <section className="occasion-section section-wrap" aria-labelledby="occasion-title">
      <div className="section-heading"><div><p className="eyebrow">DRESS FOR YOUR DAY</p><h2 id="occasion-title">Where are you <em>headed?</em></h2></div><p className="section-aside">Start with the occasion.<br />We'll take it from there.</p></div>
      <div className="occasion-grid">{occasions.map((item) => <Link className="occasion-card" href={item.href} key={item.n}><span className="occasion-number">{item.n}</span><span className="occasion-arrow">↗</span><div><h3>{item.name}</h3><p>{item.detail}</p></div></Link>)}</div>
    </section>

    <section className="profile-band"><div className="profile-band-inner"><div><p className="eyebrow">YOUR STYLE, ON YOUR TERMS</p><h2>A stylist starts<br />by <em>knowing you.</em></h2><p className="band-copy">Tell us what fits, what feels right, and what you actually wear. Your preferences shape the recommendations you see.</p><Link className="button button-light" href="/my-style">Build my style profile <span>↗</span></Link></div><div className="profile-visual" aria-hidden="true"><div className="profile-ring ring-a"/><div className="profile-ring ring-b"/><div className="profile-disc"/><span className="profile-mark">YOU<br /><i>FIRST</i></span><span className="profile-side-note">FIT / COLOUR / OCCASION</span></div></div></section>

    <section className="how-section section-wrap"><p className="eyebrow">A BETTER WAY TO GET DRESSED</p><div className="how-grid"><div><span>01</span><h3>Tell us your style</h3><p>A few thoughtful choices. Skip anything you don't want to answer.</p></div><div><span>02</span><h3>See your edit</h3><p>We use your preferences to narrow the options to pieces that fit your brief.</p></div><div><span>03</span><h3>Shop the original</h3><p>Open the retailer's product page when something feels right. We may earn a commission from qualifying purchases.</p></div></div></section>
  </>;
}
