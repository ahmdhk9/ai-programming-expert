#!/usr/bin/env node

/**
 * 🚀 Integrated System - Complete Automated Error Detection & Correction
 * Real-time synchronous execution with algorithm linking
 */

const ErrorDetector = require('./error-detector');
const AutoCorrector = require('./auto-corrector');
const AlgorithmLinker = require('./algorithm-linker');
const fs = require('fs');

class IntegratedSystem {
  constructor() {
    this.detector = new ErrorDetector();
    this.corrector = new AutoCorrector();
    this.linker = new AlgorithmLinker();
    this.timestamp = new Date().toISOString();
    this.executionLog = [];
  }

  // Log execution step
  log(phase, message, status = 'INFO') {
    const entry = { timestamp: new Date().toISOString(), phase, message, status };
    this.executionLog.push(entry);
    console.log(`[${phase}] ${message}`);
  }

  // Phase 1: Detection
  async phase1Detection() {
    this.log('DETECT', '🔍 Starting error detection...', 'START');
    
    const results = this.detector.detectAll();
    
    this.log('DETECT', `Found ${results.summary.totalErrors} errors`, results.summary.totalErrors === 0 ? 'SUCCESS' : 'WARNING');
    this.log('DETECT', `Found ${results.summary.totalWarnings} warnings`, 'WARNING');
    
    return results;
  }

  // Phase 2: Correction
  async phase2Correction(detectionResults) {
    if (detectionResults.summary.totalErrors === 0) {
      this.log('CORRECT', 'No errors to correct', 'SUCCESS');
      return { totalCorrections: 0 };
    }

    this.log('CORRECT', `🔧 Starting auto-correction...`, 'START');
    
    const results = this.corrector.correctAll();
    
    this.log('CORRECT', `Corrected ${results.totalCorrections} issues`, 'SUCCESS');
    
    return results;
  }

  // Phase 3: Algorithm Linking
  async phase3Linking() {
    this.log('LINK', `🔗 Starting algorithm linking...`, 'START');
    
    const results = this.linker.linkAll();
    
    this.log('LINK', `Linked ${results.summary.totalLinks} algorithms`, 'SUCCESS');
    this.log('LINK', `Consistency score: ${results.summary.consistencyScore}%`, 'SUCCESS');
    
    return results;
  }

  // Phase 4: Verification
  async phase4Verification() {
    this.log('VERIFY', `🔍 Starting verification...`, 'START');
    
    const results = this.detector.detectAll();
    
    if (results.summary.totalErrors === 0) {
      this.log('VERIFY', `All errors fixed!`, 'SUCCESS');
    } else {
      this.log('VERIFY', `Still ${results.summary.totalErrors} errors`, 'WARNING');
    }
    
    return results;
  }

  // Phase 5: Generate Reports
  async phase5Reporting(detection, correction, linking, verification) {
    this.log('REPORT', `📊 Generating reports...`, 'START');

    const report = {
      executedAt: this.timestamp,
      phases: {
        detection: {
          errors: detection.summary.totalErrors,
          warnings: detection.summary.totalWarnings,
          status: detection.summary.status
        },
        correction: {
          total: correction.totalCorrections,
          status: 'COMPLETED'
        },
        linking: {
          algorithms: linking.summary.totalAlgorithms,
          links: linking.summary.totalLinks,
          consistencyScore: linking.summary.consistencyScore
        },
        verification: {
          errors: verification.summary.totalErrors,
          warnings: verification.summary.totalWarnings,
          status: verification.summary.status
        }
      },
      executionLog: this.executionLog,
      finalStatus: verification.summary.totalErrors === 0 ? '✅ SUCCESS' : '⚠️ PARTIAL'
    };

    fs.writeFileSync('INTEGRATED_EXECUTION_REPORT.json', JSON.stringify(report, null, 2));
    this.log('REPORT', `Report saved to INTEGRATED_EXECUTION_REPORT.json`, 'SUCCESS');

    return report;
  }

  // Execute complete cycle
  async execute() {
    console.log('\n' + '═'.repeat(60));
    console.log('🚀 INTEGRATED SYSTEM - COMPLETE EXECUTION CYCLE');
    console.log('═'.repeat(60) + '\n');

    try {
      // Phase 1: Detect
      const detected = await this.phase1Detection();
      console.log('');

      // Phase 2: Correct
      const corrected = await this.phase2Correction(detected);
      console.log('');

      // Phase 3: Link
      const linked = await this.phase3Linking();
      console.log('');

      // Phase 4: Verify
      const verified = await this.phase4Verification();
      console.log('');

      // Phase 5: Report
      const report = await this.phase5Reporting(detected, corrected, linked, verified);

      // Final Summary
      console.log('═'.repeat(60));
      console.log('✅ INTEGRATED SYSTEM EXECUTION COMPLETE');
      console.log('═'.repeat(60));
      console.log('\n📊 FINAL REPORT:\n');
      console.log(`  🔍 Detection: ${detected.summary.totalErrors} errors, ${detected.summary.totalWarnings} warnings`);
      console.log(`  🔧 Corrections: ${corrected.totalCorrections} fixes applied`);
      console.log(`  🔗 Algorithms: ${linked.summary.totalAlgorithms} linked, ${linked.summary.consistencyScore}% consistent`);
      console.log(`  ✅ Verification: ${verified.summary.totalErrors} errors remaining\n`);
      console.log(`  🎯 Final Status: ${report.finalStatus}\n`);
      console.log('═'.repeat(60) + '\n');

      return {
        success: verified.summary.totalErrors === 0,
        report: report
      };
    } catch (err) {
      this.log('ERROR', `System error: ${err.message}`, 'FAILED');
      console.error('\n❌ System execution failed:', err.message);
      return { success: false, error: err.message };
    }
  }
}

// Run if called directly
if (require.main === module) {
  const system = new IntegratedSystem();
  system.execute().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = IntegratedSystem;
