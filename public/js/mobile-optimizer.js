// ==========================================
// 📱 Mobile Performance Optimizer
// تحسين الأداء على الهاتف
// ==========================================

class MobileOptimizer {
  constructor() {
    this.isMobile = this.detectMobile();
    this.isTablet = this.detectTablet();
    this.optimizeForMobile();
    console.log(`📱 Mobile Optimizer: ${this.isMobile ? 'MOBILE' : this.isTablet ? 'TABLET' : 'DESKTOP'}`);
  }

  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  detectTablet() {
    return /iPad|Android/i.test(navigator.userAgent) && !/iPhone|iPod/i.test(navigator.userAgent);
  }

  optimizeForMobile() {
    if (!this.isMobile && !this.isTablet) return;

    // 1. تعطيل الـ Advanced Monitoring على الهاتف
    this.disableHeavyMonitoring();

    // 2. تقليل تكرار الفحوصات
    this.reduceIntervalFrequency();

    // 3. تنظيف الـ Event Listeners غير الضرورية
    this.cleanupEventListeners();

    // 4. تقليل Socket.IO الاتصالات
    this.optimizeSocketIO();
  }

  disableHeavyMonitoring() {
    const toDisable = [
      'window.advancedMonitor',
      'window.hybridMonitor',
      'window.aiDiagnostics',
      'window.deploymentMonitor',
      'window.codeQualityChecker'
    ];

    toDisable.forEach(obj => {
      const val = eval(obj);
      if (val && val.stop) {
        val.stop();
        console.log(`📱 Disabled: ${obj}`);
      }
    });
  }

  reduceIntervalFrequency() {
    // معاد الفحوصات من 3 ثواني إلى 30 ثانية
    window.MONITORING_INTERVAL = this.isMobile ? 30000 : 5000;
    window.HEALTH_CHECK_INTERVAL = this.isMobile ? 60000 : 30000;
    window.ERROR_BATCH_INTERVAL = this.isMobile ? 15000 : 10000;
    
    console.log(`📱 Intervals optimized: ${window.MONITORING_INTERVAL}ms`);
  }

  cleanupEventListeners() {
    // تقليل الـ scroll listeners على الهاتف
    document.removeEventListener('scroll', window._excessiveScrollListener);
    document.removeEventListener('touchmove', window._excessiveTouchListener);
    
    console.log('📱 Event listeners cleaned');
  }

  optimizeSocketIO() {
    if (!window.socket) return;

    // تقليل ping interval على الهاتف
    if (window.socket.io) {
      window.socket.io.engine.pingInterval = this.isMobile ? 60000 : 25000;
      window.socket.io.engine.pingTimeout = this.isMobile ? 60000 : 20000;
      console.log('📱 Socket.IO optimized');
    }
  }

  // تقليل استهلاك DOM
  enableDOMOptimizations() {
    // lazy loading للرسائل
    document.querySelectorAll('[data-lazy]').forEach(el => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(el);
    });
  }
}

// Initialize
window.mobileOptimizer = new MobileOptimizer();
