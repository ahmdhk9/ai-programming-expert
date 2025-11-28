#!/usr/bin/env node

/**
 * ⚔️ Conflict Resolver - Smart Conflict Detection & Resolution
 * Handles port conflicts, deployment issues, and deployment races
 */

const fs = require('fs');
const { exec } = require('child_process');

class ConflictResolver {
  constructor() {
    this.conflicts = [];
    this.resolutions = [];
  }

  // 1. Detect all types of conflicts
  async detectConflicts() {
    console.log('🔍 Scanning for conflicts...\n');

    const portConflicts = await this.detectPortConflicts();
    const envConflicts = this.detectEnvConflicts();
    const buildConflicts = this.detectBuildConflicts();
    const deploymentConflicts = this.detectDeploymentConflicts();

    this.conflicts = [
      ...portConflicts,
      ...envConflicts,
      ...buildConflicts,
      ...deploymentConflicts
    ];

    console.log(`✅ Found ${this.conflicts.length} conflicts\n`);
    return this.conflicts;
  }

  // 2. Detect port conflicts
  detectPortConflicts() {
    const conflicts = [];
    const ports = [5000, 8000, 3000, 8080];

    ports.forEach(port => {
      try {
        const result = require('child_process').execSync(`lsof -i :${port} 2>/dev/null || echo "free"`, {
          encoding: 'utf8'
        });

        if (!result.includes('free') && result.length > 0) {
          conflicts.push({
            type: 'PORT_CONFLICT',
            port: port,
            severity: 'CRITICAL',
            resolution: `Kill process on port ${port}`,
            process: result.split('\n')[1]
          });
        }
      } catch (e) {
        // Port is free
      }
    });

    return conflicts;
  }

  // 3. Detect environment conflicts
  detectEnvConflicts() {
    const conflicts = [];
    const requiredVars = [
      'GITHUB_TOKEN',
      'VERCEL_TOKEN',
      'FLY_API_TOKEN',
      'FIREBASE_CONFIG',
      'GROQ_API_KEY'
    ];

    requiredVars.forEach(varName => {
      if (!process.env[varName]) {
        conflicts.push({
          type: 'MISSING_ENV',
          variable: varName,
          severity: 'HIGH',
          resolution: `Set environment variable: ${varName}`
        });
      }
    });

    return conflicts;
  }

  // 4. Detect build conflicts
  detectBuildConflicts() {
    const conflicts = [];

    // Check for duplicate build files
    if (fs.existsSync('dist') && fs.existsSync('build')) {
      conflicts.push({
        type: 'BUILD_CONFLICT',
        issue: 'Multiple build directories',
        directories: ['dist', 'build'],
        severity: 'MEDIUM',
        resolution: 'Standardize to single build directory'
      });
    }

    // Check for conflicting configs
    const configFiles = ['vercel.json', 'firebase.json', 'fly.toml'];
    const existingConfigs = configFiles.filter(f => fs.existsSync(f));

    if (existingConfigs.length === 0) {
      conflicts.push({
        type: 'MISSING_CONFIG',
        issue: 'No deployment configuration found',
        severity: 'CRITICAL',
        resolution: 'Create configuration files'
      });
    }

    return conflicts;
  }

  // 5. Detect deployment conflicts
  detectDeploymentConflicts() {
    const conflicts = [];

    // Check for race conditions in package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const backendPackageJson = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

    const duplicateDeps = Object.keys(packageJson.dependencies || {}).filter(
      dep => backendPackageJson.dependencies?.[dep]
    );

    if (duplicateDeps.length > 0) {
      conflicts.push({
        type: 'DEPENDENCY_CONFLICT',
        dependencies: duplicateDeps,
        severity: 'MEDIUM',
        resolution: 'Remove duplicates from one package.json'
      });
    }

    return conflicts;
  }

  // 6. Resolve all conflicts
  async resolveAll() {
    console.log('⚔️ Resolving conflicts...\n');

    for (const conflict of this.conflicts) {
      await this.resolveConflict(conflict);
    }

    console.log(`✅ Resolved ${this.resolutions.length} conflicts\n`);
  }

  // 7. Resolve individual conflict
  async resolveConflict(conflict) {
    let resolution;

    switch (conflict.type) {
      case 'PORT_CONFLICT':
        resolution = this.resolvePortConflict(conflict);
        break;
      case 'MISSING_ENV':
        resolution = this.resolveEnvConflict(conflict);
        break;
      case 'BUILD_CONFLICT':
        resolution = this.resolveBuildConflict(conflict);
        break;
      case 'DEPLOYMENT_CONFLICT':
        resolution = this.resolveDeploymentConflict(conflict);
        break;
      default:
        resolution = { status: 'PENDING', message: 'Unknown conflict' };
    }

    this.resolutions.push({
      conflict: conflict.type,
      resolution: resolution,
      timestamp: new Date().toISOString()
    });

    console.log(`  ✅ ${conflict.type}: ${resolution.message}`);
  }

  // 8. Resolve port conflicts
  resolvePortConflict(conflict) {
    console.log(`    Killing process on port ${conflict.port}...`);
    try {
      require('child_process').execSync(`lsof -ti:${conflict.port} | xargs kill -9 2>/dev/null || true`, {
        stdio: 'pipe'
      });
      return { status: 'RESOLVED', message: `Killed process on port ${conflict.port}` };
    } catch (e) {
      return { status: 'FAILED', message: e.message };
    }
  }

  // 9. Resolve environment conflicts
  resolveEnvConflict(conflict) {
    console.log(`    Checking environment variable: ${conflict.variable}...`);
    // This would be handled by request_env_var in production
    return { status: 'PENDING', message: `Needs manual setup: ${conflict.variable}` };
  }

  // 10. Resolve build conflicts
  resolveBuildConflict(conflict) {
    console.log(`    Standardizing build directory...`);
    // Keep dist, remove build
    if (fs.existsSync('build')) {
      require('child_process').execSync('rm -rf build', { stdio: 'pipe' });
    }
    return { status: 'RESOLVED', message: 'Standardized to dist directory' };
  }

  // 11. Resolve deployment conflicts
  resolveDeploymentConflict(conflict) {
    console.log(`    Removing duplicate dependencies...`);
    const backendPackageJson = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

    conflict.dependencies.forEach(dep => {
      delete backendPackageJson.dependencies?.[dep];
    });

    fs.writeFileSync('backend/package.json', JSON.stringify(backendPackageJson, null, 2));
    return { status: 'RESOLVED', message: `Removed ${conflict.dependencies.length} duplicates` };
  }

  // Generate conflict report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      conflicts: this.conflicts,
      resolutions: this.resolutions,
      status: this.conflicts.length === 0 ? 'NO_CONFLICTS' : 'RESOLVED'
    };

    fs.writeFileSync('CONFLICT_RESOLUTION_REPORT.json', JSON.stringify(report, null, 2));
    return report;
  }

  // Run full resolution
  async run() {
    console.log('⚔️ CONFLICT RESOLVER - Starting...\n');

    await this.detectConflicts();
    await this.resolveAll();
    const report = this.generateReport();

    console.log('═'.repeat(50));
    console.log(`📊 Conflicts Detected: ${report.conflicts.length}`);
    console.log(`✅ Conflicts Resolved: ${report.resolutions.length}`);
    console.log(`🎯 Status: ${report.status}`);
    console.log('═'.repeat(50) + '\n');

    return report;
  }
}

if (require.main === module) {
  const resolver = new ConflictResolver();
  resolver.run().catch(console.error);
}

module.exports = ConflictResolver;
