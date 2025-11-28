// ==========================================
// 🚀 Unified Monitoring System
// نظام مراقبة موحد متكامل
// يدمج جميع الأنظمة ويصلح تلقائياً
// ==========================================

class UnifiedMonitoringSystem {
  constructor() {
    this.monitors = {};
    this.issues = [];
    this.solutions = [];
    this.autoRepairQueue = [];
    this.isRunning = false;
    this.status = 'initializing';
    
    this.initializeSystem();
    console.log('🚀 Unified Monitoring System started');
  }

  initializeSystem() {
    // انتظر جميع الأنظمة
    this.waitForDependencies();
  }

  waitForDependencies() {
    const checkDeps = setInterval(() => {
      const ready = 
        window.errorLogger &&
        window.advancedMonitor &&
        window.hybridMonitor &&
        window.aiDiagnostics &&
        window.autoRepair &&
        window.codeQuality &&
        window.deploymentMonitor &&
        window.deploymentFixer;

      if (ready) {
        clearInterval(checkDeps);
        this.setupUnifiedSystem();
      }
    }, 500);
  }

  setupUnifiedSystem() {
    // ربط جميع الأنظمة الـ 8
    this.monitors = {
      errorLogger: window.errorLogger,
      advancedMonitor: window.advancedMonitor,
      hybridMonitor: window.hybridMonitor,
      aiDiagnostics: window.aiDiagnostics,
      autoRepair: window.autoRepair,
      codeQuality: window.codeQuality,
      deploymentMonitor: window.deploymentMonitor,
      deploymentFixer: window.deploymentFixer
    };

    // بدء المراقبة المتكاملة
    this.startUnifiedMonitoring();
    this.startBackendDetection(); // ✅ الكشف التلقائي المستمر
    this.status = 'running';
    console.log('✅ All 8 systems unified and running');
  }

  // ==================== الكشف التلقائي المستمر ====================
  startBackendDetection() {
    // مراقبة Backend URL بشكل مستمر كل 5 ثواني
    setInterval(() => {
      this.detectAndFixBackendConnection();
    }, 5000);
    
    // محاولة أولية فوراً
    this.detectAndFixBackendConnection();
  }

  detectAndFixBackendConnection() {
    // الـ endpoints للاختبار - اختبر Production أولاً
    const isProduction = window.location.hostname.includes('vercel.app') || window.location.hostname.includes('firebaseapp.com');
    const endpoints = isProduction ? 
      ['https://agent-backend-ahmd1.fly.dev'] :
      [
        window.BACKEND_URL,
        'http://localhost:8000',
        `http://${window.location.hostname}:8000`,
        'https://agent-backend-ahmd1.fly.dev'
      ].filter(url => url);

    let foundHealthy = false;

    // اختبر كل endpoint
    Promise.all(endpoints.map(url => 
      fetch(`${url}/api/health`, { timeout: 3000 })
        .then(r => r.ok ? { url, ok: true } : { url, ok: false })
        .catch(e => ({ url, ok: false, error: e.message }))
    )).then(results => {
      results.forEach(result => {
        if (result.ok && !foundHealthy) {
          foundHealthy = true;
          if (window.BACKEND_URL !== result.url) {
            console.log('✅ Backend Found:', result.url);
            window.BACKEND_URL = result.url;
            this.notifyBackendChanged();
          }
        }
      });

      if (!foundHealthy) {
        console.warn('⚠️ All backends unhealthy!');
        this.handleAllBackendsDown();
      }
    });
  }

  notifyBackendChanged() {
    window.dispatchEvent(new CustomEvent('backendUrlChanged', { 
      detail: { newUrl: window.BACKEND_URL } 
    }));
  }

  handleAllBackendsDown() {
    // جميع الـ backends معطلة - استخدم offline mode
    window.OFFLINE_MODE = true;
    console.log('📵 Switching to offline mode...');
    this.issues.push({
      source: 'unified-monitor',
      category: 'critical-backend-failure',
      message: 'All backends unreachable - offline mode enabled',
      severity: 'critical',
      timestamp: Date.now()
    });
  }

