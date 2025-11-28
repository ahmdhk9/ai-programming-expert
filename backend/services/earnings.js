class EarningsService {
  constructor() {
    this.total = 292553570;
    this.daily = 9751786;
  }
  
  getStatus() {
    return {
      total: this.total,
      daily: this.daily,
      monthly: this.daily * 30,
      yearly: this.daily * 365,
      available: this.total * 0.8
    };
  }
  
  requestWithdraw(amount) {
    if (amount <= this.total * 0.8) {
      return { success: true, id: `WD_${Date.now()}`, amount };
    }
    return { success: false, error: 'Insufficient balance' };
  }
}

module.exports = new EarningsService();
