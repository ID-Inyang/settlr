// server.js
const express = require('express');
const crypto = require('crypto');

const app = express();

// Use raw body for better signature handling
app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));

const WEBHOOK_SECRET = 'NombaHackathon2026'; // From the Google form

app.get('/', (req, res) => {
  res.send('Settlr Webhook is live ✅');
});

app.post('/webhooks/nomba', (req, res) => {
  const signature = req.headers['nomba-signature'] || req.headers['nomba-sig-value'];
  const payload = req.body;

  console.log('=== Nomba Webhook Received ===');
  console.log('Headers:', req.headers);
  console.log('Payload:', JSON.stringify(payload, null, 2));

  // Basic signature check (good enough for hackathon)
  if (signature) {
    const isValid = verifySignature(payload, signature, WEBHOOK_SECRET);
    console.log('Signature valid?', isValid);
    if (!isValid) {
      return res.status(401).send('Invalid signature');
    }
  }

  // TODO later: Process payment_success here for Settlr
  // if (payload.event_type === 'payment_success') { ... }

  res.status(200).send('OK'); // Always return 2XX quickly
});

function verifySignature(payload, signature, secret) {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(payload));
    const computed = hmac.digest('base64');
    return computed === signature;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));