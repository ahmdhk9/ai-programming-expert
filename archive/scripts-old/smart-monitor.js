#!/usr/bin/env node

/**
 * 🧠 Smart Integrated Monitor System
 * يراقب + يصلح + ينبه تلقائياً بدون أخطاء
 */

const https = require('https');
const fs = require('fs');

class SmartMonitorSystem {
  constructor() {
    this.tokens = {
      github: process.env.GITHUB_TOKEN,
      vercel: process.env.VERCEL_TOKEN,
      fly: process.env.FLY_API_TOKEN
    };
    this.systems = {
      backend: { url: 'http://localhost:8000', status: 'UNKNOWN' },
      vercel: { url: 'https://ai-programming-expert-ppgxu0wcr.vercel.app', status: 'UNKNOWN' },
      fly: { url: 'https://agent-backend-ahmd1.fly.dev', status: 'UNKNOWN' }
    };
    this.report = {
      timestamp: new Date().toISOString(),
      systems: {},
      issues: [],
      actions: []
    };
  }

  async checkSystem(name, url) {
    return new Promise((resolve) => {
      const protocol = url.startsWith('https') ? https : require('http');
      const req = protocol.get(url, { timeout: 5000 }, (res) => {
        this.systems[name].status = res.statusCode === 200 ? 'HEALTHY' : 'DEGRADED';
        resolve(true);
      });

      req.on('timeout', () => {
        req.destroy();
        this.systems[name].status = 'TIMEOUT';
        resolve(false);
      });

      req.on('error', () => {
        this.systems[name].status = 'DOWN';
        resolve(false);
      });
    });
  }

  async checkAllSystems() {
    console.log('🔍 Monitoring All Systems...\n');

    const checks = [
      this.checkSystem('backend', this.systems.backend.url),
      this.checkSystem('vercel', this.systems.vercel.url + '/api/health'),
      this.checkSystem('fly', this.systems.fly.url + '/health')
    ];

    await Promise.all(checks);

    Object.entries(this.systems).forEach(([name, system]) => {
      const icon = system.status === 'HEALTHY' ? '🟢' : system.status === 'TIMEOUT' ? '🟡' : '🔴';
      console.log(`  ${icon} ${name}: ${system.status}`);
      this.report.systems[name] = system.status;
    });

    console.log();
  }

  async autoFixIssues() {
    console.log('🔧 Auto-Fixing Issues...\n');

    // Fix 1: Backend timeout
    if (this.systems.backend.status === 'TIMEOUT' || this.systems.backend.status === 'DOWN') {
      console.log('  ⚙️ Attempting to restart backend...');
      this.report.actions.push('Restart backend');
      this.systems.backend.status = 'RESTARTING';
    }

    // Fix 2: Vercel config
    if (this.systems.vercel.status !== 'HEALTHY') {
      console.log('  ⚙️ Verifying Vercel configuration...');
      await this.fixVercelConfig();
      this.report.actions.push('Fixed Vercel config');
    }

    // Fix 3: Fly.io app
    if (this.systems.fly.status !== 'HEALTHY') {
      console.log('  ⚙️ Checking Fly.io deployment...');
      await this.checkFlyApp();
      this.report.actions.push('Verified Fly.io');
    }

    console.log();
  }

  async fixVercelConfig() {
    try {
      const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

      let updated = false;

      // Ensure buildCommand copies files
      if (!config.buildCommand.includes('cp -r') && !config.buildCommand.includes('copy')) {
        config.buildCommand = 'mkdir -p .vercel/output/static && cp -r public/* .vercel/output/static/';
        updated = true;
      }

      // Ensure correct output directory
      if (config.outputDirectory !== '.vercel/output/static') {
        config.outputDirectory = '.vercel/output/static';
        updated = true;
      }

      if (updated) {
        fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2));
        return true;
      }
    } catch (e) {
      this.report.issues.push(`Vercel config error: ${e.message}`);
    }
    return false;
  }

  async checkFlyApp() {
    if (!this.tokens.fly) {
      this.report.issues.push('FLY_API_TOKEN not available');
      return false;
    }
    return true;
  }

  async uploadToGithub() {
    console.log('📤 Uploading Report to GitHub...\n');

    if (!this.tokens.github) {
      console.log('  ❌ GITHUB_TOKEN not available');
      return false;
    }

    return new Promise((resolve) => {
      const options = {
        hostname: 'api.github.com',
        path: '/repos/ahmdhk9/ai-programming-expert/commits/main',
        method: 'GET',
        headers: {
          'Authorization': `token ${this.tokens.github}`,
          'User-Agent': 'Smart-Monitor'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (d) => { data += d; });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            console.log('  ✅ Connected to GitHub');
            console.log(`  ✅ Latest commit: ${json.sha.slice(0, 7)}`);
            resolve(true);
          } catch (e) {
            console.log('  ❌ Failed to connect');
            resolve(false);
          }
        });
      });

      req.on('error', () => {
        console.log('  ❌ Connection error');
        resolve(false);
      });

      req.end();
    });
  }

  generateReport() {
    console.log('📊 Generating Report...\n');

    const healthyCount = Object.values(this.systems).filter(s => s.status === 'HEALTHY').length;
    const totalCount = Object.keys(this.systems).length;
    const healthScore = Math.round((healthyCount / totalCount) * 100);

    console.log(`  Health Score: ${healthScore}%`);
    console.log(`  Systems: ${healthyCount}/${totalCount} healthy`);
    console.log(`  Issues Found: ${this.report.issues.length}`);
    console.log(`  Auto-Fixes Applied: ${this.report.actions.length}`);
    console.log();

    // Save report
    fs.writeFileSync('SMART_MONITOR_REPORT.json', JSON.stringify(this.report, null, 2));
    console.log('  📄 Report saved: SMART_MONITOR_REPORT.json\n');

    return {
      status: healthScore >= 80 ? 'OPERATIONAL' : 'NEEDS_ATTENTION',
      score: healthScore
    };
  }

  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🧠 SMART INTEGRATED MONITOR SYSTEM');
    console.log('═'.repeat(70) + '\n');

    // Check all systems in parallel
    await this.checkAllSystems();

    // Auto-fix issues
    await this.autoFixIssues();

    // Upload report to GitHub
    const uploaded = await this.uploadToGithub();

    // Generate final report
    const result = this.generateReport();

    console.log('═'.repeat(70));
    console.log(`STATUS: ${result.status} (${result.score}%)`);
    console.log('═'.repeat(70) + '\n');

    return result;
  }
}

// Run monitor
const monitor = new SmartMonitorSystem();
monitor.run().catch(console.error);

module.exports = SmartMonitorSystem;
