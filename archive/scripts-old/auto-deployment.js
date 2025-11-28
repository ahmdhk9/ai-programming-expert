#!/usr/bin/env node

/**
 * 🚀 Smart Auto-Deployment System
 * نشر ذكي تلقائي بدون أخطاء
 */

const https = require('https');
const fs = require('fs');

class AutoDeploymentSystem {
  constructor() {
    this.tokens = {
      github: process.env.GITHUB_TOKEN,
      vercel: process.env.VERCEL_TOKEN,
      fly: process.env.FLY_API_TOKEN
    };
    this.deployLog = [];
  }

  async verifyAllTokens() {
    console.log('🔐 Verifying All Tokens...\n');

    const tokenStatus = {
      github: !!this.tokens.github,
      vercel: !!this.tokens.vercel,
      fly: !!this.tokens.fly
    };

    Object.entries(tokenStatus).forEach(([name, exists]) => {
      console.log(`  ${exists ? '✅' : '❌'} ${name.toUpperCase()}`);
    });

    const allPresent = Object.values(tokenStatus).every(v => v);
    console.log(`\n  ${allPresent ? '✅ All tokens available' : '❌ Some tokens missing'}\n`);

    return allPresent;
  }

  async verifyConfiguration() {
    console.log('⚙️ Verifying Configuration...\n');

    const checks = {
      'vercel.json': fs.existsSync('vercel.json'),
      '.github/workflows/deploy-all.yml': fs.existsSync('.github/workflows/deploy-all.yml'),
      'backend/server.js': fs.existsSync('backend/server.js'),
      'public/index.html': fs.existsSync('public/index.html'),
      'backend/.env': fs.existsSync('backend/.env')
    };

    let allGood = true;
    Object.entries(checks).forEach(([file, exists]) => {
      console.log(`  ${exists ? '✅' : '❌'} ${file}`);
      if (!exists) allGood = false;
    });

    console.log(`\n  ${allGood ? '✅ All configurations valid' : '❌ Some configs missing'}\n`);

    return allGood;
  }

  async triggerGithubWorkflow() {
    console.log('🔄 Triggering GitHub Workflow...\n');

    if (!this.tokens.github) {
      console.log('  ❌ GITHUB_TOKEN not available\n');
      return false;
    }

    return new Promise((resolve) => {
      const options = {
        hostname: 'api.github.com',
        path: '/repos/ahmdhk9/ai-programming-expert/actions/workflows/deploy-all.yml/dispatches',
        method: 'POST',
        headers: {
          'Authorization': `token ${this.tokens.github}`,
          'User-Agent': 'Auto-Deployment',
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        if (res.statusCode === 204) {
          console.log('  ✅ Workflow triggered successfully');
          this.deployLog.push('GitHub workflow triggered');
          resolve(true);
        } else {
          console.log(`  ⚠️ Response: ${res.statusCode}`);
          resolve(false);
        }
      });

      req.on('error', (e) => {
        console.log(`  ❌ Error: ${e.message}`);
        resolve(false);
      });

      req.write(JSON.stringify({ ref: 'main' }));
      req.end();
    });
  }

  async monitorDeployment() {
    console.log('\n📊 Monitoring Deployment...\n');

    if (!this.tokens.vercel) {
      console.log('  ⚠️ VERCEL_TOKEN not available\n');
      return;
    }

    return new Promise((resolve) => {
      const options = {
        hostname: 'api.vercel.com',
        path: '/v6/deployments?limit=5',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.tokens.vercel}`
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (d) => { data += d; });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.deployments && json.deployments.length > 0) {
              const latest = json.deployments[0];
              console.log(`  Latest Deployment:`);
              console.log(`    State: ${latest.state}`);
              console.log(`    URL: ${latest.url}`);
              console.log(`    Created: ${new Date(latest.created).toLocaleString()}\n`);
            }
          } catch (e) {
            console.log('  Unable to fetch deployment status\n');
          }
          resolve();
        });
      });

      req.on('error', () => {
        console.log('  Connection error\n');
        resolve();
      });

      req.end();
    });
  }

  generateDeploymentReport() {
    console.log('📄 Generating Deployment Report...\n');

    const report = {
      timestamp: new Date().toISOString(),
      status: 'DEPLOYMENT_INITIATED',
      actions: this.deployLog,
      urls: {
        frontend: 'https://ai-programming-expert-ppgxu0wcr.vercel.app',
        backend: 'https://agent-backend-ahmd1.fly.dev',
        repository: 'https://github.com/ahmdhk9/ai-programming-expert'
      }
    };

    fs.writeFileSync('AUTO_DEPLOYMENT_REPORT.json', JSON.stringify(report, null, 2));
    console.log('  ✅ Report saved: AUTO_DEPLOYMENT_REPORT.json\n');

    return report;
  }

  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🚀 SMART AUTO-DEPLOYMENT SYSTEM');
    console.log('═'.repeat(70) + '\n');

    // Verify tokens
    const tokensOk = await this.verifyAllTokens();
    if (!tokensOk) {
      console.log('❌ Cannot proceed without tokens\n');
      return;
    }

    // Verify configuration
    const configOk = await this.verifyConfiguration();
    if (!configOk) {
      console.log('❌ Cannot proceed with invalid configuration\n');
      return;
    }

    // Trigger deployment
    const deployed = await this.triggerGithubWorkflow();
    
    if (deployed) {
      // Monitor deployment
      await this.monitorDeployment();

      // Generate report
      this.generateDeploymentReport();
    }

    console.log('═'.repeat(70));
    console.log('✅ DEPLOYMENT PROCESS COMPLETE');
    console.log('═'.repeat(70) + '\n');
  }
}

const deployment = new AutoDeploymentSystem();
deployment.run().catch(console.error);

module.exports = AutoDeploymentSystem;
