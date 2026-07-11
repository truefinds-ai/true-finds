// Vercel serverless function: subscribes an email to the True Finds Beehiiv publication.
// The API key lives ONLY in Vercel environment variables (BEEHIIV_API_KEY), never in this file.
// Publication ID is not a secret; env var overrides the fallback below.

const PUB_ID = process.env.BEEHIIV_PUB_ID || 'pub_b15e8e4f-21bf-43cf-8e76-45bfcd50caba';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://truefinds.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.BEEHIIV_API_KEY;
  if (!key) return res.status(500).json({ error: 'Not configured' });

  const { email, referred_by, referral_code } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const r = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        email: String(email).trim().toLowerCase(),
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'truefinds.ai',
        utm_medium: 'landing',
        utm_campaign: 'founding-members',
        referring_site: 'https://truefinds.ai',
        custom_fields: [
          { name: 'referral_code', value: String(referral_code || '') },
          { name: 'referred_by', value: String(referred_by || 'direct') },
        ],
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(502).json({ error: 'Beehiiv error', status: r.status, detail: data });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(502).json({ error: 'Request failed' });
  }
};
