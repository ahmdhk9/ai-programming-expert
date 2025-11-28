// ==========================================
// 📊 ANALYTICS DASHBOARD
// Real-time Stats & Insights
// ==========================================

class AnalyticsDashboard {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('DOMContentLoaded', () => this.render());
    console.log('✅ Analytics Dashboard ready');
  }

  render() {
    const analytics = window.advancedFeatures?.getAnalytics() || {};
    const insights = window.advancedFeatures?.getInsights() || [];

    const dashboard = document.getElementById('analytics-dashboard');
    if (!dashboard) return;

    dashboard.innerHTML = `
      <div class="analytics-section">
        <h3>📈 لوحة البيانات</h3>
        
        <div class="analytics-cards">
          <div class="analytics-card">
            <div class="card-title">📊 إجمالي التفاعلات</div>
            <div class="card-value">${analytics.totalInteractions || 0}</div>
          </div>
          
          <div class="analytics-card">
            <div class="card-title">⏱️ متوسط الوقت</div>
            <div class="card-value">${analytics.avgResponseTime || 0}ms</div>
          </div>
          
          <div class="analytics-card">
            <div class="card-title">😊 الرضا</div>
            <div class="card-value">${analytics.satisfaction || 85}%</div>
          </div>
        </div>

        <div class="insights-section">
          <h4>💡 الرؤى</h4>
          <ul class="insights-list">
            ${insights.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>

        <div class="categories-section">
          <h4>📂 التصنيفات</h4>
          <div class="categories-list">
            ${Object.entries(analytics.categories || {})
              .map(([cat, count]) => `
                <div class="category-item">
                  <span>${cat}</span>
                  <span class="count">${count}</span>
                </div>
              `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  update() {
    this.render();
  }
}

// Initialize
window.analyticsDashboard = new AnalyticsDashboard();
