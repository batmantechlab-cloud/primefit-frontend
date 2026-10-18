'use client';
import { useState } from 'react';
import { API_ROUTES, apiRequest } from '../lib/api';
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General question', message: '' });
  const [status, setStatus] = useState(''); const [busy, setBusy] = useState(false);
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); }
  async function submit(e) { e.preventDefault(); setBusy(true); setStatus(''); try { await apiRequest(API_ROUTES.contact, { method: 'POST', body: JSON.stringify(form) }); setStatus('Your message has been sent. Thank you.'); setForm({ name: '', email: '', subject: 'General question', message: '' }); } catch (error) { setStatus(`${error.message} If the issue continues, please try again later.`); } finally { setBusy(false); } }
  return <form className="contact-card" onSubmit={submit}><label>Your name<input value={form.name} onChange={(e) => update('name', e.target.value)} autoComplete="name" required /></label><label>Email address<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" required /></label><label>What is this about?<select value={form.subject} onChange={(e) => update('subject', e.target.value)}><option>General question</option><option>Product or affiliate link</option><option>Privacy request</option><option>Accessibility feedback</option><option>Partnership</option></select></label><label>Your message<textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={5} minLength={10} required /></label><button className="button button-dark" disabled={busy}>{busy ? 'Sending…' : 'Send message'} <span>↗</span></button>{status && <p className="form-note" role="status">{status}</p>}</form>;
}
