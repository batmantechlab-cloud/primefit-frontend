import Link from 'next/link';
import { getCollections } from '../../lib/collections';

export const revalidate = 3600;
export const metadata = {
  title: "Shop Men's Clothing by Colour, Style & Budget",
  description: "Browse men's shirts, jeans, t-shirts, trousers and shoes by colour and budget, from official brand stores like Levi's, Rare Rabbit and Jack & Jones.",
  alternates: { canonical: '/shop' },
};

export default async function ShopIndex() {
  const collections = await getCollections();
  const byCategory = {};
  for (const item of collections) (byCategory[item.category] ||= []).push(item);

  return <section className="page-shell discover-page">
    <div className="page-intro">
      <p className="eyebrow"><span className="eyebrow-line" /> SHOP</p>
      <h1 className="split-heading">Shop by <em>colour and budget.</em></h1>
      <p>Every collection is built from live stock at official brand stores and refreshed daily.</p>
    </div>
    {Object.entries(byCategory).map(([category, items]) => {
      const main = items.find((item) => !item.colour && !item.maxPrice) || items[0];
      return <nav key={category} className="collection-links" aria-label={main.title}>
        <h2><Link href={`/shop/${main.slug}`}>{main.title}</Link> <span>{main.count}</span></h2>
        <div>{items.filter((item) => item !== main).map((item) => <Link key={item.slug} href={`/shop/${item.slug}`}>{item.title.replace(/ for Men/, '')}</Link>)}</div>
      </nav>;
    })}
  </section>;
}
