'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import Logo from './Logo';

const occasions = [
  { label: 'Everyday', href: '/discover?occasion=everyday' },
  { label: 'Work', href: '/discover?occasion=work' },
  { label: 'Date night', href: '/discover?occasion=date-night' },
  { label: 'Events', href: '/discover?occasion=events' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, ready, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const firstName = user?.name?.split(' ')[0];
  const navClass = (href) => (pathname === href ? 'is-active' : '');

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="nav-shell">
      <Link href="/" className="brand" aria-label="PrimeFit home"><Logo /></Link>
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="nav-dropdown">
          <span className="nav-label">Occasions <span className="chevron">⌄</span></span>
          <div className="dropdown-panel">{occasions.map((item) => <Link key={item.label} href={item.href}>{item.label}<span>↗</span></Link>)}</div>
        </div>
        <Link className={navClass('/discover')} href="/discover">Your edit</Link>
        <Link className={navClass('/my-style')} href="/my-style">Style profile</Link>
        <Link className={pathname?.startsWith('/style-guide') ? 'is-active' : ''} href="/style-guide">Style guides</Link>
        {user?.role === 'admin' && <Link className={navClass('/admin')} href="/admin">Studio</Link>}
        {user && <button type="button" className="nav-mobile-only nav-text-button" onClick={async () => { await logout(); router.push('/'); }}>Sign out</button>}
        {ready && !user && <Link className="nav-mobile-only" href="/login">Sign in</Link>}
      </nav>
      <div className="nav-actions">
        {ready && (user
          ? <div className="nav-dropdown account-menu">
              <span className="account-chip"><span className="account-avatar">{firstName?.[0]?.toUpperCase()}</span><span className="account-name">{firstName}</span></span>
              <div className="dropdown-panel dropdown-right">
                <Link href="/discover">My edit<span>↗</span></Link>
                <Link href="/my-style">Style profile<span>↗</span></Link>
                {user.role === 'admin' && <Link href="/admin">Studio<span>↗</span></Link>}
                <button type="button" onClick={async () => { await logout(); router.push('/'); }}>Sign out<span>→</span></button>
              </div>
            </div>
          : <Link className="nav-login" href="/login">Sign in</Link>)}
        <Link className="button button-dark button-small magnetic" href={user ? '/discover' : '/my-style'}>{user ? 'My edit' : 'Find my style'} <span>↗</span></Link>
      </div>
      <button className={`mobile-menu ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><span /><span /></button>
    </div>
  </header>;
}
