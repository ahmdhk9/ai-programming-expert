#!/usr/bin/env node

/**
 * 🔗 Algorithm Linker System - Interconnection Engine
 * Dynamically links algorithms and ensures consistency
 */

const fs = require('fs');
const path = require('path');

class AlgorithmLinker {
  constructor() {
    this.algorithms = new Map();
    this.dependencies = new Map();
    this.links = [];
    this.consistencyReport = [];
  }

  // 1. Scan and register algorithms
  scanAlgorithms() {
    console.log('🔍 Scanning for algorithms...\n');

    const algorithmPatterns = [
      { name: 'ConfigEngine', file: 'public/js/config-engine.js', type: 'DETECTION' },
      { name: 'ErrorDetector', file: 'scripts/error-detector.js', type: 'DETECTION' },
      { name: 'AutoCorrector', file: 'scripts/auto-corrector.js', type: 'CORRECTION' },
      { name: 'AlgorithmLinker', file: 'scripts/algorithm-linker.js', type: 'LINKING' }
    ];

    algorithmPatterns.forEach(pattern => {
      if (fs.existsSync(pattern.file)) {
        this.algorithms.set(pattern.name, {
          name: pattern.name,
          file: pattern.file,
          type: pattern.type,
          exists: true,
          timestamp: fs.statSync(pattern.file).mtime
        });
      }
    });

    console.log(`✅ Found ${this.algorithms.size} algorithms\n`);
    return this.algorithms;
  }

  // 2. Analyze dependencies between algorithms
  analyzeDependencies() {
    console.log('🔗 Analyzing algorithm dependencies...\n');

    this.algorithms.forEach((algo, name) => {
      if (!algo.exists) return;

      try {
        const content = fs.readFileSync(algo.file, 'utf8');
        const deps = [];

        // Check for require statements
        const requireMatches = content.match(/require\(['"]([^'"]+)['"]\)/g) || [];
        requireMatches.forEach(req => {
          const moduleName = req.match(/['"]([^'"]+)['"]/)[1];
          if (this.algorithms.has(moduleName) || moduleName.includes('./')) {
            deps.push(moduleName);
          }
        });

        this.dependencies.set(name, deps);
      } catch (err) {
        console.error(`Error analyzing ${name}: ${err.message}`);
      }
    });

    console.log(`✅ Dependency analysis complete\n`);
    return this.dependencies;
  }

  // 3. Create algorithm links
  createLinks() {
    console.log('🔗 Creating algorithm links...\n');

    // Define algorithm relationships
    const relationships = [
      { from: 'ConfigEngine', to: 'ErrorDetector', relation: 'FEEDS' },
      { from: 'ErrorDetector', to: 'AutoCorrector', relation: 'TRIGGERS' },
      { from: 'AutoCorrector', to: 'AlgorithmLinker', relation: 'UPDATES' },
      { from: 'AlgorithmLinker', to: 'ConfigEngine', relation: 'VALIDATES' }
    ];

    relationships.forEach(rel => {
      const fromAlgo = this.algorithms.get(rel.from);
      const toAlgo = this.algorithms.get(rel.to);

      if (fromAlgo && toAlgo) {
        this.links.push({
          from: rel.from,
          to: rel.to,
          relation: rel.relation,
          status: 'ACTIVE',
          timestamp: new Date().toISOString()
        });

        console.log(`  ✅ ${rel.from} --[${rel.relation}]--> ${rel.to}`);
      }
    });

    console.log(`\n✅ Created ${this.links.length} algorithm links\n`);
    return this.links;
  }

