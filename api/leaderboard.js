const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://backend-leaderboard.vercel.app/leaderboard', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Erro ao fetch leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};