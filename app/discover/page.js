import { Suspense } from 'react';
import DiscoverProducts from '../../components/DiscoverProducts';
import { ProductSkeleton } from '../../components/ProductCard';

export const metadata = { alternates: { canonical: '/discover' }, title: 'Your Edit — Menswear Picked For You', description: "Menswear from Levi's, Rare Rabbit, Jack & Jones and more, picked for your height, build and skin tone." };

export default function DiscoverPage() {
  return <section className="page-shell discover-page">
    <div className="page-intro">
      <p className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL EDIT</p>
      <h1 className="split-heading">Less searching.<br /><em>More you.</em></h1>
      <p>Pieces from brands like Levi's, Rare Rabbit and Jack & Jones, picked for your height, build and skin tone. Hover a piece to see why it suits you, then buy it straight from the brand.</p>
    </div>
    <Suspense fallback={<div className="product-grid"><ProductSkeleton count={6} /></div>}>
      <DiscoverProducts />
    </Suspense>
  </section>;
}
