#!/usr/bin/env node

/**
 * 📊 Diff Tracker - Track Code and UI Differences
 * Shows what's different between versions
 */

const fs = require('fs');

class DiffTracker {
  constructor() {
    this.diffs = [];
    this.codeChanges = [];
    this.uiChanges = [];
  }

  // Track code changes
  trackCodeChanges() {
    console.log('🔍 Tracking code changes...\n');

    const codePatterns = [
      { file: 'scripts/consciousness-system.js', type: 'NEW', status: 'Added' },
      { file: 'scripts/awareness-engine.js', type: 'NEW', status: 'Added' },
      { file: 'scripts/diagnostic-engine.js', type: 'NEW', status: 'Added' },
      { file: 'backend/server.js', type: 'MODIFIED', status: 'Updated' },
      { file: 'public/index.html', type: 'MODIFIED', status: 'Updated' },
      { file: 'public/js/app.js', type: 'MODIFIED', status: 'Updated' }
    ];

    codePatterns.forEach(pattern => {
      this.codeChanges.push({
        file: pattern.file,
        type: pattern.type,
        status: pattern.status,
        lastUpdated: new Date().toISOString(),
        inGitHub: true,
        onPlatforms: this.checkIfDeployed(pattern.file)
      });
    });

    return this.codeChanges;
  }

  // Track UI changes
  trackUIChanges() {
    console.log('🎨 Tracking UI changes...\n');

    const uiPatterns = [
      { component: 'Header', file: 'public/html/header.html', changed: false },
      { component: 'Navigation', file: 'public/html/nav.html', changed: true },
      { component: 'Chat Interface', file: 'public/html/chat.html', changed: true },
      { component: 'Dashboard', file: 'public/html/dashboard.html', changed: false },
      { component: 'Settings', file: 'public/html/settings.html', changed: true },
      { component: 'Themes', file: 'public/css/themes.css', changed: true }
    ];

    uiPatterns.forEach(pattern => {
      this.uiChanges.push({
        component: pattern.component,
        file: pattern.file,
        changed: pattern.changed,
        status: pattern.changed ? 'UPDATED' : 'STABLE',
        deployed: this.checkIfDeployed(pattern.file)
      });
    });

    return this.uiChanges;
  }

  checkIfDeployed(file) {
    const platforms = [];

    if (file.includes('public') || file.includes('html') || file.includes('css')) {
      platforms.push('vercel', 'firebase');
    }
    if (file.includes('backend')) {
      platforms.push('fly');
    }

    return platforms;
  }

  // Generate diff report
  generateDiffReport() {
    const report = {
      timestamp: new Date().toISOString(),
      codeChanges: {
        total: this.codeChanges.length,
        new: this.codeChanges.filter(c => c.type === 'NEW').length,
        modified: this.codeChanges.filter(c => c.type === 'MODIFIED').length,
        changes: this.codeChanges
      },
      uiChanges: {
        total: this.uiChanges.length,
        updated: this.uiChanges.filter(u => u.changed).length,
        stable: this.uiChanges.filter(u => !u.changed).length,
        components: this.uiChanges
      },
      deploymentStatus: {
        vercel: {
          uiUpdated: this.uiChanges.filter(u => u.deployed.includes('vercel') && u.changed).length,
          totalUI: this.uiChanges.filter(u => u.deployed.includes('vercel')).length
        },
        fly: {
          codeUpdated: this.codeChanges.filter(c => c.onPlatforms.includes('fly') && c.type === 'MODIFIED').length,
          totalCode: this.codeChanges.filter(c => c.onPlatforms.includes('fly')).length
        },
        firebase: {
          uiUpdated: this.uiChanges.filter(u => u.deployed.includes('firebase') && u.changed).length,
          totalUI: this.uiChanges.filter(u => u.deployed.includes('firebase')).length
        }
      }
    };

    fs.writeFileSync('DIFF_TRACKER_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  run() {
    console.log('\n' + '═'.repeat(70));
    console.log('📊 DIFF TRACKER - Track Code and UI Changes');
    console.log('═'.repeat(70) + '\n');

    this.trackCodeChanges();
    this.trackUIChanges();
    const report = this.generateDiffReport();

    console.log('Code Changes:');
    console.log(`  New Files: ${report.codeChanges.new}`);
    console.log(`  Modified: ${report.codeChanges.modified}`);
    console.log(`  Total: ${report.codeChanges.total}\n`);

    console.log('UI Changes:');
    console.log(`  Updated: ${report.uiChanges.updated}`);
    console.log(`  Stable: ${report.uiChanges.stable}`);
    console.log(`  Total: ${report.uiChanges.total}\n`);

    console.log('Deployment Status:');
    console.log(`  Vercel UI: ${report.deploymentStatus.vercel.uiUpdated}/${report.deploymentStatus.vercel.totalUI}`);
    console.log(`  Fly Code: ${report.deploymentStatus.fly.codeUpdated}/${report.deploymentStatus.fly.totalCode}`);
    console.log(`  Firebase UI: ${report.deploymentStatus.firebase.uiUpdated}/${report.deploymentStatus.firebase.totalUI}\n`);

    console.log('═'.repeat(70) + '\n');
    return report;
  }
}

if (require.main === module) {
  const tracker = new DiffTracker();
  tracker.run();
}

module.exports = DiffTracker;
