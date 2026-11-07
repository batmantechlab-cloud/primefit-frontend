import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '../../../components/ProductCard';
import { backendGet } from '../../../lib/server';
import { collectionCopy, getCollection, getCollections } from '../../../lib/collections';
import { jsonLd, siteUrl } from '../../../lib/site';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) return { title: 'Collection not found', robots: { index: false } };
  const title = `${collection.title} – ${collection.count} Picks${collection.bestDiscount >= 20 ? `, Up to ${collection.bestDiscount}% Off` : ''}`;
  const { intro } = collectionCopy(collection);
  return { title, description: intro.slice(0, 158), alternates: { canonical: `/shop/${slug}` }, openGraph: { title, description: intro, url: `/shop/${slug}` } };
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const [collection, all] = await Promise.all([getCollection(slug), getCollections()]);
  if (!collection) notFound();

  const query = new URLSearchParams({ category: collection.category, limit: '24', sort: 'popular' });
  if (collection.colour) query.set('colour', collection.colour);
  if (collection.maxPrice) query.set('maxPrice', String(collection.maxPrice));
  const products = (await backendGet(`/api/products?${query}`))?.products || [];
  const { intro, faqs } = collectionCopy(collection);

  // Internal links: same garment in other colours / budgets, which also helps Google crawl.
  const related = all.filter((item) => item.slug !== slug && item.category === collection.category).slice(0, 14);
  const base = siteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', name: collection.title, url: `${base}/shop/${slug}`, description: intro },
      { '@type': 'ItemList', itemListElement: products.slice(0, 12).map((product, index) => ({ '@type': 'ListItem', position: index + 1, url: `${base}/p/${product.id}`, name: product.name })) },
      { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: `${base}/shop` },
        { '@type': 'ListItem', position: 3, name: collection.title, item: `${base}/shop/${slug}` },
      ] },
    ],
  };

  return <section className="page-shell discover-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><span aria-current="page">{collection.title}</span></nav>
    <div className="page-intro">
      <p className="eyebrow"><span className="eyebrow-line" /> {collection.count} PIECES · UPDATED DAILY</p>
      <h1 className="split-heading">{collection.title}</h1>
      <p>{intro}</p>
      <div className="collection-actions">
        <Link className="button button-dark button-small" href="/my-style">Rank these for my body type <span>↗</span></Link>
      </div>
    </div>

    {products.length
      ? <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
      : <div className="empty-state"><h2>Restocking.</h2><p>These pieces are being refreshed from the stores. Check back shortly.</p></div>}

    {related.length > 0 && <nav className="collection-links" aria-label="Related collections"><h2>Related collections</h2><div>{related.map((item) => <Link key={item.slug} href={`/shop/${item.slug}`}>{item.title}</Link>)}</div></nav>}

    <section className="guide-faq">
      <h2>Frequently asked questions</h2>
      {faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}
    </section>
  </section>;
}
