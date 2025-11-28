// ==========================================
// ⚡ Performance & Caching Engine
// Advanced Optimization System
// ==========================================

class PerformanceEngine {
  constructor() {
    this.cache = new Map();
    this.requestCache = new Map();
    this.maxCacheSize = 100;
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes
    this.stats = {
      hits: 0,
      misses: 0,
      requests: 0
    };
    
    this.initServiceWorker();
    console.log('⚡ Performance Engine initialized');
  }

  // ==========================================
  // Request Caching
  // ==========================================
  
  async cachedFetch(url, options = {}) {
    const key = `${url}:${JSON.stringify(options)}`;
    
    // Check cache
    if (this.requestCache.has(key)) {
      const cached = this.requestCache.get(key);
      if (Date.now() - cached.time < this.cacheTTL) {
        this.stats.hits++;
        console.log('💾 Cache HIT:', url);
        return cached.data;
      }
      this.requestCache.delete(key);
    }

    this.stats.misses++;
    this.stats.requests++;

    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Store in cache
      this.requestCache.set(key, {
        data,
        time: Date.now()
      });

      // Cleanup old cache
      if (this.requestCache.size > this.maxCacheSize) {
        const firstKey = this.requestCache.keys().next().value;
        this.requestCache.delete(firstKey);
      }

      return data;
    } catch (error) {
      console.warn('⚠️ Fetch failed:', error.message);
      throw error;
    }
  }

  // ==========================================
  // Response Streaming
  // ==========================================

  async *streamResponse(text) {
    const words = text.split(' ');
    for (const word of words) {
      yield word + ' ';
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  }

  // ==========================================
  // Service Worker
  // ==========================================

  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(e => {
        console.log('⚠️ SW registration failed:', e.message);
      });
    }
  }

  // ==========================================
  // Memory Management
  // ==========================================

  optimizeMemory() {
    // Clear old cache
    for (const [key, value] of this.requestCache.entries()) {
      if (Date.now() - value.time > this.cacheTTL) {
        this.requestCache.delete(key);
      }
    }

    // Clear old DOM
    const messages = document.querySelectorAll('.chat-message');
    if (messages.length > 200) {
      Array.from(messages).slice(0, 100).forEach(m => m.remove());
    }

    console.log('🧹 Memory optimized');
  }

  // ==========================================
  // Stats
  // ==========================================

  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0 
      ? Math.round((this.stats.hits / (this.stats.hits + this.stats.misses)) * 100)
      : 0;

    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRate: hitRate + '%',
      requests: this.stats.requests,
      cacheSize: this.requestCache.size
    };
  }

  clearCache() {
    this.requestCache.clear();
    this.stats = { hits: 0, misses: 0, requests: 0 };
    console.log('🗑️ Cache cleared');
  }
}

window.perfEngine = new PerformanceEngine();

// Auto-optimize memory every 5 minutes
setInterval(() => window.perfEngine.optimizeMemory(), 5 * 60 * 1000);
