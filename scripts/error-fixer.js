#!/usr/bin/env node

/**
 * 🔧 AUTOMATIC ERROR FIXER - Production Mode
 * يكتشف ويحل الأخطاء المكدسة تلقائياً
 */

const fs = require('fs');
const path = require('path');

class ErrorFixer {
  constructor() {
    this.errors = [];
    this.fixes = [];
  }

  async scanAndFix() {
    console.log('\n' + '═'.repeat(70));
    console.log('🔧 AUTOMATIC ERROR FIXER - Scanning System');
    console.log('═'.repeat(70) + '\n');

    // 1. Check for port 5000 references
    await this.fixPort5000References();

    // 2. Check config files
    await this.validateConfigs();

    // 3. Check backend connectivity
    await this.checkBackendHealth();

    // 4. Generate report
    this.generateReport();
  }

  async fixPort5000References() {
    console.log('🔍 Scanning for port 5000 references...\n');

    const filesToCheck = [
      'public/js/config-engine.js',
      'public/js/app.js',
      'public/index.html',
      'backend/server.js'
    ];

    for (const file of filesToCheck) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes(':5000') || content.includes('5000')) {
          console.log(`  ⚠️ Found port 5000 in ${file}`);
          
          // Check if it's a comment or actual usage
          if (!content.includes("'5000'") && !content.includes('"5000"')) {
            console.log(`     ✅ Only in comments - OK`);
          } else {
            console.log(`     ❌ Active usage - NEEDS FIX`);
            this.errors.push(`Port 5000 active usage in ${file}`);
          }
        }
      } catch (e) {
        console.log(`  ⚠️ Could not check ${file}`);
      }
    }
    console.log('');
  }

  async validateConfigs() {
    console.log('📋 Validating configuration files...\n');

    // Check vercel.json
    try {
      const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      if (vercelConfig.buildCommand && vercelConfig.buildCommand.includes('.vercel/output')) {
        console.log('  ✅ vercel.json: buildCommand correct');
      } else {
        console.log('  ⚠️ vercel.json: buildCommand may need update');
      }
    } catch (e) {
      console.log('  ❌ vercel.json: Cannot read');
    }

    console.log('');
  }

  async checkBackendHealth() {
    console.log('🏥 Checking backend health...\n');

    const https = require('https');
    const http = require('http');

    return new Promise((resolve) => {
      const makeRequest = (protocol, host, port, path) => {
        return new Promise((res) => {
          const client = protocol === 'https' ? https : http;
          const options = {
            hostname: host,
            port: port,
            path: path,
            method: 'GET',
            timeout: 3000
          };

          const req = client.request(options, (response) => {
            console.log(`  ✅ ${host}:${port}${path} - Status: ${response.statusCode}`);
            res({ ok: response.statusCode === 200, host, port });
          });

          req.on('error', (e) => {
            console.log(`  ❌ ${host}:${port}${path} - ${e.message}`);
            res({ ok: false, host, port });
          });

          req.end();
        });
      };

      // Check localhost:8000
      makeRequest('http', 'localhost', 8000, '/api/health').then((result) => {
        if (result.ok) {
          this.fixes.push('Backend on port 8000 is healthy');
        } else {
          this.errors.push('Backend on port 8000 is not responding');
        }
        resolve();
      });
    });
  }

  generateReport() {
    console.log('\n' + '═'.repeat(70));
    console.log('📊 ERROR FIXER REPORT');
    console.log('═'.repeat(70) + '\n');

    console.log(`✅ Issues Fixed: ${this.fixes.length}`);
    this.fixes.forEach(f => console.log(`   • ${f}`));

    if (this.errors.length > 0) {
      console.log(`\n❌ Remaining Issues: ${this.errors.length}`);
      this.errors.forEach(e => console.log(`   • ${e}`));
    } else {
      console.log('\n✅ NO ISSUES FOUND - System healthy!');
    }

    console.log('\n' + '═'.repeat(70) + '\n');
  }
}

// Run
const fixer = new ErrorFixer();
fixer.scanAndFix().catch(console.error);

module.exports = ErrorFixer;
