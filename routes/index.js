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
    console.log('API Key exists:', !!apiKey);
    
    if (!apiKey) {
      return res.status(500).json({ error: 'TMDB_API_KEY not configured' });
    }
    
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.log('TMDB API error:', response.status);
      throw new Error('Erreur API TMDB: ' + response.status);
    }

    const data = await response.json();
    console.log('Movies found:', data.results?.length || 0);

    res.json({ movies: data.results });

  } catch (error) {
    console.error('Error in /movies:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
