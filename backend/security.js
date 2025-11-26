const express = require('express');
const crypto = require('crypto');

// نظام الأمان الشامل
class SecurityManager {
  constructor() {
    this.ipBans = [];
    this.rateLimits = {};
    this.encryptionKey = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
  }

  // تشفير البيانات
  encrypt(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.encryptionKey), iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  // فك التشفير
  decrypt(encryptedData) {
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.encryptionKey), iv);
    let decrypted = decipher.update(parts[1], 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }

  // منع brute force
  checkRateLimit(ip, limit = 100, window = 60000) {
    if (!this.rateLimits[ip]) {
      this.rateLimits[ip] = [];
    }

    const now = Date.now();
    this.rateLimits[ip] = this.rateLimits[ip].filter(t => now - t < window);

    if (this.rateLimits[ip].length >= limit) {
      return false;
    }

    this.rateLimits[ip].push(now);
    return true;
  }

  // منع SQL Injection
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input
      .replace(/'/g, "''")
      .replace(/"/g, '""')
      .replace(/--/g, '')
      .replace(/;/g, '')
      .slice(0, 1000);
  }

  // منع XSS
  sanitizeOutput(output) {
    if (typeof output !== 'string') return output;
    return output
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // إدارة الأذونات
  checkPermission(user, action) {
    const permissions = {
      admin: ['read', 'write', 'delete', 'manage'],
      user: ['read', 'write'],
      guest: ['read']
    };

    return permissions[user.role]?.includes(action) || false;
  }

  // حماية CSRF
  generateCSRFToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  // التحقق من CSRF Token
  verifyCSRFToken(token, sessionToken) {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(sessionToken));
  }
}

const security = new SecurityManager();

// Middleware للأمان
const securityMiddleware = (req, res, next) => {
  const ip = req.ip;

  // التحقق من Rate Limiting
  if (!security.checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // تنظيف البيانات
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = security.sanitizeInput(req.body[key]);
      }
    }
  }

  // إضافة CSRF Token
  if (!req.session.csrfToken) {
    req.session.csrfToken = security.generateCSRFToken();
  }

  next();
};

// CORS محمي
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://aiexpert.dev'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Headers الأمان
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
};

module.exports = {
  security,
  securityMiddleware,
  corsOptions,
  securityHeaders
};
