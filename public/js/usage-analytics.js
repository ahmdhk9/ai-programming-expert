// ==========================================
// 📈 USAGE ANALYTICS
// Advanced usage tracking
// ==========================================

class UsageAnalytics {
  constructor() {
    this.sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    this.events = [];
    this.startSession();
    console.log('✅ Usage Analytics initialized');
  }

  startSession() {
    this.sessionStart = Date.now();
    const session = {
      id: 'sess_' + Date.now(),
      startTime: this.sessionStart,
      events: []
    };
    this.currentSession = session;
  }

  trackEvent(eventName, data = {}) {
    const event = {
      name: eventName,
      timestamp: Date.now(),
      data: data
    };
    this.currentSession.events.push(event);
  }

  endSession() {
    this.currentSession.endTime = Date.now();
    this.currentSession.duration = this.currentSession.endTime - this.currentSession.startTime;
    this.sessions.push(this.currentSession);
    localStorage.setItem('sessions', JSON.stringify(this.sessions));
  }

  getStats() {
    const totalSessions = this.sessions.length;
    const totalTime = this.sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    const totalEvents = this.sessions.reduce((sum, s) => sum + s.events.length, 0);

    return {
      totalSessions,
      totalTime: Math.floor(totalTime / 1000 / 60), // minutes
      avgSessionTime: Math.floor(totalTime / totalSessions / 1000), // seconds
      totalEvents,
      avgEventsPerSession: Math.round(totalEvents / totalSessions)
    };
  }
}

window.usageAnalytics = new UsageAnalytics();

// Track key events
window.addEventListener('beforeunload', () => {
  window.usageAnalytics?.endSession();
});
