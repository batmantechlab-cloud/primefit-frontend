'use client';

import { useEffect, useRef, useState } from 'react';
import { apiRequest, formatPrice, readLocalProfile } from '../lib/api';

const STORE_KEY = 'primefit-stylist-chat';
const STARTERS = [
  'What should I wear to a friend\'s wedding? Budget ₹3,000',
  'Office shirts for a short, broad guy',
  'Best colours for wheatish skin under ₹1,500',
  'Date night outfit, smart casual',
];

function load() {
  try { return JSON.parse(sessionStorage.getItem(STORE_KEY)) || []; } catch { return []; }
}
function save(turns) {
  try { sessionStorage.setItem(STORE_KEY, JSON.stringify(turns.slice(-20))); } catch { /* storage blocked: chat still works */ }
}

// Floating AI stylist. Hidden entirely when the backend has no API key.
export default function StylistChat() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    apiRequest('/api/stylist/status').then((result) => setEnabled(Boolean(result?.enabled))).catch(() => setEnabled(false));
    setTurns(load());
  }, []);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [turns, busy, open]);

  async function send(text) {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...turns, { role: 'user', content }];
    setTurns(next); save(next); setInput(''); setBusy(true); setError('');
    try {
      const result = await apiRequest('/api/stylist/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: next.map(({ role, content: body }) => ({ role, content: body })), profile: readLocalProfile() || undefined }),
      });
      const reply = [...next, { role: 'assistant', content: result.message || 'Here are some picks for you.', products: result.products || [] }];
      setTurns(reply); save(reply);
    } catch (e) {
      setError(e.message || 'The stylist is busy. Try again in a moment.');
    } finally {
      setBusy(false);
    }
  }

  if (!enabled) return null;

  return <>
    <button type="button" className={`stylist-fab ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close AI stylist' : 'Ask the AI stylist'}>
      {open ? '×' : <><span className="stylist-spark">✦</span><span>Ask a stylist</span></>}
    </button>

    {open && <section className="stylist-panel" aria-label="AI stylist chat">
      <header><div><strong>PrimeFit Stylist</strong><span>Free picks from real brand stores</span></div>{turns.length > 0 && <button type="button" onClick={() => { setTurns([]); save([]); }}>New chat</button>}</header>

      <div className="stylist-messages" ref={listRef}>
        {!turns.length && <div className="stylist-welcome">
          <p>Tell me what you're dressing for, your budget, and a bit about you. I'll pick pieces that suit you.</p>
          <div>{STARTERS.map((starter) => <button type="button" key={starter} onClick={() => send(starter)}>{starter}</button>)}</div>
        </div>}
        {turns.map((turn, index) => <div key={index} className={`stylist-turn ${turn.role}`}>
          <p>{turn.content}</p>
          {turn.products?.length > 0 && <div className="stylist-products">{turn.products.map((product) => <a key={product.id} href={product.shopUrl} target="_blank" rel="sponsored nofollow noopener noreferrer">
            {product.image ? <img src={product.image} alt="" loading="lazy" /> : <span className="stylist-noimg" />}
            <span className="stylist-pname">{product.name}</span>
            <span className="stylist-price"><strong>{formatPrice(product.price)}</strong>{product.discountPercent >= 10 && <em>−{product.discountPercent}%</em>}</span>
            <span className="stylist-store">Shop on {product.storeName} ↗</span>
          </a>)}</div>}
        </div>)}
        {busy && <div className="stylist-turn assistant"><p className="stylist-typing"><span /><span /><span /></p></div>}
        {error && <p className="form-error">{error}</p>}
      </div>

      <form className="stylist-input" onSubmit={(event) => { event.preventDefault(); send(input); }}>
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="e.g. Kurta for Diwali, I'm 5'8&quot;, dusky" maxLength={600} aria-label="Message the stylist" />
        <button type="submit" className="button button-dark button-small" disabled={busy || !input.trim()}>Send</button>
      </form>
    </section>}
  </>;
}
