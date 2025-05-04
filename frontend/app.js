const express = require('express');
const path = require('path');
const app = express(); // ✅ THIS must be declared before using 'app'

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API URL to fetch from
const URL = process.env.BACKEND.URL || 'http://localhost:8000/api';

app.get('/', async function (req, res) {
  try {
    const response = await fetch(URL);
    console.log('API status:', response.status);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('API data:', data);
    res.render('index', { data });
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ msg: 'Internal Server Error.' });
  }
});

// Start the server
app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});
