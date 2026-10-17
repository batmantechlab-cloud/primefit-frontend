import { getSiteUrl } from '../lib/api';
export default function sitemap() { const base = getSiteUrl(); const pages = ['', '/about', '/contact', '/privacy-policy', '/terms', '/affiliate-disclosure', '/discover']; return pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === '' ? 'weekly' : 'monthly', priority: path === '' ? 1 : 0.6 })); }
