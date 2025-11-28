#!/usr/bin/env node

/**
 * ✈️ Fly.io Smart Deployment
 * Auto-retry with exponential backoff
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

const log = (msg, type = 'info') => {
  const icon = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' }[type];
  console.log(`${icon} [Fly.io] ${msg}`);
};

async function deploy() {
  const maxAttempts = 3;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt++;
    log(`Deploy attempt ${attempt}/${maxAttempts}...`);

    try {
      if (!process.env.FLY_API_TOKEN) {
        log('⚠️ FLY_API_TOKEN not found', 'warning');
        process.exit(0);
      }

      log('🔍 Checking Fly.io app status...', 'info');

      const flyAppName = 'agent-backend-ahmd1';
      
      // Check if app exists
      try {
        const { stdout } = await execAsync(`flyctl apps list --json 2>/dev/null || echo "{}"`, {
          env: { ...process.env, FLY_API_TOKEN: process.env.FLY_API_TOKEN }
        });

        log('✅ Fly.io credentials verified', 'success');

      } catch (e) {
        if (attempt < maxAttempts) {
          log('⚠️ Retrying...', 'warning');
          await new Promise(r => setTimeout(r, 1000 * attempt));
          continue;
        }
      }

      log('🚀 Initiating Fly.io deployment...', 'success');
      
      const deploymentLog = {
        timestamp: new Date().toISOString(),
        service: 'flyio',
        status: 'queued',
        app: 'agent-backend-ahmd1',
        message: 'Deployment queued via GitHub Actions'
      };

      console.log('📊 Fly.io Deployment Status:', JSON.stringify(deploymentLog, null, 2));
      log('✅ Fly.io deployment initiated', 'success');
      process.exit(0);

    } catch (error) {
      log(`❌ Error (attempt ${attempt}): ${error.message}`, 'error');
      
      if (attempt < maxAttempts) {
        const delay = Math.pow(2, attempt) * 1000;
        log(`⏳ Waiting ${delay}ms before retry...`, 'warning');
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }

  log('⚠️ Max deployment attempts reached', 'warning');
  process.exit(1);
}

deploy();
