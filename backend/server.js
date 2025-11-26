const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Root
app.get('/', (req, res) => {
  res.json({
    name: 'AI Platform Backend',
    version: '12.0',
    status: 'active',
    endpoints: [
      '/api/earnings/status',
      '/api/wallets/list',
      '/api/sources/list',
      '/api/deploy/platforms',
      '/api/health'
    ]
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});

module.exports = app;
