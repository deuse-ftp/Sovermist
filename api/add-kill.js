const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://backend-leaderboard.vercel.app/add-kill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Erro ao enviar kill:', error);
    res.status(500).json({ error: 'Failed to send kill' });
  }
};