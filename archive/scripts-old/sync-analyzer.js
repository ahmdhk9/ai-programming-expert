#!/usr/bin/env node

/**
 * 🔍 Sync Analyzer - Complete Sync Analysis System
 * Combines all sync engines into one unified system
 */

const GitSyncEngine = require('./git-sync-engine');
const DiffTracker = require('./diff-tracker');
const UserDisplayEngine = require('./user-display-engine');
const fs = require('fs');

class SyncAnalyzer {
  constructor() {
    this.gitSync = new GitSyncEngine();
    this.diffTracker = new DiffTracker();
    this.displayEngine = new UserDisplayEngine();
  }

  async run() {
    console.log('\n' + '═'.repeat(70));
    console.log('🔍 SYNC ANALYZER - Complete GitHub vs Platforms Analysis');
    console.log('═'.repeat(70) + '\n');

    // Phase 1: Git Sync
    console.log('📍 Phase 1: Analyzing Git vs Deployed Code\n');
    const gitReport = this.gitSync.run();
    console.log('');

    // Phase 2: Diff Tracking
    console.log('📍 Phase 2: Tracking Code and UI Differences\n');
    const diffReport = this.diffTracker.run();
    console.log('');

    // Phase 3: User Display
    console.log('📍 Phase 3: Generating User-Specific Views\n');
    const displayReport = this.displayEngine.run();
    console.log('');

    // Generate unified analysis
    const analysis = this.generateUnifiedAnalysis(gitReport, diffReport, displayReport);

    console.log('═'.repeat(70));
    console.log('🎯 UNIFIED SYNC ANALYSIS');
    console.log('═'.repeat(70) + '\n');

    console.log('Summary:\n');
    console.log(`GitHub Files: ${analysis.gitHub.totalFiles}`);
    console.log(`Code Changes: ${analysis.changes.codeChanges} new, ${analysis.changes.uiChanges} UI`);
    console.log(`Differences: ${analysis.differences.total} (${analysis.differences.critical} critical)`);
    console.log(`Deployment: ${analysis.deployment.synced ? '✅ SYNCED' : '⚠️ OUT OF SYNC'}\n`);

    console.log('What\'s in GitHub but not deployed:');
    if (analysis.notDeployed.length === 0) {
      console.log('  ✅ Everything deployed!\n');
    } else {
      analysis.notDeployed.slice(0, 5).forEach(item => {
        console.log(`  ❌ ${item.file} (on ${item.platform})`);
      });
    }

    console.log('\nUser View Examples:\n');
    console.log('End User sees:');
    const endUserView = this.displayEngine.getDisplayContent('endUser');
    console.log(`  ✅ ${endUserView.visibleData.userFriendlyMessages[0]}`);
    console.log(`  ✅ ${endUserView.visibleData.userFriendlyMessages[1]}\n`);

    console.log('Developer sees:');
    const devView = this.displayEngine.getDisplayContent('developer');
    console.log(`  ✅ ${devView.visibleData.userFriendlyMessages[0]}`);
    console.log(`  ✅ Code changes tracking`);
    console.log(`  ✅ Detailed error logs\n`);

    console.log('═'.repeat(70) + '\n');
  }

  generateUnifiedAnalysis(gitReport, diffReport, displayReport) {
    const notDeployed = gitReport.differences.filter(d => 
      d.type === 'MISSING_FILE' && d.inGitHub && !d.inPlatform
    );

    return {
      timestamp: new Date().toISOString(),
      gitHub: {
        totalFiles: gitReport.github.totalFiles,
        lastUpdated: gitReport.github.lastUpdated
      },
      changes: {
        codeChanges: diffReport.codeChanges.new,
        uiChanges: diffReport.uiChanges.updated,
        totalChanges: diffReport.codeChanges.total + diffReport.uiChanges.total
      },
      differences: {
        total: gitReport.summary.totalDifferences,
        critical: gitReport.summary.critical,
        medium: gitReport.summary.medium,
        low: gitReport.summary.low
      },
      deployment: {
        synced: notDeployed.length === 0,
        notDeployed: notDeployed.length
      },
      notDeployed: notDeployed,
      userViews: displayReport.userTypes
    };
  }
}

if (require.main === module) {
  const analyzer = new SyncAnalyzer();
  analyzer.run().catch(console.error);
}

module.exports = SyncAnalyzer;
