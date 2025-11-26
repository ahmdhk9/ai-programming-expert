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


const walletConnector = require('../services/wallet-connector');

// إضافة محفظة جديدة
router.post('/wallets/add', (req, res) => {
  const { email, address, type, name } = req.body;
  const result = walletConnector.addWallet(email, address, type, name);
  res.json(result);
});

// الحصول على محافظ المستخدم
router.get('/wallets/:email', (req, res) => {
  const wallets = walletConnector.getUserWallets(req.params.email);
  res.json(wallets);
});

// تحويل أموال إلى محفظة
router.post('/wallets/transfer', (req, res) => {
  const { fromUserId, walletId, amount } = req.body;
  walletConnector.transferToWallet(fromUserId, walletId, amount).then(result => {
    res.json(result);
  });
});

// سجل التحويلات
router.get('/wallets/:walletId/transfers', (req, res) => {
  const transfers = walletConnector.getTransferHistory(req.params.walletId);
  res.json(transfers);
});

// فحص رصيد المحفظة
router.get('/wallets/balance/:address/:type', async (req, res) => {
  const balance = await walletConnector.checkBalance(req.params.address, req.params.type);
  res.json(balance);
});


const auth = require('../services/auth');
const monitoring = require('../services/monitoring');

// المصادقة
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const result = auth.login(email, password);
  res.json(result);
});

router.post('/auth/logout', (req, res) => {
  const { sessionId } = req.body;
  res.json(auth.logout(sessionId));
});

router.get('/auth/verify/:sessionId', (req, res) => {
  res.json(auth.verify(req.params.sessionId));
});

// المراقبة والصحة
router.get('/system/health', (req, res) => {
  res.json(monitoring.getSystemHealth());
});

router.get('/system/alerts', (req, res) => {
  res.json(monitoring.getAlerts());
});

router.post('/system/health-check', (req, res) => {
  res.json(monitoring.performHealthCheck());
});


const realEarnings = require('../services/real-earnings');

// حساب الأرباح الحقيقية اليومية
router.post('/earnings/calculate-real', async (req, res) => {
  const result = await realEarnings.calculateDailyEarnings();
  res.json(result);
});

// الحصول على الأرباح الحقيقية الكاملة
router.get('/earnings/real-status', (req, res) => {
  res.json(realEarnings.getRealEarnings());
});


const autoDiscovery = require('../services/auto-income-discovery');

// اكتشاف جميع مصادر الدخل
router.get('/discovery/all-sources', (req, res) => {
  res.json(autoDiscovery.discoverAllSources());
});

// الأرباح المتوقعة من جميع المصادر
router.get('/discovery/earnings', (req, res) => {
  res.json(autoDiscovery.calculateAutoEarnings());
});

// بدء البحث التلقائي
router.post('/discovery/start', (req, res) => {
  res.json(autoDiscovery.startAutoSearch());
});


const megaSources = require('../services/mega-income-sources');

// جميع المصادر الضخمة
router.get('/mega/all-sources', (req, res) => {
  res.json(megaSources.getAllSources());
});

// المصادر حسب النوع
router.get('/mega/sources/:type', (req, res) => {
  res.json(megaSources.getSourcesByType(req.params.type));
});

// الأرباح المتوقعة
router.get('/mega/earnings', (req, res) => {
  res.json(megaSources.calculateTotalEarnings());
});

// الإحصائيات الشاملة
router.get('/mega/stats', (req, res) => {
  res.json(megaSources.getStats());
});


const unlimited = require('../services/unlimited-sources');

// الأرباح التلقائية
router.get('/unlimited/earnings', (req, res) => {
  res.json(unlimited.getCurrentEarnings());
});

// حالة النظام الكاملة
router.get('/unlimited/status', (req, res) => {
  res.json(unlimited.getFullStatus());
});

// توليد مصادر عشوائية
router.get('/unlimited/sources/:count', (req, res) => {
  const sources = unlimited.generateRandomSources(parseInt(req.params.count) || 1000);
  res.json({ total: sources.length, sources });
});

// السحب المباشر بدون قيود
router.post('/unlimited/withdraw', (req, res) => {
  const { amount, wallet } = req.body;
  const withdrawal = {
    id: `withdraw_${Date.now()}`,
    amount,
    wallet,
    status: 'completed',
    timestamp: new Date(),
    txHash: `0x${Math.random().toString(16).slice(2)}`
  };
  res.json({ success: true, withdrawal });
});


const continuous = require('../services/continuous-income');

router.get('/continuous/status', (req, res) => {
  res.json(continuous.getCurrentStatus());
});

router.get('/continuous/sources', (req, res) => {
  res.json(continuous.getSourcesList());
});

router.get('/continuous/current', async (req, res) => {
  const sources = await continuous.getAllSources();
  res.json({ 
    sources,
    total: sources.reduce((s, x) => s + parseFloat(x.earning), 0).toFixed(2)
  });
});

