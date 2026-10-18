// On Vercel (or any deployed build) the backend must be a public URL. Falling
// back to localhost there makes every /api call fail with a 404, so fail the
// build loudly instead.
if (process.env.VERCEL && !process.env.BACKEND_URL) {
  throw new Error('BACKEND_URL is not set. Add it in Vercel → Project → Settings → Environment Variables (e.g. https://api.yourdomain.com) and redeploy.');
}

const backendUrl = (process.env.BACKEND_URL || 'http://localhost:3002').replace(/\/$/, '');

// localhost / LAN addresses only exist on your own machine; Vercel can't reach them.
const PRIVATE_HOST = /^(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/;
if (process.env.VERCEL && PRIVATE_HOST.test(new URL(backendUrl).hostname)) {
  throw new Error(`BACKEND_URL is "${backendUrl}", a private address Vercel cannot reach. Deploy the backend to a public host (Railway, Render, a VPS) and set BACKEND_URL to its https URL.`);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy API calls through the Next.js origin so the auth cookie is first-party.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${backendUrl}/api/:path*` }];
  },
};
export default nextConfig;
