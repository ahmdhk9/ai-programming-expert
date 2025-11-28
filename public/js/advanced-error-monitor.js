// ==========================================
// 🔥 Advanced Comprehensive Error Monitor
// نظام مراقبة أخطاء متقدم شامل وعميق
// ==========================================

class AdvancedErrorMonitor {
  constructor() {
    this.issues = [];
    this.metrics = {
      performance: {},
      memory: {},
      network: {},
      api: {},
      health: {},
      dependencies: {}
    };
    this.lastCheck = {};
    this.maxIssues = 200;
    this.checkInterval = 3000; // فحص كل 3 ثواني
    
    this.initialize();
  }

  initialize() {
    console.log('🔥 Advanced Error Monitor starting...');
    
    // Start continuous monitoring
    this.startComprehensiveMonitoring();
    
    // Initial checks
    this.performFullDiagnostics();
  }

  // ==================== شامل الفحص ====================
  startComprehensiveMonitoring() {
    setInterval(() => {
      this.performFullDiagnostics();
    }, this.checkInterval);
  }

  performFullDiagnostics() {
    // 1. فحص الأداء
    this.checkPerformance();
    
    // 2. فحص الذاكرة
    this.checkMemory();
    
    // 3. فحص الشبكة والـ API
    this.checkNetworkHealth();
    
    // 4. فحص الـ Socket.IO
    this.checkSocketHealth();
    
    // 5. فحص الـ Backend
    this.checkBackendHealth();
    
    // 6. فحص الـ DOM والـ UI
    this.checkDOMHealth();
    
    // 7. فحص LocalStorage
    this.checkStorageHealth();
    
    // 8. فحص الـ Dependencies
    this.checkDependencies();
    
    // 9. فحص التكوين
    this.checkConfiguration();
    
    // 10. فحص البيانات
    this.checkDataIntegrity();

    // Save metrics
    this.saveMetrics();
  }

