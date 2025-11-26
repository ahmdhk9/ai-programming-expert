const express = require('express');
const path = require('path');
const crypto = require('crypto');
const app = express();

// 🚀 AI Programming Expert - Platform
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
  crypto.createHash('sha256').update('ahmed2024').digest('hex');

const ADMIN_TOKENS = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const ATTEMPT_TIMEOUT = 15 * 60 * 1000;
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;
let loginAttempts = new Map();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'AI Programming Expert v4.0',
    timestamp: new Date().toISOString()
  });
});

// API: 60+ Features
app.get('/api/features', (req, res) => {
  res.json({
    features: 60,
    categories: ['Code Generation', 'Auto Fixing', 'UI Generation', 'Database Auto', 'Deployment'],
    modes: ['Online', 'Offline', 'Hybrid'],
    platforms: ['PWA', 'Windows Desktop', 'macOS Desktop', 'Linux Desktop', 'iOS', 'Android']
  });
});

// API: Pages (23)
app.get('/api/pages', (req, res) => {
  res.json({
    total: 23,
    pages: [
      { id: 1, name: 'Home', route: '/' },
      { id: 2, name: 'Chat', route: '/chat' },
      { id: 3, name: 'Dream Machine', route: '/dream-machine' },
      { id: 4, name: 'Voice Commands', route: '/voice-commands' },
      { id: 5, name: 'Standalone Download', route: '/standalone-download' },
      { id: 6, name: 'Hybrid Mode', route: '/hybrid-mode' },
      { id: 7, name: 'Export Builder', route: '/export-builder' },
      { id: 8, name: 'Marketplace', route: '/marketplace' },
      { id: 9, name: 'Free Forever', route: '/free-forever' },
      { id: 10, name: '50 Features', route: '/50-features' }
    ]
  });
});

// API: Mode Switch (Online/Offline/Hybrid)
app.post('/api/mode/switch', (req, res) => {
  const mode = req.body.mode;
  if (!['online', 'offline', 'hybrid'].includes(mode)) {
    return res.status(400).json({ error: 'Invalid mode' });
  }
  res.json({ success: true, mode, message: `Switched to ${mode} mode` });
});

// Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  res.json({ success: true, message: 'Message received' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const ip = req.ip;

  if (!password) return res.status(400).json({ error: 'Password required' });

  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  if (passwordHash !== ADMIN_PASSWORD_HASH) {
    recordFailedAttempt(ip);
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  ADMIN_TOKENS.set(token, { expiry: Date.now() + TOKEN_EXPIRY });
  res.json({ success: true, token, expiry: TOKEN_EXPIRY });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token) ADMIN_TOKENS.delete(token);
  res.json({ success: true, message: 'Logged out' });
});

// Record failed attempt
const recordFailedAttempt = (ip) => {
  const now = Date.now();
  if (loginAttempts.has(ip)) {
    const { count, firstAttempt } = loginAttempts.get(ip);
    loginAttempts.set(ip, { count: count + 1, firstAttempt });
  } else {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AI Programming Expert Platform v4.0`);
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});
