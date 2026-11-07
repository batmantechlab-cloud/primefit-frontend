import { GUIDES } from '../lib/guides';
import { siteUrl } from '../lib/site';
import { backendGet } from '../lib/server';
import { getCollections } from '../lib/collections';

export const revalidate = 3600;

export default async function sitemap() {
  const base = siteUrl();
  const now = new Date();
  const pages = [
    { path: '', priority: 1, changeFrequency: 'daily' },
    { path: '/deals', priority: 0.9, changeFrequency: 'daily' },
    { path: '/alerts', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/discover', priority: 0.9, changeFrequency: 'daily' },
    { path: '/my-style', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/shop', priority: 0.9, changeFrequency: 'daily' },
    { path: '/style-guide', priority: 0.9, changeFrequency: 'weekly' },
    ...GUIDES.map((guide) => ({ path: `/style-guide/${guide.slug}`, priority: 0.8, changeFrequency: 'monthly' })),
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/affiliate-disclosure', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  ];
  const [collections, products] = await Promise.all([getCollections(), backendGet('/api/products/sitemap', { revalidate: 3600 })]);
  return [
    ...pages.map(({ path, ...rest }) => ({ url: `${base}${path}`, lastModified: now, ...rest })),
    ...collections.map((item) => ({ url: `${base}/shop/${item.slug}`, lastModified: now, changeFrequency: 'daily', priority: item.colour || item.maxPrice ? 0.7 : 0.8 })),
    ...(products?.products || []).map((item) => ({ url: `${base}/p/${item.id}`, lastModified: item.updatedAt ? new Date(item.updatedAt) : now, changeFrequency: 'weekly', priority: 0.5 })),
  ];
}
