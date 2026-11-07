'use client';

import { useEffect, useState } from 'react';
import { apiRequest, readLocalProfile } from '../lib/api';
import ProductCard from './ProductCard';

const OCCASIONS = [
  ['daily', 'Daily & college'], ['office', 'Office'], ['date', 'Dates & outings'], ['party', 'Parties'],
  ['wedding', 'Weddings & festivals'], ['travel', 'Travel'], ['gym', 'Gym & sports'],
];
const CATEGORIES = [['shirts', 'Shirts'], ['t-shirts', 'T-shirts'], ['polos', 'Polos'], ['jeans', 'Jeans'], ['trousers', 'Trousers'], ['jackets', 'Jackets'], ['sweatshirts', 'Hoodies'], ['kurtas', 'Kurtas'], ['footwear', 'Shoes']];
const BUDGETS = ['Under ₹1,000', '₹1,000–₹2,000', '₹2,000–₹3,500', '₹3,500–₹6,000', 'Flexible'];
const SKIN = [['fair', 'Fair', '#f1d3bd'], ['wheatish', 'Wheatish', '#d9a77c'], ['dusky', 'Dusky', '#a8714a'], ['dark', 'Deep', '#6b4329']];
const BUILDS = [['slim', 'Slim'], ['average', 'Average'], ['athletic', 'Athletic'], ['broad', 'Broad / heavy']];

function Chips({ options, value, onChange, multi }) {
  const selected = (key) => (multi ? value.includes(key) : value === key);
  const toggle = (key) => onChange(multi ? (value.includes(key) ? value.filter((item) => item !== key) : [...value, key]) : (value === key ? '' : key));
  return <div className="choice-grid">{options.map(([key, label]) => <button type="button" key={key} className={`choice-chip ${selected(key) ? 'selected' : ''}`} aria-pressed={selected(key)} onClick={() => toggle(key)}>{label}</button>)}</div>;
}

export default function AlertSignup() {
  const [form, setForm] = useState({ name: '', phone: '', occasions: [], categories: [], budgetPerItem: '', skinTone: '', bodyType: '', heightCm: '', consent: false });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const set = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));

  // Reuse the style quiz answers if the shopper already took it.
  useEffect(() => {
    const profile = readLocalProfile();
    if (profile) setForm((current) => ({ ...current, occasions: profile.occasions || [], budgetPerItem: profile.budgetPerItem || '', skinTone: profile.skinTone || '', bodyType: profile.bodyType || '', heightCm: profile.heightCm || '' }));
  }, []);

  async function submit(event) {
    event.preventDefault();
    setBusy(true); setError('');
    try {
      setResult(await apiRequest('/api/alerts/subscribe', { method: 'POST', body: JSON.stringify({ ...form, heightCm: Number(form.heightCm) || undefined }) }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    const channels = [result.whatsappLink, result.telegramLink].filter(Boolean).length;
    return <div className="alert-done">
      <div className="wizard-card">
        <span className="alert-check">✓</span>
        <h2>You're registered{form.name ? `, ${form.name.split(' ')[0]}` : ''}!</h2>
        {channels > 0 ? <>
          <p>Last step: connect where you want your deals. You'll get today's best picks <strong>instantly</strong>, then new ones automatically as prices drop.</p>
          <div className="alert-connect">
            {result.whatsappLink && <a className="button connect-wa" href={result.whatsappLink} target="_blank" rel="noopener noreferrer">Connect WhatsApp <span>↗</span></a>}
            {result.telegramLink && <a className="button connect-tg" href={result.telegramLink} target="_blank" rel="noopener noreferrer">Connect Telegram <span>↗</span></a>}
          </div>
          <p className="privacy-hint">WhatsApp opens with a message ready. Just tap send. Telegram: tap Start. Your code is <strong>{result.code}</strong>.</p>
        </> : <p>Deal alerts are launching soon and you're on the list. Meanwhile, here are today's best deals for your style.</p>}
      </div>
      {result.products?.length > 0 && <section className="similar-section">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> PICKED FOR YOU, RIGHT NOW</p><h2>Today's deals <em>for your style.</em></h2></div></div>
        <div className="product-grid">{result.products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
      </section>}
    </div>;
  }

  return <form className="wizard-card alert-form" onSubmit={submit}>
    <div className="field-group alert-row">
      <label><span className="field-label">Your name</span><input className="text-input" value={form.name} onChange={(e) => set('name')(e.target.value)} placeholder="Rahul" maxLength={60} autoComplete="given-name" /></label>
      <label><span className="field-label">Mobile number *</span><div className="phone-input"><span>+91</span><input className="text-input" value={form.phone} onChange={(e) => set('phone')(e.target.value)} placeholder="98765 43210" inputMode="tel" autoComplete="tel-national" required /></div></label>
    </div>
    <div className="field-group"><span className="field-label">Where do you need outfits? *</span><Chips multi options={OCCASIONS} value={form.occasions} onChange={set('occasions')} /></div>
    <div className="field-group"><span className="field-label">What do you shop for? <span className="field-help">(optional, leave empty for everything)</span></span><Chips multi options={CATEGORIES} value={form.categories} onChange={set('categories')} /></div>
    <div className="field-group"><span className="field-label">Budget per piece</span><Chips options={BUDGETS.map((budget) => [budget, budget])} value={form.budgetPerItem} onChange={set('budgetPerItem')} /></div>
    <div className="field-group"><span className="field-label">Skin tone <span className="field-help">(for colours that suit you)</span></span><div className="choice-grid">{SKIN.map(([key, label, colour]) => <button type="button" key={key} className={`choice-chip ${form.skinTone === key ? 'selected' : ''}`} onClick={() => set('skinTone')(form.skinTone === key ? '' : key)}><i className="skin-dot" style={{ background: colour }} />{label}</button>)}</div></div>
    <div className="field-group alert-row">
      <div><span className="field-label">Build</span><Chips options={BUILDS} value={form.bodyType} onChange={set('bodyType')} /></div>
      <label><span className="field-label">Height in cm <span className="field-help">(optional)</span></span><input className="text-input" type="number" min="140" max="210" value={form.heightCm} onChange={(e) => set('heightCm')(e.target.value)} placeholder="172" /></label>
    </div>
    <label className="consent-row"><input type="checkbox" checked={form.consent} onChange={(e) => set('consent')(e.target.checked)} required /> <span>Send me deals that match my style on WhatsApp or Telegram. I can reply STOP anytime.</span></label>
    {error && <p className="form-error">{error}</p>}
    <button type="submit" className="button button-dark auth-submit" disabled={busy}>{busy ? 'Saving…' : 'Get my deals'} <span>↗</span></button>
    <p className="privacy-hint">Free. We only use your number to send deals you asked for, never shared or sold.</p>
  </form>;
}
