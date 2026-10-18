'use client';

import { useState } from 'react';
import { PLATFORM_NAMES, apiUrl, formatPrice } from '../lib/api';

export default function ProductCard({ product, index = 0 }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const store = product.storeName || PLATFORM_NAMES[product.platform] || 'Store';

  // Tracks the pointer for the soft spotlight on hover.
  function onMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return <article className="product-card" style={{ '--i': index % 12 }} onMouseMove={onMove}>
    <a className="product-image-wrap" href={apiUrl(product.shopUrl)} target="_blank" rel="sponsored nofollow noopener noreferrer" aria-label={`Shop ${product.name} on ${store}`}>
      {!loaded && !failed && <span className="image-skeleton" />}
      {product.image && !failed
        ? <img className={`primary-image ${loaded ? 'is-loaded' : ''}`} src={product.image} alt={product.name} loading="lazy" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
        : <div className="product-image-missing">PrimeFit<br /><span>Selected for you</span></div>}
      {product.hoverImage && !failed && <img className="hover-image" src={product.hoverImage} alt="" loading="lazy" aria-hidden="true" />}
      <span className="card-spotlight" />
      <div className="card-badges">
        {product.matchPercent ? <span className="match-badge"><i style={{ '--p': product.matchPercent }} />{product.matchPercent}% your style</span> : null}
        {product.discountPercent >= 10 && <span className="discount-badge">−{product.discountPercent}%</span>}
      </div>
      {product.matchReason && <span className="match-tag">{product.matchReason}</span>}
      {product.reasons?.length > 1 && <ul className="card-reasons">{product.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>}
      <span className="product-open">Shop on {store} <span>↗</span></span>
    </a>
    <div className="product-details">
      <div className="product-meta-row"><span className="product-brand">{product.brand || product.category}</span>{store.toLowerCase() !== (product.brand || '').toLowerCase() && <span className="platform-pill">{store}</span>}</div>
      <h2 title={product.name}>{product.name}</h2>
      <div className="product-price-row">
        <strong>{formatPrice(product.price)}</strong>
        {product.originalPrice > product.price && <s>{formatPrice(product.originalPrice)}</s>}
        {product.rating ? <span className="product-rating">★ {product.rating.toFixed(1)}{product.ratingCount ? <em> ({product.ratingCount >= 1000 ? `${(product.ratingCount / 1000).toFixed(1)}k` : product.ratingCount})</em> : null}</span> : null}
      </div>
    </div>
  </article>;
}

export function ProductSkeleton({ count = 6 }) {
  return Array.from({ length: count }, (_, index) => <div className="product-card skeleton-card" key={index} aria-hidden="true">
    <div className="product-image-wrap"><span className="image-skeleton" /></div>
    <div className="product-details"><span className="skeleton-line short" /><span className="skeleton-line" /><span className="skeleton-line mid" /></div>
  </div>);
}
