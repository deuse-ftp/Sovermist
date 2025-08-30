module.exports = async (req, res) => {
  console.log('Received request to /api/leaderboard from:', req.headers['x-forwarded-for'] || req.ip);
  try {
    const response = await fetch('https://backend-leaderboard.vercel.app/leaderboard', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Backend response status:', response.status, 'Body:', await response.text());
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
    }
    const data = await response.json();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao fetch leaderboard:', error.message);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: error.message });
  }
};