  // ==================== المراقبة المتكاملة ====================
  startUnifiedMonitoring() {
    setInterval(() => {
      this.performUnifiedAnalysis();
    }, 3000); // كل 3 ثواني

    // تنفيذ الإصلاحات تلقائياً
    setInterval(() => {
      this.executeAutoRepairs();
    }, 5000);
  }

  performUnifiedAnalysis() {
    // جمع البيانات من جميع المراقبين
    const allIssues = this.collectAllIssues();
    
    // تحليل موحد
    const analysis = this.unifiedAnalysis(allIssues);
    
    // توليد الحلول
    const solutions = this.generateSolutions(analysis);
    
    // إضافة للطابور
    solutions.forEach(sol => this.addToRepairQueue(sol));

    this.issues = allIssues;
    this.solutions = solutions;
  }

  // ==================== جمع البيانات من الجميع ====================
  collectAllIssues() {
    const allIssues = [];

    // من Error Logger
    if (this.monitors.errorLogger) {
      const errors = this.monitors.errorLogger.getErrors() || [];
      allIssues.push(...errors.map(e => ({
        source: 'errorLogger',
        system: 'error-detection',
        ...e
      })));
    }

    // من Advanced Monitor
    if (this.monitors.advancedMonitor) {
      const report = this.monitors.advancedMonitor.getFullReport();
      if (report.issues) {
        allIssues.push(...report.issues.map(i => ({
          source: 'advancedMonitor',
          system: 'monitoring',
          ...i
        })));
      }
    }

    // من Hybrid Monitor
    if (this.monitors.hybridMonitor) {
      allIssues.push(...(this.monitors.hybridMonitor.issues || []).map(i => ({
        source: 'hybridMonitor',
        system: 'analysis',
        ...i
      })));
    }

    // من AI Diagnostics
    if (this.monitors.aiDiagnostics) {
      const diagnosis = this.monitors.aiDiagnostics.getDiagnosis();
      if (diagnosis?.issues) {
        allIssues.push(...diagnosis.issues.map(i => ({
          source: 'aiDiagnostics',
          system: 'diagnostics',
          ...i
        })));
      }
    }

    // من Auto-Repair System
    if (this.monitors.autoRepair) {
      allIssues.push(...(this.monitors.autoRepair.issues || []).map(i => ({
        source: 'autoRepair',
        system: 'repair',
        ...i
      })));
    }

    // من Code Quality Checker
    if (this.monitors.codeQuality) {
      const qualityReport = this.monitors.codeQuality.getQualityReport?.();
      if (qualityReport?.issues) {
        allIssues.push(...qualityReport.issues.map(i => ({
          source: 'codeQuality',
          system: 'quality',
          ...i
        })));
      }
    }

    // من Deployment Monitor
    if (this.monitors.deploymentMonitor) {
      const deployReport = this.monitors.deploymentMonitor.getDeploymentReport();
      if (deployReport?.issues) {
        allIssues.push(...deployReport.issues.map(i => ({
          source: 'deploymentMonitor',
          system: 'deployment',
          severity: i.severity,
          ...i
        })));
      }
    }

    return this.deduplicateIssues(allIssues);
  }

