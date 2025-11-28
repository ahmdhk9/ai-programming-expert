/**
 * 💰 Smart Revenue Engine
 * Intelligent monetization without external services
 * 100% Free - Using advanced algorithms
 */

class RevenueEngine {
  constructor() {
    this.userMetrics = new Map();
    this.contentMetrics = new Map();
    this.revenueStreams = {
      'premium-features': { active: true, rate: 0.15 },
      'featured-content': { active: true, rate: 0.10 },
      'api-usage': { active: true, rate: 0.20 },
      'data-sharing': { active: false, rate: 0.05 },
      'consultation': { active: true, rate: 1.0 },
      'premium-ai': { active: true, rate: 0.25 },
    };
    this.walletAddress = localStorage.getItem('userWallet') || this.generateWallet();
    this.balance = parseFloat(localStorage.getItem('userBalance') || '0');
  }

  generateWallet() {
    const wallet = 'wallet_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userWallet', wallet);
    return wallet;
  }

  /**
   * Track user interaction value
   */
  trackUserValue(action, metadata) {
    const timestamp = Date.now();
    const value = this.calculateActionValue(action, metadata);
    
    const metric = {
      timestamp,
      action,
      value,
      metadata,
    };

    if (!this.userMetrics.has(this.walletAddress)) {
      this.userMetrics.set(this.walletAddress, []);
    }
    this.userMetrics.get(this.walletAddress).push(metric);

    return value;
  }

  /**
   * Calculate value of user actions (micro-transactions)
   */
  calculateActionValue(action, metadata) {
    const rates = {
      'chat': 0.01,           // $0.01 per chat
      'code-generation': 0.05, // $0.05 per code generation
      'bug-fix': 0.03,         // $0.03 per fix
      'design-suggestion': 0.02, // $0.02 per suggestion
      'social-share': 0.005,   // $0.005 per share
      'content-view': 0.001,   // $0.001 per view
      'api-call': 0.01,        // $0.01 per API call
    };

    return rates[action] || 0;
  }

  /**
   * Earn rewards from content creation
   */
  earnFromContent(contentId, contentType, metrics) {
    const baseRate = {
      'tutorial': 0.5,
      'article': 0.3,
      'code-snippet': 0.2,
      'template': 0.4,
    };

    const views = metrics.views || 0;
    const likes = metrics.likes || 0;
    const shares = metrics.shares || 0;

    const earnings =
      baseRate[contentType] * 1 +
      views * 0.001 +
      likes * 0.01 +
      shares * 0.05;

    this.balance += earnings;
    this.saveBalance();

    return {
      contentId,
      contentType,
      earnings,
      breakdown: {
        base: baseRate[contentType],
        fromViews: views * 0.001,
        fromLikes: likes * 0.01,
        fromShares: shares * 0.05,
      },
    };
  }

  /**
   * Premium features activation
   */
  activatePremium(duration = 30) {
    const cost = 9.99;
    if (this.balance >= cost) {
      this.balance -= cost;
      const expiry = Date.now() + duration * 24 * 60 * 60 * 1000;
      localStorage.setItem('premiumExpiry', expiry);
      this.saveBalance();
      return { success: true, expiry };
    }
    return { success: false, message: 'Insufficient balance' };
  }

  /**
   * Affiliate commission system
   */
  generateReferralLink() {
    const code = 'ref_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('referralCode', code);
    return {
      link: `${window.location.origin}?ref=${code}`,
      code,
      commission: 0.2, // 20% commission
    };
  }

  trackReferral(referralCode) {
    const stored = localStorage.getItem('referralCode');
    if (stored) {
      this.balance += 0.5; // $0.50 per referral
      this.saveBalance();
      return true;
    }
    return false;
  }

  /**
   * Skill-based consultation booking
   */
  listConsultation(skills, hourlyRate = 50) {
    const consultation = {
      id: 'consult_' + Date.now(),
      skills,
      hourlyRate,
      active: true,
      bookings: 0,
    };

    localStorage.setItem('consultation_' + consultation.id, JSON.stringify(consultation));
    return consultation;
  }

  bookConsultation(consultationId, duration) {
    const consult = JSON.parse(localStorage.getItem('consultation_' + consultationId) || '{}');
    const earnings = (consult.hourlyRate || 50) * (duration / 60);
    this.balance += earnings;
    this.saveBalance();

    return {
      success: true,
      earnings,
      consultationId,
    };
  }

  /**
   * Advanced analytics dashboard
   */
  getAnalytics() {
    const metrics = this.userMetrics.get(this.walletAddress) || [];
    
    const totalEarnings = metrics.reduce((sum, m) => sum + m.value, 0);
    const actionCounts = {};
    
    metrics.forEach(m => {
      actionCounts[m.action] = (actionCounts[m.action] || 0) + 1;
    });

    return {
      wallet: this.walletAddress,
      balance: this.balance.toFixed(2),
      totalEarnings: totalEarnings.toFixed(2),
      revenueStreams: this.revenueStreams,
      actionCounts,
      isPremium: this.isPremium(),
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Check premium status
   */
  isPremium() {
    const expiry = localStorage.getItem('premiumExpiry');
    return expiry && Date.now() < parseInt(expiry);
  }

  /**
   * Save balance to localStorage
   */
  saveBalance() {
    localStorage.setItem('userBalance', this.balance.toString());
  }

  /**
   * Withdrawal system (simulated - using email/crypto simulation)
   */
  requestWithdrawal(method, amount, destination) {
    if (this.balance < amount) {
      return { success: false, message: 'Insufficient balance' };
    }

    const withdrawal = {
      id: 'withdraw_' + Date.now(),
      amount,
      method, // 'bank', 'paypal', 'crypto'
      destination,
      status: 'pending',
      date: new Date().toISOString(),
    };

    localStorage.setItem('withdrawal_' + withdrawal.id, JSON.stringify(withdrawal));
    this.balance -= amount;
    this.saveBalance();

    return { success: true, withdrawalId: withdrawal.id };
  }

  /**
   * Achievement system for extra rewards
   */
  unlockAchievement(type) {
    const achievements = {
      'first-earning': 0.5,
      'hundred-chats': 1.0,
      'top-contributor': 5.0,
      'viral-content': 10.0,
    };

    const reward = achievements[type] || 0;
    this.balance += reward;
    this.saveBalance();

    return { achievement: type, reward };
  }

  /**
   * Passive income - content licensing
   */
  licenseContent(contentId, usageRights = 'non-exclusive') {
    const license = {
      id: 'license_' + Date.now(),
      contentId,
      usageRights,
      monthlyIncome: 2.5,
      active: true,
    };

    localStorage.setItem('license_' + license.id, JSON.stringify(license));
    return license;
  }
}

// Global instance
window.revenueEngine = new RevenueEngine();
