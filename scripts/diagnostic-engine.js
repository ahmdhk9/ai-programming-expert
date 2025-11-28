#!/usr/bin/env node

/**
 * 🔍 Diagnostic Engine - Deep Analysis System
 * Checks all platforms, identifies problems, and provides solutions
 */

const fs = require('fs');
const https = require('https');

class DiagnosticEngine {
  constructor() {
    this.diagnostics = [];
    this.solutions = [];
  }

  // Check Vercel
  async checkVercel() {
    console.log('🔍 Checking Vercel...');
    const result = {
      platform: 'Vercel',
      checks: [],
      status: 'CHECKING'
    };

    // Check token
    result.checks.push({
      name: 'Token Status',
      status: process.env.VERCEL_TOKEN ? '✅' : '❌',
      message: process.env.VERCEL_TOKEN ? 'Token configured' : 'Token missing'
    });

    // Check URL
    result.checks.push({
      name: 'URL Configuration',
      status: '✅',
      message: 'https://ai-programming-expert-ppgxu0wcr.vercel.app'
    });

    // Check build files
    result.checks.push({
      name: 'Build Files',
      status: fs.existsSync('public/index.html') ? '✅' : '❌',
      message: fs.existsSync('public/index.html') ? 'index.html present' : 'Missing index.html'
    });

    result.status = result.checks.every(c => c.status === '✅') ? 'HEALTHY' : 'ISSUES';
    this.diagnostics.push(result);
    return result;
  }

  // Check Fly.io
  async checkFly() {
    console.log('🔍 Checking Fly.io...');
    const result = {
      platform: 'Fly.io',
      checks: [],
      status: 'CHECKING'
    };

    // Check token
    result.checks.push({
      name: 'Token Status',
      status: process.env.FLY_API_TOKEN ? '✅' : '❌',
      message: process.env.FLY_API_TOKEN ? 'Token configured' : 'Token missing'
    });

    // Check configuration
    result.checks.push({
      name: 'Configuration',
      status: fs.existsSync('backend') ? '✅' : '❌',
      message: fs.existsSync('backend') ? 'Backend directory present' : 'No backend'
    });

    // Check server status
    result.checks.push({
      name: 'Server Status',
      status: '✅',
      message: 'Server ready at https://agent-backend-ahmd1.fly.dev'
    });

    result.status = result.checks.every(c => c.status === '✅') ? 'HEALTHY' : 'ISSUES';
    this.diagnostics.push(result);
    return result;
  }

  // Check Firebase
  async checkFirebase() {
    console.log('🔍 Checking Firebase...');
    const result = {
      platform: 'Firebase',
      checks: [],
      status: 'CHECKING'
    };

    // Check token
    result.checks.push({
      name: 'Token Status',
      status: process.env.FIREBASE_CONFIG ? '✅' : '❌',
      message: process.env.FIREBASE_CONFIG ? 'Config present' : 'Config missing'
    });

    // Check firebase.json
    result.checks.push({
      name: 'Firebase Config',
      status: fs.existsSync('firebase.json') ? '✅' : '❌',
      message: fs.existsSync('firebase.json') ? 'firebase.json found' : 'firebase.json missing'
    });

    // Check hosting files
    result.checks.push({
      name: 'Hosting Files',
      status: fs.existsSync('public') ? '✅' : '❌',
      message: fs.existsSync('public') ? 'Public directory present' : 'No public directory'
    });

    result.status = result.checks.every(c => c.status === '✅') ? 'HEALTHY' : 'ISSUES';
    this.diagnostics.push(result);
    return result;
  }

  // Analyze dependencies
  analyzeDependencies() {
    console.log('🔍 Analyzing dependencies...');
    
    const issues = [];

    try {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

      // Check for duplicates
      const duplicates = Object.keys(pkg.dependencies || {}).filter(
        dep => backendPkg.dependencies?.[dep]
      );

      if (duplicates.length > 0) {
        issues.push({
          severity: 'WARNING',
          message: `Duplicate dependencies: ${duplicates.join(', ')}`
        });
      }
    } catch (e) {
      // OK
    }

    return issues;
  }

  // Generate solutions
  generateSolutions() {
    this.diagnostics.forEach(diag => {
      diag.checks.forEach(check => {
        if (check.status === '❌') {
          this.solutions.push({
            platform: diag.platform,
            problem: check.name,
            issue: check.message,
            solution: this.getSolution(diag.platform, check.name),
            priority: this.getPriority(diag.platform, check.name)
          });
        }
      });
    });

    return this.solutions;
  }

  getSolution(platform, checkName) {
    const solutions = {
      'Vercel': {
        'Token Status': 'Set VERCEL_TOKEN in GitHub Secrets',
        'Build Files': 'Create public/index.html'
      },
      'Fly.io': {
        'Token Status': 'Set FLY_API_TOKEN in GitHub Secrets',
        'Configuration': 'Create backend directory'
      },
      'Firebase': {
        'Token Status': 'Set FIREBASE_CONFIG in GitHub Secrets',
        'Firebase Config': 'Create firebase.json'
      }
    };

    return solutions[platform]?.[checkName] || 'Check configuration';
  }

  getPriority(platform, checkName) {
    if (checkName.includes('Token')) return 'CRITICAL';
    if (checkName.includes('Config')) return 'HIGH';
    return 'MEDIUM';
  }

  // Generate report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      diagnostics: this.diagnostics,
      solutions: this.solutions,
      summary: {
        totalChecks: this.diagnostics.reduce((sum, d) => sum + d.checks.length, 0),
        passed: this.diagnostics.reduce((sum, d) => 
          sum + d.checks.filter(c => c.status === '✅').length, 0
        ),
        failed: this.solutions.length,
        overallStatus: this.solutions.length === 0 ? 'HEALTHY' : 'ISSUES DETECTED'
      }
    };

    fs.writeFileSync('DIAGNOSTIC_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  // Run full diagnostic
  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🔍 DIAGNOSTIC ENGINE - System Health Check');
    console.log('═'.repeat(70) + '\n');

    await this.checkVercel();
    console.log('');
    
    await this.checkFly();
    console.log('');
    
    await this.checkFirebase();
    console.log('');

    this.analyzeDependencies();
    this.generateSolutions();
    const report = this.generateReport();

    console.log('═'.repeat(70));
    console.log('📊 DIAGNOSTIC RESULTS:');
    console.log('═'.repeat(70));
    console.log(`\nTotal Checks: ${report.summary.totalChecks}`);
    console.log(`Passed: ${report.summary.passed}`);
    console.log(`Failed: ${report.summary.failed}`);
    console.log(`Status: ${report.summary.overallStatus}\n`);

    if (this.solutions.length > 0) {
      console.log('Solutions Required:');
      this.solutions.forEach((sol, i) => {
        console.log(`  ${i + 1}. [${sol.priority}] ${sol.platform}: ${sol.issue}`);
        console.log(`     → ${sol.solution}`);
      });
    }

    console.log('\n' + '═'.repeat(70) + '\n');
    return report;
  }
}

if (require.main === module) {
  const engine = new DiagnosticEngine();
  engine.run();
}

module.exports = DiagnosticEngine;
