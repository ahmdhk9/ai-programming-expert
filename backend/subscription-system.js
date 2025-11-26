const express = require('express');

// نظام الاشتراكات والدفع
class SubscriptionSystem {
  constructor() {
    this.plans = [
      {
        id: 'free',
        name: 'مجاني',
        price: 0,
        features: ['أداة واحدة', 'استخدام أساسي'],
        limit: 5
      },
      {
        id: 'pro',
        name: 'احترافي',
        price: 9.99,
        features: ['جميع الأدوات', 'استخدام غير محدود', 'أولويات'],
        limit: 'unlimited'
      },
      {
        id: 'enterprise',
        name: 'مشروع',
        price: 29.99,
        features: ['كل شيء', 'دعم 24/7', 'API مخصص'],
        limit: 'unlimited'
      }
    ];
    
    this.subscriptions = {};
    this.earnings = {};
    this.revenue = 0;
  }

  // الحصول على الخطط
  getPlans() {
    return this.plans;
  }

  // إنشاء اشتراك
  createSubscription(userId, planId) {
    const plan = this.plans.find(p => p.id === planId);
    if (!plan) throw new Error('Plan not found');

    this.subscriptions[userId] = {
      userId,
      planId,
      plan,
      startDate: new Date(),
      status: 'active',
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };

    return this.subscriptions[userId];
  }

  // إضافة عائد (من الإعلانات أو الخدمات)
  addEarning(userId, amount, source) {
    if (!this.earnings[userId]) {
      this.earnings[userId] = [];
    }

    const earning = {
      amount,
      source, // 'ads', 'subscription', 'service'
      date: new Date(),
      id: Math.random().toString(36)
    };

    this.earnings[userId].push(earning);
    this.revenue += amount;

    return earning;
  }

  // الحصول على إحصائيات المستخدم
  getUserStats(userId) {
    const subscription = this.subscriptions[userId];
    const userEarnings = this.earnings[userId] || [];
    const totalEarned = userEarnings.reduce((sum, e) => sum + e.amount, 0);

    return {
      subscription: subscription || null,
      totalEarned,
      earnings: userEarnings,
      monthlyProjections: totalEarned * 30
    };
  }

  // إحصائيات شاملة
  getGlobalStats() {
    const totalUsers = Object.keys(this.subscriptions).length;
    const totalEarnings = Object.values(this.earnings).reduce((sum, earnings) => {
      return sum + earnings.reduce((s, e) => s + e.amount, 0);
    }, 0);

    return {
      totalUsers,
      totalEarnings: this.revenue,
      activeSubscriptions: Object.values(this.subscriptions).filter(s => s.status === 'active').length,
      monthlyProjections: this.revenue * 30
    };
  }
}

module.exports = new SubscriptionSystem();
