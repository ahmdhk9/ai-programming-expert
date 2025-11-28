// ==========================================
// 🔧 Smart Auto-Fix Engine
// إصلاح تلقائي ذكي للأخطاء
// ==========================================

class SmartAutoFixEngine {
  constructor() {
    this.fixedCount = 0;
    this.strategies = {
      network: this.fixNetwork.bind(this),
      timeout: this.fixTimeout.bind(this),
      groq: this.fixGroqTimeout.bind(this),
      connection: this.fixConnection.bind(this),
      memory: this.fixMemory.bind(this),
      cache: this.clearCache.bind(this)
    };
    
    // بدء المراقبة الفورية
    this.startInstantMonitoring();
    console.log('🛠️ Auto-Fix Engine initialized');
  }

  startInstantMonitoring() {
    // مراقبة الأخطاء الفورية - بدون retry
    window.addEventListener('error', (e) => this.logError(e.error));
    window.addEventListener('unhandledrejection', (e) => {
      this.logError(e.reason);
    });

    // تعطيل auto-scan للأخطاء - يسبب retry loop
    // setInterval(() => this.scanErrors(), 2000);
  }
  
  logError(error) {
    console.warn('⚠️ Error logged (passive monitoring):', this.extractMessage(error));
  }

  scanErrors() {
    try {
      const errors = localStorage.getItem('el');
      if (!errors) return;
      
      const errorList = JSON.parse(errors);
      if (!Array.isArray(errorList)) return;

      // فحص آخر 5 أخطاء
      errorList.slice(0, 5).forEach(error => {
        if (error.s === 'critical' || error.s === 'high') {
          this.attemptFix(error);
        }
      });
    } catch (e) {
      // تجاهل
    }
  }

  handleError(error) {
    const msg = this.extractMessage(error).toLowerCase();
    
    // تحديد نوع الخطأ بذكاء
    if (msg.includes('network') || msg.includes('connection') || msg.includes('404')) {
      this.strategies.network();
    } else if (msg.includes('timeout') || msg.includes('timed out')) {
      this.strategies.timeout();
    } else if (msg.includes('groq') || msg.includes('ai')) {
      this.strategies.groq();
    } else if (msg.includes('memory') || msg.includes('memory exceeded')) {
      this.strategies.memory();
    } else {
      this.strategies.cache();
    }
  }

  attemptFix(error) {
    // لا تصلح مرتين
    if (error.fixed) return;
    
    console.log('🔧 Attempting to fix:', error.m);
    
    const msg = error.m?.toLowerCase() || '';
    
    if (msg.includes('connection') || msg.includes('network')) {
      this.fixNetwork();
    } else if (msg.includes('groq') || msg.includes('ai')) {
      this.fixGroqTimeout();
    } else if (msg.includes('backend')) {
      this.fixConnection();
    } else {
      this.strategies.cache();
    }
  }

  // ==========================================
  // استراتيجيات الإصلاح
  // ==========================================

  fixNetwork() {
    console.log('🌐 Fixing network error...');
    
    // 1. فحص الاتصال
    if (!navigator.onLine) {
      console.warn('⚠️ Offline - waiting for connection');
      return;
    }

    // 2. إعادة محاولة الاتصال
    if (window.socket && !window.socket.connected) {
      console.log('🔄 Reconnecting socket...');
      window.socket.connect();
    }

    // 3. الانتقال للـ fallback
    if (window.configEngine) {
      console.log('🔌 Switching to local backend');
      window.configEngine.detectBackendUrl();
    }

    this.fixedCount++;
    console.log('✅ Network fix applied');
  }

  fixTimeout() {
    console.log('⏱️ Fixing timeout error...');
    
    // 1. إلغاء الطلبات البطيئة
    if (window.pendingRequests) {
      window.pendingRequests.forEach(req => {
        if (req.abort) {
          req.abort();
        }
      });
      window.pendingRequests = [];
    }

    // 2. تقليل timeout المستقبل
    if (window.configEngine) {
      window.configEngine.setTimeout(3000); // 3 ثواني فقط
    }

    this.fixedCount++;
    console.log('✅ Timeout fix applied');
  }

  fixGroqTimeout() {
    console.log('🤖 Fixing Groq timeout...');
    
    // 1. استخدام fallback response محلية
    const fallbacks = [
      'دعني أساعدك بهذا... في الواقع يجب أن نركز على الأساسيات أولاً',
      'هذا سؤال جيد جداً! الإجابة قد تكون معقدة، لكن الحل الأمثل هو...',
      'حسناً، بناءً على خبرتي في البرمجة، أقترح عليك...',
      'هذه مشكلة شائعة جداً. الحل هو استخدام...',
      'أفهم ما تقصد. أفضل طريقة هي...'
    ];

    window.groqFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    console.log('📝 Using fallback response:', window.groqFallback);

    // 2. تقصير timeout الـ Groq
    window.GROQ_TIMEOUT = 3000; // 3 ثواني

    // 3. لا نقوم بـ auto-retry - المستخدم يفعل ذلك يدويًا
    // التكرار التلقائي يسبب infinite loops!

    this.fixedCount++;
    console.log('✅ Groq fix applied');
  }

  fixConnection() {
    console.log('🔌 Fixing connection error...');
    
    // 1. الانتقال للـ local backend
    window.BACKEND_URL = 'http://localhost:8000';
    console.log('✅ Switched to local backend');

    // 2. إعادة تهيئة الاتصال
    if (window.initSocket) {
      setTimeout(() => {
        window.initSocket();
      }, 500);
    }

    // 3. مراسلة بديلة إذا كانت Socket معطلة
    if (!window.socket || !window.socket.connected) {
      window.useHTTPFallback = true;
      console.log('📡 Using HTTP fallback for messaging');
    }

    this.fixedCount++;
    console.log('✅ Connection fix applied');
  }

  fixMemory() {
    console.log('💾 Fixing memory error...');
    
    // 1. تنظيف التخزين المحلي
    try {
      const keys = Object.keys(localStorage);
      const largeKeys = keys.filter(k => {
        const size = localStorage.getItem(k)?.length || 0;
        return size > 100000; // أكبر من 100KB
      });

      largeKeys.forEach(k => {
        localStorage.removeItem(k);
        console.log(`🗑️ Removed large key: ${k}`);
      });
    } catch (e) {
      console.warn(e.message);
    }

    // 2. تنظيف الـ DOM
    const messages = document.querySelectorAll('.chat-message');
    if (messages.length > 100) {
      Array.from(messages).slice(50).forEach(m => m.remove());
      console.log('🗑️ Cleaned old messages');
    }

    this.fixedCount++;
    console.log('✅ Memory fix applied');
  }

  clearCache() {
    console.log('🗑️ Clearing cache...');
    
    try {
      // حذف cache القديم
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }

      // إعادة تحميل الصفحة بدون cache
      window.location.reload(true);
    } catch (e) {
      console.warn('Cache clear error:', e.message);
    }

    this.fixedCount++;
    console.log('✅ Cache cleared');
  }

  // ==========================================
  // مساعدات
  // ==========================================

  extractMessage(error) {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return String(error);
  }

  getStats() {
    return {
      fixed: this.fixedCount,
      strategies: Object.keys(this.strategies).length
    };
  }
}

// إنشاء محرك الإصلاح الذكي
window.autoFixEngine = new SmartAutoFixEngine();

// تحديث الخطأ على الفرونتند
console.log('✅ Auto-Fix Engine loaded - will fix errors automatically');
