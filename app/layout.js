import { DM_Sans, Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { AuthProvider } from '../components/AuthProvider';
import { SITE_NAME, jsonLd, siteUrl } from '../lib/site';

const sans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });
const display = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-display', display: 'swap' });
const serif = Playfair_Display({ subsets: ['latin'], weight: ['500'], style: ['italic'], variable: '--font-serif', display: 'swap' });

const base = siteUrl();
const description = "PrimeFit is a free personal menswear stylist. Tell us your age, height, build and skin tone, and get clothes that suit you from Levi's, Rare Rabbit, Jack & Jones and more, with style guides for every Indian skin tone and body type.";

export const metadata = {
  metadataBase: new URL(base),
  title: { default: 'PrimeFit — Personal Menswear Stylist for Indian Men', template: '%s | PrimeFit' },
  description,
  applicationName: SITE_NAME,
  keywords: ['men fashion', 'menswear', 'personal stylist for men', 'what to wear men', 'colours for wheatish skin', 'dress for body type men', 'men style guide India', 'office wear men', 'outfit ideas for men'],
  authors: [{ name: SITE_NAME, url: base }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'fashion',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    title: 'PrimeFit — Your Personal Menswear Stylist',
    description: 'Answer four questions about yourself. Get clothes that suit your height, build and skin tone.',
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', title: 'PrimeFit — Your Personal Menswear Stylist', description: 'Clothes picked for your height, build and skin tone. No fashion knowledge needed.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  // Cuelinks site ownership verification (required for affiliate approval).
  other: { 'cuelinks-verification': 'VERIFY-CL-WHUKJSBK' },
};

export const viewport = { themeColor: '#29352d', width: 'device-width', initialScale: 1 };

const organization = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: SITE_NAME,
      url: base,
      logo: { '@type': 'ImageObject', url: `${base}/icon.svg` },
      description: 'A personal menswear stylist that recommends clothes based on age, height, body type and skin tone.',
    },
    {
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      name: SITE_NAME,
      url: base,
      description,
      inLanguage: 'en-IN',
      publisher: { '@id': `${base}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return <html lang="en-IN" className={`${sans.variable} ${display.variable} ${serif.variable}`}>
    <body>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organization)} />
      <AuthProvider><SiteHeader /><main>{children}</main><SiteFooter /></AuthProvider>
    </body>
  </html>;
}
