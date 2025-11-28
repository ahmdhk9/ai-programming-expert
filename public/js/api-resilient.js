/**
 * Resilient API Client with Circuit Breaker & Smart Retry
 */

class ResilientApiClient {
  constructor() {
    this.baseURL = this.detectBackendUrl();
    this.failureCount = 0;
    this.maxFailures = 5;
    this.circuitOpen = false;
    this.retryDelay = 1000;
    this.maxRetries = 3;
  }

  detectBackendUrl() {
    const hostname = window.location.hostname;
    if (hostname.includes('vercel')) {
      return '/api'; // Use Vercel rewrites
    }
    if (hostname.includes('replit')) {
      return '/api';
    }
    // Fallback to direct URL
    return 'https://agent-backend-ahmd1.fly.dev/api';
  }

  async request(method, endpoint, data = null, retryCount = 0) {
    // Circuit breaker check
    if (this.circuitOpen) {
      console.warn('⚠️ Circuit breaker OPEN - using cached/mock data');
      return this.getMockData(endpoint);
    }

    try {
      const url = this.baseURL + endpoint;
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      };

      if (data) options.body = JSON.stringify(data);

      const response = await fetch(url, options);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // Reset failure count on success
      this.failureCount = 0;
      return await response.json();
    } catch (error) {
      this.failureCount++;

      if (this.failureCount >= this.maxFailures) {
        this.circuitOpen = true;
        console.error('🔴 Circuit breaker OPEN');
        return this.getMockData(endpoint);
      }

      if (retryCount < this.maxRetries) {
        const delay = this.retryDelay * Math.pow(2, retryCount);
        console.warn(`⚠️ Retry ${retryCount + 1}/${this.maxRetries} after ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        return this.request(method, endpoint, data, retryCount + 1);
      }

      console.error(`❌ Request failed: ${error.message}`);
      return this.getMockData(endpoint);
    }
  }

  resetCircuitBreaker() {
    this.circuitOpen = false;
    this.failureCount = 0;
  }

  getMockData(endpoint) {
    const mockData = {
      '/health': { status: 'ok', timestamp: Date.now() },
      '/status': { system: 'running', mode: 'mock' }
    };
    return mockData[endpoint] || { error: 'offline', data: null };
  }

  get(endpoint) { return this.request('GET', endpoint); }
  post(endpoint, data) { return this.request('POST', endpoint, data); }
  put(endpoint, data) { return this.request('PUT', endpoint, data); }
  delete(endpoint) { return this.request('DELETE', endpoint); }
}

const resilientApi = new ResilientApiClient();
