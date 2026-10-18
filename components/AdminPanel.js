'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { API_ROUTES, PLATFORM_NAMES, apiRequest, formatPrice } from '../lib/api';
import { useAuth } from './AuthProvider';

function ResultNote({ result }) {
  if (!result) return null;
  if (result.error) return <p className="form-error" role="alert">{result.error}</p>;
  return <div className="form-note" role="status">
    {result.store ? <strong>{result.store}: </strong> : null}
    Found {result.found} · <strong>{result.created} new</strong> · {result.updated} refreshed{result.skipped ? ` · ${result.skipped} skipped (sold out, accessories or not menswear)` : ''}{result.archived ? ` · ${result.archived} archived (no longer sold)` : ''}{result.failed ? ` · ${result.failed} failed` : ''}
    {result.errors?.length ? <ul className="error-list">{result.errors.map((line) => <li key={line}>{line}</li>)}</ul> : null}
  </div>;
}

function AffiliateSettings({ onSaved }) {
  const [settings, setSettings] = useState(null);
  const [channelId, setChannelId] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiRequest(API_ROUTES.adminSettings).then((result) => { setSettings(result.affiliate); setChannelId(result.affiliate.channelId || ''); }).catch(() => {});
  }, []);

  async function save(patch) {
    setBusy(true); setMessage('');
    try {
      const result = await apiRequest(API_ROUTES.adminSettings, { method: 'PUT', body: JSON.stringify(patch) });
      setSettings(result.affiliate);
      setMessage('Saved.');
      onSaved?.();
    } catch (e) { setMessage(e.message); } finally { setBusy(false); }
  }

  if (!settings) return <div className="admin-card"><span className="loading-orb" /></div>;
  return <div className="admin-card">
    <div className="admin-card-head"><h3>Cuelinks affiliate</h3><span className={`status-pill ${settings.channelId ? 'ok' : 'warn'}`}>{settings.channelId ? 'Earning enabled' : 'Not set up'}</span></div>
    <form className="admin-inline admin-inline-2" onSubmit={(e) => { e.preventDefault(); save({ channelId }); }}>
      <label className="sr-only" htmlFor="channel">Channel ID</label>
      <input id="channel" className="text-input" inputMode="numeric" value={channelId} onChange={(e) => setChannelId(e.target.value)} placeholder="Cuelinks channel ID" />
      <button className="button button-dark" disabled={busy}>{busy ? 'Saving…' : 'Save channel'} <span>↗</span></button>
    </form>
    <label className="toggle-row">
      <input type="checkbox" checked={Boolean(settings.monetizedOnly)} onChange={(e) => save({ monetizedOnly: e.target.checked })} />
      <span className="toggle" />
      <span>Only show products from stores that pay commission <em>(recommended)</em></span>
    </label>
    <label className="toggle-row">
      <input type="checkbox" checked={settings.requireDeepLinks !== false} onChange={(e) => save({ requireDeepLinks: e.target.checked })} />
      <span className="toggle" />
      <span>Hide stores whose affiliate link lands on their homepage instead of the product <em>(recommended: shoppers rarely buy if they lose the item)</em></span>
    </label>
    {message && <p className="form-note">{message}</p>}
  </div>;
}

