/**
 * 🚨 ADVANCED ERROR DETECTION ENGINE
 * يكتشف الأخطاء المكدسة ويصلحها فوراً
 */

class ErrorDetector {
  constructor() {
    this.errors = [];
    this.alerts = [];
    this.fixes = [];
    this.patterns = {
      networkError: /Failed to fetch|Network error|ERR_CONNECTION/i,
      timeout: /timeout|timed out|TIMEOUT/i,
      transportError: /TransportError|Connection refused/i,
      socketError: /Socket\.IO|WebSocket|polling/i,
      port5000: /localhost:5000|127.0.0.1:5000|:5000/i
    };
    this.errorCount = {};
    this.startMonitoring();
  }

  startMonitoring() {
    // Monitor network errors
    window.addEventListener('fetch', (e) => {
      if (e.request && !e.request.url.includes('/health')) {
        console.log('📡 Fetch:', e.request.url);
      }
    }, true);

    // Monitor console errors
    const originalError = console.error;
    console.error = (...args) => {
      this.detectError(args);
      originalError.apply(console, args);
    };

    // Monitor console warnings
    const originalWarn = console.warn;
    console.warn = (...args) => {
      this.detectWarning(args);
      originalWarn.apply(console, args);
    };

    // Monitor unhandled rejections
    window.addEventListener('unhandledrejection', (e) => {
      this.handleCriticalError(e.reason);
    });

    console.log('🚨 Error Detection Engine started');
  }

  detectError(args) {
    const errorStr = JSON.stringify(args);
    
    if (this.patterns.networkError.test(errorStr)) {
      this.reportError('NETWORK', errorStr, 'Failed to fetch - network issue');
    }
    if (this.patterns.transportError.test(errorStr)) {
      this.reportError('TRANSPORT', errorStr, 'Socket.IO connection failed');
    }
    if (this.patterns.socketError.test(errorStr)) {
      this.reportError('SOCKET', errorStr, 'WebSocket connection failed');
    }
  }

  detectWarning(args) {
    const warnStr = JSON.stringify(args);
    
    if (this.patterns.port5000.test(warnStr)) {
      this.reportError('CONFIG', warnStr, 'Trying to use port 5000 - should be 8000');
      this.autoFixPort5000();
    }
    if (this.patterns.networkError.test(warnStr)) {
      this.reportError('NETWORK', warnStr, 'Network connectivity issue');
      this.autoFixNetwork();
    }
  }

  reportError(type, details, description) {
    const errorId = `${type}_${Date.now()}`;
    
    // Count repeated errors
    this.errorCount[type] = (this.errorCount[type] || 0) + 1;
    
    const error = {
      id: errorId,
      type,
      description,
      details,
      timestamp: new Date().toISOString(),
      count: this.errorCount[type]
    };

    this.errors.push(error);

    // Alert if repeated
    if (this.errorCount[type] > 3) {
      this.createAlert(type, description, error.count);
    }

    // Auto-fix based on type
    this.attemptAutoFix(type);
  }

  createAlert(type, description, count) {
    const alert = {
      id: `alert_${Date.now()}`,
      type,
      description: `${description} (occurred ${count} times)`,
      severity: count > 5 ? 'CRITICAL' : count > 3 ? 'HIGH' : 'MEDIUM',
      timestamp: new Date().toISOString(),
      action: this.getRecommendedAction(type)
    };

    this.alerts.push(alert);
    console.log(`🚨 ALERT [${alert.severity}]: ${description} - Action: ${alert.action}`);
  }

  getRecommendedAction(type) {
    const actions = {
      NETWORK: 'Check network connection, retry connection',
      TRANSPORT: 'Reconnect Socket.IO, switch backend',
      SOCKET: 'Restart WebSocket connection',
      CONFIG: 'Fix configuration, restart frontend',
      TIMEOUT: 'Increase timeout, check backend health'
    };
    return actions[type] || 'Investigate error';
  }

