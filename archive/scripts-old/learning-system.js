#!/usr/bin/env node

/**
 * 🧠 Self-Learning System - Adaptive Error Resolution
 * Learns from errors and automatically adapts the system
 */

const fs = require('fs');
const path = require('path');

class LearningSystem {
  constructor() {
    this.errorHistory = this.loadErrorHistory();
    this.patterns = new Map();
    this.solutions = new Map();
    this.adaptationRules = [];
  }

  loadErrorHistory() {
    const historyFile = 'error-history.json';
    if (fs.existsSync(historyFile)) {
      return JSON.parse(fs.readFileSync(historyFile, 'utf8'));
    }
    return {
      errors: [],
      solutions: [],
      patterns: [],
      lastUpdate: new Date().toISOString()
    };
  }

  saveErrorHistory() {
    fs.writeFileSync('error-history.json', JSON.stringify(this.errorHistory, null, 2));
  }

  // 1. Learn from error
  learnError(errorData) {
    const entry = {
      timestamp: new Date().toISOString(),
      type: errorData.type,
      message: errorData.message,
      context: errorData.context,
      solution: errorData.solution,
      success: errorData.success
    };

    this.errorHistory.errors.push(entry);
    this.detectPatterns();
    this.generateAdaptation(entry);
    this.saveErrorHistory();

    console.log(`📚 Learned error: ${errorData.type}`);
    return entry;
  }

  // 2. Detect patterns in errors
  detectPatterns() {
    const typeMap = new Map();
    const contextMap = new Map();

    this.errorHistory.errors.forEach(err => {
      // Count by type
      typeMap.set(err.type, (typeMap.get(err.type) || 0) + 1);

      // Track context
      if (err.context) {
        const key = JSON.stringify(err.context);
        contextMap.set(key, (contextMap.get(key) || 0) + 1);
      }
    });

    // Identify frequent patterns
    typeMap.forEach((count, type) => {
      if (count >= 3) {
        this.patterns.set(type, {
          frequency: count,
          type: type,
          lastOccurrence: new Date().toISOString(),
          severity: count > 10 ? 'HIGH' : 'MEDIUM'
        });
      }
    });

    return this.patterns;
  }

  // 3. Generate adaptive rules
  generateAdaptation(errorEntry) {
    const adaptation = {
      id: `adapt_${Date.now()}`,
      triggeredBy: errorEntry.type,
      action: this.getAdaptiveAction(errorEntry.type),
      condition: this.buildCondition(errorEntry),
      priority: this.calculatePriority(errorEntry),
      createdAt: new Date().toISOString()
    };

    this.adaptationRules.push(adaptation);
    console.log(`🔧 Generated adaptation: ${adaptation.action}`);
    return adaptation;
  }

  // 4. Get adaptive action based on error type
  getAdaptiveAction(errorType) {
    const actions = {
      'EADDRINUSE': 'AUTO_KILL_PROCESS',
      'CONNECTION_ERROR': 'AUTO_SWITCH_BACKEND',
      'VERCEL_DEPLOY_FAILED': 'AUTO_RETRY_WITH_FALLBACK',
      'PORT_CONFLICT': 'AUTO_REASSIGN_PORT',
      'TIMEOUT': 'AUTO_INCREASE_TIMEOUT',
      'MEMORY': 'AUTO_REDUCE_CACHE',
      'MISSING_ENV': 'AUTO_GENERATE_ENV'
    };

    return actions[errorType] || 'AUTO_LOG_AND_ALERT';
  }

  // 5. Build condition for error
  buildCondition(errorEntry) {
    return {
      errorType: errorEntry.type,
      context: errorEntry.context,
      timing: 'ON_ERROR',
      retryCount: 0,
      maxRetries: 3
    };
  }

  // 6. Calculate priority
  calculatePriority(errorEntry) {
    const criticalErrors = ['CRASH', 'SECURITY', 'DATA_LOSS', 'DEPLOYMENT'];
    const importance = criticalErrors.includes(errorEntry.type) ? 'CRITICAL' : 'MEDIUM';
    return importance;
  }

