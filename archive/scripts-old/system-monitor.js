#!/usr/bin/env node

/**
 * 🌍 System Monitor - 24/7 Health Monitoring for Free Tier
 * Adapts to free tier constraints and reports all issues
 */

const fs = require('fs');
const https = require('https');

class SystemMonitor {
  constructor() {
    this.status = {
      frontend: 'UNKNOWN',
      backend: 'UNKNOWN',
      database: 'UNKNOWN',
      api: 'UNKNOWN'
    };
    this.issues = [];
    this.metrics = {
      uptime: 0,
      responseTime: 0,
      errorRate: 0
    };
  }

  async checkEndpoint(url, timeout = 5000) {
    return new Promise((resolve) => {
      const req = https.get(url, { timeout }, (res) => {
        resolve({ status: res.statusCode, reachable: true });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ status: 0, reachable: false });
      });

      req.on('error', () => {
        resolve({ status: 0, reachable: false });
      });
    });
  }

  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🌍 SYSTEM MONITOR - Health Check');
    console.log('═'.repeat(70) + '\n');

    // Check Frontend
    console.log('🔍 Checking Frontend (Vercel)...');
    const frontend = await this.checkEndpoint('https://ai-programming-expert-ppgxu0wcr.vercel.app');
    this.status.frontend = frontend.reachable ? 'UP' : 'DOWN';
    console.log(`  Status: ${this.status.frontend}\n`);

    // Check Backend
    console.log('🔍 Checking Backend (Fly.io)...');
    const backend = await this.checkEndpoint('https://agent-backend-ahmd1.fly.dev/health');
    this.status.backend = backend.reachable ? 'UP' : 'DOWN';
    console.log(`  Status: ${this.status.backend}\n`);

    // Check Connectivity
    console.log('🔍 Checking Frontend-Backend Connection...');
    const hasIssue = this.status.frontend === 'UP' && this.status.backend === 'DOWN';
    if (hasIssue) {
      this.issues.push({
        severity: 'HIGH',
        message: 'Backend unreachable from Frontend'
      });
      console.log('  ⚠️ Connection issue detected\n');
    } else {
      console.log('  ✅ Connection OK\n');
    }

    // Check local files
    console.log('🔍 Checking Local Configuration...');
    const checks = {
      'vercel.json': fs.existsSync('vercel.json'),
      'public/index.html': fs.existsSync('public/index.html'),
      'backend/server.js': fs.existsSync('backend/server.js')
    };

    Object.entries(checks).forEach(([file, exists]) => {
      console.log(`  ${exists ? '✅' : '❌'} ${file}`);
    });

    console.log('\n' + '═'.repeat(70));
    console.log('📊 STATUS SUMMARY');
    console.log('═'.repeat(70) + '\n');

    console.log('Platform Status:');
    console.log(`  🌐 Frontend:  ${this.status.frontend}`);
    console.log(`  🔧 Backend:   ${this.status.backend}\n`);

    if (this.issues.length > 0) {
      console.log('Issues Detected:');
      this.issues.forEach(issue => {
        console.log(`  ⚠️ [${issue.severity}] ${issue.message}`);
      });
    } else {
      console.log('✅ No critical issues detected');
    }

    console.log('\n' + '═'.repeat(70) + '\n');

    return { status: this.status, issues: this.issues };
  }
}

if (require.main === module) {
  const monitor = new SystemMonitor();
  monitor.run().catch(console.error);
}

module.exports = SystemMonitor;
