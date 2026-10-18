// Empty by default: requests go to this site's /api, which next.config.mjs proxies to the backend.
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

export const API_ROUTES = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  me: '/api/auth/me',
  logout: '/api/auth/logout',
  saveStyle: '/api/style-profiles',
  myStyle: '/api/style-profiles/me',
  products: '/api/products',
  matchedProducts: '/api/products/matched',
  contact: '/api/contact',
  adminStats: '/api/admin/stats',
  adminSettings: '/api/admin/settings',
  adminStores: '/api/admin/stores',
  adminStoresCheck: '/api/admin/stores/check',
  adminStoreSync: (key) => `/api/admin/stores/${encodeURIComponent(key)}/sync`,
  adminImportUrls: '/api/admin/import-urls',
  adminImportFeed: '/api/admin/import-feed',
  adminProducts: '/api/admin/products',
  adminProduct: (id) => `/api/admin/products/${encodeURIComponent(id)}`,
};

export function apiUrl(path) {
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.body && !(options.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const message = typeof payload === 'object' && payload?.message ? payload.message : 'Something went wrong. Please try again.';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return payload;
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export const PROFILE_KEY = 'primefit-profile-v2';

export function readLocalProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function formatPrice(value) {
  if (value == null) return '';
  return `₹${Number(value).toLocaleString('en-IN')}`;
}

export const PLATFORM_NAMES = {
  bearhouse: 'The Bear House', blackberrys: 'Blackberrys', rarerabbit: 'Rare Rabbit', levis: "Levi's", jackjones: 'Jack & Jones', campus: 'Campus',
  tatacliq: 'Tata CLiQ', nykaafashion: 'Nykaa Fashion', bewakoof: 'Bewakoof', myntra: 'Myntra', flipkart: 'Flipkart', ajio: 'AJIO', meesho: 'Meesho', amazon: 'Amazon', other: 'Store',
};

// Approximate swatch colours for the colour names the stylist talks about.
export const COLOUR_HEX = {
  navy: '#1f2a44', 'navy blue': '#22305a', indigo: '#33407a', maroon: '#6b1f2a', burgundy: '#6d2135', wine: '#5e1a2c', olive: '#5d6532',
  'dark green': '#24452f', 'bottle green': '#1c4a35', emerald: '#1f7a55', teal: '#1f6f72', charcoal: '#36393d', black: '#151515', rust: '#a1482a',
  brown: '#6b4a30', coffee: '#4b3324', purple: '#5d3a7a', blue: '#3a62a8', white: '#f7f6f2', 'off white': '#efebe0', cream: '#efe6cf', ivory: '#f3eedd',
  'sky blue': '#8cc1e6', 'light blue': '#a9c8e8', 'powder blue': '#b7d0e6', mint: '#bfe3cf', lavender: '#cfc3e6', lilac: '#d3bfe0', peach: '#f2c6a8',
  'light pink': '#f3cdd3', 'baby pink': '#f5d3da', grey: '#9a9c9e', silver: '#c4c6c8', mustard: '#c9a227', red: '#c0392b', orange: '#e27a2f',
  yellow: '#ecc94b', green: '#3f7d4e', beige: '#d8c6a5', tan: '#b88a5a', camel: '#c19a6b', khaki: '#b9a77a', sand: '#d6c39b', taupe: '#8b7d6b', ecru: '#e5dcc3',
};
