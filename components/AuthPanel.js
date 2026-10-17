'use client';

import Link from 'next/link';
import { useState } from 'react';
import { API_ROUTES, apiRequest, apiUrl } from '../lib/api';

export default function AuthPanel() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const path = mode === 'login' ? API_ROUTES.login : API_ROUTES.register;
      const result = await apiRequest(path, { method: 'POST', body: JSON.stringify({ email, password, ...(mode === 'register' ? { name } : {}) }) });
      setMessage(mode === 'login' ? 'Signed in. Your profile can now sync with your account.' : 'Account created. Your style profile can now sync with your account.');
      const cached = localStorage.getItem('primefit-style-profile');
      if (cached) {
        try { await apiRequest(API_ROUTES.saveStyle, { method: 'POST', body: JSON.stringify({ ...JSON.parse(cached), accountSync: true }) }); } catch { /* Profile remains cached; user can retry syncing later. */ }
      }
    } catch (e) { setError(e.message || 'Could not sign in. Please try again.'); }
    finally { setBusy(false); }
  }

  return <div className="auth-card">
    <button className="google-button" type="button" onClick={() => { window.location.href = apiUrl(API_ROUTES.google); }}><span className="google-g">G</span> Continue with Google <span>↗</span></button>
    <div className="auth-divider"><span />or use email<span /></div>
    <div className="auth-tabs"><button className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError(''); setMessage(''); }}>Sign in</button><button className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError(''); setMessage(''); }}>Create account</button></div>
    <form onSubmit={submit} className="auth-form">
      {mode === 'register' && <label>Your name<input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required /></label>}
      <label>Email address<input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label>Password<input type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required /><span className="field-help">Use at least 8 characters.</span></label>
      <button className="button button-dark auth-submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Sign in securely' : 'Create account'} <span>↗</span></button>
    </form>
    {error && <p className="form-error" role="alert">{error}</p>}{message && <p className="form-note" role="status">{message}</p>}
    <p className="auth-optional">No account yet? No problem. <Link href="/my-style">Build your style profile without signing in →</Link></p>
    <p className="privacy-hint">By continuing, you agree to our <Link href="/terms">Terms</Link> and acknowledge our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
  </div>;
}
