import { siteUrl } from '../lib/site';

// Search engines and AI assistants are explicitly welcome, so PrimeFit's guides
// can be found, cited and recommended. Private areas stay out of every index.
const PRIVATE = ['/admin', '/login', '/api/'];
const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot', 'meta-externalagent',
];

export default function robots() {
  const base = siteUrl();
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
