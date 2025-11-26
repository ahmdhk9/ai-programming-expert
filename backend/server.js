const express = require('express');
const path = require('path');
const app = express();

// 🔐 كلمة المرور الرئيسية للمطور (يجب تغييرها في الإنتاج!)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Ahmed123456';
const ADMIN_TOKENS = new Set();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

// Middleware للتحقق من المصادقة
const requireAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (!token || !ADMIN_TOKENS.has(token)) {
    return res.status(401).redirect('/login');
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

// API لتسجيل الدخول
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ success: false, message: 'كلمة المرور مطلوبة' });
  }

  if (password === ADMIN_PASSWORD) {
    const token = 'admin_' + Math.random().toString(36).substring(7);
    ADMIN_TOKENS.add(token);
    console.log(`✅ تسجيل دخول مطور بنجاح! Token: ${token}`);
    return res.json({ success: true, token, message: 'تم التحقق بنجاح' });
  }

  console.warn('❌ محاولة تسجيل دخول فاشلة بكلمة مرور خاطئة');
  res.status(401).json({ success: false, message: 'كلمة المرور غير صحيحة' });
});

// لوحة المطور (محمية)
app.get('/dev', (req, res) => {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (!token || !ADMIN_TOKENS.has(token)) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/dev/index.html'));
});

// APIs - محتوى AI
app.post('/api/content/generate/article', (req, res) => {
  const { topic, category } = req.body;
  const article = aiFactory.generateTechArticle(topic, category);
  res.json(article);
});

app.post('/api/content/generate/story', (req, res) => {
  const { title, genre } = req.body;
  const story = aiFactory.generateStory(title, genre);
  res.json(story);
});

app.get('/api/content/stats', (req, res) => {
  res.json(aiFactory.getStats());
});

// APIs - النشر متعدد المصادر
app.post('/api/publish/multi', async (req, res) => {
  const { content } = req.body;
  const results = await multiPublish.publishToAllSources(content);
  res.json(results);
});

app.get('/api/publish/stats', (req, res) => {
  res.json(multiPublish.getPublishingStats());
});

// APIs - الأتمتة
app.post('/api/automation/start', (req, res) => {
  passiveIncome.startAutomation();
  res.json({ success: true, message: 'Automation started' });
});

app.get('/api/automation/status', (req, res) => {
  res.json(passiveIncome.getStatus());
});

// APIs - الأرباح الحقيقية
app.post('/api/earnings/record', (req, res) => {
  const { source, amount } = req.body;
  const result = realEarning.recordRealEarning(source, amount);
  res.json(result);
});

app.get('/api/earnings', (req, res) => {
  res.json(realEarning.getRealEarnings());
});

// Contact form endpoint
app.post('/api/contact/send', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  const DEVELOPER_EMAIL = 'ahmdalbsrawe@gmail.com';
  const PHONE = '+964-770-3174287';
  
  const emailContent = `
    رسالة جديدة من: ${name}
    البريد: ${email}
    الموضوع: ${subject}
    
    الرسالة:
    ${message}
    
    ---
    تم الإرسال من: منصة الأرباح الذكية
    الوقت: ${new Date().toLocaleString('ar-SA')}
  `;

  console.log(`\n📧 رسالة جديدة من ${name}:`);
  console.log(`📬 البريد: ${email}`);
  console.log(`📌 الموضوع: ${subject}`);
  console.log(`💬 الرسالة: ${message}\n`);

  // محاكاة إرسال البريد - في الإنتاج، استخدم خدمة بريد حقيقية (SendGrid, Mailgun, إلخ)
  res.json({ 
    success: true, 
    message: '✅ تم استقبال رسالتك بنجاح! سيتم الرد عليك قريباً.',
    developerInfo: `📧 ${DEVELOPER_EMAIL} | 📱 ${PHONE}`,
    timestamp: new Date()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    platform: process.platform,
    nodeVersion: process.version
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error', message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`👨‍💻 Developer: https://localhost:${PORT}/dev`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Contact API: POST http://localhost:${PORT}/api/contact/send`);
});

module.exports = app;
