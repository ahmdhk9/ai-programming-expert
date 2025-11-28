// ==========================================
// 🤖 Smart Configuration Engine
// Auto-Detection & Auto-Recovery
// ==========================================

class ConfigEngine {
  constructor() {
    // تحديد Backend URL بناءً على البيئة
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isReplit = hostname.includes('replit');
    const isProduction = hostname.includes('vercel.app') || hostname.includes('firebaseapp.com');
    
    // الـ URLs الصحيحة
    this.backendUrls = isProduction
      ? ['https://agent-backend-ahmd1.fly.dev'] // Production: Fly.io
      : [
          'http://localhost:8000', // Development: Backend على port 8000
          isReplit ? `http://${hostname}:8000` : null,
          'http://127.0.0.1:8000'
        ].filter(url => url !== null);
    
    this.currentBackendUrl = null;
    this.healthCheckInterval = 30000;
    this.isOnline = navigator.onLine;
    this.config = this.loadConfig();
  }

  loadConfig() {
    const stored = localStorage.getItem('appConfig');
    return stored ? JSON.parse(stored) : {
      backendUrl: null,
      lastWorking: null,
      failureCount: 0,
      retryCount: 0
    };
  }

  saveConfig() {
    localStorage.setItem('appConfig', JSON.stringify(this.config));
  }

  async detectBackendUrl() {
    console.log('🔍 Detecting Backend URL...');
    
    // أولاً: جرب جميع URLs المتاحة
    for (const url of this.backendUrls) {
      if (await this.testBackend(url)) {
        this.currentBackendUrl = url;
        this.config.lastWorking = url;
        this.saveConfig();
        console.log('✅ Backend found at:', url);
        return url;
      }
    }

    // ثانياً: جرب آخر URL استخدمت
    if (this.config.lastWorking && await this.testBackend(this.config.lastWorking)) {
      this.currentBackendUrl = this.config.lastWorking;
      console.log('✅ Using last working URL:', this.currentBackendUrl);
      return this.currentBackendUrl;
    }

    // إذا فشل كل شيء: استخدم الأول في القائمة
    this.currentBackendUrl = this.backendUrls[0];
    console.warn('⚠️ Using default Backend:', this.currentBackendUrl);
    return this.currentBackendUrl;
  }

  async testBackend(url, timeout = 3000) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${url}/api/health`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      clearTimeout(timeoutId);
      const isOk = response.ok || response.status === 200;
      if (isOk) console.log(`✅ Backend OK: ${url}`);
      return isOk;
    } catch (error) {
      console.warn(`⚠️ Backend test failed for ${url}:`, error.message);
      return false;
    }
  }

  async startHealthCheck() {
    console.log('🏥 Starting Health Check Service');
    
    setInterval(async () => {
      if (!navigator.onLine) {
        console.warn('📡 Offline - skipping health check');
        return;
      }

      const isHealthy = await this.testBackend(this.currentBackendUrl, 5000);
      
      if (!isHealthy) {
        console.warn('❌ Backend unhealthy, attempting recovery...');
        await this.handleBackendFailure();
      } else {
        this.config.failureCount = 0;
        this.config.retryCount = 0;
        this.saveConfig();
      }
    }, this.healthCheckInterval);
  }

  async handleBackendFailure() {
    this.config.failureCount++;
    this.config.retryCount++;
    this.saveConfig();

    console.log(`⚠️ Failure #${this.config.failureCount}, retrying...`);

    if (this.config.failureCount > 3) {
      console.log('🔄 Switching Backend...');
      const newUrl = await this.detectBackendUrl();
      if (newUrl !== this.currentBackendUrl) {
        this.currentBackendUrl = newUrl;
        console.log('✅ Switched to:', newUrl);
        this.notifyUserOfSwitch();
      }
    }
  }

  notifyUserOfSwitch() {
    const event = new CustomEvent('backendSwitched', {
      detail: { newUrl: this.currentBackendUrl }
    });
    window.dispatchEvent(event);
  }

  getBackendUrl() {
    // Always use 8000, never 5000
    if (this.currentBackendUrl && this.currentBackendUrl.includes(':5000')) {
      console.warn('⚠️ Detected port 5000, switching to 8000');
      this.currentBackendUrl = this.currentBackendUrl.replace(':5000', ':8000');
    }
    return this.currentBackendUrl;
  }
}

// Initialize Global Config Engine
window.configEngine = new ConfigEngine();

// Auto-initialize on page load
window.addEventListener('load', async () => {
  await window.configEngine.detectBackendUrl();
  window.configEngine.startHealthCheck();
});

// Listen to online/offline events
window.addEventListener('online', () => {
  console.log('📡 Back online!');
  window.configEngine.isOnline = true;
});

window.addEventListener('offline', () => {
  console.log('📡 Offline mode');
  window.configEngine.isOnline = false;
});
