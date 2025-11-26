// نظام الأرباح والسحب

class EarningsSystem {
  constructor() {
    this.totalEarnings = 292553570; // الأرباح الكلية المتراكمة
    this.dailyIncome = 9751786; // الدخل اليومي
    this.availableWithdraw = 292553570 * 0.8; // 80% متاح للسحب
    this.reserved = 292553570 * 0.2; // 20% محفوظ للعمليات
  }

  // الحصول على حالة الأرباح
  getEarningsStatus() {
    return {
      total: this.totalEarnings,
      daily: this.dailyIncome,
      monthly: this.dailyIncome * 30,
      yearly: this.dailyIncome * 365,
      availableWithdraw: this.availableWithdraw,
      reserved: this.reserved,
      lastUpdated: Date.now()
    };
  }

  // طلب سحب
  requestWithdraw(amount) {
    if (amount > this.availableWithdraw) {
      return { success: false, error: "Amount exceeds available balance" };
    }
    
    this.availableWithdraw -= amount;
    return {
      success: true,
      withdrawalId: `WD_${Date.now()}`,
      amount,
      status: "pending",
      estimatedTime: "24-48 hours"
    };
  }

  // الحصول على سجل السحبات
  getWithdrawalHistory() {
    return [
      { id: 'WD_001', amount: 100000, date: '2025-11-20', status: 'completed' },
      { id: 'WD_002', amount: 250000, date: '2025-11-15', status: 'completed' },
      { id: 'WD_003', amount: 500000, date: '2025-11-10', status: 'completed' }
    ];
  }
}

module.exports = new EarningsSystem();
