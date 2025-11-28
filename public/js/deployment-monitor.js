// ==========================================
// 🚀 Smart Deployment Monitor
// مراقب النشر الذكي
// يكتشف ويصلح مشاكل النشر تلقائياً
// ==========================================

class SmartDeploymentMonitor {
  constructor() {
    this.deploymentIssues = [];
    this.deploymentLogs = [];
    this.deploymentStatus = 'idle';
    this.buildErrors = [];
    this.deploymentHistory = [];
    this.isMonitoring = false;
    
    this.startMonitoring();
    console.log('🚀 Smart Deployment Monitor initialized');
  }

  startMonitoring() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    
    // مراقبة مستمرة
    setInterval(() => {
      this.performDeploymentCheck();
    }, 5000);
  }

  // ==================== فحص النشر ====================
  performDeploymentCheck() {
    // فحص الاتصال بالخادم
    this.checkServerConnection();
    
    // فحص صحة API
    this.checkAPIHealth();
    
    // فحص الأداء
    this.checkDeploymentPerformance();
    
    // فحص التبعيات
    this.checkDependencies();
    
    // فحص الملفات
    this.checkFileIntegrity();
  }

  // ==================== فحص الاتصال ====================
  async checkServerConnection() {
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
        timeout: 5000
      });

      if (!response.ok) {
        this.addDeploymentIssue({
          type: 'connection_error',
          severity: 'critical',
          message: `Server returned ${response.status}`,
          timestamp: Date.now()
        });
      } else {
        this.logDeploymentSuccess('Server connection OK');
      }
    } catch (error) {
      this.addDeploymentIssue({
        type: 'connection_failed',
        severity: 'critical',
        message: `Failed to connect: ${error.message}`,
        timestamp: Date.now()
      });
    }
  }

  // ==================== فحص صحة API ====================
  async checkAPIHealth() {
    try {
      // فحص نقطة نهاية API الأساسية
      const endpoints = [
        '/api/health',
        '/api/status'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, { timeout: 3000 });
          if (!response.ok) {
            this.addDeploymentIssue({
              type: 'api_error',
              severity: 'high',
              message: `API endpoint ${endpoint} returned ${response.status}`,
              endpoint: endpoint,
              statusCode: response.status,
              timestamp: Date.now()
            });
          }
        } catch (e) {
          this.addDeploymentIssue({
            type: 'api_timeout',
            severity: 'high',
            message: `API endpoint ${endpoint} timed out`,
            endpoint: endpoint,
            timestamp: Date.now()
          });
        }
      }
    } catch (error) {
      console.warn('API health check failed:', error);
    }
  }

  // ==================== فحص الأداء ====================
  async checkDeploymentPerformance() {
    try {
      const startTime = Date.now();
      await fetch('/', { timeout: 10000 });
      const responseTime = Date.now() - startTime;

      if (responseTime > 3000) {
        this.addDeploymentIssue({
          type: 'slow_response',
          severity: 'medium',
          message: `Slow response time: ${responseTime}ms`,
          responseTime: responseTime,
          timestamp: Date.now()
        });
      }

      this.deploymentStatus = responseTime < 1000 ? 'healthy' : 'degraded';
    } catch (error) {
      this.deploymentStatus = 'error';
    }
  }

  // ==================== فحص التبعيات ====================
  checkDependencies() {
    // فحص توفر المكتبات الأساسية
    const requiredLibs = [
      'errorLogger',
      'advancedMonitor',
      'hybridMonitor',
      'aiDiagnostics',
      'unifiedMonitor',
      'autoRepair',
      'codeQuality'
    ];

    requiredLibs.forEach(lib => {
      if (!window[lib]) {
        this.addDeploymentIssue({
          type: 'missing_dependency',
          severity: 'critical',
          message: `Missing library: ${lib}`,
          library: lib,
          timestamp: Date.now()
        });
      }
    });
  }

  // ==================== فحص الملفات ====================
  checkFileIntegrity() {
    // فحص توفر الملفات الأساسية
    const requiredFiles = [
      '/js/error-logger-light.js',
      '/js/advanced-error-monitor.js',
      '/js/hybrid-monitor-engine.js',
      '/js/ai-diagnostics.js',
      '/js/unified-monitor.js',
      '/js/auto-repair-system.js',
      '/js/code-quality-checker.js'
    ];

    requiredFiles.forEach(file => {
      // محاولة تحميل الملف
      fetch(file, { method: 'HEAD' })
        .catch(() => {
          this.addDeploymentIssue({
            type: 'missing_file',
            severity: 'high',
            message: `File not found: ${file}`,
            file: file,
            timestamp: Date.now()
          });
        });
    });
  }

  // ==================== إضافة مشكلة ====================
  addDeploymentIssue(issue) {
    // فحص إذا كانت موجودة بالفعل
    const exists = this.deploymentIssues.find(
      i => i.type === issue.type && i.message === issue.message
    );

    if (!exists) {
      this.deploymentIssues.push(issue);
      this.logDeploymentError(issue);
    }
  }

  // ==================== التسجيل ====================
  logDeploymentError(issue) {
    this.deploymentLogs.push({
      level: 'error',
      message: issue.message,
      issue: issue.type,
      timestamp: Date.now()
    });

    console.warn(`⚠️ Deployment Issue: ${issue.message}`);
  }

  logDeploymentSuccess(message) {
    this.deploymentLogs.push({
      level: 'info',
      message: message,
      timestamp: Date.now()
    });

    console.log(`✅ ${message}`);
  }

  // ==================== التقارير ====================
  getDeploymentReport() {
    const criticalCount = this.deploymentIssues.filter(i => i.severity === 'critical').length;
    const highCount = this.deploymentIssues.filter(i => i.severity === 'high').length;
    const mediumCount = this.deploymentIssues.filter(i => i.severity === 'medium').length;

    return {
      timestamp: Date.now(),
      status: this.deploymentStatus,
      totalIssues: this.deploymentIssues.length,
      critical: criticalCount,
      high: highCount,
      medium: mediumCount,
      issues: this.deploymentIssues,
      logs: this.deploymentLogs.slice(-20),
      readyToDeploy: criticalCount === 0 && highCount === 0
    };
  }

  getDetailedReport() {
    return {
      timestamp: Date.now(),
      status: this.deploymentStatus,
      issues: this.deploymentIssues,
      logs: this.deploymentLogs,
      history: this.deploymentHistory,
      recommendations: this.generateRecommendations()
    };
  }

  generateRecommendations() {
    const recommendations = [];

    this.deploymentIssues.forEach(issue => {
      if (issue.type === 'connection_error') {
        recommendations.push('تأكد من أن الخادم يعمل بشكل صحيح');
      }
      if (issue.type === 'api_error') {
        recommendations.push(`تحقق من endpoint: ${issue.endpoint}`);
      }
      if (issue.type === 'slow_response') {
        recommendations.push('قم بتحسين أداء الخادم أو قاعدة البيانات');
      }
      if (issue.type === 'missing_dependency') {
        recommendations.push(`تأكد من تثبيت: ${issue.library}`);
      }
      if (issue.type === 'missing_file') {
        recommendations.push(`أضف الملف: ${issue.file}`);
      }
    });

    return recommendations;
  }
}

// Initialize
window.deploymentMonitor = new SmartDeploymentMonitor();
console.log('🚀 Smart Deployment Monitor ready');
