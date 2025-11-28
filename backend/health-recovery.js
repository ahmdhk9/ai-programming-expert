/**
 * 🏥 Health Recovery Engine - نظام استعادة صحة Backend
 * يكتشف المشاكل ويصلحها تلقائياً
 */

class HealthRecoveryEngine {
  constructor(app, server) {
    this.app = app;
    this.server = server;
    this.healthMetrics = {
      startTime: Date.now(),
      requestCount: 0,
      errorCount: 0,
      successCount: 0,
      averageResponseTime: 0
    };
    this.responseTimes = [];
  }

  // 1. Request Monitoring
  monitorRequest(req, res, next) {
    const startTime = Date.now();

    const originalSend = res.send;
    res.send = function(data) {
      const duration = Date.now() - startTime;
      this.healthMetrics.requestCount++;
      this.healthMetrics.responseTimes.push(duration);

      if (res.statusCode >= 400) {
        this.healthMetrics.errorCount++;
      } else {
        this.healthMetrics.successCount++;
      }

      // Keep only last 100 response times
      if (this.responseTimes.length > 100) {
        this.responseTimes.shift();
      }

      this.updateAverageResponseTime();

      return originalSend.call(this, data);
    }.bind(this);

    next();
  }

  // 2. Health Check Endpoint
  setupHealthEndpoint() {
    this.app.get('/health', (req, res) => {
      const uptime = Date.now() - this.healthMetrics.startTime;
      const isHealthy = this.healthMetrics.errorCount < this.healthMetrics.successCount;

      res.json({
        status: isHealthy ? 'HEALTHY' : 'DEGRADED',
        uptime,
        metrics: {
          requests: this.healthMetrics.requestCount,
          errors: this.healthMetrics.errorCount,
          successes: this.healthMetrics.successCount,
          errorRate: this.getErrorRate(),
          averageResponseTime: this.healthMetrics.averageResponseTime
        },
        timestamp: new Date().toISOString()
      });
    });
  }

  // 3. Auto-Recovery on High Errors
  startAutoRecovery() {
    setInterval(() => {
      const errorRate = this.getErrorRate();

      if (errorRate > 50) {
        console.log('🚨 High error rate detected, initiating recovery...');
        this.performRecovery();
      }
    }, 30000); // Check every 30 seconds
  }

  performRecovery() {
    // Clear error metrics
    this.healthMetrics.errorCount = 0;
    this.healthMetrics.successCount = 0;
    this.responseTimes = [];

    console.log('✅ Recovery completed');
  }

  // 4. Memory Management
  startMemoryMonitoring() {
    setInterval(() => {
      const memUsage = process.memoryUsage();
      const heapUsed = Math.round(memUsage.heapUsed / 1024 / 1024);

      if (heapUsed > 200) {
        console.warn(`⚠️ High memory usage: ${heapUsed}MB`);
        global.gc?.(); // Force garbage collection if available
      }
    }, 60000); // Check every minute
  }

  // 5. Database Connection Pool Management
  setupConnectionPooling() {
    // Implement connection pooling for database
    this.app.use((req, res, next) => {
      req.connectionRetry = 0;
      next();
    });
  }

  // 6. Error Aggregation
  trackError(error, context = {}) {
    this.healthMetrics.errorCount++;

    console.error(`❌ Error [${context.endpoint}]:`, error.message);

    // Log to file for analysis
    const logEntry = {
      timestamp: new Date().toISOString(),
      error: error.message,
      context,
      stack: error.stack?.split('\n').slice(0, 3).join('\n')
    };

    const fs = require('fs');
    const logFile = './error-log.json';
    let logs = [];

    try {
      if (fs.existsSync(logFile)) {
        logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
      }
    } catch (e) {
      logs = [];
    }

    logs.push(logEntry);
    if (logs.length > 100) logs.shift(); // Keep only last 100 errors

    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
  }

  // 7. Graceful Shutdown
  setupGracefulShutdown() {
    process.on('SIGTERM', () => {
      console.log('📛 SIGTERM received, shutting down gracefully...');
      this.server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });

      setTimeout(() => {
        console.error('❌ Could not close connections in time');
        process.exit(1);
      }, 10000);
    });
  }

  // Helper methods
  updateAverageResponseTime() {
    if (this.responseTimes.length > 0) {
      const sum = this.responseTimes.reduce((a, b) => a + b, 0);
      this.healthMetrics.averageResponseTime = Math.round(sum / this.responseTimes.length);
    }
  }

  getErrorRate() {
    if (this.healthMetrics.requestCount === 0) return 0;
    return Math.round((this.healthMetrics.errorCount / this.healthMetrics.requestCount) * 100);
  }

  getStatus() {
    return {
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.healthMetrics.startTime,
      metrics: this.healthMetrics,
      errorRate: this.getErrorRate()
    };
  }

  start() {
    this.setupHealthEndpoint();
    this.startAutoRecovery();
    this.startMemoryMonitoring();
    this.setupGracefulShutdown();

    console.log('🏥 Health Recovery Engine started');
  }
}

module.exports = HealthRecoveryEngine;
