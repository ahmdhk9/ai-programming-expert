#!/usr/bin/env node

/**
 * 🧠 Advanced Recovery Engine
 * Intelligent healing system with neural-like learning
 * Uses pattern recognition and predictive analytics
 */

const fs = require('fs');
const path = require('path');

class AdvancedRecovery {
  constructor() {
    this.failureHistory = [];
    this.recoveryStrategies = new Map();
    this.learningRate = 0.1; // How quickly system learns from failures
    this.maxHistorySize = 1000;
    this.configFile = path.join(__dirname, '../recovery-state.json');

    this.initializeStrategies();
  }

  initializeStrategies() {
    // Strategy: Restart Service
    this.recoveryStrategies.set('restart-service', {
      name: 'Restart Service',
      priority: 1,
      timeout: 5000,
      maxRetries: 3,
      successRate: 0.7,
      applicableTo: ['backend', 'socket-io', 'worker'],
    });

    // Strategy: Port Reset
    this.recoveryStrategies.set('port-reset', {
      name: 'Reset Port',
      priority: 2,
      timeout: 2000,
      maxRetries: 2,
      successRate: 0.85,
      applicableTo: ['port-conflict'],
    });

    // Strategy: Connection Retry
    this.recoveryStrategies.set('connection-retry', {
      name: 'Retry Connection',
      priority: 3,
      timeout: 3000,
      maxRetries: 5,
      successRate: 0.6,
      exponentialBackoff: true,
      applicableTo: ['timeout', 'connection-refused'],
    });

    // Strategy: Cache Clear
    this.recoveryStrategies.set('cache-clear', {
      name: 'Clear Cache',
      priority: 4,
      timeout: 1000,
      maxRetries: 1,
      successRate: 0.8,
      applicableTo: ['memory', 'disk-cache'],
    });

    // Strategy: Dependency Reinstall
    this.recoveryStrategies.set('deps-reinstall', {
      name: 'Reinstall Dependencies',
      priority: 5,
      timeout: 30000,
      maxRetries: 1,
      successRate: 0.75,
      applicableTo: ['module-not-found', 'version-mismatch'],
    });

    // Strategy: Configuration Reset
    this.recoveryStrategies.set('config-reset', {
      name: 'Reset Configuration',
      priority: 6,
      timeout: 2000,
      maxRetries: 1,
      successRate: 0.65,
      applicableTo: ['config-error', 'invalid-setup'],
    });
  }

  /**
   * Intelligent failure analysis
   * Categorizes failures for pattern matching
   */
  analyzeFailure(error) {
    const analysis = {
      timestamp: new Date().toISOString(),
      originalError: error.message,
      categories: [],
      severity: 'medium',
      pattern: null,
      frequency: 0,
    };

    const errorString = error.message.toLowerCase();

    // Pattern matching
    if (errorString.includes('eaddrinuse')) {
      analysis.categories.push('port-conflict');
      analysis.severity = 'high';
    }
    if (errorString.includes('econnrefused') || errorString.includes('timeout')) {
      analysis.categories.push('connection-refused');
      analysis.severity = 'high';
    }
    if (errorString.includes('module not found') || errorString.includes('cannot find')) {
      analysis.categories.push('module-not-found');
      analysis.severity = 'critical';
    }
    if (errorString.includes('enomem') || errorString.includes('memory')) {
      analysis.categories.push('memory');
      analysis.severity = 'critical';
    }
    if (errorString.includes('enospc')) {
      analysis.categories.push('disk-cache');
      analysis.severity = 'critical';
    }

    // Frequency analysis
    const recentSimilar = this.failureHistory.filter(
      f => f.categories.some(c => analysis.categories.includes(c))
    );
    analysis.frequency = recentSimilar.length;

    // Pattern identification
    if (analysis.frequency > 5) {
      analysis.pattern = 'recurring-issue';
    }

    return analysis;
  }

  /**
   * Intelligent recovery orchestration
   * Selects best recovery strategy
   */
  selectRecoveryStrategy(analysis) {
    const candidates = [];

    // Find applicable strategies
    for (const [key, strategy] of this.recoveryStrategies) {
      for (const category of analysis.categories) {
        if (strategy.applicableTo.includes(category)) {
          candidates.push({ key, strategy, match: category });
        }
      }
    }

    // Sort by effectiveness score
    candidates.sort((a, b) => {
      const scoreA = a.strategy.successRate * a.strategy.priority;
      const scoreB = b.strategy.successRate * b.strategy.priority;
      return scoreB - scoreA;
    });

    // Return best strategy
    return candidates.length > 0 ? candidates[0] : null;
  }

  /**
   * Neural-like learning from failures
   * Updates success rates based on outcomes
   */
  learnFromOutcome(strategy, success) {
    if (!this.recoveryStrategies.has(strategy)) return;

    const strat = this.recoveryStrategies.get(strategy);
    const delta = success ? this.learningRate : -this.learningRate * 0.5;
    strat.successRate = Math.max(0, Math.min(1, strat.successRate + delta));
  }

