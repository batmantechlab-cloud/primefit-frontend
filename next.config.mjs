// On Vercel (or any deployed build) the backend must be a public URL. Falling
// back to localhost there makes every /api call fail with a 404, so fail the
// build loudly instead.
if (process.env.VERCEL && !process.env.BACKEND_URL) {
  throw new Error('BACKEND_URL is not set. Add it in Vercel → Project → Settings → Environment Variables (e.g. https://api.yourdomain.com) and redeploy.');
}

const backendUrl = (process.env.BACKEND_URL || 'http://localhost:3002').replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy API calls through the Next.js origin so the auth cookie is first-party.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${backendUrl}/api/:path*` }];
  },
};
export default nextConfig;
