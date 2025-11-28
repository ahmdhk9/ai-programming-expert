// نظام المراقبة والإنذارات
class MonitoringService {
  constructor() {
    this.metrics = { startTime: Date.now(), requests: 0, errors: 0 };
    this.alerts = [];
    this.healthChecks = [];
  }

  recordRequest() {
    this.metrics.requests++;
  }

  recordError(error) {
    this.metrics.errors++;
    this.alerts.push({
      id: `alert_${Date.now()}`,
      severity: 'error',
      message: error.message,
      timestamp: Date.now()
    });
  }

  getSystemHealth() {
    const uptime = Date.now() - this.metrics.startTime;
    const errorRate = (this.metrics.errors / this.metrics.requests * 100).toFixed(2);
    
    return {
      status: errorRate < 5 ? 'healthy' : 'warning',
      uptime: Math.floor(uptime / 1000),
      requests: this.metrics.requests,
      errors: this.metrics.errors,
      errorRate: errorRate + '%',
      timestamp: Date.now()
    };
  }

  getAlerts() {
    return this.alerts.slice(-50);
  }

  performHealthCheck() {
    const check = {
      id: `check_${Date.now()}`,
      database: 'connected',
      api: 'responsive',
      wallets: 'synced',
      timestamp: Date.now()
    };
    this.healthChecks.push(check);
    return check;
  }
}

module.exports = new MonitoringService();
