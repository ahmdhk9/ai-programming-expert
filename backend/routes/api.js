const express = require('express');
const router = express.Router();

// استيراد الخدمات
const earnings = require('../services/earnings');
const wallets = require('../services/wallets');
const sources = require('../services/sources');
const deployment = require('../services/deployment');

// API الأرباح
router.get('/earnings/status', (req, res) => res.json(earnings.getStatus()));
router.post('/earnings/withdraw', (req, res) => res.json(earnings.requestWithdraw(req.body.amount)));

// API المحافظ
router.get('/wallets/list', (req, res) => res.json(wallets.getAll()));
router.get('/wallets/total', (req, res) => res.json({ total: wallets.getTotal() }));

// API المصادر
router.get('/sources/list', (req, res) => res.json(sources.getAll()));
router.get('/sources/total', (req, res) => res.json({ total: sources.getTotal() }));

// API النشر
router.get('/deploy/platforms', (req, res) => res.json(deployment.getAll()));
router.post('/deploy/all', (req, res) => res.json(deployment.deployAll()));

// Health check
router.get('/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));

module.exports = router;

// نظام الاستقلالية الذاتي
const autonomous = require('../services/autonomous');

// اكتشاف الفرص
router.get('/autonomous/opportunities', (req, res) => {
  res.json(autonomous.searchForOpportunities());
});

// اكتشاف المنصات المجانية
router.get('/autonomous/platforms', (req, res) => {
  res.json(autonomous.discoverFreePlatforms());
});

// الحسابات الافتراضية
router.get('/autonomous/accounts', (req, res) => {
  res.json(autonomous.createVirtualAccounts());
});

// مصادر الدخل المكتشفة
router.get('/autonomous/income-sources', (req, res) => {
  res.json(autonomous.findIncomeSources());
});

// حالة النشر الذاتي
router.get('/autonomous/deployment', (req, res) => {
  res.json(autonomous.autoDeploy());
});

// الروابط المتتبعة
router.get('/autonomous/links', (req, res) => {
  res.json(autonomous.generateTrackingLinks());
});

// التقرير اليومي الذاتي
router.get('/autonomous/report', (req, res) => {
  res.json(autonomous.generateDailyReport());
});

// التعلم المستمر
router.get('/autonomous/learning', (req, res) => {
  res.json(autonomous.continuousLearning());
});

// الحالة الكاملة للنظام
router.get('/autonomous/status', (req, res) => {
  res.json(autonomous.getCompleteStatus());
});


const reporting = require('../services/reporting');

// التقارير
router.get('/reports/daily', (req, res) => {
  res.json(reporting.generateDailyReport());
});

router.get('/reports/weekly', (req, res) => {
  res.json(reporting.getWeeklyReport());
});

router.get('/reports/monthly', (req, res) => {
  res.json(reporting.getMonthlyReport());
});

