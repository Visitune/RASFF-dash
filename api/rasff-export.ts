import type { VercelRequest, VercelResponse } from '@vercel/node';

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1OvFp8TLFhLB5BxcK2ZzmvMMWFoPGYJ-Mipb888j1JLI/export?format=csv';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const upstream = await fetch(SHEET_URL);
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `Upstream error ${upstream.status}` });
    }

    const csv = await upstream.text();

    // CDN cache: 1h fresh, serve stale up to 24h while revalidating
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.send(csv);
  } catch (err) {
    console.error('RASFF proxy error:', err);
    res.status(502).json({ error: 'Failed to fetch RASFF data' });
  }
}