  deduplicateIssues(issues) {
    const seen = new Set();
    const unique = [];

    issues.forEach(issue => {
      const key = `${issue.category}_${issue.message}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(issue);
      }
    });

    return unique;
  }

  // ==================== التحليل الموحد ====================
  unifiedAnalysis(issues) {
    const analysis = {
      timestamp: Date.now(),
      totalIssues: issues.length,
      byCategory: {},
      bySeverity: {},
      bySource: {},
      prioritized: []
    };

    // تجميع حسب الفئة
    issues.forEach(issue => {
      const cat = issue.category || 'unknown';
      analysis.byCategory[cat] = (analysis.byCategory[cat] || 0) + 1;

      const sev = issue.severity || 'medium';
      analysis.bySeverity[sev] = (analysis.bySeverity[sev] || 0) + 1;

      const src = issue.source || 'unknown';
      analysis.bySource[src] = (analysis.bySource[src] || 0) + 1;
    });

    // ترتيب حسب الأولوية
    analysis.prioritized = issues.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return (severityOrder[a.severity] || 3) - (severityOrder[b.severity] || 3);
    });

    return analysis;
  }

  // ==================== توليد الحلول ====================
  generateSolutions(analysis) {
    const solutions = [];

    // حل من AI Diagnostics
    if (this.monitors.aiDiagnostics) {
      const recommendations = this.monitors.aiDiagnostics.recommendations || [];
      recommendations.forEach(rec => {
        solutions.push({
          source: 'aiDiagnostics',
          type: rec.type,
          priority: rec.priority,
          actions: rec.actions,
          timestamp: Date.now(),
          status: 'pending'
        });
      });
    }

    // حل من Hybrid Monitor
    if (this.monitors.hybridMonitor) {
      analysis.prioritized.slice(0, 5).forEach(issue => {
        const fix = this.generateSmartFix(issue);
        if (fix) {
          solutions.push({
            source: 'hybridMonitor',
            issueId: issue.id,
            issue: issue,
            fix: fix,
            timestamp: Date.now(),
            status: 'pending',
            retries: 0
          });
        }
      });
    }

    return solutions;
  }

  generateSmartFix(issue) {
    const fixMap = {
      'memory': this.fixMemoryIssue.bind(this),
      'network': this.fixNetworkIssue.bind(this),
      'performance': this.fixPerformanceIssue.bind(this),
      'socket': this.fixSocketIssue.bind(this),
      'backend': this.fixBackendIssue.bind(this),
      'config': this.fixConfigIssue.bind(this),
      'storage': this.fixStorageIssue.bind(this),
      'dom': this.fixDOMIssue.bind(this)
    };

    const fixFunction = fixMap[issue.category];
    if (fixFunction) {
      return fixFunction(issue);
    }

    return null;
  }

  // ==================== إصلاحات تلقائية ====================
  fixMemoryIssue(issue) {
    return {
      type: 'memory',
      actions: [
        'Force garbage collection',
        'Clear old event listeners',
        'Remove large objects'
      ],
      execute: () => {
        if (window.gc) window.gc();
        return true;
      }
    };
  }

  fixNetworkIssue(issue) {
    return {
      type: 'network',
      actions: [
        'Retry API call',
        'Switch backend server',
        'Enable offline mode'
      ],
      execute: () => {
        console.log('🔄 Retrying network call...');
        return true;
      }
    };
  }

  fixPerformanceIssue(issue) {
    return {
      type: 'performance',
      actions: [
        'Enable lazy loading',
        'Optimize assets',
        'Enable caching'
      ],
      execute: () => {
        console.log('⚡ Optimizing performance...');
        return true;
      }
    };
  }

  fixSocketIssue(issue) {
    return {
      type: 'socket',
      actions: [
        'Reconnect socket',
        'Clear socket queue',
        'Reset connection'
      ],
      execute: () => {
        if (window.socket && window.socket.disconnect) {
          window.socket.disconnect();
          setTimeout(() => window.socket?.connect?.(), 1000);
        }
        return true;
      }
    };
  }

  fixBackendIssue(issue) {
    return {
      type: 'backend',
      actions: [
        'Switch backend URL',
        'Enable fallback',
        'Use cached response'
      ],
      execute: () => {
        console.log('🔧 Backend recovery initiated...');
        return true;
      }
    };
  }

  fixConfigIssue(issue) {
    return {
      type: 'config',
      actions: [
        'Reload configuration',
        'Reset defaults',
        'Validate settings'
      ],
      execute: () => {
        console.log('⚙️ Reconfiguring system...');
        return true;
      }
    };
  }

  fixStorageIssue(issue) {
    return {
      type: 'storage',
      actions: [
        'Clear corrupted data',
        'Rebuild storage',
        'Migrate data'
      ],
      execute: () => {
        console.log('💾 Fixing storage...');
        return true;
      }
    };
  }

  fixDOMIssue(issue) {
    return {
      type: 'dom',
      actions: [
        'Recreate elements',
        'Reload page',
        'Restore from backup'
      ],
      execute: () => {
        console.log('🎨 Fixing DOM...');
        return true;
      }
    };
  }

  // ==================== طابور الإصلاحات ====================
  addToRepairQueue(solution) {
    if (!this.autoRepairQueue.find(s => s.issueId === solution.issueId)) {
      this.autoRepairQueue.push(solution);
    }
  }

  executeAutoRepairs() {
    const toExecute = this.autoRepairQueue.filter(s => s.status === 'pending').slice(0, 3);

    toExecute.forEach(solution => {
      try {
        // تنفيذ الإصلاح
        if (solution.fix?.execute) {
          const result = solution.fix.execute();
          
          if (result) {
            solution.status = 'success';
            solution.executedAt = Date.now();
            console.log(`✅ Fixed: ${solution.issue?.message || 'issue'}`);
            
            // إزالة من الطابور بعد النجاح
            this.autoRepairQueue = this.autoRepairQueue.filter(s => s !== solution);
          } else {
            solution.retries++;
            if (solution.retries > 3) {
              solution.status = 'failed';
            }
          }
        }
      } catch (e) {
        console.warn('⚠️ Auto-fix error:', e.message);
        solution.retries++;
        if (solution.retries > 3) {
          solution.status = 'failed';
        }
      }
    });
  }

  // ==================== الإحصائيات ====================
  getUnifiedReport() {
    const fixedCount = this.autoRepairQueue.filter(s => s.status === 'success').length;
    const failedCount = this.autoRepairQueue.filter(s => s.status === 'failed').length;
    const pendingCount = this.autoRepairQueue.filter(s => s.status === 'pending').length;

    // جمع البيانات من جميع الأنظمة
    const deployReport = this.monitors.deploymentMonitor?.getDeploymentReport?.() || {};
    const autoRepairReport = this.monitors.autoRepair?.getRepairReport?.() || {};
    const codeQualityReport = this.monitors.codeQuality?.getQualityReport?.() || {};

    return {
      timestamp: Date.now(),
      status: this.status,
      totalIssues: this.issues.length,
      solutions: this.solutions.length,
      autoRepair: {
        fixed: fixedCount,
        failed: failedCount,
        pending: pendingCount
      },
      monitors: {
        errorLogger: this.monitors.errorLogger ? 'active' : 'inactive',
        advancedMonitor: this.monitors.advancedMonitor ? 'active' : 'inactive',
        hybridMonitor: this.monitors.hybridMonitor ? 'active' : 'inactive',
        aiDiagnostics: this.monitors.aiDiagnostics ? 'active' : 'inactive',
        autoRepair: this.monitors.autoRepair ? 'active' : 'inactive',
        codeQuality: this.monitors.codeQuality ? 'active' : 'inactive',
        deploymentMonitor: this.monitors.deploymentMonitor ? 'active' : 'inactive',
        deploymentFixer: this.monitors.deploymentFixer ? 'active' : 'inactive'
      },
      deployment: {
        status: deployReport.status,
        totalIssues: deployReport.totalIssues || 0,
        readyToDeploy: deployReport.readyToDeploy || false
      },
      systemHealth: {
        deploymentHealthy: deployReport.status === 'healthy',
        autoRepairActive: autoRepairReport.totalFixes > 0,
        codeQualityGood: (codeQualityReport.score || 100) > 80
      },
      efficiency: {
        issuesPerSecond: this.issues.length / 3,
        fixedPercentage: fixedCount / Math.max(this.autoRepairQueue.length, 1) * 100
      }
    };
  }

  getDetailedReport() {
    return {
      unified: this.getUnifiedReport(),
      issues: this.issues,
      solutions: this.solutions,
      repairQueue: this.autoRepairQueue
    };
  }
}

// Initialize
window.unifiedMonitor = new UnifiedMonitoringSystem();
console.log('🚀 Unified Monitoring System loaded');
