const express = require('express');
const router = express.Router();
const realEarning = require('../services/real-earning-integration');

// ربط المنصات الحقيقية
router.post('/connect/stripe', (req, res) => {
  const { apiKey, email } = req.body;
  res.json(realEarning.connectStripe(apiKey, email));
});

router.post('/connect/adsense', (req, res) => {
  const { publisherId } = req.body;
  res.json(realEarning.connectAdSense(publisherId));
});

router.post('/connect/amazon', (req, res) => {
  const { associateId, apiKey } = req.body;
  res.json(realEarning.connectAmazonAssociates(associateId, apiKey));
});

router.post('/connect/gumroad', (req, res) => {
  const { apiToken } = req.body;
  res.json(realEarning.connectGumroad(apiToken));
});

router.post('/connect/upwork', (req, res) => {
  const { email, apiKey } = req.body;
  res.json(realEarning.connectUpwork(email, apiKey));
});

router.post('/connect/youtube', (req, res) => {
  const { channelId, apiKey } = req.body;
  res.json(realEarning.connectYouTube(channelId, apiKey));
});

// تسجيل أرباح حقيقية
router.post('/earnings/record', (req, res) => {
  const { source, amount, date } = req.body;
  res.json(realEarning.recordRealEarning(source, amount, date));
});

// الحصول على أرباح حقيقية فقط
router.get('/earnings', (req, res) => {
  res.json(realEarning.getRealEarnings());
});

// المنصات المتصلة
router.get('/platforms', (req, res) => {
  res.json(realEarning.getConnectedPlatforms());
});

module.exports = router;
