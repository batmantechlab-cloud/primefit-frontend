'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { API_ROUTES, apiRequest, readLocalProfile } from '../lib/api';
import { useAuth } from './AuthProvider';
import ProductCard, { ProductSkeleton } from './ProductCard';
import StylistNotes from './StylistNotes';

const OCCASIONS = [
  { value: '', label: 'All occasions' },
  { value: 'everyday', label: 'Everyday' },
  { value: 'work', label: 'Work' },
  { value: 'date-night', label: 'Date night' },
  { value: 'events', label: 'Events' },
  { value: 'travel', label: 'Travel' },
  { value: 'gym', label: 'Active' },
];
const PAGE_SIZE = 24;
const prettyCategory = (value) => value.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

export default function DiscoverProducts() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, ready } = useAuth();
  const occasion = params.get('occasion') || '';
  const category = params.get('category') || '';
  const platform = params.get('platform') || '';

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, hasMore: false, personalised: false, relaxed: false, brief: null, facets: { platforms: [], categories: [] } });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const sentinel = useRef(null);

  const load = useCallback(async (pageToLoad) => {
    const body = { profile: readLocalProfile() || undefined, occasion, category, platform, page: pageToLoad, limit: PAGE_SIZE };
    const result = await apiRequest(API_ROUTES.matchedProducts, { method: 'POST', body: JSON.stringify(body) });
    setMeta((current) => ({ ...result, brief: pageToLoad === 1 ? result.brief : current.brief, facets: pageToLoad === 1 ? result.facets : current.facets }));
    setProducts((current) => (pageToLoad === 1 ? result.products : [...current, ...result.products]));
    setPage(pageToLoad);
  }, [occasion, category, platform]);

  useEffect(() => {
    if (!ready) return;
    setLoading(true); setError('');
    load(1).catch((e) => setError(e.message || 'We could not load your edit.')).finally(() => setLoading(false));
  }, [ready, user, load]);

  const loadMore = useCallback(() => {
    if (loadingMore || !meta.hasMore) return;
    setLoadingMore(true);
    load(page + 1).catch(() => {}).finally(() => setLoadingMore(false));
  }, [loadingMore, meta.hasMore, load, page]);

  // Infinite scroll
  useEffect(() => {
    const node = sentinel.current;
    if (!node || !meta.hasMore) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && loadMore(), { rootMargin: '600px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore, meta.hasMore]);

  function setFilter(key, value) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    router.replace(`/discover${next.toString() ? `?${next}` : ''}`, { scroll: false });
  }

  return <div className="discover-feed">
    {!loading && !meta.personalised && <div className="personalise-banner">
      <div><strong>This is the trending edit.</strong><span>Tell us your age, height, build and skin tone. Every piece below re-ranks around you.</span></div>
      <Link className="button button-light button-small" href="/my-style">Get styled in 2 minutes <span>↗</span></Link>
    </div>}

    {!loading && meta.personalised && <StylistNotes brief={meta.brief} />}

    <div className="filter-bar" role="toolbar" aria-label="Filter products">
      <div className="filter-row">{OCCASIONS.map((item) => <button key={item.value} type="button" className={`filter-chip ${occasion === item.value ? 'active' : ''}`} onClick={() => setFilter('occasion', item.value)}>{item.label}</button>)}</div>
      <div className="filter-row secondary">
        <select aria-label="Category" value={category} onChange={(e) => setFilter('category', e.target.value)}>
          <option value="">All categories</option>
          {meta.facets?.categories?.map((value) => <option key={value} value={value}>{prettyCategory(value)}</option>)}
        </select>
        <select aria-label="Store" value={platform} onChange={(e) => setFilter('platform', e.target.value)}>
          <option value="">All stores</option>
          {meta.facets?.platforms?.map((store) => <option key={store.value} value={store.value}>{store.label}</option>)}
        </select>
        {!loading && <span className="result-count">{meta.total} {meta.total === 1 ? 'piece' : 'pieces'}{meta.personalised ? ', ranked for you' : ''}</span>}
      </div>
    </div>

    {meta.relaxed && !loading && <p className="feed-note">Only a few pieces matched your exact budget, so we've included some just outside it.</p>}

    {error ? <div className="empty-state"><span className="empty-symbol">!</span><h2>We hit a snag.</h2><p>{error}</p><button className="button button-dark" onClick={() => window.location.reload()}>Try again ↻</button></div>
      : loading ? <div className="product-grid"><ProductSkeleton count={6} /></div>
      : !products.length ? <div className="empty-state"><span className="empty-symbol">✳</span><h2>Nothing here yet.</h2><p>No pieces match these filters right now. Try another occasion, or loosen your style profile.</p><button className="button button-dark" onClick={() => router.replace('/discover')}>Clear filters <span>↺</span></button></div>
      : <>
        <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}{loadingMore && <ProductSkeleton count={3} />}</div>
        <div ref={sentinel} className="feed-end">{meta.hasMore ? <button className="button button-quiet" onClick={loadMore} disabled={loadingMore}>{loadingMore ? 'Loading…' : 'Show more'}</button> : <span>You've seen the full edit ✦</span>}</div>
      </>}
  </div>;
}
