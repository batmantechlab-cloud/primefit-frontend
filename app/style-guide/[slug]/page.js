import Link from 'next/link';
import { notFound } from 'next/navigation';
import GuidePicks from '../../../components/GuidePicks';
import { GUIDES, GUIDE_GROUPS, guideBySlug } from '../../../lib/guides';
import { COLOUR_HEX } from '../../../lib/api';
import { jsonLd, siteUrl } from '../../../lib/site';

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: `/style-guide/${guide.slug}` },
    openGraph: { type: 'article', title: guide.seoTitle, description: guide.description, url: `/style-guide/${guide.slug}`, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title: guide.seoTitle, description: guide.description, images: ['/twitter-image'] },
  };
}

const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();

  const base = siteUrl();
  const url = `${base}/style-guide/${guide.slug}`;
  const group = GUIDE_GROUPS.find((item) => item.key === guide.group);
  const related = GUIDES.filter((item) => item.slug !== guide.slug && item.group === guide.group).slice(0, 3);
  const others = GUIDES.filter((item) => item.group !== guide.group).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        mainEntityOfPage: url,
        url,
        inLanguage: 'en-IN',
        author: { '@type': 'Organization', name: 'PrimeFit', url: base },
        publisher: { '@id': `${base}/#organization` },
        about: 'Men\'s fashion',
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: 'Style guides', item: `${base}/style-guide` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };

  return <article className="guide-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/style-guide">Style guides</Link><span>/</span><span aria-current="page">{group?.label}</span></nav>

    <header className="guide-head">
      <p className="eyebrow"><span className="eyebrow-line" /> {group?.label.toUpperCase()}</p>
      <h1 className="split-heading">{guide.title}</h1>
      <div className="guide-answer"><strong>Quick answer</strong><p>{guide.answer}</p></div>
    </header>

    {guide.colours && <section className="guide-colours" aria-label="Colour guide">
      <div><h2>Wear more of</h2><div className="notes-swatches">{guide.colours.good.map((colour) => <span key={colour}><i style={{ background: COLOUR_HEX[colour] || '#ccc' }} />{cap(colour)}</span>)}</div></div>
      <div><h2>Go easy on</h2><div className="notes-swatches muted">{guide.colours.avoid.map((colour) => <span key={colour}><i style={{ background: COLOUR_HEX[colour] || '#ccc' }} />{cap(colour)}</span>)}</div></div>
    </section>}

    <div className="guide-body">
      {guide.sections.map((section) => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
      </section>)}
    </div>

    <section className="guide-picks">
      <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> PICKED BY OUR STYLIST</p><h2>Pieces that follow this <em>guide.</em></h2></div><Link className="text-link" href="/my-style">Get picks for your exact profile <span>→</span></Link></div>
      <GuidePicks preset={guide.preset} />
    </section>

    <section className="guide-faq">
      <h2>Frequently asked questions</h2>
      {guide.faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}
    </section>

    <aside className="guide-cta">
      <div><h2>Not sure which guide is you?</h2><p>Answer four questions (age, height, build and skin tone) and get a feed of clothes picked just for you.</p></div>
      <Link className="button button-light" href="/my-style">Style me in 2 minutes <span>↗</span></Link>
    </aside>

    <nav className="guide-related" aria-label="Related guides">
      <h2>Keep reading</h2>
      <div className="guide-cards">{[...related, ...others].slice(0, 4).map((item) => <Link key={item.slug} href={`/style-guide/${item.slug}`} className="guide-card"><span>{GUIDE_GROUPS.find((g) => g.key === item.group)?.label}</span><strong>{item.title}</strong><em>Read guide →</em></Link>)}</div>
    </nav>
  </article>;
}
