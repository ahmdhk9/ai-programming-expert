// نظام تتبع الأرباح والعائدات
class EarningsTracker {
  constructor() {
    this.earnings = {};
    this.withdrawals = [];
    this.transactions = [];
  }

  // تسجيل دخل من إعلان
  recordAdRevenue(userId, amount, adProvider) {
    this.recordEarning(userId, amount, 'ad', adProvider);
  }

  // تسجيل دخل من اشتراك
  recordSubscriptionRevenue(userId, amount) {
    this.recordEarning(userId, amount, 'subscription', 'subscription');
  }

  // تسجيل دخل عام
  recordEarning(userId, amount, type, source) {
    if (!this.earnings[userId]) {
      this.earnings[userId] = { total: 0, history: [] };
    }

    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      amount,
      type,
      source,
      date: new Date(),
      status: 'completed'
    };

    this.earnings[userId].total += amount;
    this.earnings[userId].history.push(transaction);
    this.transactions.push(transaction);

    return transaction;
  }

  // طلب سحب الأرباح
  requestWithdrawal(userId, amount, method) {
    const userEarnings = this.earnings[userId]?.total || 0;

    if (amount > userEarnings) {
      return { error: 'Insufficient balance' };
    }

    const withdrawal = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      amount,
      method, // 'bank', 'paypal', 'card'
      status: 'pending',
      requestDate: new Date(),
      completedDate: null
    };

    this.withdrawals.push(withdrawal);
    return withdrawal;
  }

  // الحصول على إحصائيات المستخدم
  getUserStats(userId) {
    const data = this.earnings[userId] || { total: 0, history: [] };
    return {
      totalEarned: data.total,
      thisMonth: this.getMonthlyEarnings(userId),
      thisWeek: this.getWeeklyEarnings(userId),
      today: this.getDailyEarnings(userId),
      history: data.history
    };
  }

  // الأرباح اليومية
  getDailyEarnings(userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (this.earnings[userId]?.history || [])
      .filter(t => new Date(t.date) >= today)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // الأرباح الأسبوعية
  getWeeklyEarnings(userId) {
    const week = new Date();
    week.setDate(week.getDate() - 7);

    return (this.earnings[userId]?.history || [])
      .filter(t => new Date(t.date) >= week)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // الأرباح الشهرية
  getMonthlyEarnings(userId) {
    const month = new Date();
    month.setMonth(month.getMonth() - 1);

    return (this.earnings[userId]?.history || [])
      .filter(t => new Date(t.date) >= month)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // التنبؤ بالأرباح
  predictEarnings(userId) {
    const dailyEarnings = this.getDailyEarnings(userId);
    const weeklyEarnings = this.getWeeklyEarnings(userId);
    const monthlyEarnings = this.getMonthlyEarnings(userId);

    return {
      dailyProjection: dailyEarnings * 30,
      weeklyProjection: weeklyEarnings * 4,
      monthlyProjection: monthlyEarnings,
      yearlyProjection: monthlyEarnings * 12
    };
  }
}

module.exports = new EarningsTracker();
