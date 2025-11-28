#!/usr/bin/env node

/**
 * 📝 Update Deployment Status
 * Maintains deploy.config.json with latest state
 */

const fs = require('fs');
const path = require('path');

const log = (msg, type = 'info') => {
  const icon = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }[type];
  console.log(`${icon} [Status] ${msg}`);
};

function updateStatus() {
  log('📝 Updating deployment status...');

  const configPath = path.join(__dirname, '../deploy.config.json');

  let config = {};
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    log('📄 Initializing new config file', 'info');
  }

  // Update status
  config.lastDeployment = {
    timestamp: new Date().toISOString(),
    branch: process.env.GITHUB_REF || 'main',
    commit: process.env.GITHUB_SHA || 'unknown',
    actor: process.env.GITHUB_ACTOR || 'ci-bot',
    workflow: 'Smart CI/CD Pipeline',
    status: 'completed'
  };

  config.deploymentUrls = {
    vercel: 'https://ai-programming-expert-ppgxu0wcr.vercel.app',
    firebase: 'https://ai-programming-expert.firebaseapp.com',
    flyio: 'https://agent-backend-ahmd1.fly.dev',
    replit: 'https://f0eba817-d225-4ecc-9ae5-4dafb1c321f5-00-27sjn5ewtt3r0.sisko.replit.dev'
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log('\n✅ DEPLOYMENT COMPLETE\n' + '='.repeat(50));
  console.log('📊 Current Status:', JSON.stringify(config.lastDeployment, null, 2));
  console.log('\n🌐 Live URLs:');
  Object.entries(config.deploymentUrls).forEach(([service, url]) => {
    console.log(`   ${service.padEnd(10)} → ${url}`);
  });
  console.log('='.repeat(50) + '\n');

  log('✅ Status updated successfully', 'success');
  process.exit(0);
}

updateStatus();
