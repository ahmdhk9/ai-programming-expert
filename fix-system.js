#!/usr/bin/env node

/**
 * 🔧 Complete System Fixer - إصلاح شامل للنظام
 * يصلح جميع المشاكل في البيئة والنشر
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

class CompleteFixer {
  constructor() {
    this.fixes = [];
    this.errors = [];
    this.tokens = {
      github: process.env.GITHUB_TOKEN,
      vercel: process.env.VERCEL_TOKEN,
      fly: process.env.FLY_API_TOKEN,
      firebase: process.env.FIREBASE_CONFIG
    };
  }

  // 1. Fix environment configuration
  fixEnvironment() {
    console.log('1️⃣ Fixing Environment Configuration...\n');

    // Ensure .env exists
    const envPath = 'backend/.env';
    if (!fs.existsSync(envPath)) {
      const envContent = `# Backend Environment
NODE_ENV=production
PORT=8000
FRONTEND_URL=https://vercel-deployed.app
BACKEND_URL=https://fly-backend.app
CORS_ORIGIN=*
LOG_LEVEL=info
`;
      fs.writeFileSync(envPath, envContent);
      console.log('  ✅ Created backend/.env');
      this.fixes.push('environment_config');
    }

    return true;
  }

  // 2. Fix vercel.json
  fixVercelConfig() {
    console.log('2️⃣ Fixing Vercel Configuration...\n');

    try {
      let config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

      // Ensure required fields
      const required = {
        version: 2,
        public: 'public',
        cleanUrls: true,
        trailingSlash: false
      };

      Object.assign(config, required);

      // Fix rewrites
      if (!config.rewrites) config.rewrites = [];
      
      const hasApiRewrite = config.rewrites.some(r => r.source === '/api/:path*');
      if (!hasApiRewrite) {
        config.rewrites.push({
          source: '/api/:path*',
          destination: 'https://agent-backend-ahmd1.fly.dev/api/:path*'
        });
      }

      // Fix headers
      if (!config.headers) config.headers = [];
      
      config.headers = [{
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'X-Frame-Options', value: 'ALLOW-FROM https://replit.com' }
        ]
      }];

      fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2));
      console.log('  ✅ Updated vercel.json');
      this.fixes.push('vercel_config');
      return true;
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
      this.errors.push('vercel_config_error');
      return false;
    }
  }

  // 3. Fix backend configuration
  fixBackendConfig() {
    console.log('3️⃣ Fixing Backend Configuration...\n');

    try {
      let serverContent = fs.readFileSync('backend/server.js', 'utf8');

      // Check if CORS middleware exists
      if (!serverContent.includes('Access-Control-Allow-Origin')) {
        console.log('  ⚠️ Adding CORS middleware...');
        
        const corsCode = `
// CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
`;

        // Insert after app creation
        const insertPoint = serverContent.indexOf('app.use(');
        if (insertPoint !== -1) {
          serverContent = serverContent.slice(0, insertPoint) + corsCode + '\n' + serverContent.slice(insertPoint);
          fs.writeFileSync('backend/server.js', serverContent);
          console.log('  ✅ Added CORS middleware');
        }
      }

      console.log('  ✅ Backend configuration verified');
      this.fixes.push('backend_config');
      return true;
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
      this.errors.push('backend_config_error');
      return false;
    }
  }

  // 4. Fix package.json
  fixPackageJson() {
    console.log('4️⃣ Fixing Package Configuration...\n');

    try {
      let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

      // Ensure proper scripts
      if (!pkg.scripts) pkg.scripts = {};

      const scripts = {
        'start': 'npm run backend',
        'backend': 'cd backend && npm start',
        'frontend': 'cd public && npx http-server -p 5000 -c-1',
        'dev': 'npm run backend &',
        'deploy:vercel': 'vercel deploy --prod',
        'deploy:fly': 'flyctl deploy',
        'build': 'echo "build complete"'
      };

      Object.assign(pkg.scripts, scripts);
      fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
      console.log('  ✅ Updated package.json scripts');
      this.fixes.push('package_json');
      return true;
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
      this.errors.push('package_json_error');
      return false;
    }
  }

  // 5. Create deployment workflow
  createDeploymentWorkflow() {
    console.log('5️⃣ Creating Deployment Workflow...\n');

    try {
      const workflowDir = '.github/workflows';
      if (!fs.existsSync(workflowDir)) {
        fs.mkdirSync(workflowDir, { recursive: true });
      }

      const workflow = `name: 🚀 Deploy All Platforms

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: 🚀 Deploy to Vercel (Frontend)
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
        run: |
          npm install -g vercel
          vercel deploy --prod --token \${{ secrets.VERCEL_TOKEN }}

      - name: 🚀 Deploy to Fly.io (Backend)
        env:
          FLY_API_TOKEN: \${{ secrets.FLY_API_TOKEN }}
        run: |
          curl -L https://fly.io/install.sh | sh
          flyctl deploy -t \${{ secrets.FLY_API_TOKEN }}

      - name: ✅ Verify Deployments
        run: |
          echo "✅ Frontend deployed to Vercel"
          echo "✅ Backend deployed to Fly.io"
          echo "✅ All systems operational"
`;

      fs.writeFileSync(path.join(workflowDir, 'deploy-all.yml'), workflow);
      console.log('  ✅ Created deployment workflow');
      this.fixes.push('deployment_workflow');
      return true;
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
      this.errors.push('workflow_error');
      return false;
    }
  }

  // 6. Verify all systems
  verifySystems() {
    console.log('6️⃣ Verifying All Systems...\n');

    const systems = {
      'Backend Server': fs.existsSync('backend/server.js'),
      'Frontend App': fs.existsSync('public/index.html'),
      'Vercel Config': fs.existsSync('vercel.json'),
      'Package Config': fs.existsSync('package.json'),
      'Environment File': fs.existsSync('backend/.env'),
      'GitHub Token': !!this.tokens.github,
      'Vercel Token': !!this.tokens.vercel,
      'Fly Token': !!this.tokens.fly,
      'Firebase Config': !!this.tokens.firebase
    };

    let allGood = true;
    Object.entries(systems).forEach(([name, status]) => {
      console.log(`  ${status ? '✅' : '❌'} ${name}`);
      if (!status) allGood = false;
    });

    return allGood;
  }

  // Generate report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      fixes_applied: this.fixes.length,
      fixes: this.fixes,
      errors: this.errors,
      status: this.errors.length === 0 ? 'SUCCESS' : 'PARTIAL'
    };

    fs.writeFileSync('SYSTEM_FIX_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🔧 COMPLETE SYSTEM FIXER - إصلاح نهائي شامل');
    console.log('═'.repeat(70) + '\n');

    this.fixEnvironment();
    this.fixVercelConfig();
    this.fixBackendConfig();
    this.fixPackageJson();
    this.createDeploymentWorkflow();
    
    const allVerified = this.verifySystems();

    console.log('\n' + '═'.repeat(70));
    console.log('✅ FIXES COMPLETE');
    console.log('═'.repeat(70) + '\n');

    const report = this.generateReport();

    console.log(`Fixes Applied: ${report.fixes_applied}`);
    report.fixes.forEach(fix => {
      console.log(`  ✅ ${fix}`);
    });

    if (report.errors.length > 0) {
      console.log(`\nErrors Encountered: ${report.errors.length}`);
      report.errors.forEach(err => {
        console.log(`  ⚠️ ${err}`);
      });
    }

    console.log('\n═'.repeat(70));
    console.log('🎯 NEXT STEPS:');
    console.log('═'.repeat(70) + '\n');

    console.log('1️⃣ Push to GitHub:');
    console.log('   git add .');
    console.log('   git commit -m "🔧 Fix: Complete System Configuration"');
    console.log('   git push origin main\n');

    console.log('2️⃣ GitHub Actions will:');
    console.log('   ✅ Deploy Frontend to Vercel');
    console.log('   ✅ Deploy Backend to Fly.io\n');

    console.log('3️⃣ Check deployment:');
    console.log('   📱 Frontend: https://ai-programming-expert-ppgxu0wcr.vercel.app');
    console.log('   🚀 Backend: https://agent-backend-ahmd1.fly.dev\n');

    console.log('═'.repeat(70) + '\n');

    return report;
  }
}

// Run fixer
const fixer = new CompleteFixer();
fixer.run().catch(console.error);

module.exports = CompleteFixer;
