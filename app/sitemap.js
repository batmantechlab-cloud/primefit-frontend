import { GUIDES } from '../lib/guides';
import { siteUrl } from '../lib/site';

export default function sitemap() {
  const base = siteUrl();
  const now = new Date();
  const pages = [
    { path: '', priority: 1, changeFrequency: 'daily' },
    { path: '/discover', priority: 0.9, changeFrequency: 'daily' },
    { path: '/my-style', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/style-guide', priority: 0.9, changeFrequency: 'weekly' },
    ...GUIDES.map((guide) => ({ path: `/style-guide/${guide.slug}`, priority: 0.8, changeFrequency: 'monthly' })),
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/affiliate-disclosure', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  ];
  return pages.map(({ path, ...rest }) => ({ url: `${base}${path}`, lastModified: now, ...rest }));
}