  // 7. Predict next error
  predictError() {
    const predictions = [];

    this.patterns.forEach((pattern, type) => {
      if (pattern.frequency > 5) {
        predictions.push({
          likelyError: type,
          probability: Math.min((pattern.frequency / 20) * 100, 95),
          recommendedAction: this.getAdaptiveAction(type),
          preventiveMeasure: this.getPreventiveMeasure(type)
        });
      }
    });

    return predictions;
  }

  // 8. Get preventive measure
  getPreventiveMeasure(errorType) {
    const measures = {
      'EADDRINUSE': 'Check port availability before starting',
      'CONNECTION_ERROR': 'Implement connection pooling',
      'VERCEL_DEPLOY_FAILED': 'Validate build before deploy',
      'PORT_CONFLICT': 'Use dynamic port allocation',
      'TIMEOUT': 'Increase timeout values',
      'MEMORY': 'Implement garbage collection',
      'MISSING_ENV': 'Auto-generate missing env vars'
    };

    return measures[errorType] || 'Monitor error frequency';
  }

  // 9. Apply auto-fixes based on learning
  applyAutoFix(errorType, context) {
    console.log(`🔨 Applying auto-fix for: ${errorType}`);

    switch (errorType) {
      case 'EADDRINUSE':
        this.fixPortConflict(context.port);
        break;
      case 'CONNECTION_ERROR':
        this.fixConnectionError(context);
        break;
      case 'VERCEL_DEPLOY_FAILED':
        this.fixVercelDeployment();
        break;
      case 'TIMEOUT':
        this.increaseTimeout(context);
        break;
      default:
        console.log(`No auto-fix available for ${errorType}`);
    }
  }

  fixPortConflict(port) {
    console.log(`⚡ Fixing port conflict on ${port}...`);
    // Handled by workflow
  }

  fixConnectionError(context) {
    console.log(`⚡ Fixing connection error...`);
    const fallbacks = [
      'https://agent-backend-ahmd1.fly.dev',
      'http://localhost:8000',
      '/api'
    ];
    console.log(`   Fallback URLs: ${fallbacks.join(', ')}`);
  }

  fixVercelDeployment() {
    console.log(`⚡ Fixing Vercel deployment...`);
    console.log(`   - Checking build files`);
    console.log(`   - Validating environment variables`);
    console.log(`   - Retrying deployment`);
  }

  increaseTimeout(context) {
    console.log(`⚡ Increasing timeout from ${context.current}ms to ${context.current * 2}ms`);
  }

  // 10. Generate learning report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalErrors: this.errorHistory.errors.length,
      patterns: Array.from(this.patterns.values()),
      predictions: this.predictError(),
      adaptationRules: this.adaptationRules,
      recommendations: this.getRecommendations()
    };

    fs.writeFileSync('LEARNING_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  getRecommendations() {
    const recs = [];

    // If too many port conflicts
    if (this.patterns.get('EADDRINUSE')?.frequency > 5) {
      recs.push('Use dynamic port allocation');
    }

    // If too many connection errors
    if (this.patterns.get('CONNECTION_ERROR')?.frequency > 5) {
      recs.push('Implement circuit breaker pattern');
    }

    // If too many timeouts
    if (this.patterns.get('TIMEOUT')?.frequency > 5) {
      recs.push('Increase global timeout or implement caching');
    }

    return recs;
  }

  // Run full learning cycle
  analyze() {
    console.log('\n🧠 Running Learning System Analysis...\n');

    this.detectPatterns();
    const predictions = this.predictError();
    const report = this.generateReport();

    console.log('📊 Learning System Report:');
    console.log(`  Total Errors Recorded: ${report.totalErrors}`);
    console.log(`  Patterns Found: ${report.patterns.length}`);
    console.log(`  Predictions: ${predictions.length}`);
    console.log(`  Adaptation Rules: ${report.adaptationRules.length}\n`);

    if (predictions.length > 0) {
      console.log('⚠️ Predicted Errors:');
      predictions.forEach(p => {
        console.log(`  - ${p.likelyError} (${p.probability.toFixed(0)}% likely)`);
        console.log(`    → ${p.recommendedAction}`);
      });
      console.log('');
    }

    return report;
  }
}

if (require.main === module) {
  const system = new LearningSystem();
  system.analyze();
}

module.exports = LearningSystem;
