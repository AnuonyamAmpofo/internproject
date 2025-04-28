const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [tones] = await db.query('SELECT * FROM tones');
    res.json(tones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
