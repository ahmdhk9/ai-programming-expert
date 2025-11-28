/**
 * 🔄 Resilience Engine - نظام المرونة والتعافي
 * يتعامل مع فشل الاتصال بذكاء
 */

class ResilienceEngine {
  constructor() {
    this.cache = new Map();
    this.requestQueue = [];
    this.isProcessing = false;
    this.connectionStatus = 'UNKNOWN';
    this.backoffMultiplier = 1.5;
    this.maxBackoff = 30000;
    this.minBackoff = 1000;
    this.currentBackoff = this.minBackoff;
  }

  // 1. Smart Cache Layer
  cacheResponse(key, data, ttl = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  getCachedResponse(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  // 2. Request Queue Management
  queueRequest(fn, priority = 'normal') {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({
        fn,
        resolve,
        reject,
        priority,
        timestamp: Date.now()
      });

      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.requestQueue.length > 0) {
      // Sort by priority
      this.requestQueue.sort((a, b) => {
        const priorityMap = { critical: 3, high: 2, normal: 1, low: 0 };
        return priorityMap[b.priority] - priorityMap[a.priority];
      });

      const { fn, resolve, reject } = this.requestQueue.shift();

      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      }

      // Respect backoff
      if (this.requestQueue.length > 0) {
        await new Promise(r => setTimeout(r, this.currentBackoff));
      }
    }

    this.isProcessing = false;
  }

  // 3. Connection Monitor
  startConnectionMonitoring() {
    setInterval(() => {
      this.checkConnection();
    }, 10000); // Check every 10 seconds
  }

  async checkConnection() {
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
        timeout: 3000
      });

      if (response.ok) {
        this.connectionStatus = 'ONLINE';
        this.currentBackoff = this.minBackoff; // Reset backoff
        console.log('✅ Connection restored');
      } else {
        this.connectionStatus = 'DEGRADED';
      }
    } catch (e) {
      this.connectionStatus = 'OFFLINE';
      this.increaseBackoff();
      console.warn('⚠️ Connection failed, increasing backoff');
    }
  }

  increaseBackoff() {
    this.currentBackoff = Math.min(
      this.currentBackoff * this.backoffMultiplier,
      this.maxBackoff
    );
  }

  // 4. Fallback Mechanism
  async fetchWithFallback(url, options = {}) {
    const cacheKey = `${url}:${JSON.stringify(options)}`;

    try {
      // Try primary request
      const response = await fetch(url, {
        ...options,
        timeout: 5000
      });

      if (response.ok) {
        const data = await response.json();
        this.cacheResponse(cacheKey, data);
        return data;
      }

      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.warn(`⚠️ Primary request failed: ${error.message}`);

      // Try cache
      const cached = this.getCachedResponse(cacheKey);
      if (cached) {
        console.log('💾 Using cached response');
        return cached;
      }

      // Try fallback URL
      if (!url.includes('localhost')) {
        try {
          const fallbackUrl = url.replace(/https?:\/\/[^/]+/, '/api');
          console.log(`🔄 Trying fallback URL: ${fallbackUrl}`);

          const response = await fetch(fallbackUrl, {
            ...options,
            timeout: 3000
          });

          if (response.ok) {
            const data = await response.json();
            this.cacheResponse(cacheKey, data);
            return data;
          }
        } catch (e) {
          console.warn(`⚠️ Fallback also failed: ${e.message}`);
        }
      }

      // Return empty response
      return { error: 'offline', data: null };
    }
  }

  // 5. Auto Recovery
  startAutoRecovery() {
    setInterval(() => {
      if (this.connectionStatus === 'OFFLINE') {
        console.log('🔄 Attempting recovery...');
        this.checkConnection();
      }
    }, 30000); // Try recovery every 30 seconds
  }

  // 6. Statistics
  getStats() {
    return {
      connectionStatus: this.connectionStatus,
      cacheSize: this.cache.size,
      queueLength: this.requestQueue.length,
      currentBackoff: this.currentBackoff,
      timestamp: new Date().toISOString()
    };
  }
}

// Global instance
const resilience = new ResilienceEngine();

// Auto-start monitoring
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    resilience.startConnectionMonitoring();
    resilience.startAutoRecovery();
  });
} else {
  resilience.startConnectionMonitoring();
  resilience.startAutoRecovery();
}
