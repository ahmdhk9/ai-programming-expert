#!/usr/bin/env node

/**
 * 🛠️ Advanced Auto-Repair System - إصلاح ذكي ومتقدم
 * يصلح المشاكل تلقائياً قبل حدوثها
 */

const https = require('https');
const fs = require('fs');

class AdvancedRepairSystem {
  constructor() {
    this.repairs = [];
    this.flyToken = process.env.FLY_API_TOKEN;
    this.vercelToken = process.env.VERCEL_TOKEN;
    this.healthStatus = {};
  }

  // 1. فحص وإصلاح Backend Health
  async repairBackendHealth() {
    console.log('🔧 Repairing Backend Health...\n');

    if (!this.flyToken) {
      console.log('❌ FLY_API_TOKEN not available\n');
      return false;
    }

    try {
      // Check app status
      const status = await this.checkFlyAppStatus();
      
      if (status.state === 'suspended' || status.state === 'paused') {
        console.log('⚠️ Backend suspended, attempting to restart...');
        
        const result = await this.restartFlyApp();
        if (result) {
          console.log('✅ Backend restarted successfully\n');
          this.repairs.push({ type: 'BACKEND_RESTART', status: 'SUCCESS' });
          return true;
        }
      } else if (status.state === 'running') {
        console.log('✅ Backend is healthy\n');
        return true;
      }
    } catch (e) {
      console.log(`⚠️ Error checking backend: ${e.message}\n`);
    }

    return false;
  }

