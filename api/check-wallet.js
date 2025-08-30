const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { wallet } = req.query;
  if (!wallet) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }
  try {
    const response = await fetch(`https://monad-games-id-site.vercel.app/api/check-wallet?wallet=${wallet}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Erro ao fetch username:', error);
    res.status(500).json({ error: 'Failed to fetch username' });
  }
};