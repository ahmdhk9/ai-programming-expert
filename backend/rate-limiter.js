// ==========================================
// 🚦 RATE LIMITER
// Prevent abuse and DoS attacks
// ==========================================

class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.clients = new Map();
  }

  middleware() {
    return (req, res, next) => {
      const clientIP = req.ip || req.connection.remoteAddress;
      
      if (!this.clients.has(clientIP)) {
        this.clients.set(clientIP, { count: 0, resetTime: Date.now() + this.windowMs });
      }

      const client = this.clients.get(clientIP);
      
      // Reset if window expired
      if (Date.now() > client.resetTime) {
        client.count = 0;
        client.resetTime = Date.now() + this.windowMs;
      }

      client.count++;

      res.set('X-RateLimit-Limit', this.maxRequests);
      res.set('X-RateLimit-Remaining', Math.max(0, this.maxRequests - client.count));

      if (client.count > this.maxRequests) {
        return res.status(429).json({
          error: 'Too many requests',
          retryAfter: Math.ceil((client.resetTime - Date.now()) / 1000)
        });
      }

      // Cleanup old entries
      if (this.clients.size > 10000) {
        const oldestTime = Math.min(...Array.from(this.clients.values()).map(c => c.resetTime));
        for (const [ip, client] of this.clients) {
          if (client.resetTime <= oldestTime) {
            this.clients.delete(ip);
          }
        }
      }

      next();
    };
  }
}

module.exports = RateLimiter;
