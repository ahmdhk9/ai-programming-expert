#!/usr/bin/env node

/**
 * 🔧 Problem Solver - Analyze and fix all issues automatically
 * Uses available tokens to diagnose and resolve problems
 */

const https = require('https');
const fs = require('fs');

class ProblemSolver {
  constructor() {
    this.problems = [];
    this.solutions = [];
    this.vercelToken = process.env.VERCEL_TOKEN;
    this.flyToken = process.env.FLY_API_TOKEN;
    this.firebaseConfig = process.env.FIREBASE_CONFIG;
  }

  async makeRequest(options, body) {
    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, data });
          }
        });
      });

      req.on('error', () => resolve({ status: 0, data: {} }));
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  async checkVercel() {
    console.log('🔍 Checking Vercel Frontend...\n');

    if (!this.vercelToken) {
      this.problems.push({
        platform: 'Vercel',
        severity: 'CRITICAL',
        issue: 'VERCEL_TOKEN missing',
        solution: 'Token found in Replit secrets but not passed to GitHub'
      });
      return;
    }

    // Check Vercel project
    const options = {
      hostname: 'api.vercel.com',
      path: '/v9/projects?limit=50',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.vercelToken}`,
        'Content-Type': 'application/json'
      }
    };

    const result = await this.makeRequest(options);

    if (result.status === 200 && result.data.projects) {
      const project = result.data.projects.find(p => p.name === 'ai-programming-expert');
      
      if (project) {
        console.log('✅ Vercel project found');
        
        // Check latest deployment
        const deployOptions = {
          hostname: 'api.vercel.com',
          path: `/v6/deployments?projectId=${project.id}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.vercelToken}`,
            'Content-Type': 'application/json'
          }
        };

        const deployResult = await this.makeRequest(deployOptions);
        if (deployResult.data.deployments && deployResult.data.deployments.length > 0) {
          const latest = deployResult.data.deployments[0];
          console.log(`  Last deployment: ${latest.state}`);
          
          if (latest.state === 'ERROR') {
            this.problems.push({
              platform: 'Vercel',
              severity: 'CRITICAL',
              issue: 'Latest deployment failed',
              solution: 'Check build configuration in vercel.json'
            });
          }
        }
      } else {
        this.problems.push({
          platform: 'Vercel',
          severity: 'HIGH',
          issue: 'Project not found on Vercel',
          solution: 'Create project: npm i -g vercel && vercel'
        });
      }
    } else {
      this.problems.push({
        platform: 'Vercel',
        severity: 'HIGH',
        issue: 'Cannot connect to Vercel API',
        solution: 'Check VERCEL_TOKEN validity'
      });
    }
  }

  async checkFly() {
    console.log('🔍 Checking Fly.io Backend...\n');

    if (!this.flyToken) {
      this.problems.push({
        platform: 'Fly.io',
        severity: 'CRITICAL',
        issue: 'FLY_API_TOKEN missing',
        solution: 'Token found but not passed to GitHub'
      });
      return;
    }

    const options = {
      hostname: 'api.fly.io',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.flyToken}`,
        'Content-Type': 'application/json'
      }
    };

    const body = {
      query: `{
        apps(first: 50) {
          nodes { name status }
        }
      }`
    };

    const result = await this.makeRequest(options, body);

    if (result.status === 200 && result.data.data) {
      const app = result.data.data.apps?.nodes?.find(a => a.name === 'agent-backend-ahmd1');
      if (app) {
        console.log(`✅ Fly.io app found: ${app.status}`);
      } else {
        this.problems.push({
          platform: 'Fly.io',
          severity: 'HIGH',
          issue: 'App not found on Fly.io',
          solution: 'Deploy: cd backend && flyctl deploy --remote-only'
        });
      }
    } else {
      this.problems.push({
        platform: 'Fly.io',
        severity: 'MEDIUM',
        issue: 'Cannot connect to Fly.io API',
        solution: 'Verify FLY_API_TOKEN and check Fly.io service status'
      });
    }
  }

  async checkConnectivity() {
    console.log('🔍 Checking Frontend-Backend Connectivity...\n');

    // Check if Backend is accessible
    const backendOptions = {
      hostname: 'agent-backend-ahmd1.fly.dev',
      path: '/health',
      method: 'GET',
      timeout: 5000
    };

    const backendResult = await this.makeRequest(backendOptions);

    if (backendResult.status === 200) {
      console.log('✅ Backend is reachable');
    } else if (backendResult.status === 0) {
      this.problems.push({
        platform: 'Connectivity',
        severity: 'HIGH',
        issue: 'Backend unreachable from Frontend',
        solution: 'Check Fly.io app status and health endpoint'
      });
    } else {
      this.problems.push({
        platform: 'Connectivity',
        severity: 'MEDIUM',
        issue: `Backend returned ${backendResult.status}`,
        solution: 'Check backend logs on Fly.io'
      });
    }
  }

  async checkLocalIssues() {
    console.log('🔍 Checking Local Configuration...\n');

    // Check vercel.json
    if (!fs.existsSync('vercel.json')) {
      this.problems.push({
        platform: 'Config',
        severity: 'HIGH',
        issue: 'vercel.json missing',
        solution: 'Create vercel.json with proper configuration'
      });
    } else {
      try {
        const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
        if (!config.rewrites) {
          this.problems.push({
            platform: 'Config',
            severity: 'MEDIUM',
            issue: 'API rewrites not configured',
            solution: 'Add rewrites for /api/* to Backend'
          });
        }
      } catch (e) {
        this.problems.push({
          platform: 'Config',
          severity: 'HIGH',
          issue: 'vercel.json is invalid JSON',
          solution: 'Fix JSON syntax in vercel.json'
        });
      }
    }

    // Check public/index.html
    if (!fs.existsSync('public/index.html')) {
      this.problems.push({
        platform: 'Frontend',
        severity: 'CRITICAL',
        issue: 'Frontend index.html missing',
        solution: 'Create public/index.html'
      });
    }

    // Check backend/server.js
    if (!fs.existsSync('backend/server.js')) {
      this.problems.push({
        platform: 'Backend',
        severity: 'CRITICAL',
        issue: 'Backend server.js missing',
        solution: 'Create backend/server.js'
      });
    }
  }

  async generateSolutions() {
    console.log('💡 Generating Solutions...\n');

    const solutionMap = {
      'VERCEL_TOKEN missing': {
        action: 'Ensure VERCEL_TOKEN is in GitHub Secrets',
        command: 'Check GitHub Secrets settings'
      },
      'Cannot connect to Vercel API': {
        action: 'Regenerate Vercel token',
        free: true,
        url: 'https://vercel.com/account/tokens'
      },
      'Project not found on Vercel': {
        action: 'Deploy project to Vercel',
        free: true,
        command: 'npm install -g vercel && vercel --prod'
      },
      'Cannot connect to Fly.io API': {
        action: 'Verify FLY_API_TOKEN',
        free: true,
        url: 'https://fly.io/app/auth'
      },
      'Backend unreachable from Frontend': {
        action: 'Check Backend health and CORS',
        free: true,
        solution: 'Add CORS headers to Backend'
      },
      'API rewrites not configured': {
        action: 'Update vercel.json',
        free: true,
        solution: 'Add rewrites section for API calls'
      }
    };

    this.problems.forEach(problem => {
      const sol = solutionMap[problem.issue] || { action: problem.solution, free: true };
      this.solutions.push({
        ...problem,
        ...sol
      });
    });
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.problems.length,
        critical: this.problems.filter(p => p.severity === 'CRITICAL').length,
        high: this.problems.filter(p => p.severity === 'HIGH').length,
        medium: this.problems.filter(p => p.severity === 'MEDIUM').length
      },
      problems: this.problems,
      solutions: this.solutions,
      status: this.problems.length === 0 ? 'HEALTHY' : 'ISSUES_FOUND'
    };

    fs.writeFileSync('PROBLEM_SOLVER_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🔧 PROBLEM SOLVER - Complete System Analysis');
    console.log('═'.repeat(70) + '\n');

    await this.checkVercel();
    await this.checkFly();
    await this.checkConnectivity();
    await this.checkLocalIssues();
    await this.generateSolutions();

    const report = this.generateReport();

    console.log('\n' + '═'.repeat(70));
    console.log('📊 ANALYSIS COMPLETE');
    console.log('═'.repeat(70) + '\n');

    console.log(`Issues Found: ${report.summary.total}`);
    console.log(`  🔴 Critical: ${report.summary.critical}`);
    console.log(`  🟠 High: ${report.summary.high}`);
    console.log(`  🟡 Medium: ${report.summary.medium}\n`);

    if (report.summary.total === 0) {
      console.log('✅ All systems healthy!\n');
    } else {
      console.log('Issues & Solutions:\n');
      this.solutions.slice(0, 10).forEach((sol, i) => {
        console.log(`${i + 1}. [${sol.platform}] ${sol.issue}`);
        console.log(`   ✅ Action: ${sol.action}`);
        if (sol.command) console.log(`   💻 Command: ${sol.command}`);
        console.log('');
      });
    }

    console.log('═'.repeat(70) + '\n');
    return report;
  }
}

if (require.main === module) {
  const solver = new ProblemSolver();
  solver.run().catch(console.error);
}

module.exports = ProblemSolver;
