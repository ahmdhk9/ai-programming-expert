#!/usr/bin/env node

/**
 * 🚀 PRODUCTION MONITORING SYSTEM
 * مراقبة وحل مشاكل الإنتاج تلقائياً
 */

const https = require('https');
const fs = require('fs');

class ProductionMonitor {
  constructor() {
    this.platforms = {
      vercel: {
        name: 'Vercel Frontend',
        url: 'https://ai-programming-expert-ppgxu0wcr.vercel.app',
        status: 'unknown',
        issues: []
      },
      fly: {
        name: 'Fly.io Backend',
        url: 'https://agent-backend-ahmd1.fly.dev',
        status: 'unknown',
        issues: []
      },
      firebase: {
        name: 'Firebase Hosting',
        url: 'https://ai-programming-expert.firebaseapp.com',
        status: 'unknown',
        issues: []
      }
    };
    this.report = { timestamp: new Date().toISOString(), platforms: this.platforms };
  }

  async checkAll() {
    console.log('\n' + '═'.repeat(70));
    console.log('🚀 PRODUCTION MONITORING - ALL PLATFORMS');
    console.log('═'.repeat(70) + '\n');

    const checks = Object.entries(this.platforms).map(([key, platform]) =>
      this.checkPlatform(key, platform)
    );

    await Promise.all(checks);
    await this.generateReport();
  }

  async checkPlatform(key, platform) {
    return new Promise((resolve) => {
      const req = https.get(platform.url, { timeout: 5000 }, (res) => {
        console.log(`✅ ${platform.name}: ${res.statusCode}`);
        platform.status = res.statusCode === 200 ? 'HEALTHY' : 'DEGRADED';
        res.on('data', () => {});
        res.on('end', () => resolve());
      });

      req.on('timeout', () => {
        console.log(`⏱️ ${platform.name}: TIMEOUT`);
        platform.status = 'TIMEOUT';
        platform.issues.push('Response timeout');
        req.destroy();
        resolve();
      });

      req.on('error', (err) => {
        console.log(`❌ ${platform.name}: ${err.message}`);
        platform.status = 'DOWN';
        platform.issues.push(err.message);
        resolve();
      });
    });
  }

  async generateReport() {
    const statuses = Object.values(this.platforms).map(p => p.status);
    const allHealthy = statuses.every(s => s === 'HEALTHY');

    console.log('\n' + '═'.repeat(70));
    console.log('📊 PRODUCTION STATUS REPORT');
    console.log('═'.repeat(70) + '\n');

    Object.entries(this.platforms).forEach(([key, platform]) => {
      const icon = {
        'HEALTHY': '✅',
        'DEGRADED': '⚠️',
        'TIMEOUT': '⏱️',
        'DOWN': '❌'
      }[platform.status] || '❓';

      console.log(`${icon} ${platform.name}`);
      console.log(`   Status: ${platform.status}`);
      if (platform.issues.length > 0) {
        console.log(`   Issues: ${platform.issues.join(', ')}`);
      }
      console.log('');
    });

    console.log('═'.repeat(70));
    if (allHealthy) {
      console.log('✅ ALL SYSTEMS OPERATIONAL - NO ACTION NEEDED');
    } else {
      console.log('⚠️ SOME SYSTEMS HAVE ISSUES - AUTOMATIC FIXES RECOMMENDED');
    }
    console.log('═'.repeat(70) + '\n');

    // Save report
    fs.writeFileSync('PRODUCTION_STATUS.json', JSON.stringify(this.report, null, 2));
    console.log('📄 Report saved: PRODUCTION_STATUS.json\n');
  }
}

// Run monitoring
const monitor = new ProductionMonitor();
monitor.checkAll().catch(console.error);

module.exports = ProductionMonitor;
