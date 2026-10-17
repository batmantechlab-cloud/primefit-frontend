import './globals.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'PrimeFit — Your Personal Style, Refined', template: '%s | PrimeFit' },
  description: 'Discover clothing selected around your style, fit, colours, budget and occasions. A simpler, more personal way to dress well.',
  applicationName: 'PrimeFit',
  openGraph: {
    type: 'website', siteName: 'PrimeFit', title: 'PrimeFit — Your Personal Style, Refined',
    description: 'Clothing recommendations shaped around your personal style.', url: siteUrl,
  },
  twitter: { card: 'summary_large_image', title: 'PrimeFit — Your Personal Style, Refined', description: 'A more personal way to discover what to wear.' },
  other: { 'cuelinks-verification': 'VERIFY-CL-WHUKJSBK' },
};

export default function RootLayout({ children }) {
  return <html lang="en-IN"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