  attemptAutoFix(type) {
    switch (type) {
      case 'NETWORK':
        this.autoFixNetwork();
        break;
      case 'TRANSPORT':
        this.autoFixSocket();
        break;
      case 'SOCKET':
        this.autoFixSocket();
        break;
      case 'CONFIG':
        this.autoFixPort5000();
        break;
      case 'TIMEOUT':
        this.autoFixTimeout();
        break;
    }
  }

  autoFixNetwork() {
    console.log('🔧 Attempting network fix...');
    
    if (window.configEngine) {
      window.configEngine.detectBackendUrl().then(url => {
        console.log('✅ Network fix applied:', url);
        this.recordFix('NETWORK', 'Re-detected backend URL');
      });
    }
  }

  autoFixSocket() {
    console.log('🔧 Attempting Socket.IO fix...');
    
    if (window.initSocket) {
      window.initSocket();
      this.recordFix('SOCKET', 'Reinitialized Socket.IO connection');
      console.log('✅ Socket.IO fix applied');
    }
  }

  autoFixPort5000() {
    console.log('🔧 Attempting port 5000 fix...');
    
    if (window.configEngine) {
      const isProduction = window.location.hostname.includes('vercel.app') || window.location.hostname.includes('firebaseapp.com');
      window.configEngine.backendUrls = isProduction ? 
        ['https://agent-backend-ahmd1.fly.dev'] : 
        ['http://localhost:8000', 'http://127.0.0.1:8000'];
      window.configEngine.detectBackendUrl();
      this.recordFix('CONFIG', 'Removed port 5000, using 8000');
      console.log('✅ Port 5000 fix applied');
    }
  }

  autoFixTimeout() {
    console.log('🔧 Attempting timeout fix...');
    
    if (window.configEngine) {
      window.configEngine.healthCheckInterval = 60000; // Increase interval
      this.recordFix('TIMEOUT', 'Increased health check interval');
      console.log('✅ Timeout fix applied');
    }
  }

  handleCriticalError(error) {
    console.error('🚨 CRITICAL ERROR:', error);
    this.reportError('CRITICAL', JSON.stringify(error), 'Unhandled rejection detected');
  }

  recordFix(type, fixDescription) {
    const fix = {
      type,
      description: fixDescription,
      timestamp: new Date().toISOString(),
      success: true
    };
    this.fixes.push(fix);
  }

  getReport() {
    return {
      timestamp: new Date().toISOString(),
      totalErrors: this.errors.length,
      errorsByType: this.errorCount,
      alerts: this.alerts,
      fixesApplied: this.fixes,
      healthScore: this.calculateHealthScore()
    };
  }

  calculateHealthScore() {
    const errorScore = Math.min(this.errors.length * 5, 50);
    const fixScore = Math.min(this.fixes.length * 3, 30);
    const alertScore = this.alerts.filter(a => a.severity === 'CRITICAL').length * 20;
    
    return Math.max(0, 100 - errorScore - alertScore + fixScore);
  }

  printReport() {
    const report = this.getReport();
    console.log('\n' + '═'.repeat(70));
    console.log('🚨 ERROR DETECTION REPORT');
    console.log('═'.repeat(70) + '\n');
    
    console.log('📊 Statistics:');
    console.log(`   Total Errors: ${report.totalErrors}`);
    console.log(`   Fixes Applied: ${report.fixesApplied.length}`);
    console.log(`   Health Score: ${report.healthScore}%\n`);

    console.log('🔍 Errors by Type:');
    Object.entries(report.errorsByType).forEach(([type, count]) => {
      console.log(`   • ${type}: ${count}`);
    });

    console.log('\n🚨 Active Alerts:');
    if (report.alerts.length === 0) {
      console.log('   ✅ No alerts');
    } else {
      report.alerts.slice(-5).forEach(alert => {
        console.log(`   [${alert.severity}] ${alert.description}`);
      });
    }

    console.log('\n✅ Fixes Applied:');
    if (report.fixesApplied.length === 0) {
      console.log('   No fixes yet');
    } else {
      report.fixesApplied.slice(-5).forEach(fix => {
        console.log(`   ✅ ${fix.description}`);
      });
    }

    console.log('\n' + '═'.repeat(70) + '\n');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.errorDetector = new ErrorDetector();
  });
} else {
  window.errorDetector = new ErrorDetector();
}
