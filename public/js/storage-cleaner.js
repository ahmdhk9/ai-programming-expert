// ==========================================
// 🗑️  Smart Storage Cleaner for Mobile
// تنظيف ذاكرة الهاتف تلقائياً
// ==========================================

class StorageCleaner {
  constructor() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    this.maxStorageSize = 1024 * 100; // 100KB حد أقصى للـ localStorage
    this.init();
    console.log('🗑️ Storage Cleaner initialized');
  }

  init() {
    // تنظيف عند التحميل
    this.cleanStorage();
    
    // تنظيف دوري كل 5 دقائق
    setInterval(() => this.cleanStorage(), 5 * 60 * 1000);
    
    // تنظيف عند إغلاق الصفحة
    window.addEventListener('beforeunload', () => this.cleanExpiredData());
  }

  cleanStorage() {
    const isMobile = this.isMobile;
    
    try {
      let totalSize = 0;
      const keys = Object.keys(localStorage);
      const itemSizes = {};

      // حساب حجم كل عنصر
      keys.forEach(key => {
        const value = localStorage.getItem(key);
        const size = value ? value.length : 0;
        itemSizes[key] = size;
        totalSize += size;
      });

      // إذا تجاوز الحد - احذف العناصر القديمة
      if (totalSize > this.maxStorageSize) {
        console.log(`🗑️ Storage size: ${Math.round(totalSize / 1024)}KB - Cleaning...`);
        this.deleteOldestData(itemSizes, keys);
      }

      // على الهاتف: احذف السجلات القديمة جداً
      if (isMobile) {
        this.cleanOldLogs();
        this.clearOldCache();
      }

    } catch (e) {
      console.warn('⚠️ Storage cleanup error:', e.message);
    }
  }

  deleteOldestData(itemSizes, keys) {
    // احذف أكبر 3 عناصر (غالباً السجلات)
    const sorted = Object.entries(itemSizes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    sorted.forEach(([key, size]) => {
      // لا تحذف عناصر حساسة
      if (!['token', 'user', 'settings'].some(s => key.includes(s))) {
        localStorage.removeItem(key);
        console.log(`🗑️ Removed: ${key} (${Math.round(size / 1024)}KB)`);
      }
    });
  }

  cleanOldLogs() {
    const keys = ['el', 'errorBatch', 'logs'];
    keys.forEach(key => {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 50) {
            // احتفظ بآخر 20 سجل فقط
            const cleaned = parsed.slice(-20);
            localStorage.setItem(key, JSON.stringify(cleaned));
            console.log(`🗑️ Trimmed ${key}: ${parsed.length} → ${cleaned.length}`);
          }
        }
      } catch (e) {
        // تجاهل الأخطاء
      }
    });
  }

  clearOldCache() {
    // احذف Service Worker cache القديم
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('old') || name.includes('v1')) {
            caches.delete(name);
            console.log(`🗑️ Deleted old cache: ${name}`);
          }
        });
      });
    }
  }

  cleanExpiredData() {
    const now = Date.now();
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        const parsed = JSON.parse(value);

        // إذا كانت البيانات فيها timestamp - احذف إذا مرت 7 أيام
        if (parsed && parsed.timestamp) {
          const age = (now - parsed.timestamp) / (1000 * 60 * 60 * 24);
          if (age > 7) {
            localStorage.removeItem(key);
            console.log(`🗑️ Expired: ${key} (${age.toFixed(1)} days)`);
          }
        }
      } catch (e) {
        // تجاهل الأخطاء
      }
    });
  }

  getStorageStats() {
    let total = 0;
    const details = {};

    Object.keys(localStorage).forEach(key => {
      const size = localStorage.getItem(key).length;
      total += size;
      details[key] = size;
    });

    return {
      total: Math.round(total / 1024),
      items: Object.keys(localStorage).length,
      details
    };
  }
}

// Initialize
window.storageCleaner = new StorageCleaner();
