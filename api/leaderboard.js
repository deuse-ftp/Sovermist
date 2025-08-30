const fetch = require('node-fetch');

module.exports = async (req, res) => {
  console.log('Received request to /api/leaderboard');
  try {
    const response = await fetch('https://backend-leaderboard.vercel.app/leaderboard', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000 // 10s timeout pra evitar travamento
    });
    console.log('Backend response status:', response.status);
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao fetch leaderboard:', error.message);
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: error.message });
  }
};