  // 4. Verify algorithm consistency
  verifyConsistency() {
    console.log('🔍 Verifying algorithm consistency...\n');

    this.algorithms.forEach((algo, name) => {
      if (!algo.exists) return;

      try {
        const content = fs.readFileSync(algo.file, 'utf8');
        const checks = {
          hasExports: /module\.exports|exports\./g.test(content),
          hasDocumentation: /^\/\/|^\/\*/m.test(content),
          hasErrorHandling: /try|catch|throw|Promise/g.test(content),
          hasTimestamp: /timestamp|Date|toISOString/g.test(content)
        };

        const consistency = {
          algorithm: name,
          checks: checks,
          passed: Object.values(checks).filter(v => v).length,
          total: Object.keys(checks).length
        };

        this.consistencyReport.push(consistency);

        const status = consistency.passed === consistency.total ? '✅' : '⚠️';
        console.log(`  ${status} ${name}: ${consistency.passed}/${consistency.total} checks passed`);
      } catch (err) {
        console.error(`  ❌ ${name}: ${err.message}`);
      }
    });

    console.log('');
    return this.consistencyReport;
  }

  // 5. Generate integration code
  generateIntegration() {
    console.log('📝 Generating integration code...\n');

    const integrationCode = `
// ===== ALGORITHM INTEGRATION =====
// Auto-generated: ${new Date().toISOString()}

const ErrorDetector = require('./error-detector');
const AutoCorrector = require('./auto-corrector');

class IntegratedSystem {
  constructor() {
    this.detector = new ErrorDetector();
    this.corrector = new AutoCorrector();
    this.timestamp = new Date().toISOString();
  }

  // Execute complete cycle
  async execute() {
    try {
      // 1. Detect errors
      const detected = this.detector.detectAll();
      console.log(\`🔍 Detected: \${detected.summary.totalErrors} errors, \${detected.summary.totalWarnings} warnings\`);

      // 2. Auto-correct
      const corrected = this.corrector.correctAll();
      console.log(\`✅ Corrected: \${corrected.totalCorrections} issues\`);

      // 3. Verify
      const redetected = this.detector.detectAll();
      console.log(\`🔍 Verification: \${redetected.summary.totalErrors} errors remaining\`);

      return {
        status: redetected.summary.totalErrors === 0 ? 'SUCCESS' : 'PARTIAL',
        before: detected,
        corrections: corrected,
        after: redetected
      };
    } catch (err) {
      console.error(\`❌ Integration error: \${err.message}\`);
      throw err;
    }
  }
}

module.exports = IntegratedSystem;
`;

    fs.writeFileSync('scripts/integrated-system.js', integrationCode);
    console.log('✅ Integration code generated\n');
    return integrationCode;
  }

  // 6. Create linking report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      algorithms: Array.from(this.algorithms.values()),
      dependencies: Object.fromEntries(this.dependencies),
      links: this.links,
      consistency: this.consistencyReport,
      summary: {
        totalAlgorithms: this.algorithms.size,
        totalLinks: this.links.length,
        consistencyScore: this.calculateConsistencyScore(),
        status: 'LINKED'
      }
    };

    fs.writeFileSync('ALGORITHM_LINKING_REPORT.json', JSON.stringify(report, null, 2));
    console.log('📊 Report saved: ALGORITHM_LINKING_REPORT.json\n');
    return report;
  }

  // Calculate consistency score
  calculateConsistencyScore() {
    if (this.consistencyReport.length === 0) return 0;
    const totalPassed = this.consistencyReport.reduce((sum, r) => sum + r.passed, 0);
    const totalChecks = this.consistencyReport.reduce((sum, r) => sum + r.total, 0);
    return Math.round((totalPassed / totalChecks) * 100);
  }

  // Run complete linking process
  linkAll() {
    console.log('🔗 Starting algorithm linking process...\n');

    this.scanAlgorithms();
    this.analyzeDependencies();
    this.createLinks();
    this.verifyConsistency();
    this.generateIntegration();
    const report = this.generateReport();

    console.log('═'.repeat(50));
    console.log('✅ ALGORITHM LINKING COMPLETE');
    console.log('═'.repeat(50));
    console.log(`\nSummary:`);
    console.log(`  Algorithms: ${report.summary.totalAlgorithms}`);
    console.log(`  Links: ${report.summary.totalLinks}`);
    console.log(`  Consistency Score: ${report.summary.consistencyScore}%\n`);

    return report;
  }
}

// Run if called directly
if (require.main === module) {
  const linker = new AlgorithmLinker();
  linker.linkAll();
  process.exit(0);
}

module.exports = AlgorithmLinker;
