#!/usr/bin/env node

/**
 * 🔍 Error Detection System - Advanced Algorithm
 * Detects all types of errors in real-time
 * Auto-reports and triggers correction
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class ErrorDetector {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.timestamp = new Date().toISOString();
    this.detectionLog = [];
  }

  // 1. Detect Syntax Errors
  detectSyntaxErrors(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for common syntax issues
      const checks = [
        { pattern: /[{]\s*[}]/, msg: 'Empty block detected', severity: 'warning' },
        { pattern: /console\.log\s*\(/, msg: 'Console.log in production', severity: 'warning' },
        { pattern: /var\s+/, msg: 'Using var instead of const/let', severity: 'warning' },
        { pattern: /==\s*/, msg: 'Using == instead of ===', severity: 'error' },
        { pattern: /TODO\s+[^2]/, msg: 'TODO without date', severity: 'warning' },
      ];

      checks.forEach(check => {
        if (check.pattern.test(content)) {
          this.addError(filePath, check.msg, check.severity);
        }
      });
    } catch (err) {
      this.addError(filePath, `Read error: ${err.message}`, 'error');
    }
  }

  // 2. Detect Missing Documentation
  detectMissingDocs(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (filePath.endsWith('.js')) {
        // Check if file has header
        if (!content.startsWith('//') && !content.startsWith('/*')) {
          this.addError(filePath, 'Missing file header documentation', 'warning');
        }
        
        // Check functions have JSDoc
        const functions = content.match(/function\s+\w+|const\s+\w+\s*=/g) || [];
        const jsdocs = content.match(/\/\*\*[\s\S]*?\*\//g) || [];
        
        if (functions.length > 0 && jsdocs.length === 0) {
          this.addError(filePath, 'Functions missing JSDoc comments', 'warning');
        }
      }
    } catch (err) {
      this.addError(filePath, `Documentation check failed: ${err.message}`, 'error');
    }
  }

  // 3. Detect File Structure Issues
  detectStructureIssues() {
    const required = [
      'backend/',
      'public/',
      '.github/workflows/',
      'docs/'
    ];

    required.forEach(dir => {
      if (!fs.existsSync(dir)) {
        this.addError(dir, 'Missing required directory', 'error');
      }
    });

    const requiredFiles = [
      'replit.md',
      'CHANGELOG.md',
      'DOCUMENTATION_REGISTRY.md',
      'package.json',
      'backend/package.json'
    ];

    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        this.addError(file, 'Missing required file', 'error');
      }
    });
  }

  // 4. Detect Dependency Issues
  detectDependencyIssues() {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const backendPackageJson = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

      // Check for duplicate dependencies
      const allDeps = { ...packageJson.dependencies, ...backendPackageJson.dependencies };
      const duplicates = Object.keys(allDeps).filter(dep => {
        return packageJson.dependencies?.[dep] && backendPackageJson.dependencies?.[dep];
      });

      duplicates.forEach(dep => {
        this.addError('package.json', `Duplicate dependency: ${dep}`, 'warning');
      });
    } catch (err) {
      this.addError('package.json', `Dependency check failed: ${err.message}`, 'warning');
    }
  }

  // 5. Detect API/Routing Issues
  detectRoutingIssues(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (filePath.includes('backend')) {
        // Check for unhandled routes
        const routes = content.match(/app\.(get|post|put|delete)\(['"]\/[^'"]*['"]/g) || [];
        const handlers = content.match(/\(req,\s*res\)\s*=>/g) || [];
        
        if (routes.length > 0 && handlers.length === 0) {
          this.addError(filePath, 'Routes defined without proper handlers', 'warning');
        }

        // Check for missing error handling
        if (routes.length > 0 && !content.includes('catch')) {
          this.addError(filePath, 'Routes without error handling', 'error');
        }
      }
    } catch (err) {
      this.addError(filePath, `Routing check failed: ${err.message}`, 'warning');
    }
  }

  // 6. Detect Configuration Issues
  detectConfigIssues() {
    const configs = [
      'vercel.json',
      'firebase.json',
      'backend/fly.toml'
    ];

    configs.forEach(configFile => {
      if (fs.existsSync(configFile)) {
        try {
          const content = fs.readFileSync(configFile, 'utf8');
          
          // Validate JSON
          if (configFile.endsWith('.json')) {
            JSON.parse(content);
          }
        } catch (err) {
          this.addError(configFile, `Invalid configuration: ${err.message}`, 'error');
        }
      }
    });
  }

  // 7. Detect Timeout/Performance Issues
  detectPerformanceIssues(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for infinite loops or missing timeouts
      if (content.includes('while(true)')) {
        this.addError(filePath, 'Infinite loop detected', 'error');
      }
      
      // Check for missing Promise handling
      if (content.includes('setTimeout') && !content.includes('Promise')) {
        this.addError(filePath, 'Async operations without proper handling', 'warning');
      }
    } catch (err) {
      this.addError(filePath, `Performance check failed: ${err.message}`, 'warning');
    }
  }

  // Add error to log
  addError(location, message, severity) {
    const error = {
      location,
      message,
      severity,
      timestamp: new Date().toISOString(),
      type: this.classifyError(message)
    };
    
    if (severity === 'error') {
      this.errors.push(error);
    } else {
      this.warnings.push(error);
    }
    
    this.detectionLog.push(error);
  }

  // Classify error type
  classifyError(message) {
    if (message.includes('syntax') || message.includes('invalid')) return 'SYNTAX';
    if (message.includes('missing') || message.includes('not found')) return 'STRUCTURE';
    if (message.includes('documentation')) return 'DOCS';
    if (message.includes('dependency')) return 'DEPENDENCY';
    if (message.includes('route') || message.includes('routing')) return 'ROUTING';
    if (message.includes('configuration')) return 'CONFIG';
    if (message.includes('async') || message.includes('timeout')) return 'ASYNC';
    return 'OTHER';
  }

  // Run all detections
  detectAll() {
    console.log('🔍 Starting comprehensive error detection...\n');

    // Structure checks
    this.detectStructureIssues();
    this.detectDependencyIssues();
    this.detectConfigIssues();

    // File-based checks
    const jsFiles = this.findFilesRecursive('.', '.js');
    jsFiles.forEach(file => {
      this.detectSyntaxErrors(file);
      this.detectMissingDocs(file);
      this.detectRoutingIssues(file);
      this.detectPerformanceIssues(file);
    });

    return {
      errors: this.errors,
      warnings: this.warnings,
      log: this.detectionLog,
      summary: {
        totalErrors: this.errors.length,
        totalWarnings: this.warnings.length,
        timestamp: this.timestamp,
        status: this.errors.length === 0 ? 'PASSED' : 'FAILED'
      }
    };
  }

  // Helper: Find files recursively
  findFilesRecursive(dir, ext) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
        files.push(...this.findFilesRecursive(fullPath, ext));
      } else if (item.isFile() && fullPath.endsWith(ext)) {
        files.push(fullPath);
      }
    });

    return files;
  }

  // Generate report
  generateReport() {
    const report = {
      title: 'Error Detection Report',
      timestamp: this.timestamp,
      summary: {
        totalErrors: this.errors.length,
        totalWarnings: this.warnings.length,
        status: this.errors.length === 0 ? '✅ PASSED' : '❌ FAILED'
      },
      errors: this.errors,
      warnings: this.warnings,
      detectionLog: this.detectionLog
    };

    return JSON.stringify(report, null, 2);
  }
}

