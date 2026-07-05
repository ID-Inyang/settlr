const express = require('express');
const router = express.Router();

router.post('/webhooks/nomba', (req, res) => {
  console.log('=== NOMBA WEBHOOK RECEIVED ===');
  console.log('Time:', new Date().toISOString());
  console.log('Headers:', req.headers);
  console.log('Body:', JSON.stringify(req.body, null, 2));

  // Always respond quickly with 200
  res.status(200).json({ message: 'OK' });
});

module.exports = router;