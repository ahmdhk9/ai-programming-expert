#!/usr/bin/env node

/**
 * 🔄 Compatibility Engine
 * Intelligent system for detecting and resolving compatibility issues
 * Uses machine learning-like pattern recognition
 */

const fs = require('fs');
const path = require('path');

class CompatibilityEngine {
  constructor() {
    this.compatibilityMatrix = {
      'node': {
        minVersion: '16.0.0',
        maxVersion: '22.0.0',
        requiredModules: ['npm'],
      },
      'npm': {
        minVersion: '7.0.0',
        maxVersion: '11.0.0',
      },
      'vercel': {
        compatible: ['nodejs', 'static'],
        nodeVersion: '20',
      },
      'firebase': {
        compatible: ['static', 'nodejs'],
        restrictions: ['realtime-database', 'functions'],
      },
      'flyio': {
        compatible: ['nodejs', 'docker'],
        minMemory: '256MB',
        regions: ['iad', 'lax', 'ord', 'dca', 'ams', 'sin'],
      },
      'replit': {
        compatible: ['nodejs', 'python', 'go', 'rust'],
        maxDisk: '5GB',
      },
    };

    this.issuePatterns = [
      {
        pattern: /EADDRINUSE/,
        name: 'Port Already in Use',
        severity: 'high',
        resolution: 'Use next available port or kill process',
      },
      {
        pattern: /ECONNREFUSED/,
        name: 'Connection Refused',
        severity: 'medium',
        resolution: 'Ensure backend is running and accessible',
      },
      {
        pattern: /ETIMEDOUT/,
        name: 'Connection Timeout',
        severity: 'high',
        resolution: 'Increase timeout or check network connectivity',
      },
      {
        pattern: /MODULE_NOT_FOUND/,
        name: 'Missing Module',
        severity: 'critical',
        resolution: 'Run npm install to install dependencies',
      },
      {
        pattern: /INSUFFICIENT_DISK_SPACE/,
        name: 'Disk Space Low',
        severity: 'critical',
        resolution: 'Clear cache or increase storage',
      },
      {
        pattern: /MEMORY_EXCEEDED/,
        name: 'Out of Memory',
        severity: 'critical',
        resolution: 'Optimize code or upgrade instance',
      },
    ];

    this.versionMap = {};
    this.issueLog = [];
  }

  /**
   * Detect version compatibility
   * Semantic versioning analysis
   */
  parseVersion(version) {
    const match = version.match(/(\d+)\.(\d+)\.(\d+)/);
    if (!match) return null;
    return {
      major: parseInt(match[1]),
      minor: parseInt(match[2]),
      patch: parseInt(match[3]),
    };
  }

  compareVersions(v1, v2) {
    if (v1.major !== v2.major) return v1.major - v2.major;
    if (v1.minor !== v2.minor) return v1.minor - v2.minor;
    return v1.patch - v2.patch;
  }

  isVersionCompatible(version, minVersion, maxVersion) {
    const v = this.parseVersion(version);
    const min = this.parseVersion(minVersion);
    const max = this.parseVersion(maxVersion);

    if (!v || !min || !max) return true; // Assume compatible if can't parse

    return this.compareVersions(v, min) >= 0 && this.compareVersions(v, max) <= 0;
  }

  /**
   * Detect compatibility issues
   */
  async detectIssues(errorMessage) {
    const detected = [];

    for (const issue of this.issuePatterns) {
      if (issue.pattern.test(errorMessage)) {
        detected.push({
          issue: issue.name,
          severity: issue.severity,
          resolution: issue.resolution,
          timestamp: new Date().toISOString(),
        });
      }
    }

    this.issueLog.push(...detected);
    return detected;
  }

