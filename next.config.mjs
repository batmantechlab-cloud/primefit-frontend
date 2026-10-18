const backendUrl = (process.env.BACKEND_URL || 'http://localhost:3002').replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy API calls through the Next.js origin so the auth cookie is first-party.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${backendUrl}/api/:path*` }];
  },
};
export default nextConfig;
