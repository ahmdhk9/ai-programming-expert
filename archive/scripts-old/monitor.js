#!/usr/bin/env node

/**
 * 📊 Smart Monitoring & Health Check System
 * Monitors all deployed instances and reports status
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const log = (msg, type = 'info') => {
  const icon = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }[type];
  console.log(`${icon} [Monitor] ${msg}`);
};

const endpoints = [
  { name: 'Vercel', url: 'https://ai-programming-expert-ppgxu0wcr.vercel.app/api/health' },
  { name: 'Firebase', url: 'https://ai-programming-expert.firebaseapp.com/' },
  { name: 'Fly.io', url: 'https://agent-backend-ahmd1.fly.dev/api/health' },
  { name: 'Replit', url: 'https://f0eba817-d225-4ecc-9ae5-4dafb1c321f5-00-27sjn5ewtt3r0.sisko.replit.dev/' },
];

async function checkEndpoint(endpoint) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const timeout = setTimeout(() => {
      resolve({
        ...endpoint,
        status: 'timeout',
        responseTime: -1,
        message: 'Request timeout (>10s)'
      });
    }, 10000);

    https.get(endpoint.url, { timeout: 10000 }, (res) => {
      clearTimeout(timeout);
      const responseTime = Date.now() - startTime;
      
      resolve({
        ...endpoint,
        status: res.statusCode === 200 ? 'healthy' : 'degraded',
        statusCode: res.statusCode,
        responseTime,
        message: `HTTP ${res.statusCode}`
      });
    }).on('error', (error) => {
      clearTimeout(timeout);
      resolve({
        ...endpoint,
        status: 'down',
        responseTime: -1,
        message: error.code
      });
    });
  });
}

async function monitor() {
  log('🔍 Starting health checks on all platforms...\n');

  const results = await Promise.all(endpoints.map(checkEndpoint));

  // Display results
  console.log('\n📊 DEPLOYMENT STATUS REPORT\n' + '='.repeat(50));
  
  results.forEach(result => {
    const icon = {
      'healthy': '✅',
      'degraded': '⚠️',
      'down': '❌',
      'timeout': '⏱️'
    }[result.status];

    console.log(`${icon} ${result.name.padEnd(15)} | ${result.message.padEnd(25)} | ${result.responseTime}ms`);
  });

  console.log('='.repeat(50) + '\n');

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    checks: results,
    summary: {
      total: results.length,
      healthy: results.filter(r => r.status === 'healthy').length,
      degraded: results.filter(r => r.status === 'degraded').length,
      down: results.filter(r => r.status === 'down').length,
    }
  };

  const configPath = path.join(__dirname, '../deploy.config.json');
  const existingConfig = (() => {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch {
      return {};
    }
  })();

  const updatedConfig = {
    ...existingConfig,
    lastMonitor: report,
    deploymentUrls: {
      vercel: 'https://ai-programming-expert-ppgxu0wcr.vercel.app',
      firebase: 'https://ai-programming-expert.firebaseapp.com',
      flyio: 'https://agent-backend-ahmd1.fly.dev',
      replit: 'https://f0eba817-d225-4ecc-9ae5-4dafb1c321f5-00-27sjn5ewtt3r0.sisko.replit.dev'
    }
  };

  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));

  if (report.summary.down === 0 && report.summary.degraded <= 1) {
    log('✅ All systems operational!', 'success');
    process.exit(0);
  } else {
    log('⚠️ Some services are down or degraded', 'warning');
    process.exit(0); // Don't fail the entire workflow
  }
}

monitor();
