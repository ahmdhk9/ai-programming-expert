// نظام تحسين الأداء التلقائي
class PerformanceOptimizer {
  constructor() {
    this.metrics = { requests: 0, slowRequests: 0, avgTime: 0 };
    this.cache = new Map();
    this.requestTimes = [];
  }

  // تتبع أداء الطلب
  trackRequest(method, route, duration) {
    this.metrics.requests++;
    this.requestTimes.push(duration);

    if (duration > 1000) {
      this.metrics.slowRequests++;
      console.warn(`⚠️ Slow request: ${method} ${route} (${duration}ms)`);
    }

    this.metrics.avgTime = this.requestTimes.reduce((a, b) => a + b, 0) / this.requestTimes.length;

    if (this.requestTimes.length > 1000) {
      this.requestTimes.shift();
    }
  }

  // تخزين مؤقت ذكي
  smartCache(key, value, ttl = 300000) {
    this.cache.set(key, { value, expires: Date.now() + ttl });
    return value;
  }

  // الحصول من الكاش
  getFromCache(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (item.expires < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  // تنظيف الكاش المنتهي
  cleanupCache() {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, item] of this.cache.entries()) {
      if (item.expires < now) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    return cleaned;
  }

  // تحسين قاعدة البيانات
  optimizeDatabase() {
    return {
      cacheSize: this.cache.size,
      metrics: this.getMetrics()
    };
  }

  // الحصول على المقاييس
  getMetrics() {
    return {
      totalRequests: this.metrics.requests,
      slowRequests: this.metrics.slowRequests,
      avgResponseTime: Math.round(this.metrics.avgTime),
      cacheHitRate: ((this.cache.size / (this.metrics.requests + 1)) * 100).toFixed(2) + '%'
    };
  }

  // بدء التحسين المستمر
  startOptimization(interval = 30000) {
    setInterval(() => {
      const cleaned = this.cleanupCache();
      if (cleaned > 0) {
        console.log(`🧹 Cleaned ${cleaned} expired cache items`);
      }
    }, interval);
  }
}

module.exports = new PerformanceOptimizer();
