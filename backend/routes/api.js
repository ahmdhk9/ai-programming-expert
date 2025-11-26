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
