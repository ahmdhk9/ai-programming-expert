const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

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

// لوحة المطور
app.get('/dev', (req, res) => {
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
});

module.exports = app;
