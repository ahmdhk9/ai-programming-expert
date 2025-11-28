// ==========================================
// Revenue Dashboard - Display Earnings
// ==========================================

class RevenueDashboard {
  constructor() {
    this.earnings = JSON.parse(localStorage.getItem('earnings') || '{"total": 0, "daily": 0, "monthly": 0}');
    this.init();
  }

  init() {
    this.updateDashboard();
    console.log('✅ Revenue Dashboard initialized');
  }

  addEarnings(amount) {
    this.earnings.total += amount;
    this.earnings.daily += amount;
    localStorage.setItem('earnings', JSON.stringify(this.earnings));
    this.updateDashboard();
    console.log(`💰 Added ${amount} to earnings`);
  }

  updateDashboard() {
    const dashboard = document.getElementById('revenue-dashboard');
    if (dashboard) {
      dashboard.innerHTML = `
        <div class="earnings-card">
          <h3>💰 الأرباح الإجمالية</h3>
          <p class="amount">${this.earnings.total} ريال</p>
        </div>
        <div class="earnings-card">
          <h3>📊 اليوم</h3>
          <p class="amount">${this.earnings.daily} ريال</p>
        </div>
        <div class="earnings-card">
          <h3>📈 الشهر</h3>
          <p class="amount">${this.earnings.monthly} ريال</p>
        </div>
      `;
    }
  }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  window.revenueDashboard = new RevenueDashboard();
});
