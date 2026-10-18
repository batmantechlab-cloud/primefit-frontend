import Link from 'next/link';
import Logo from './Logo';
import { GUIDES } from '../lib/guides';

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-intro">
        <Link href="/" className="brand footer-brand" aria-label="PrimeFit home"><Logo /></Link>
        <p>Your personal menswear stylist. Clothes picked for your height, build and skin tone.</p>
      </div>
      <nav className="footer-col" aria-label="Style guides">
        <strong>Style guides</strong>
        {GUIDES.slice(0, 6).map((guide) => <Link key={guide.slug} href={`/style-guide/${guide.slug}`}>{guide.title}</Link>)}
        <Link href="/style-guide">All guides →</Link>
      </nav>
      <nav className="footer-col" aria-label="PrimeFit">
        <strong>PrimeFit</strong>
        <Link href="/my-style">Get styled</Link>
        <Link href="/discover">Your edit</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <nav className="footer-col" aria-label="Legal">
        <strong>Legal</strong>
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/affiliate-disclosure">Affiliate disclosure</Link>
      </nav>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} PrimeFit</span><span>We may earn a commission when you buy through our links, at no extra cost to you.</span></div>
  </footer>;
}