  /**
   * Predictive failure detection
   * Anticipates failures before they happen
   */
  predictFailures() {
    const patterns = {};

    // Analyze failure history
    for (const failure of this.failureHistory) {
      const key = failure.categories.join('|');
      patterns[key] = (patterns[key] || 0) + 1;
    }

    // Identify likely failures
    const predictions = Object.entries(patterns)
      .map(([category, count]) => ({
        category,
        likelihood: Math.min(100, count * 10), // 10% per occurrence
        recommendation: this.getRecommendation(category),
      }))
      .sort((a, b) => b.likelihood - a.likelihood);

    return predictions;
  }

  /**
   * Get prevention recommendations
   */
  getRecommendation(category) {
    const recommendations = {
      'port-conflict': '🔌 Monitor port availability and use dynamic port allocation',
      'connection-refused': '🔗 Ensure all services are properly started before connections',
      'module-not-found': '📦 Lock dependency versions and use CI for consistent installs',
      'memory': '💾 Implement memory pooling and garbage collection optimization',
      'disk-cache': '💿 Clean cache periodically and monitor disk usage',
    };

    return recommendations[category] || 'Review recent changes';
  }

  /**
   * Recovery strategy execution plan
   */
  generateRecoveryPlan(analysis) {
    const plan = {
      timestamp: new Date().toISOString(),
      analysis: analysis,
      strategies: [],
      estimatedTime: 0,
      successProbability: 0,
    };

    // Get primary strategy
    const primary = this.selectRecoveryStrategy(analysis);
    if (primary) {
      plan.strategies.push({
        step: 1,
        strategy: primary.key,
        name: primary.strategy.name,
        timeout: primary.strategy.timeout,
        retries: primary.strategy.maxRetries,
        successRate: primary.strategy.successRate,
      });

      plan.estimatedTime = primary.strategy.timeout * primary.strategy.maxRetries;
      plan.successProbability = primary.strategy.successRate;
    }

    // Add fallback strategies
    const fallbacks = Array.from(this.recoveryStrategies.values())
      .filter(s => s.priority > (primary?.strategy.priority || 0))
      .slice(0, 2);

    fallbacks.forEach((strategy, idx) => {
      plan.strategies.push({
        step: idx + 2,
        strategy: strategy.name.toLowerCase().replace(/\s+/g, '-'),
        name: strategy.name,
        timeout: strategy.timeout,
        retries: 1,
        fallback: true,
      });
    });

    return plan;
  }

  /**
   * Record failure for learning
   */
  recordFailure(error, recovered = false) {
    const analysis = this.analyzeFailure(error);
    analysis.recovered = recovered;

    this.failureHistory.push(analysis);

    // Maintain history size
    if (this.failureHistory.length > this.maxHistorySize) {
      this.failureHistory.shift();
    }

    this.saveState();
    return analysis;
  }

  /**
   * Save learning state
   */
  saveState() {
    const state = {
      timestamp: new Date().toISOString(),
      failureCount: this.failureHistory.length,
      strategies: Object.fromEntries(
        Array.from(this.recoveryStrategies.entries()).map(([key, strat]) => [
          key,
          {
            ...strat,
            successRate: strat.successRate,
          },
        ])
      ),
      predictions: this.predictFailures(),
    };

    fs.writeFileSync(this.configFile, JSON.stringify(state, null, 2));
  }

  /**
   * Generate comprehensive health report
   */
  generateHealthReport() {
    return {
      timestamp: new Date().toISOString(),
      totalFailures: this.failureHistory.length,
      recoveryRate:
        this.failureHistory.length > 0
          ? (this.failureHistory.filter(f => f.recovered).length / this.failureHistory.length) * 100
          : 100,
      predictions: this.predictFailures(),
      strategies: Array.from(this.recoveryStrategies.entries()).map(([key, strat]) => ({
        name: strat.name,
        successRate: `${(strat.successRate * 100).toFixed(1)}%`,
        priority: strat.priority,
      })),
    };
  }
}

// CLI Interface
if (require.main === module) {
  const recovery = new AdvancedRecovery();

  console.log('\n🧠 Advanced Recovery Engine\n' + '='.repeat(50));

  // Simulate some failures for testing
  const testErrors = [
    new Error('EADDRINUSE: address already in use 0.0.0.0:8000'),
    new Error('ECONNREFUSED: Connection refused on localhost:8000'),
    new Error('Cannot find module express'),
    new Error('Connection timeout after 10000ms'),
  ];

  testErrors.forEach(err => {
    const analysis = recovery.analyzeFailure(err);
    const plan = recovery.generateRecoveryPlan(analysis);

    console.log(`\n📋 Error: ${err.message.substring(0, 50)}...`);
    console.log(`   Category: ${analysis.categories.join(', ')}`);
    console.log(`   Severity: ${analysis.severity}`);
    console.log(`   Recovery Plan: ${plan.strategies[0]?.name || 'None available'}`);
  });

  // Health report
  const report = recovery.generateHealthReport();
  console.log('\n📊 Health Report:');
  console.log(`   Recovery Rate: ${report.recoveryRate.toFixed(1)}%`);
  console.log(`   Predictions: ${report.predictions.length} likely issues`);

  console.log('\n' + '='.repeat(50) + '\n');
}

module.exports = AdvancedRecovery;
