import type { VercelRequest, VercelResponse } from '@vercel/node';

const RASFF_EXPORT_URL =
  'https://webgate.ec.europa.eu/rasff-window/backend/public/notification/search/export/en/';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const upstream = await fetch(RASFF_EXPORT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        date: { startRange: '', endRange: '' },
        countries: {},
        type: {},
        notificationStatus: {},
        product: {},
        risk: {},
        reference: '',
        subject: '',
      }),
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `RASFF upstream error ${upstream.status}` });
    }

    const csv = await upstream.text();

    // CDN cache: 1h fresh, serve stale up to 24h while revalidating in background
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.send(csv);
  } catch (err) {
    console.error('RASFF proxy error:', err);
    res.status(502).json({ error: 'Failed to reach RASFF API' });
  }
}
