// Server-side data loading for pages Google and WhatsApp previews need to see
// fully rendered (product pages, collections). Talks to the backend directly
// rather than through the /api rewrite. Import only from server components.

const BACKEND = (process.env.BACKEND_URL || 'http://localhost:3002').replace(/\/$/, '');

export async function backendGet(path, { revalidate = 600 } = {}) {
  try {
    const response = await fetch(`${BACKEND}${path}`, { next: { revalidate } });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null; // backend down: pages render their empty state instead of crashing
  }
}