export default function AdminPanel() {
  const { user, ready } = useAuth();
  const [stats, setStats] = useState(null);
  const [stores, setStores] = useState([]);
  const [tab, setTab] = useState('urls');
  const [busy, setBusy] = useState('');
  const [result, setResult] = useState(null);
  const [urls, setUrls] = useState('');
  const [feed, setFeed] = useState('');
  const [list, setList] = useState({ products: [], total: 0 });
  const [listQuery, setListQuery] = useState('');

  const refresh = useCallback(async () => {
    const [nextStats, nextStores, nextList] = await Promise.all([
      apiRequest(API_ROUTES.adminStats),
      apiRequest(API_ROUTES.adminStores),
      apiRequest(`${API_ROUTES.adminProducts}?limit=30${listQuery ? `&q=${encodeURIComponent(listQuery)}` : ''}`),
    ]);
    setStats(nextStats);
    setStores(nextStores.stores);
    setList(nextList);
  }, [listQuery]);

  useEffect(() => { if (user?.role === 'admin') refresh().catch(() => {}); }, [user, refresh]);

  async function run(label, path, body) {
    setBusy(label); setResult(null);
    try {
      setResult(await apiRequest(path, { method: 'POST', body: JSON.stringify(body || {}) }));
      await refresh();
    } catch (e) {
      setResult({ error: e.message });
    } finally { setBusy(''); }
  }

  async function setStatus(product, status) {
    await apiRequest(API_ROUTES.adminProduct(product._id), { method: 'PATCH', body: JSON.stringify({ status }) });
    refresh();
  }

  async function remove(product) {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    await apiRequest(API_ROUTES.adminProduct(product._id), { method: 'DELETE' });
    refresh();
  }

  if (!ready) return <div className="product-state"><span className="loading-orb" /></div>;
  if (!user) return <div className="empty-state"><h2>Studio is for admins.</h2><p>Sign in with an admin account to manage the catalogue.</p><Link className="button button-dark" href="/login?next=/admin">Sign in <span>↗</span></Link></div>;
  if (user.role !== 'admin') return <div className="empty-state"><h2>Admin access required.</h2><p>Run <code>npm run make-admin -- {user.email}</code> in the backend folder, then reload this page.</p></div>;

  const earning = stores.filter((store) => store.tracking?.tracked && store.tracking?.deepLink);

  return <div className="admin-grid">
    <div className="stat-row">
      <div className="stat-card"><span>Live products</span><strong>{stats?.live?.toLocaleString('en-IN') ?? '—'}</strong></div>
      <div className="stat-card"><span>Shopper clicks</span><strong>{stats?.clicks?.toLocaleString('en-IN') ?? '—'}</strong></div>
      <div className="stat-card"><span>Accounts</span><strong>{stats?.users ?? '—'}</strong></div>
      <div className="stat-card"><span>Live earning stores</span><strong>{earning.length || '—'}</strong></div>
    </div>

    <AffiliateSettings onSaved={refresh} />

    <div className="admin-card">
      <div className="admin-card-head">
        <h3>Partner stores</h3>
        <button type="button" className="button button-quiet button-small" disabled={Boolean(busy)} onClick={() => run('check', API_ROUTES.adminStoresCheck)}>{busy === 'check' ? 'Checking…' : 'Re-check earnings'} <span>↻</span></button>
      </div>
      <p className="admin-help">Stores marked <strong>Earns</strong> pay you commission through your Cuelinks channel and open the exact product. <strong>Lands on homepage</strong> means the advertiser's campaign doesn't support product links yet. Ask Cuelinks support to enable deep linking, then re-check. Partner stores sync automatically every 24 hours.</p>
      <div className="store-list">{stores.map((store) => <div className="store-row" key={store.key}>
        <div className="store-main"><strong>{store.name}</strong><span>{store.domain}</span></div>
        <span className={`status-pill ${!store.tracking ? 'muted' : !store.tracking.tracked ? 'muted' : store.tracking.deepLink ? 'ok' : 'warn'}`} title={store.tracking?.tracked && !store.tracking.deepLink ? 'Ask Cuelinks to enable deep links for this campaign' : undefined}>
          {!store.tracking ? 'Not checked' : !store.tracking.tracked ? 'No commission' : store.tracking.deepLink ? 'Earns' : 'Earns · lands on homepage'}
        </span>
        <span className="store-count">{store.products.toLocaleString('en-IN')} live</span>
        {store.type === 'shopify'
          ? <button type="button" className="button button-dark button-small" disabled={Boolean(busy)} onClick={() => run(store.key, API_ROUTES.adminStoreSync(store.key))}>{busy === store.key ? 'Syncing…' : 'Sync'}</button>
          : <span className="store-note">{store.type === 'search' ? 'Search import (CLI)' : 'URL / feed import'}</span>}
      </div>)}</div>
      {busy && busy !== 'check' && <p className="admin-help">Syncing can take a minute for large stores…</p>}
      <ResultNote result={result} />
    </div>

    <div className="admin-card">
      <div className="auth-tabs admin-tabs admin-tabs-2">
        {[['urls', 'Import product URLs'], ['feed', 'Import JSON feed']].map(([key, label]) => <button key={key} type="button" className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{label}</button>)}
      </div>
      {tab === 'urls' && <form className="admin-form" onSubmit={(e) => { e.preventDefault(); run('urls', API_ROUTES.adminImportUrls, { urls: urls.split(/\s+/).filter(Boolean) }); }}>
        <p className="admin-help">Paste product page links, one per line (max 50). Useful for Tata CLiQ, Nykaa Fashion or Bewakoof pieces you want to feature.</p>
        <textarea className="text-input" rows={5} value={urls} onChange={(e) => setUrls(e.target.value)} placeholder={'https://www.tatacliq.com/...\nhttps://www.nykaafashion.com/...'} required />
        <button className="button button-dark" disabled={Boolean(busy)}>{busy === 'urls' ? 'Importing…' : 'Import URLs'} <span>↗</span></button>
      </form>}
      {tab === 'feed' && <form className="admin-form" onSubmit={(e) => {
        e.preventDefault();
        try { const parsed = JSON.parse(feed); run('feed', API_ROUTES.adminImportFeed, { products: Array.isArray(parsed) ? parsed : parsed.products }); }
        catch { setResult({ error: 'That is not valid JSON.' }); }
      }}>
        <p className="admin-help">Paste a JSON array from an affiliate product feed. Each item needs <code>name</code>, <code>price</code>, <code>image</code> and <code>productUrl</code>. Optional: <code>brand, mrp, category, color, sizes, id</code>.</p>
        <textarea className="text-input code-input" rows={7} value={feed} onChange={(e) => setFeed(e.target.value)} placeholder={'[{ "name": "Men Slim Fit Linen Shirt", "brand": "…", "price": 899, "mrp": 1999, "image": "https://…", "productUrl": "https://www.tatacliq.com/…" }]'} required />
        <button className="button button-dark" disabled={Boolean(busy)}>{busy === 'feed' ? 'Importing…' : 'Import feed'} <span>↗</span></button>
      </form>}
    </div>

    <div className="admin-card">
      <div className="admin-list-head"><h3>Catalogue <span>{list.total.toLocaleString('en-IN')}</span></h3><input className="text-input" placeholder="Search products" value={listQuery} onChange={(e) => setListQuery(e.target.value)} /></div>
      <div className="admin-list">{list.products.map((product) => <div className="admin-row" key={product._id}>
        {product.images?.[0]?.url ? <img src={product.images[0].url} alt="" loading="lazy" /> : <span className="admin-thumb" />}
        <div className="admin-row-main"><strong>{product.name}</strong><span>{PLATFORM_NAMES[product.platform] || product.platform} · {product.category} · {formatPrice(product.price)} · {product.clicks} clicks</span></div>
        <select value={product.status} onChange={(e) => setStatus(product, e.target.value)} aria-label="Status"><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select>
        <button type="button" className="icon-button" onClick={() => remove(product)} aria-label={`Delete ${product.name}`}>✕</button>
      </div>)}</div>
    </div>
  </div>;
}
