const webhookRoutes = require('./routes/webhook.routes');

// ... your existing middleware and routes

app.use(webhookRoutes);   // This makes the route available at /webhooks/nomba

// Optional: simple health check to keep the server awake
app.get('/health', (req, res) => res.send('OK'));