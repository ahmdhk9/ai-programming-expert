const express = require('express');
const path = require('path');
const crypto = require('crypto');
const app = express();

// 🔐 نظام الأمان المتقدم - مفاتيح عشوائية قوية جداً
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
  crypto.createHash('sha256').update('Th1sIsA$tr0ng!P@ssw0rd#2024#Ahmed').digest('hex');

const SECRET_KEY = process.env.JWT_SECRET || 
  crypto.randomBytes(32).toString('hex');

const ADMIN_TOKENS = new Map(); // تخزين الـ tokens مع وقت انتهاء الصلاحية
const MAX_LOGIN_ATTEMPTS = 5;
const ATTEMPT_TIMEOUT = 15 * 60 * 1000; // 15 دقيقة
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 ساعة

let loginAttempts = new Map();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// فحص محاولات الدخول الفاشلة
const checkLoginAttempts = (ip) => {
  const now = Date.now();
  if (loginAttempts.has(ip)) {
    const { count, firstAttempt } = loginAttempts.get(ip);
    if (now - firstAttempt > ATTEMPT_TIMEOUT) {
      loginAttempts.delete(ip);
      return true;
    }
    if (count >= MAX_LOGIN_ATTEMPTS) {
      return false;
    }
  }
  return true;
};

const recordFailedAttempt = (ip) => {
  const now = Date.now();
  if (loginAttempts.has(ip)) {
    const { count, firstAttempt } = loginAttempts.get(ip);
    loginAttempts.set(ip, { count: count + 1, firstAttempt });
  } else {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
  }
};

// Middleware للتحقق من المصادقة
const requireAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.cookies?.adminToken;
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'غير مصرح' });
  }

  if (!ADMIN_TOKENS.has(token)) {
    return res.status(401).json({ success: false, message: 'رمز غير صحيح أو منتهي الصلاحية' });
  }

  const tokenData = ADMIN_TOKENS.get(token);
  if (Date.now() > tokenData.expiry) {
    ADMIN_TOKENS.delete(token);
    return res.status(401).json({ success: false, message: 'انتهت صلاحية الرمز' });
  }

  next();
};

// خدمات Backend
const aiFactory = require('./services/ai-content-factory');
const passiveIncome = require('./services/passive-income-systems');
const multiPublish = require('./services/multi-source-publishing');
const realEarning = require('./services/real-earning-integration');

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// صفحة تسجيل الدخول
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// API لتسجيل الدخول - محمي من هجمات القوة الغاشمة
app.post('/api/admin/login', (req, res) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ success: false, message: 'كلمة المرور مطلوبة' });
  }

  // التحقق من محاولات الدخول المتكررة
  if (!checkLoginAttempts(clientIP)) {
    return res.status(429).json({ 
      success: false, 
      message: 'حاولت عدة مرات فاشلة. يرجى المحاولة لاحقاً.' 
    });
  }

  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  
  if (passwordHash === ADMIN_PASSWORD_HASH) {
    // تسجيل دخول ناجح - إنشاء رمز عشوائي قوي
    const token = crypto.randomBytes(32).toString('hex');
    const expiryTime = Date.now() + TOKEN_EXPIRY;
    
    ADMIN_TOKENS.set(token, {
      ip: clientIP,
      createdAt: Date.now(),
      expiry: expiryTime
    });

    // مسح محاولات الدخول الفاشلة
    loginAttempts.delete(clientIP);

    console.log(`\n✅ تسجيل دخول مطور بنجاح!`);
    console.log(`📍 IP: ${clientIP}`);
    console.log(`⏰ الوقت: ${new Date().toLocaleString('ar-SA')}\n`);

    return res.json({ 
      success: true, 
      token, 
      message: 'تم التحقق بنجاح',
      expiresIn: TOKEN_EXPIRY
    });
  }

  // تسجيل محاولة فاشلة
  recordFailedAttempt(clientIP);
  console.warn(`\n❌ محاولة تسجيل دخول فاشلة`);
  console.warn(`📍 IP: ${clientIP}`);
  console.warn(`⏰ الوقت: ${new Date().toLocaleString('ar-SA')}\n`);

  res.status(401).json({ success: false, message: 'كلمة المرور غير صحيحة' });
});

// API لتسجيل الخروج
app.post('/api/admin/logout', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token) {
    ADMIN_TOKENS.delete(token);
  }
  res.json({ success: true, message: 'تم تسجيل الخروج بنجاح' });
});

// لوحة المطور (محمية)
app.get('/dev', (req, res) => {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (!token || !ADMIN_TOKENS.has(token)) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/dev/index.html'));
});

// APIs - محتوى AI (محمية)
app.post('/api/content/generate/article', requireAdmin, (req, res) => {
  const { topic, category } = req.body;
  const article = aiFactory.generateTechArticle(topic, category);
  res.json(article);
});

app.post('/api/content/generate/story', requireAdmin, (req, res) => {
  const { title, genre } = req.body;
  const story = aiFactory.generateStory(title, genre);
  res.json(story);
});

app.get('/api/content/stats', requireAdmin, (req, res) => {
  res.json(aiFactory.getStats());
});

// APIs - النشر متعدد المصادر (محمية)
app.post('/api/publish/multi', requireAdmin, async (req, res) => {
  const { content } = req.body;
  const results = await multiPublish.publishToAllSources(content);
  res.json(results);
});

app.get('/api/publish/stats', requireAdmin, (req, res) => {
  res.json(multiPublish.getPublishingStats());
});

// APIs - الأتمتة (محمية)
app.post('/api/automation/start', requireAdmin, (req, res) => {
  passiveIncome.startAutomation();
  res.json({ success: true, message: 'تم بدء الأتمتة' });
});

app.get('/api/automation/status', requireAdmin, (req, res) => {
  res.json(passiveIncome.getStatus());
});

// APIs - الأرباح الحقيقية (محمية)
app.post('/api/earnings/record', requireAdmin, (req, res) => {
  const { source, amount } = req.body;
  const result = realEarning.recordRealEarning(source, amount);
  res.json(result);
});

app.get('/api/earnings', requireAdmin, (req, res) => {
  res.json(realEarning.getRealEarnings());
});

// Contact form endpoint - عام (بدون حماية)
app.post('/api/contact/send', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  // التحقق من صحة البريد
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'بريد إلكتروني غير صحيح' });
  }

  const DEVELOPER_EMAIL = 'ahmdalbsrawe@gmail.com';
  const PHONE = '+964-770-3174287';
  
  console.log(`\n📧 رسالة جديدة من ${name}:`);
  console.log(`📬 البريد: ${email}`);
  console.log(`📌 الموضوع: ${subject}`);
  console.log(`💬 الرسالة: ${message}`);
  console.log(`⏰ الوقت: ${new Date().toLocaleString('ar-SA')}\n`);

  res.json({ 
    success: true, 
    message: '✅ تم استقبال رسالتك بنجاح! سيتم الرد عليك قريباً.',
    timestamp: new Date()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    platform: process.platform,
    nodeVersion: process.version
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'خطأ في الخادم' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔐 Admin Panel: http://localhost:${PORT}/login`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
