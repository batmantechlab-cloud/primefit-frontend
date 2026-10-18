import Link from 'next/link';
import Reveal from '../../components/Reveal';
import { GUIDES, GUIDE_GROUPS } from '../../lib/guides';
import { jsonLd, siteUrl } from '../../lib/site';

export const metadata = {
  title: "Men's Style Guides: Colours, Body Types, Height & Occasions",
  description: 'Free menswear guides for Indian men: the best colours for fair, wheatish, dusky and dark skin, how to dress for your body type and height, and what to wear to the office, weddings and dates.',
  alternates: { canonical: '/style-guide' },
};

export default function StyleGuideHub() {
  const base = siteUrl();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "PrimeFit men's style guides",
    url: `${base}/style-guide`,
    hasPart: GUIDES.map((guide) => ({ '@type': 'Article', headline: guide.title, url: `${base}/style-guide/${guide.slug}` })),
  };

  return <section className="page-shell guide-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    <div className="page-intro">
      <p className="eyebrow"><span className="eyebrow-line" /> MEN&apos;S STYLE GUIDES</p>
      <h1 className="split-heading">Dress for <em>who you are.</em></h1>
      <p>Simple, honest answers to the questions men actually ask: which colours suit my skin, what fits my body, and what to wear where. No jargon. Every guide comes with pieces you can buy today.</p>
    </div>
    {GUIDE_GROUPS.map((group) => <div key={group.key} className="guide-group">
      <Reveal><h2>{group.label}</h2></Reveal>
      <div className="guide-cards">{GUIDES.filter((guide) => guide.group === group.key).map((guide, index) => <Reveal key={guide.slug} delay={index * 70}>
        <Link href={`/style-guide/${guide.slug}`} className="guide-card"><span>{group.label}</span><strong>{guide.title}</strong><p>{guide.description}</p><em>Read guide →</em></Link>
      </Reveal>)}</div>
    </div>)}
  </section>;
}
