'use client';

import { useEffect, useState } from 'react';
import { API_ROUTES, apiRequest } from '../lib/api';
import ProductCard, { ProductSkeleton } from './ProductCard';

// Live products picked by the stylist for a guide's preset profile.
export default function GuidePicks({ preset }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    apiRequest(API_ROUTES.matchedProducts, { method: 'POST', body: JSON.stringify({ profile: preset, limit: 16 }) })
      // Guides are about clothing, so leave shoes out of the picks.
      .then((result) => setProducts((result.products || []).filter((product) => product.category !== 'footwear').slice(0, 8)))
      .catch(() => setProducts([]));
  }, [preset]);

  if (products && !products.length) return null;
  return <div className="product-rail guide-rail">
    {products ? products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />) : <ProductSkeleton count={4} />}
  </div>;
}
