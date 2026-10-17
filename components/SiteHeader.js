'use client';

import Link from 'next/link';
import { useState } from 'react';

const occasions = [
  { label: 'Everyday', href: '/discover?occasion=everyday' },
  { label: 'Work', href: '/discover?occasion=work' },
  { label: 'Date night', href: '/discover?occasion=date-night' },
  { label: 'Events', href: '/discover?occasion=events' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="nav-shell">
      <Link href="/" className="brand" aria-label="PrimeFit home">primefit<span>®</span></Link>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="nav-dropdown">
          <span className="nav-label">Occasions <span className="chevron">⌄</span></span>
          <div className="dropdown-panel">{occasions.map((item) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<span>↗</span></Link>)}</div>
        </div>
        <Link href="/my-style" onClick={() => setOpen(false)}>My style</Link>
        <Link href="/discover" onClick={() => setOpen(false)}>Discover</Link>
      </nav>
      <div className="nav-actions">
        <Link className="nav-login" href="/login">Sign in</Link>
        <Link className="button button-dark button-small" href="/my-style">Find my style <span>↗</span></Link>
      </div>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? '×' : '☰'}</button>
    </div>
  </header>;
}
