'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API_ROUTES, apiRequest } from '../lib/api';

export default function DiscoverProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    async function load() {
      const raw = localStorage.getItem('primefit-style-profile');
      if (!raw) { setLoading(false); return; }
      setHasProfile(true);
      try {
        const profile = JSON.parse(raw);
        const result = await apiRequest(API_ROUTES.matchedProducts, { method: 'POST', body: JSON.stringify({ profile, profileId: localStorage.getItem('primefit-style-profile-id') || undefined }) });
        setProducts(Array.isArray(result) ? result : result?.products || result?.data || []);
      } catch (e) { setError(e.message || 'We could not load your edit.'); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  if (loading) return <div className="product-state"><span className="loading-orb"/><p>Finding pieces that fit your style…</p></div>;
  if (!hasProfile) return <div className="empty-state"><span className="empty-symbol">✳</span><h2>Your edit starts with you.</h2><p>Tell us about your fit, preferences and budget. We'll use that profile to request relevant products from our catalogue.</p><Link className="button button-dark" href="/my-style">Create my style profile <span>↗</span></Link></div>;
  if (error) return <div className="empty-state"><h2>Your style is ready.</h2><p>{error}</p><button className="button button-dark" onClick={() => window.location.reload()}>Try again ↻</button></div>;
  if (!products.length) return <div className="empty-state"><span className="empty-symbol">✳</span><h2>Your edit is being refined.</h2><p>We couldn't find matching products yet. Try adjusting your preferences or check back when the product catalogue is connected.</p><Link className="button button-dark" href="/my-style">Adjust my style <span>↗</span></Link></div>;

  return <div className="product-grid">{products.map((product) => {
    const id = product.id || product._id || product.productId;
    const title = product.title || product.name;
    const image = product.imageUrl || product.image || product.images?.[0];
    const affiliateUrl = product.affiliateUrl || product.affiliateLink || product.trackingUrl;
    return <article className="product-card" key={id || `${title}-${product.price}`}>
      <a className="product-image-wrap" href={affiliateUrl || undefined} target={affiliateUrl ? '_blank' : undefined} rel={affiliateUrl ? 'sponsored nofollow noopener noreferrer' : undefined} aria-label={affiliateUrl ? `View ${title} at retailer` : title}>
        {image ? <img src={image} alt={product.imageAlt || title} loading="lazy" /> : <div className="product-image-missing">PrimeFit<br /><span>Selected for you</span></div>}
        {product.matchReason && <span className="match-tag">{product.matchReason}</span>}
        <span className="product-open">View ↗</span>
      </a>
      <div className="product-details"><div><h2>{title}</h2><p>{product.brand || product.category || 'Selected for your style'}</p></div><span>{product.currency || '₹'}{product.price ?? ''}</span></div>
      {!affiliateUrl && <p className="product-warning">Retailer link unavailable</p>}
    </article>;
  })}</div>;
}
