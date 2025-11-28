// ==========================================
// 🔍 Smart Lightweight Error Logger
// محسّن للـ Replit المجاني
// ==========================================

class LightweightErrorLogger {
  constructor() {
    this.errors = [];
    this.maxErrors = 50; // قليل لتوفير الموارد
    this.maxStorageSize = 1024 * 50; // 50KB فقط
    this.errorBatch = []; // تجميع الأخطاء
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    this.batchInterval = isMobile ? 30000 : 10000; // 30s على الهاتف
    this.duplicateWindow = isMobile ? 10000 : 5000; // تجاهل التكرار الفوري
    this.lastErrorTime = {};
    this.errorCounts = {}; // تتبع تكرار الأخطاء
    
    this.initializeListeners();
    this.loadStoredErrors();
    this.startBatchSender();
    console.log('🔍 Lightweight Error Logger initialized');
  }

  initializeListeners() {
    window.addEventListener('error', (e) => this.logError(e.error, 'uncaught'));
    window.addEventListener('unhandledrejection', (e) => {
      this.logError(e.reason, 'promise');
    });

    const originalError = console.error;
    console.error = (...args) => {
      originalError.apply(console, args);
      if (args[0] && typeof args[0] === 'object') {
        this.logError(args[0], 'console');
      }
    };

    // Monitor Fetch calls
    this.interceptFetch();
    
    // Monitor Socket.IO errors
    this.interceptSocket();
  }

  // اعتراض Fetch calls - تسجيل أخطاء الشبكة
  interceptFetch() {
    const originalFetch = window.fetch;
    window.fetch = (...args) => {
      const start = Date.now();
      return originalFetch.apply(window, args)
        .then(response => {
          if (!response.ok) {
            this.logError({
              message: `API Error: ${response.status} ${response.statusText} - ${args[0]}`,
              status: response.status,
              url: args[0]
            }, 'api-error');
          }
          return response;
        })
        .catch(error => {
          this.logError({
            message: `Network Error: ${error.message} - ${args[0]}`,
            url: args[0],
            duration: Date.now() - start
          }, 'network-error');
          throw error;
        });
    };
  }

  // اعتراض Socket.IO errors
  interceptSocket() {
    const checkSocket = setInterval(() => {
      if (window.socket) {
        clearInterval(checkSocket);
        
        window.socket.on('error', (error) => {
          this.logError({
            message: `Socket Error: ${error?.message || JSON.stringify(error)}`,
            type: 'socket'
          }, 'socket-error');
        });

        window.socket.on('connect_error', (error) => {
          this.logError({
            message: `Connection Error: ${error?.message || 'Unable to connect'}`,
            code: error?.code
          }, 'connection-error');
        });

        window.socket.on('disconnect', (reason) => {
          if (reason !== 'io client namespace disconnect') {
            this.logError({
              message: `Disconnected: ${reason}`,
              reason: reason
            }, 'disconnect');
          }
        });
      }
    }, 100);
  }

  // ضغط الخطأ - حذف المعلومات غير الضرورية
  compressError(error, type) {
    const msg = this.extractMessage(error);
    const hash = this.hashString(msg); // معرف فريد

    // تجاهل التكرار الفوري
    if (this.lastErrorTime[hash] && Date.now() - this.lastErrorTime[hash] < this.duplicateWindow) {
      this.errorCounts[hash] = (this.errorCounts[hash] || 1) + 1;
      return null;
    }

    this.lastErrorTime[hash] = Date.now();

    return {
      id: hash,
      t: Math.floor(Date.now() / 1000), // timestamp مختصر
      m: msg.substring(0, 100), // رسالة مختصرة
      s: this.calculateSeverity(error),
      type,
      c: this.errorCounts[hash] || 1 // عدد المرات
    };
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  logError(error, type = 'uncaught') {
    const compressed = this.compressError(error, type);
    if (!compressed) return; // تكرار فوري - تجاهل

    this.errors.unshift(compressed);
    if (this.errors.length > this.maxErrors) {
      this.errors.pop();
    }

    this.errorBatch.push(compressed);
    this.saveErrors();

    // إذا كان حرجاً - أرسل فوراً
    if (compressed.s === 'critical') {
      this.flushBatch();
    }
  }

  extractMessage(error) {
    if (typeof error === 'string') return error.substring(0, 80);
    if (error?.message) return error.message.substring(0, 80);
    return 'Unknown error'.substring(0, 80);
  }

  calculateSeverity(error) {
    const msg = this.extractMessage(error).toLowerCase();
    if (msg.includes('critical') || msg.includes('disconnect')) return 'critical';
    if (msg.includes('network') || msg.includes('fail') || msg.includes('error: ') || msg.includes('connection')) return 'high';
    if (msg.includes('timeout') || msg.includes('pending')) return 'medium';
    return 'medium';
  }

  saveErrors() {
    try {
      const compressed = JSON.stringify(this.errors);
      
      // تجنب Storage Over Quota
      if (compressed.length > this.maxStorageSize) {
        this.errors = this.errors.slice(0, Math.floor(this.maxErrors / 2));
      }

      localStorage.setItem('el', compressed); // اسم قصير
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        // حذف 50% من الأخطاء
        this.errors = this.errors.slice(0, Math.floor(this.maxErrors / 2));
        try {
          localStorage.setItem('el', JSON.stringify(this.errors));
        } catch (e2) {
          console.warn('⚠️ Storage full');
        }
      }
    }
  }

  loadStoredErrors() {
    try {
      const stored = localStorage.getItem('el');
      if (stored) {
        this.errors = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('⚠️ Could not load errors');
    }
  }

  startBatchSender() {
    setInterval(() => {
      if (this.errorBatch.length > 0) {
        this.flushBatch();
      }
    }, this.batchInterval);
  }

  flushBatch() {
    if (this.errorBatch.length === 0) return;

    const batch = [...this.errorBatch];
    this.errorBatch = [];

    // استخدم Backend URL الصحيح من window أو configEngine
    let backendUrl = window.BACKEND_URL || 'https://agent-backend-ahmd1.fly.dev';
    
    fetch(`${backendUrl}/api/errors/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
      mode: 'cors'
    }).catch(() => {
      // الأخطاء محفوظة في localStorage
    });
  }

  getErrors() {
    return this.errors;
  }

  getQuickStats() {
    return {
      total: this.errors.length,
      critical: this.errors.filter(e => e.s === 'critical').length,
      high: this.errors.filter(e => e.s === 'high').length,
      batched: this.errorBatch.length
    };
  }

  clearErrors() {
    this.errors = [];
    this.errorBatch = [];
    localStorage.removeItem('el');
    console.log('✅ Error log cleared');
  }
}

// استبدال العام
window.errorLogger = new LightweightErrorLogger();
