const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');

const app = express();

// 🔐 نظام الأمان المتقدم
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
  crypto.createHash('sha256').update('ahmed2024').digest('hex');

const ADMIN_TOKENS = new Map();
const MAX_LOGIN_ATTEMPTS = 5;
const ATTEMPT_TIMEOUT = 15 * 60 * 1000;
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;
let loginAttempts = new Map();

// Middleware - ترتيب مهم جداً
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-token']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cache Control Middleware
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Static Files - مهم جداً قبل الـ API routes
app.use(express.static(path.join(__dirname, '../public')));

// API Routes

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'AI Programming Expert v4.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 2. Features
app.get('/api/features', (req, res) => {
  res.json({
    success: true,
    features: 60,
    categories: [
      'Code Generation',
      'Auto Fixing',
      'UI Generation',
      'Database Auto',
      'Deployment',
      'AI Learning',
      'Voice Commands',
      'Dream Machine'
    ],
    modes: ['Online', 'Offline', 'Hybrid'],
    platforms: ['PWA', 'Windows Desktop', 'macOS Desktop', 'Linux Desktop', 'iOS', 'Android']
  });
});

// 3. Pages
app.get('/api/pages', (req, res) => {
  res.json({
    success: true,
    total: 23,
    pages: [
      { id: 1, name: 'Home', route: '/', status: 'active' },
      { id: 2, name: 'Chat', route: '/chat', status: 'active' },
      { id: 3, name: 'Dream Machine', route: '/dream-machine', status: 'active' },
      { id: 4, name: 'Voice Commands', route: '/voice-commands', status: 'active' },
      { id: 5, name: 'Standalone Download', route: '/standalone-download', status: 'active' },
      { id: 6, name: 'Hybrid Mode', route: '/hybrid-mode', status: 'active' },
      { id: 7, name: 'Export Builder', route: '/export-builder', status: 'active' },
      { id: 8, name: 'Marketplace', route: '/marketplace', status: 'active' },
      { id: 9, name: 'Free Forever', route: '/free-forever', status: 'active' },
      { id: 10, name: '50 Features', route: '/50-features', status: 'active' }
    ]
  });
});

// 4. Mode Switch
app.post('/api/mode/switch', (req, res) => {
  const mode = req.body.mode;
  if (!['online', 'offline', 'hybrid'].includes(mode)) {
    return res.status(400).json({ success: false, error: 'Invalid mode' });
  }
  res.json({ success: true, mode, message: `Switched to ${mode} mode` });
});

// 5. Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }
  res.json({ success: true, message: 'Message received successfully' });
});

// 6. Login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const ip = req.ip;

  if (!password) {
    return res.status(400).json({ success: false, error: 'Password required' });
  }

  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  if (passwordHash !== ADMIN_PASSWORD_HASH) {
    recordFailedAttempt(ip);
    return res.status(401).json({ success: false, error: 'Invalid password' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  ADMIN_TOKENS.set(token, { expiry: Date.now() + TOKEN_EXPIRY });
  res.json({ success: true, token, expiry: TOKEN_EXPIRY });
});

// 7. Logout
app.post('/api/auth/logout', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token) ADMIN_TOKENS.delete(token);
  res.json({ success: true, message: 'Logged out successfully' });
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

// Catch-all route لـ SPA (تحويل 404 للصفحة الرئيسية)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AI Programming Expert Platform v4.0`);
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Visit: http://localhost:${PORT}`);
});
