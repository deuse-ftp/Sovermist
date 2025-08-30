const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { wallet } = req.query;
  console.log('Received request to /api/check-wallet with wallet:', wallet);
  if (!wallet) {
    console.error('No wallet provided');
    return res.status(400).json({ error: 'Wallet address is required' });
  }
  try {
    const response = await fetch(`https://monad-games-id-site.vercel.app/api/check-wallet?wallet=${wallet}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      timeout: 10000
    });
    const text = await response.text();
    console.log('Monad API response status:', response.status, 'Body:', text);
    if (!response.ok) {
      throw new Error(`Monad API returned ${response.status}: ${text}`);
    }
    const data = JSON.parse(text);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao fetch username:', error.message);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to fetch username', details: error.message });
  }
};