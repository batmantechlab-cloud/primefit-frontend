const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export const API_ROUTES = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  google: '/api/auth/google',
  me: '/api/auth/me',
  logout: '/api/auth/logout',
  saveStyle: '/api/style-profiles',
  getStyle: (id) => `/api/style-profiles/${encodeURIComponent(id)}`,
  matchedProducts: '/api/products/matched',
  contact: '/api/contact',
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
    throw new Error(message);
  }
  return payload;
}

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}
