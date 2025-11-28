#!/usr/bin/env node

/**
 * 🛠️ Auto Fixer - Automatically fix common issues
 * Works with free tier constraints
 */

const fs = require('fs');
const path = require('path');

class AutoFixer {
  constructor() {
    this.fixes = [];
    this.log = [];
  }

  logAction(action, status) {
    const msg = `${status} ${action}`;
    console.log(msg);
    this.log.push({ timestamp: new Date().toISOString(), action, status });
  }

  fixVercelJson() {
    const vercelPath = 'vercel.json';
    
    try {
      if (!fs.existsSync(vercelPath)) {
        const config = {
          version: 2,
          public: 'public',
          buildCommand: 'echo "Building"',
          outputDirectory: 'public',
          rewrites: [
            {
              source: '/api/:path*',
              destination: 'https://agent-backend-ahmd1.fly.dev/api/:path*'
            }
          ],
          headers: [
            {
              source: '/(.*)',
              headers: [
                { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
                { key: 'X-Frame-Options', value: 'ALLOW-FROM https://replit.com' },
                { key: 'Access-Control-Allow-Origin', value: '*' }
              ]
            }
          ]
        };

        fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2));
        this.logAction('Created vercel.json with API rewrites', '✅');
        return true;
      }
    } catch (e) {
      this.logAction(`Error in vercel.json: ${e.message}`, '❌');
    }

    return false;
  }

  fixBackendCors() {
    const serverPath = 'backend/server.js';
    
    try {
      if (fs.existsSync(serverPath)) {
        let content = fs.readFileSync(serverPath, 'utf8');

        if (!content.includes('Access-Control-Allow-Origin')) {
          // Add CORS middleware
          const corsCode = `
// CORS Configuration for Free Tier
const enableCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return true;
  }
  return false;
};
`;

          if (!content.includes('enableCors')) {
            content = corsCode + '\n' + content;
            // Add enableCors call in request handler
            content = content.replace(
              'const server = http.createServer((req, res) => {',
              'const server = http.createServer((req, res) => {\n  if (enableCors(req, res)) return;'
            );

            fs.writeFileSync(serverPath, content);
            this.logAction('Added CORS middleware to backend', '✅');
            return true;
          }
        }
      }
    } catch (e) {
      this.logAction(`Error fixing backend CORS: ${e.message}`, '❌');
    }

    return false;
  }

  fixFrontendApi() {
    const jsDir = 'public/js';
    
    try {
      if (!fs.existsSync(jsDir)) {
        fs.mkdirSync(jsDir, { recursive: true });
      }

      const apiPath = path.join(jsDir, 'api.js');

      if (!fs.existsSync(apiPath)) {
        const apiCode = `
// API Client for Free Tier
class ApiClient {
  constructor() {
    this.baseURL = this.getBackendUrl();
  }

  getBackendUrl() {
    // In Vercel, use rewrite path; locally use direct URL
    if (typeof window !== 'undefined' && window.location.hostname.includes('replit')) {
      return '/api';
    }
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel')) {
      return '/api';
    }
    return 'https://agent-backend-ahmd1.fly.dev/api';
  }

  async request(method, endpoint, data = null) {
    try {
      const url = this.baseURL + endpoint;
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
      };

      if (data) options.body = JSON.stringify(data);

      const response = await fetch(url, options);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  }

  get(endpoint) { return this.request('GET', endpoint); }
  post(endpoint, data) { return this.request('POST', endpoint, data); }
  put(endpoint, data) { return this.request('PUT', endpoint, data); }
  delete(endpoint) { return this.request('DELETE', endpoint); }
}

const api = new ApiClient();
`;

        fs.writeFileSync(apiPath, apiCode);
        this.logAction('Created optimized API client for frontend', '✅');
        return true;
      }
    } catch (e) {
      this.logAction(`Error creating API client: ${e.message}`, '❌');
    }

    return false;
  }

  fixEnvironmentVariables() {
    try {
      // Check if .env exists and is safe
      if (fs.existsSync('.env')) {
        let content = fs.readFileSync('.env', 'utf8');
        
        // Remove any exposed tokens
        const sensitivePatterns = [
          /VERCEL_TOKEN=.*/g,
          /FLY_API_TOKEN=.*/g,
          /FIREBASE_.*=.*/g
        ];

        let modified = false;
        sensitivePatterns.forEach(pattern => {
          if (pattern.test(content)) {
            content = content.replace(pattern, '');
            modified = true;
          }
        });

        if (modified) {
          fs.writeFileSync('.env', content);
          this.logAction('Removed sensitive tokens from .env', '✅');
          return true;
        }
      }
    } catch (e) {
      this.logAction(`Error fixing env: ${e.message}`, '❌');
    }

    return false;
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      fixes: this.fixes.length,
      log: this.log,
      status: this.fixes.length > 0 ? 'FIXES_APPLIED' : 'NO_FIXES_NEEDED'
    };

    fs.writeFileSync('AUTO_FIXER_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🛠️ AUTO FIXER - Apply Common Fixes');
    console.log('═'.repeat(70) + '\n');

    if (this.fixVercelJson()) this.fixes.push('vercel.json');
    if (this.fixBackendCors()) this.fixes.push('backend-cors');
    if (this.fixFrontendApi()) this.fixes.push('frontend-api');
    if (this.fixEnvironmentVariables()) this.fixes.push('env-security');

    const report = this.generateReport();

    console.log('\n' + '═'.repeat(70));
    console.log('✅ AUTO FIXES COMPLETE');
    console.log('═'.repeat(70) + '\n');

    console.log(`Fixes Applied: ${report.fixes}`);
    report.log.forEach(entry => {
      console.log(`  ${entry.timestamp}: ${entry.action}`);
    });

    console.log('\n═'.repeat(70) + '\n');
    return report;
  }
}

if (require.main === module) {
  const fixer = new AutoFixer();
  fixer.run().catch(console.error);
}

module.exports = AutoFixer;
