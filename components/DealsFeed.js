'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { API_ROUTES, apiRequest } from '../lib/api';
import ProductCard, { ProductSkeleton } from './ProductCard';

const CATEGORIES = [
  ['', 'Everything'], ['shirts', 'Shirts'], ['t-shirts', 'T-shirts'], ['polos', 'Polos'], ['jeans', 'Jeans'],
  ['trousers', 'Trousers'], ['jackets', 'Jackets'], ['sweatshirts', 'Sweatshirts'], ['footwear', 'Shoes'],
];
const PRICES = [['', 'Any price'], ['799', 'Under ₹799'], ['999', 'Under ₹999'], ['1499', 'Under ₹1,499'], ['1999', 'Under ₹1,999']];
const DISCOUNTS = [['20', '20%+ off'], ['40', '40%+ off'], ['50', '50%+ off']];
const PAGE_SIZE = 24;

export default function DealsFeed() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = params.get('category') || '';
  const maxPrice = params.get('maxPrice') || '';
  const minDiscount = params.get('minDiscount') || '20';

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, hasMore: false });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(async (pageToLoad) => {
    const query = new URLSearchParams({ sort: 'discount', minDiscount, page: pageToLoad, limit: PAGE_SIZE });
    if (category) query.set('category', category);
    if (maxPrice) query.set('maxPrice', maxPrice);
    const result = await apiRequest(`${API_ROUTES.products}?${query}`);
    setProducts((current) => (pageToLoad === 1 ? result.products : [...current, ...result.products]));
    setMeta(result);
    setPage(pageToLoad);
  }, [category, maxPrice, minDiscount]);

  useEffect(() => {
    setLoading(true);
    load(1).catch(() => setProducts([])).finally(() => setLoading(false));
  }, [load]);

  function setFilter(key, value) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    router.replace(`${pathname}${next.toString() ? `?${next}` : ''}`, { scroll: false });
  }


  return <div className="discover-feed">
    <div className="filter-bar" role="toolbar" aria-label="Filter deals">
      <div className="filter-row">{CATEGORIES.map(([value, label]) => <button key={label} type="button" className={`filter-chip ${category === value ? 'active' : ''}`} onClick={() => setFilter('category', value)}>{label}</button>)}</div>
      <div className="filter-row secondary">
        <select aria-label="Price" value={maxPrice} onChange={(e) => setFilter('maxPrice', e.target.value)}>{PRICES.map(([value, label]) => <option key={label} value={value}>{label}</option>)}</select>
        <select aria-label="Discount" value={minDiscount} onChange={(e) => setFilter('minDiscount', e.target.value)}>{DISCOUNTS.map(([value, label]) => <option key={label} value={value}>{label}</option>)}</select>
        {!loading && <span className="result-count">{meta.total} deals</span>}
      </div>
    </div>

    {loading ? <div className="product-grid"><ProductSkeleton count={6} /></div>
      : !products.length ? <div className="empty-state"><span className="empty-symbol">✳</span><h2>No deals match.</h2><p>Try a higher price limit or a smaller discount.</p></div>
        : <>
          <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
          {meta.hasMore && <div className="load-more-row"><button type="button" className="button button-quiet" disabled={loadingMore} onClick={() => { setLoadingMore(true); load(page + 1).finally(() => setLoadingMore(false)); }}>{loadingMore ? 'Loading…' : 'Show more deals'}</button></div>}
        </>}
  </div>;
}
