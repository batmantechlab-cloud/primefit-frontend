import { getSiteUrl } from '../lib/api';
export default function robots() { const base = getSiteUrl(); return { rules: [{ userAgent: '*', allow: '/', disallow: ['/login', '/my-style', '/api/'] }], sitemap: `${base}/sitemap.xml`, host: base }; }