  /**
   * Platform compatibility check
   */
  checkPlatformCompatibility(platform, config) {
    const platformConfig = this.compatibilityMatrix[platform];
    if (!platformConfig) return { compatible: false, reason: `Unknown platform: ${platform}` };

    const issues = [];

    // Check if deployment type is compatible
    if (platformConfig.compatible && !platformConfig.compatible.includes(config.type)) {
      issues.push(`Platform only supports: ${platformConfig.compatible.join(', ')}`);
    }

    // Check version requirements
    if (platformConfig.minVersion && config.version) {
      if (
        !this.isVersionCompatible(config.version, platformConfig.minVersion, '999.0.0')
      ) {
        issues.push(`Requires version >= ${platformConfig.minVersion}`);
      }
    }

    // Check resource requirements
    if (platformConfig.minMemory && config.memory) {
      if (parseInt(config.memory) < parseInt(platformConfig.minMemory)) {
        issues.push(`Requires at least ${platformConfig.minMemory} memory`);
      }
    }

    return {
      compatible: issues.length === 0,
      issues,
      platform,
    };
  }

  /**
   * Auto-resolution algorithm
   * Suggests and applies fixes
   */
  async autoResolve(issue) {
    const resolutions = [];

    // Generic fixes based on pattern
    if (issue.pattern === 'EADDRINUSE') {
      resolutions.push({
        strategy: 'try-next-port',
        action: 'Increment port number',
        priority: 1,
      });
      resolutions.push({
        strategy: 'kill-process',
        action: 'Kill existing process on port',
        priority: 2,
      });
    }

    if (issue.pattern === 'MODULE_NOT_FOUND') {
      resolutions.push({
        strategy: 'npm-install',
        action: 'Run npm install',
        priority: 1,
      });
      resolutions.push({
        strategy: 'npm-ci',
        action: 'Run npm ci for clean install',
        priority: 2,
      });
    }

    return resolutions;
  }

  /**
   * Compatibility score
   * Rate system compatibility (0-100)
   */
  calculateCompatibilityScore(system) {
    let score = 100;

    // Check versions
    if (!system.nodeVersion || !this.isVersionCompatible(system.nodeVersion, '16.0.0', '22.0.0')) {
      score -= 20;
    }

    // Check dependencies
    if (!system.allDependenciesInstalled) {
      score -= 25;
    }

    // Check platforms
    const platforms = ['vercel', 'firebase', 'flyio'];
    let incompatibleCount = 0;
    for (const platform of platforms) {
      const result = this.checkPlatformCompatibility(platform, system);
      if (!result.compatible) {
        incompatibleCount++;
      }
    }
    score -= incompatibleCount * 10;

    // Check ports
    if (system.portConflicts) {
      score -= Math.min(system.portConflicts.length * 5, 30);
    }

    return Math.max(score, 0);
  }

  /**
   * Generate compatibility report
   */
  generateReport(system) {
    const report = {
      timestamp: new Date().toISOString(),
      compatibilityScore: this.calculateCompatibilityScore(system),
      systemInfo: system,
      issues: this.issueLog.slice(-10), // Last 10 issues
      recommendations: [],
    };

    if (report.compatibilityScore < 70) {
      report.recommendations.push('⚠️ System compatibility is below recommended threshold');
      report.recommendations.push('🔧 Run automated compatibility fixes');
    }

    if (this.issueLog.length > 0) {
      report.recommendations.push(`📊 ${this.issueLog.length} issues detected recently`);
    }

    return report;
  }
}

// CLI Interface
if (require.main === module) {
  const engine = new CompatibilityEngine();

  console.log('\n🔄 Compatibility Engine\n' + '='.repeat(50));

  // Test system
  const testSystem = {
    nodeVersion: '20.10.0',
    npmVersion: '10.0.0',
    allDependenciesInstalled: true,
    type: 'nodejs',
    version: '20.10.0',
    memory: '512MB',
    portConflicts: [],
  };

  // Check platforms
  console.log('\n✅ Platform Compatibility Check:');
  ['vercel', 'firebase', 'flyio', 'replit'].forEach(platform => {
    const result = engine.checkPlatformCompatibility(platform, testSystem);
    const icon = result.compatible ? '✅' : '❌';
    console.log(`${icon} ${platform}: ${result.compatible ? 'Compatible' : result.issues.join(', ')}`);
  });

  // Generate report
  const report = engine.generateReport(testSystem);
  console.log(`\n📊 Compatibility Score: ${report.compatibilityScore}/100`);

  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach(r => console.log(`   ${r}`));
  }

  console.log('\n' + '='.repeat(50) + '\n');
}

module.exports = CompatibilityEngine;
