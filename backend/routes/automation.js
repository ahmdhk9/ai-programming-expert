const express = require('express');
const router = express.Router();
const passiveIncome = require('../services/passive-income-systems');

// بدء جميع الأنظمة
router.post('/start', (req, res) => {
  passiveIncome.startAutomation();
  res.json({ success: true, message: 'جميع الأنظمة تعمل الآن 24/7' });
});

// حالة الأنظمة
router.get('/status', (req, res) => {
  res.json(passiveIncome.getStatus());
});

// تشغيل SEO
router.post('/seo/run', async (req, res) => {
  const result = await passiveIncome.runSEOOptimization();
  res.json(result);
});

// تشغيل Affiliate
router.post('/affiliate/run', async (req, res) => {
  const result = await passiveIncome.runAffiliateMarketing();
  res.json(result);
});

// تشغيل Email
router.post('/email/run', async (req, res) => {
  const result = await passiveIncome.runEmailCampaigns();
  res.json(result);
});

// تشغيل Social Media
router.post('/social/run', async (req, res) => {
  const result = await passiveIncome.runSocialMediaBot();
  res.json(result);
});

// تشغيل Analytics
router.post('/analytics/run', async (req, res) => {
  const result = await passiveIncome.runAnalyticsOptimization();
  res.json(result);
});

module.exports = router;
