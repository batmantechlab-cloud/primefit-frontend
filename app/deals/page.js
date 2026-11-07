import { Suspense } from 'react';
import DealsFeed from '../../components/DealsFeed';
import { ProductSkeleton } from '../../components/ProductCard';

export const metadata = {
  title: "Men's Clothing Deals Today – Up to 70% Off Levi's, Rare Rabbit, Jack & Jones",
  description: "Today's biggest discounts on men's shirts, jeans, t-shirts and shoes from official brand stores. Updated daily, filter by price and discount.",
  alternates: { canonical: '/deals' },
};

export default function DealsPage() {
  return <section className="page-shell discover-page">
    <div className="page-intro">
      <p className="eyebrow"><span className="eyebrow-line" /> UPDATED DAILY</p>
      <h1 className="split-heading">Today's deals.<br /><em>Real brands, real discounts.</em></h1>
      <p>The biggest price drops across official brand stores, checked every day. Every piece ships from the brand itself, so you get the same returns and warranty.</p>
    </div>
    <Suspense fallback={<div className="product-grid"><ProductSkeleton count={6} /></div>}>
      <DealsFeed />
    </Suspense>
  </section>;
}
