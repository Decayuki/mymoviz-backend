var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

// récupére les films depuis TMDB
router.get('/movies', async (req, res) => {
  try {
    // Headers CORS explicites
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur API TMDB');

    const data = await response.json();

    res.json({ movies: data.results });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;