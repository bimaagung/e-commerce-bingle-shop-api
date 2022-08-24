const express = require('express');
const router = express.Router();

// home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Bingle-shop' });
});

module.exports = router;
