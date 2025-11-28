
// API Client for Free Tier
class ApiClient {
  constructor() {
    this.baseURL = this.getBackendUrl();
  }

  getBackendUrl() {
    // In Vercel, use rewrite path; locally use direct URL
    if (typeof window !== 'undefined' && window.location.hostname.includes('replit')) {
      return '/api';
    }
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel')) {
      return '/api';
    }
    return 'https://agent-backend-ahmd1.fly.dev/api';
  }

  async request(method, endpoint, data = null) {
    try {
      const url = this.baseURL + endpoint;
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
      };

      if (data) options.body = JSON.stringify(data);

      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  }

  get(endpoint) { return this.request('GET', endpoint); }
  post(endpoint, data) { return this.request('POST', endpoint, data); }
  put(endpoint, data) { return this.request('PUT', endpoint, data); }
  delete(endpoint) { return this.request('DELETE', endpoint); }
}

const api = new ApiClient();