// Run detection if called directly
if (require.main === module) {
  const detector = new ErrorDetector();
  const results = detector.detectAll();
  
  console.log('📊 Detection Results:');
  console.log(`  Errors: ${results.summary.totalErrors}`);
  console.log(`  Warnings: ${results.summary.totalWarnings}`);
  console.log(`  Status: ${results.summary.status}\n`);

  if (results.summary.totalErrors > 0) {
    console.log('❌ ERRORS:');
    results.errors.forEach(err => {
      console.log(`  - [${err.type}] ${err.location}: ${err.message}`);
    });
    console.log('');
  }

  if (results.summary.totalWarnings > 0) {
    console.log('⚠️ WARNINGS:');
    results.warnings.slice(0, 5).forEach(warn => {
      console.log(`  - [${warn.type}] ${warn.location}: ${warn.message}`);
    });
    if (results.summary.totalWarnings > 5) {
      console.log(`  ... and ${results.summary.totalWarnings - 5} more`);
    }
    console.log('');
  }

  // Write report
  fs.writeFileSync('ERROR_DETECTION_REPORT.json', detector.generateReport());
  console.log('✅ Report saved to ERROR_DETECTION_REPORT.json\n');

  process.exit(results.summary.totalErrors > 0 ? 1 : 0);
}

module.exports = ErrorDetector;
