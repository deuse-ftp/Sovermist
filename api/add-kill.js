const fetch = require('node-fetch');

module.exports = async (req, res) => {
  console.log('Received request to /api/add-kill with body:', req.body);
  try {
    const response = await fetch('https://backend-leaderboard.vercel.app/add-kill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(req.body),
      timeout: 10000
    });
    const text = await response.text();
    console.log('Backend response status:', response.status, 'Body:', text);
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${text}`);
    }
    const data = JSON.parse(text);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao enviar kill:', error.message);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to send kill', details: error.message });
  }
};