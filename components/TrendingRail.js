'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { API_ROUTES, apiRequest } from '../lib/api';
import ProductCard, { ProductSkeleton } from './ProductCard';

// Live strip of the most popular pieces in the catalogue. Hides itself if the catalogue is empty.
export default function TrendingRail() {
  const [products, setProducts] = useState(null);
  const track = useRef(null);

  useEffect(() => {
    apiRequest(`${API_ROUTES.products}?limit=12`)
      .then((result) => setProducts(result.products || []))
      .catch(() => setProducts([]));
  }, []);

  function scrollBy(direction) {
    const node = track.current;
    if (node) node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: 'smooth' });
  }

  if (products && !products.length) return null;

  return <section className="section-wrap trending-section" aria-labelledby="trending-title">
    <div className="section-heading">
      <div><p className="eyebrow"><span className="eyebrow-line" /> TRENDING THIS WEEK</p><h2 id="trending-title">What men are <em>buying.</em></h2></div>
      <div className="rail-controls">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll left">←</button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll right">→</button>
        <Link className="text-link" href="/discover">See the full edit <span>→</span></Link>
      </div>
    </div>
    <div className="product-rail" ref={track}>
      {products ? products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />) : <ProductSkeleton count={4} />}
    </div>
  </section>;
}