  // ==================== 1. فحص الأداء ====================
  checkPerformance() {
    if (!window.performance) return;

    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const responseTime = perfData.responseEnd - perfData.requestStart;
    const renderTime = perfData.domComplete - perfData.domLoading;

    this.metrics.performance = {
      pageLoadTime,
      responseTime,
      renderTime,
      timestamp: Date.now()
    };

    // التحقق من المشاكل
    if (pageLoadTime > 5000) {
      this.addIssue('performance', `⚠️ Page Load Time مرتفع: ${pageLoadTime}ms`, 'high');
    }
    if (renderTime > 3000) {
      this.addIssue('performance', `⚠️ Render Time مرتفع: ${renderTime}ms`, 'high');
    }
    if (responseTime > 2000) {
      this.addIssue('performance', `⚠️ Response Time مرتفع: ${responseTime}ms`, 'medium');
    }

    // Check for layout shifts
    if (window.PerformanceObserver) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.value > 0.1) {
              this.addIssue('performance', `⚠️ Layout Shift مكتشف: ${entry.value.toFixed(3)}`, 'medium');
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Layout Shift observer not supported');
      }
    }
  }

  // ==================== 2. فحص الذاكرة ====================
  checkMemory() {
    if (!performance.memory) return;

    const used = performance.memory.usedJSHeapSize;
    const limit = performance.memory.jsHeapSizeLimit;
    const percentage = (used / limit) * 100;

    this.metrics.memory = {
      used: Math.round(used / 1024 / 1024), // MB
      limit: Math.round(limit / 1024 / 1024),
      percentage: Math.round(percentage),
      timestamp: Date.now()
    };

    // Memory warnings
    if (percentage > 90) {
      this.addIssue('memory', `🔴 Memory Usage حرج: ${Math.round(percentage)}%`, 'critical');
    } else if (percentage > 75) {
      this.addIssue('memory', `🟠 Memory Usage مرتفع: ${Math.round(percentage)}%`, 'high');
    } else if (percentage > 60) {
      this.addIssue('memory', `🟡 Memory Usage متوسط: ${Math.round(percentage)}%`, 'medium');
    }

    // Check for memory leaks - تحقق من الزيادة المستمرة
    const lastMemory = this.lastCheck.memory || 0;
    if (lastMemory > 0 && used - lastMemory > 10 * 1024 * 1024) { // 10MB increase
      this.addIssue('memory', `⚠️ احتمال Memory Leak: زيادة ${Math.round((used - lastMemory) / 1024 / 1024)}MB`, 'high');
    }
    this.lastCheck.memory = used;
  }

  // ==================== 3. فحص الشبكة والـ API ====================
  checkNetworkHealth() {
    const navigation = window.performance.navigation;
    const resources = window.performance.getEntriesByType('resource') || [];

    // Check for failed resources
    resources.forEach(resource => {
      if (resource.duration === 0 || resource.transferSize === 0) {
        this.addIssue('network', `⚠️ Resource Failed: ${resource.name}`, 'high');
      }
      if (resource.duration > 5000) {
        this.addIssue('network', `⚠️ Slow Resource: ${resource.name} (${Math.round(resource.duration)}ms)`, 'medium');
      }
    });

    this.metrics.network = {
      totalResources: resources.length,
      failedResources: resources.filter(r => r.duration === 0).length,
      slowResources: resources.filter(r => r.duration > 3000).length,
      timestamp: Date.now()
    };

    // Network connection status
    if (navigator.connection) {
      const connection = navigator.connection;
      if (connection.saveData) {
        this.addIssue('network', '📡 Data Saver Mode enabled', 'info');
      }
      if (connection.effectiveType === '4g') {
        console.log('✅ Network: 4G');
      } else if (connection.effectiveType === '3g') {
        this.addIssue('network', '⚠️ Network: 3G (بطيء)', 'medium');
      } else if (connection.effectiveType === '2g') {
        this.addIssue('network', '🔴 Network: 2G (بطيء جداً)', 'high');
      }
    }
  }

  // ==================== 4. فحص Socket.IO ====================
  checkSocketHealth() {
    if (!window.socket) {
      this.addIssue('socket', '⚠️ Socket.IO لم يتم تهيئته', 'high');
      return;
    }

    const socket = window.socket;
    
    if (!socket.connected) {
      this.addIssue('socket', '🔴 Socket.IO غير متصل', 'critical');
    } else {
      console.log('✅ Socket.IO متصل');
    }

    // Check socket listeners
    const listeners = socket.eventNames();
    if (listeners.length === 0) {
      this.addIssue('socket', '⚠️ Socket.IO بدون listeners', 'medium');
    }

    this.metrics.socket = {
      connected: socket.connected,
      id: socket.id,
      listeners: listeners.length,
      timestamp: Date.now()
    };
  }

  // ==================== 5. فحص Backend ====================
  checkBackendHealth() {
    // استخدم Backend المحلي
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    let backendUrl = isLocalhost ? 'http://localhost:8000' : `http://${window.location.hostname}:8000`;
    if (window.location.hostname.includes('replit')) {
      backendUrl = `http://${window.location.hostname}:8000`;
    }
    
    fetch(`${backendUrl}/health`, { 
      method: 'GET',
      mode: 'cors'
    })
      .then(res => {
        if (res.ok) {
          console.log('✅ Backend صحي');
          this.metrics.backend = { status: 'healthy', timestamp: Date.now() };
        } else {
          this.addIssue('backend', `⚠️ Backend Error: ${res.status} ${res.statusText}`, 'high');
          this.metrics.backend = { status: 'error', code: res.status, timestamp: Date.now() };
        }
      })
      .catch(error => {
        this.addIssue('backend', `🔴 Backend غير متاح: ${error.message}`, 'critical');
        this.metrics.backend = { status: 'unreachable', error: error.message, timestamp: Date.now() };
      });
  }

  // ==================== 6. فحص DOM ====================
  checkDOMHealth() {
    const requiredElements = [
      'chat-messages',
      'chat-input',
      'social-chat',
      'tools',
      'profile',
      'projects'
    ];

    const missing = [];
    requiredElements.forEach(id => {
      if (!document.getElementById(id)) {
        missing.push(id);
      }
    });

    if (missing.length > 0) {
      this.addIssue('dom', `⚠️ Missing DOM Elements: ${missing.join(', ')}`, 'high');
    }

    // Check for console errors in DOM
    const bodyHTML = document.body.innerHTML;
    if (bodyHTML.includes('undefined') || bodyHTML.includes('null')) {
      this.addIssue('dom', '⚠️ Potential null/undefined values in DOM', 'medium');
    }

    this.metrics.dom = {
      totalElements: document.querySelectorAll('*').length,
      missingElements: missing.length,
      timestamp: Date.now()
    };
  }

  // ==================== 7. فحص LocalStorage ====================
  checkStorageHealth() {
    try {
      const space = localStorage.length;
      let totalSize = 0;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        totalSize += key.length + value.length;
      }

      const storageMB = Math.round(totalSize / 1024 / 1024 * 100) / 100;
      
      if (storageMB > 5) {
        this.addIssue('storage', `⚠️ LocalStorage كبير جداً: ${storageMB}MB`, 'medium');
      }

      // Check for corrupted data
      const criticalKeys = ['el', 'social_chat_data', 'learning_data'];
      criticalKeys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            JSON.parse(data);
          } catch (e) {
            this.addIssue('storage', `🔴 Corrupted LocalStorage: ${key}`, 'high');
          }
        }
      });

      this.metrics.storage = {
        items: space,
        size: storageMB,
        timestamp: Date.now()
      };
    } catch (e) {
      this.addIssue('storage', `🔴 LocalStorage Error: ${e.message}`, 'high');
    }
  }

  // ==================== 8. فحص Dependencies ====================
  checkDependencies() {
    const requiredScripts = [
      { name: 'Socket.IO', check: () => !!window.io },
      { name: 'Error Logger', check: () => !!window.errorLogger },
      { name: 'Social Chat Pro', check: () => !!window.socialChatPro },
      { name: 'Learning Engine', check: () => !!window.learningEngine },
      { name: 'Config Engine', check: () => !!window.configEngine }
    ];

    requiredScripts.forEach(script => {
      if (!script.check()) {
        this.addIssue('dependencies', `⚠️ Missing: ${script.name}`, 'medium');
      }
    });

    this.metrics.dependencies = {
      loaded: requiredScripts.filter(s => s.check()).length,
      total: requiredScripts.length,
      timestamp: Date.now()
    };
  }

  // ==================== 9. فحص التكوين ====================
  checkConfiguration() {
    const issues = [];

    // Check Backend URL
    if (!window.BACKEND_URL || window.BACKEND_URL === '') {
      issues.push('BACKEND_URL');
    }

    // Check required globals
    if (!currentUser) {
      issues.push('currentUser');
    }

    if (issues.length > 0) {
      this.addIssue('config', `⚠️ Configuration Missing: ${issues.join(', ')}`, 'high');
    }

    this.metrics.config = {
      backendUrl: !!window.BACKEND_URL,
      currentUser: !!currentUser,
      timestamp: Date.now()
    };
  }

  // ==================== 10. فحص البيانات ====================
  checkDataIntegrity() {
    try {
      // Check error logs integrity
      const errorLog = localStorage.getItem('el');
      if (errorLog) {
        const errors = JSON.parse(errorLog);
        if (!Array.isArray(errors)) {
          this.addIssue('data', '⚠️ Error Log data structure invalid', 'medium');
        }
        if (errors.length > 100) {
          this.addIssue('data', `⚠️ Too many errors logged: ${errors.length}`, 'medium');
        }
      }

      // Check learning data
      const learningData = localStorage.getItem('learning_data');
      if (learningData) {
        JSON.parse(learningData);
      }

      // Check social chat data
      const chatData = localStorage.getItem('social_chat_data');
      if (chatData) {
        JSON.parse(chatData);
      }

      this.metrics.data = {
        integrityCheckPassed: true,
        timestamp: Date.now()
      };
    } catch (e) {
      this.addIssue('data', `🔴 Data Integrity Error: ${e.message}`, 'high');
      this.metrics.data = { integrityCheckPassed: false, error: e.message };
    }
  }

  // ==================== إضافة مشكلة ====================
  addIssue(category, message, severity = 'medium') {
    const issue = {
      id: `${category}_${Date.now()}`,
      category,
      message,
      severity,
      timestamp: Date.now(),
      count: 1
    };

    // تجنب التكرار الفوري
    const duplicate = this.issues.find(i => 
      i.category === category && 
      i.message === message && 
      Date.now() - i.timestamp < 5000
    );

    if (duplicate) {
      duplicate.count++;
      duplicate.timestamp = Date.now();
    } else {
      this.issues.unshift(issue);
      if (this.issues.length > this.maxIssues) {
        this.issues.pop();
      }
    }

    // Save to localStorage
    localStorage.setItem('monitor_issues', JSON.stringify(this.issues));
  }

  // ==================== حفظ المقاييس ====================
  saveMetrics() {
    localStorage.setItem('monitor_metrics', JSON.stringify(this.metrics));
  }

  // ==================== الحصول على التقرير ====================
  getFullReport() {
    const criticalIssues = this.issues.filter(i => i.severity === 'critical');
    const highIssues = this.issues.filter(i => i.severity === 'high');
    const mediumIssues = this.issues.filter(i => i.severity === 'medium');

    return {
      issues: this.issues,
      metrics: this.metrics,
      summary: {
        totalIssues: this.issues.length,
        critical: criticalIssues.length,
        high: highIssues.length,
        medium: mediumIssues.length,
        timestamp: Date.now()
      },
      health: this.calculateHealthScore(),
      recommendations: this.generateRecommendations()
    };
  }

  // ==================== درجة الصحة ====================
  calculateHealthScore() {
    const total = this.issues.length;
    const critical = this.issues.filter(i => i.severity === 'critical').length * 10;
    const high = this.issues.filter(i => i.severity === 'high').length * 5;
    const medium = this.issues.filter(i => i.severity === 'medium').length * 2;

    const score = Math.max(0, 100 - (critical + high + medium));
    let status = '🟢 ممتاز';
    if (score < 50) status = '🔴 سيء';
    else if (score < 70) status = '🟠 متوسط';
    else if (score < 85) status = '🟡 جيد';

    return { score, status };
  }

  // ==================== التوصيات ====================
  generateRecommendations() {
    const recommendations = [];

    if (this.metrics.memory?.percentage > 75) {
      recommendations.push('💡 قم بتحرير الذاكرة - قد يكون هناك memory leak');
    }

    if (this.metrics.performance?.pageLoadTime > 5000) {
      recommendations.push('💡 تحسين سرعة تحميل الصفحة - استخدم lazy loading');
    }

    if (!window.socket?.connected) {
      recommendations.push('💡 تحقق من اتصال Socket.IO - قد يكون Backend غير متاح');
    }

    if (this.metrics.storage?.size > 5) {
      recommendations.push('💡 قلل حجم LocalStorage - احذف البيانات القديمة');
    }

    const criticalIssues = this.issues.filter(i => i.severity === 'critical');
    if (criticalIssues.length > 0) {
      recommendations.push('🚨 هناك مشاكل حرجة تحتاج فوري - اتخذ إجراء الآن');
    }

    return recommendations;
  }

  // ==================== التصدير ====================
  exportReport() {
    const report = this.getFullReport();
    const json = JSON.stringify(report, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monitor-report-${new Date().toISOString()}.json`;
    a.click();
  }
}

// Initialize
window.advancedMonitor = new AdvancedErrorMonitor();
console.log('✅ Advanced Error Monitor loaded');
