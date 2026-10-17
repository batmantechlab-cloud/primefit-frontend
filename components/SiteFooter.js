import Link from 'next/link';

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div><Link href="/" className="brand footer-brand">primefit<span>®</span></Link><p>Your style. Thoughtfully considered.</p></div>
      <div className="footer-links"><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/affiliate-disclosure">Affiliate disclosure</Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} PrimeFit</span><span>Style should feel like you.</span></div>
  </footer>;
}
