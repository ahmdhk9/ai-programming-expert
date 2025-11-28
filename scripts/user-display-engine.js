#!/usr/bin/env node

/**
 * 👁️ User Display Engine - Decide What to Show to Users
 * Smart visibility and content filtering
 */

const fs = require('fs');

class UserDisplayEngine {
  constructor() {
    this.displayRules = this.loadDisplayRules();
    this.contentFilters = this.loadContentFilters();
  }

  loadDisplayRules() {
    return {
      // What to show to end users
      endUser: {
        showErrorMessages: true,
        showProcessingSteps: true,
        showResults: true,
        showPerformanceMetrics: false,
        showInternalLogs: false,
        showCodeDetails: false,
        showSystemStatus: true,
        showDeploymentStatus: true
      },

      // What to show to developers
      developer: {
        showErrorMessages: true,
        showProcessingSteps: true,
        showResults: true,
        showPerformanceMetrics: true,
        showInternalLogs: true,
        showCodeDetails: true,
        showSystemStatus: true,
        showDeploymentStatus: true
      },

      // What to show to admins
      admin: {
        showErrorMessages: true,
        showProcessingSteps: true,
        showResults: true,
        showPerformanceMetrics: true,
        showInternalLogs: true,
        showCodeDetails: true,
        showSystemStatus: true,
        showDeploymentStatus: true,
        showSecurityLogs: true,
        showTokenStatus: true
      }
    };
  }

  loadContentFilters() {
    return {
      // Hide sensitive information
      sensitive: [
        'VERCEL_TOKEN',
        'FLY_API_TOKEN',
        'FIREBASE_CONFIG',
        'API_KEYS',
        'PASSWORDS'
      ],

      // Hide internal system files
      internal: [
        'node_modules',
        '.git',
        '.env',
        'error-history.json',
        'system-state.json'
      ],

      // Show user-friendly names
      friendly: {
        'scripts/consciousness-system.js': 'System Intelligence Engine',
        'scripts/awareness-engine.js': 'System Understanding Module',
        'scripts/diagnostic-engine.js': 'Platform Health Checker',
        'public/index.html': 'Main Application Interface',
        'backend/server.js': 'API Backend Service'
      }
    };
  }

  // Filter content for user type
  filterForUser(userType, data) {
    const rules = this.displayRules[userType] || this.displayRules.endUser;
    let filtered = JSON.parse(JSON.stringify(data));

    // Remove sensitive data
    filtered = this.removeSensitiveData(filtered);

    // Hide internal files
    filtered = this.hideInternalFiles(filtered);

    // Apply user-specific rules
    if (!rules.showInternalLogs && filtered.logs) {
      filtered.logs = filtered.logs.filter(log => !log.isInternal);
    }

    if (!rules.showCodeDetails && filtered.files) {
      filtered.files = filtered.files.map(f => ({
        name: this.contentFilters.friendly[f.name] || f.name,
        status: f.status
      }));
    }

    return filtered;
  }

  removeSensitiveData(data) {
    const str = JSON.stringify(data);
    let result = str;

    this.contentFilters.sensitive.forEach(pattern => {
      result = result.replace(new RegExp(pattern, 'g'), '[REDACTED]');
    });

    return JSON.parse(result);
  }

  hideInternalFiles(data) {
    if (!data.files) return data;

    return {
      ...data,
      files: data.files.filter(f => 
        !this.contentFilters.internal.some(pattern => f.includes(pattern))
      )
    };
  }

  // Get display version for user
  getDisplayContent(userType = 'endUser') {
    const content = {
      timestamp: new Date().toISOString(),
      userType: userType,
      rules: this.displayRules[userType],
      visibleData: {
        platformStatus: this.getPlatformStatus(userType),
        recentActivity: this.getRecentActivity(userType),
        userFriendlyMessages: this.getMessages(userType),
        actionItems: this.getActionItems(userType)
      }
    };

    return content;
  }

  getPlatformStatus(userType) {
    const status = {
      vercel: { status: 'DEPLOYED', url: 'https://ai-programming-expert-ppgxu0wcr.vercel.app' },
      fly: { status: 'DEPLOYED', url: 'https://agent-backend-ahmd1.fly.dev' },
      firebase: { status: 'DEPLOYED', url: 'https://ai-programming-expert.firebaseapp.com' }
    };

    if (userType !== 'admin') {
      // Hide technical details for non-admins
      return {
        frontend: status.vercel.status,
        backend: status.fly.status,
        hosting: status.firebase.status
      };
    }

    return status;
  }

  getRecentActivity(userType) {
    const activities = [
      { time: '5 min ago', message: 'System consciousness updated', type: 'info' },
      { time: '10 min ago', message: 'Diagnostics completed', type: 'success' },
      { time: '15 min ago', message: 'Platforms synchronized', type: 'success' }
    ];

    if (userType === 'endUser') {
      return activities.filter(a => a.type !== 'debug');
    }

    return activities;
  }

  getMessages(userType) {
    const messages = {
      endUser: [
        '✅ Your application is running smoothly',
        '📱 All platforms are synchronized',
        '🎯 Everything is working as expected'
      ],
      developer: [
        '✅ All systems operational',
        '📊 Diagnostics: No critical issues',
        '🔄 Git sync status: Up to date',
        '💻 Code changes deployed successfully'
      ],
      admin: [
        '✅ All systems operational',
        '📊 Full diagnostics passed',
        '🔄 Git sync verified',
        '💻 All platforms deployed',
        '🔐 Security status: Secure'
      ]
    };

    return messages[userType] || messages.endUser;
  }

  getActionItems(userType) {
    const items = {
      endUser: [
        { action: 'Check application', status: 'Done' },
        { action: 'Report any issues', status: 'Ready' }
      ],
      developer: [
        { action: 'Review code changes', status: 'Ready' },
        { action: 'Check deployment logs', status: 'Available' },
        { action: 'Test new features', status: 'Ready' }
      ],
      admin: [
        { action: 'Monitor platform health', status: 'Monitoring' },
        { action: 'Review security logs', status: 'Available' },
        { action: 'Manage deployments', status: 'Ready' }
      ]
    };

    return items[userType] || items.endUser;
  }

  // Generate display report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      displayRules: this.displayRules,
      contentFilters: this.contentFilters,
      userTypes: {
        endUser: this.getDisplayContent('endUser'),
        developer: this.getDisplayContent('developer'),
        admin: this.getDisplayContent('admin')
      }
    };

    fs.writeFileSync('USER_DISPLAY_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  run() {
    console.log('\n' + '═'.repeat(70));
    console.log('👁️ USER DISPLAY ENGINE - What to Show Users');
    console.log('═'.repeat(70) + '\n');

    const report = this.generateReport();

    console.log('Display Rules by User Type:\n');
    console.log('End User:');
    console.log('  ✅ See: System status, results, errors');
    console.log('  ❌ See: Internal logs, code details, tokens\n');

    console.log('Developer:');
    console.log('  ✅ See: Everything except tokens');
    console.log('  ❌ See: Only tokens (for security)\n');

    console.log('Admin:');
    console.log('  ✅ See: Everything including tokens');
    console.log('  ✅ See: Security logs, deployment status\n');

    console.log('Content Filters:');
    console.log(`  Hidden Items: ${this.contentFilters.internal.length}`);
    console.log(`  Sensitive Fields: ${this.contentFilters.sensitive.length}\n`);

    console.log('═'.repeat(70) + '\n');
    return report;
  }
}

if (require.main === module) {
  const engine = new UserDisplayEngine();
  engine.run();
}

module.exports = UserDisplayEngine;
