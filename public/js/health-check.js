/**
 * Health Check - Frontend self-diagnosis
 * Runs automatically to detect issues
 */

class FrontendHealthCheck {
  constructor() {
    this.issues = [];
    this.fixes = [];
  }

  async checkBackendConnection() {
    try {
      const response = await fetch('/api/health', { timeout: 3000 });
      return response.ok;
    } catch (e) {
      this.issues.push('Backend unreachable via API rewrite');
      
      // Fallback: try direct connection
      try {
        const fallback = await fetch('https://agent-backend-ahmd1.fly.dev/health', { timeout: 3000 });
        if (fallback.ok) {
          this.fixes.push('Backend is reachable via direct URL');
        }
      } catch (e2) {
        this.issues.push('Backend completely unreachable');
      }
      
      return false;
    }
  }

  async checkVercelConfig() {
    try {
      const response = await fetch('/api/test', { timeout: 2000 });
      // Just checking if rewrite works
      return true;
    } catch (e) {
      this.issues.push('API rewrite not working (check vercel.json)');
      return false;
    }
  }

  async checkLocalStorage() {
    try {
      const test = '__test__' + Date.now();
      localStorage.setItem(test, 'test');
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      this.issues.push('Local storage not available (private mode?)');
      return false;
    }
  }

  async run() {
    console.log('%c🏥 Frontend Health Check Started', 'color: blue; font-weight: bold');

    await this.checkBackendConnection();
    await this.checkVercelConfig();
    await this.checkLocalStorage();

    console.log('%c📊 Health Check Results:', 'color: green; font-weight: bold');
    console.log('Issues:', this.issues.length > 0 ? this.issues : 'None');
    console.log('Fixes:', this.fixes.length > 0 ? this.fixes : 'None');

    return {
      healthy: this.issues.length === 0,
      issues: this.issues,
      fixes: this.fixes
    };
  }
}

// Auto-run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const checker = new FrontendHealthCheck();
    checker.run();
  });
} else {
  const checker = new FrontendHealthCheck();
  checker.run();
}
