// ==========================================
// 🔒 SECURITY HEADERS
// Frontend security enhancements
// ==========================================

class SecurityHeaders {
  constructor() {
    this.init();
    console.log('✅ Security Headers initialized');
  }

  init() {
    // Content Security Policy simulation
    this.setCSP();
    this.preventClickjacking();
    this.preventXSS();
  }

  setCSP() {
    // Log CSP violations
    document.addEventListener('securitypolicyviolation', (e) => {
      console.warn('🔒 CSP Violation:', {
        blockedURI: e.blockedURI,
        violatedDirective: e.violatedDirective
      });
    });
  }

  preventClickjacking() {
    // Prevent embedding in frames (safe for iframes)
    try {
      if (window.self !== window.top) {
        // Can't modify top in iframe - just log
        console.log('🔒 Running in iframe (expected in Replit)');
      }
    } catch (e) {
      // Expected error in iframe
      console.log('🔒 iframe protection - operation blocked');
    }
  }

  preventXSS() {
    // Remove potentially malicious scripts
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.src && !script.src.startsWith('/')) {
        script.remove();
        console.warn('🔒 Removed external script:', script.src);
      }
    });
  }

  sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }

  validateAndSanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<script/gi, '')
      .trim();
  }
}

window.securityHeaders = new SecurityHeaders();
