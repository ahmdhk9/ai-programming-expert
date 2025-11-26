const express = require('express');
const router = express.Router();
const aiFactory = require('../services/ai-content-factory');

// توليد مقالة تقنية
router.post('/generate/article', (req, res) => {
  const { topic, category } = req.body;
  const article = aiFactory.generateTechArticle(topic, category || 'programming');
  res.json(article);
});

// توليد قصة
router.post('/generate/story', (req, res) => {
  const { title, genre } = req.body;
  const story = aiFactory.generateStory(title, genre || 'fiction');
  res.json(story);
});

// توليد منشور LinkedIn
router.post('/generate/linkedin', (req, res) => {
  const { topic } = req.body;
  const post = aiFactory.generateLinkedInPost(topic);
  res.json(post);
});

// نشر على Medium
router.post('/publish/medium', (req, res) => {
  const { contentId, apiKey } = req.body;
  const result = aiFactory.publishToMedium(contentId, apiKey);
  res.json(result);
});

// تسجيل أرباح
router.post('/earnings/record', (req, res) => {
  const { contentId, platform, amount } = req.body;
  const result = aiFactory.recordArticleEarnings(contentId, platform, amount);
  res.json(result);
});

// الإحصائيات
router.get('/stats', (req, res) => {
  res.json(aiFactory.getStats());
});

// المنصات
router.get('/platforms', (req, res) => {
  res.json(aiFactory.getPlatforms());
});

// المحتوى المولد
router.get('/generated', (req, res) => {
  res.json(aiFactory.getGeneratedContent());
});

// المحتوى المنشور
router.get('/published', (req, res) => {
  res.json(aiFactory.getPublishedContent());
});

module.exports = router;