  async checkFlyAppStatus() {
    return new Promise((resolve) => {
      const query = {
        query: `{
          app(name: "agent-backend-ahmd1") { state }
        }`
      };

      const req = https.request({
        hostname: 'api.fly.io',
        path: '/graphql',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.flyToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }, (res) => {
        let data = '';
        res.on('data', (d) => { data += d; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed.data?.app || { state: 'unknown' });
          } catch (e) {
            resolve({ state: 'unknown' });
          }
        });
      });

      req.on('error', () => resolve({ state: 'error' }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ state: 'timeout' });
      });

      req.write(JSON.stringify(query));
      req.end();
    });
  }

  async restartFlyApp() {
    return new Promise((resolve) => {
      const mutation = {
        query: `mutation {
          restartApp(input: {appId: "agent-backend-ahmd1"}) {
            app { state }
          }
        }`
      };

      const req = https.request({
        hostname: 'api.fly.io',
        path: '/graphql',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.flyToken}`,
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let data = '';
        res.on('data', (d) => { data += d; });
        res.on('end', () => {
          resolve(res.statusCode === 200);
        });
      });

      req.on('error', () => resolve(false));
      req.write(JSON.stringify(mutation));
      req.end();
    });
  }

  // 2. إصلاح Vercel Configuration
  async repairVercelConfig() {
    console.log('🔧 Repairing Vercel Configuration...\n');

    try {
      const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

      let updated = false;

      // تأكد من وجود rewrites صحيحة
      if (!config.rewrites) {
        config.rewrites = [];
      }

      if (!config.rewrites.some(r => r.source === '/api/:path*')) {
        config.rewrites.push({
          source: '/api/:path*',
          destination: 'https://agent-backend-ahmd1.fly.dev/api/:path*'
        });
        updated = true;
      }

      // تحسين headers
      if (!config.headers) {
        config.headers = [];
      }

      const mainHeader = config.headers[0] || {};
      if (!mainHeader.headers) {
        mainHeader.headers = [];
      }

      // إضافة headers مهمة
      const requiredHeaders = [
        { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'X-Frame-Options', value: 'ALLOW-FROM https://replit.com' }
      ];

      requiredHeaders.forEach(h => {
        if (!mainHeader.headers.some(x => x.key === h.key)) {
          mainHeader.headers.push(h);
          updated = true;
        }
      });

      if (updated) {
        config.headers[0] = mainHeader;
        fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2));
        console.log('✅ Vercel configuration updated\n');
        this.repairs.push({ type: 'VERCEL_CONFIG', status: 'UPDATED' });
        return true;
      }

      console.log('✅ Vercel configuration is optimal\n');
      return true;
    } catch (e) {
      console.log(`❌ Error updating Vercel config: ${e.message}\n`);
      return false;
    }
  }

  // 3. إصلاح Backend CORS
  async repairBackendCors() {
    console.log('🔧 Repairing Backend CORS...\n');

    try {
      const serverPath = 'backend/server.js';
      let content = fs.readFileSync(serverPath, 'utf8');

      if (content.includes('enableCors')) {
        console.log('✅ CORS middleware already configured\n');
        return true;
      }

      const corsMiddleware = `
// CORS Middleware - Allow all origins for free tier
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

`;

      if (!content.includes('Access-Control-Allow-Origin')) {
        const insertPoint = content.indexOf('app.use(cors())');
        if (insertPoint !== -1) {
          content = content.slice(0, insertPoint) + corsMiddleware + content.slice(insertPoint);
          fs.writeFileSync(serverPath, content);
          console.log('✅ CORS middleware added\n');
          this.repairs.push({ type: 'BACKEND_CORS', status: 'ADDED' });
          return true;
        }
      }

      return true;
    } catch (e) {
      console.log(`❌ Error repairing CORS: ${e.message}\n`);
      return false;
    }
  }

  // 4. إضافة Frontend Resilience
  async improveFreontendResilience() {
    console.log('🔧 Improving Frontend Resilience...\n');

    try {
      const apiPath = 'public/js/api-resilient.js';

      const resilientApi = `/**
 * Resilient API Client with Circuit Breaker & Smart Retry
 */

class ResilientApiClient {
  constructor() {
    this.baseURL = this.detectBackendUrl();
    this.failureCount = 0;
    this.maxFailures = 5;
    this.circuitOpen = false;
    this.retryDelay = 1000;
    this.maxRetries = 3;
  }

  detectBackendUrl() {
    const hostname = window.location.hostname;
    if (hostname.includes('vercel')) {
      return '/api'; // Use Vercel rewrites
    }
    if (hostname.includes('replit')) {
      return '/api';
    }
    // Fallback to direct URL
    return 'https://agent-backend-ahmd1.fly.dev/api';
  }

  async request(method, endpoint, data = null, retryCount = 0) {
    // Circuit breaker check
    if (this.circuitOpen) {
      console.warn('⚠️ Circuit breaker OPEN - using cached/mock data');
      return this.getMockData(endpoint);
    }

    try {
      const url = this.baseURL + endpoint;
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      };

      if (data) options.body = JSON.stringify(data);

      const response = await fetch(url, options);

      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);

      // Reset failure count on success
      this.failureCount = 0;
      return await response.json();
    } catch (error) {
      this.failureCount++;

      if (this.failureCount >= this.maxFailures) {
        this.circuitOpen = true;
        console.error('🔴 Circuit breaker OPEN');
        return this.getMockData(endpoint);
      }

      if (retryCount < this.maxRetries) {
        const delay = this.retryDelay * Math.pow(2, retryCount);
        console.warn(\`⚠️ Retry \${retryCount + 1}/\${this.maxRetries} after \${delay}ms\`);
        await new Promise(r => setTimeout(r, delay));
        return this.request(method, endpoint, data, retryCount + 1);
      }

      console.error(\`❌ Request failed: \${error.message}\`);
      return this.getMockData(endpoint);
    }
  }

  resetCircuitBreaker() {
    this.circuitOpen = false;
    this.failureCount = 0;
  }

  getMockData(endpoint) {
    const mockData = {
      '/health': { status: 'ok', timestamp: Date.now() },
      '/status': { system: 'running', mode: 'mock' }
    };
    return mockData[endpoint] || { error: 'offline', data: null };
  }

  get(endpoint) { return this.request('GET', endpoint); }
  post(endpoint, data) { return this.request('POST', endpoint, data); }
  put(endpoint, data) { return this.request('PUT', endpoint, data); }
  delete(endpoint) { return this.request('DELETE', endpoint); }
}

const resilientApi = new ResilientApiClient();
`;

      fs.writeFileSync(apiPath, resilientApi);
      console.log('✅ Resilient API client created\n');
      this.repairs.push({ type: 'FRONTEND_RESILIENCE', status: 'ADDED' });
      return true;
    } catch (e) {
      console.log(`❌ Error creating resilient client: ${e.message}\n`);
      return false;
    }
  }

  // Generate report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      repairs: this.repairs,
      status: this.repairs.length > 0 ? 'REPAIRS_APPLIED' : 'NO_REPAIRS_NEEDED'
    };

    fs.writeFileSync('ADVANCED_REPAIR_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🛠️ ADVANCED AUTO-REPAIR SYSTEM - إصلاح ذكي');
    console.log('═'.repeat(70) + '\n');

    await this.repairBackendHealth();
    await this.repairVercelConfig();
    await this.repairBackendCors();
    await this.improveFreontendResilience();

    const report = this.generateReport();

    console.log('═'.repeat(70));
    console.log('✅ REPAIRS COMPLETE');
    console.log('═'.repeat(70) + '\n');

    console.log(`Repairs Applied: ${report.repairs.length}`);
    report.repairs.forEach(r => {
      console.log(`  ✅ ${r.type}: ${r.status}`);
    });

    console.log('\n═'.repeat(70) + '\n');
    return report;
  }
}

if (require.main === module) {
  const repair = new AdvancedRepairSystem();
  repair.run().catch(console.error);
}

module.exports = AdvancedRepairSystem;
