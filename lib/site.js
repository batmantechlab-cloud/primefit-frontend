export const SITE_NAME = 'PrimeFit';
export const SITE_TAGLINE = 'Your personal menswear stylist';

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

// Serialises JSON-LD safely for a <script> tag.
export function jsonLd(data) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
