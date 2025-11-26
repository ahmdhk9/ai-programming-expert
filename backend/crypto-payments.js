// نظام الدفع بالعملات الرقمية والـ USD
class CryptoPayments {
  constructor() {
    this.paymentMethods = {
      stripe: {
        name: 'Stripe',
        type: 'usd',
        enabled: true,
        fee: 2.9,
        description: 'بطاقات ائتمان'
      },
      paypal: {
        name: 'PayPal',
        type: 'usd',
        enabled: true,
        fee: 3.49,
        description: 'المحفظة الرقمية'
      },
      bitcoin: {
        name: 'Bitcoin',
        type: 'crypto',
        enabled: true,
        fee: 1,
        description: 'العملة الرقمية #1'
      },
      ethereum: {
        name: 'Ethereum',
        type: 'crypto',
        enabled: true,
        fee: 1,
        description: 'العملات الذكية'
      },
      usdt: {
        name: 'USDT (Tether)',
        type: 'crypto',
        enabled: true,
        fee: 0.5,
        description: 'دولار رقمي ثابت'
      },
      usd_stablecoin: {
        name: 'USDC',
        type: 'crypto',
        enabled: true,
        fee: 0.5,
        description: 'دولار رقمي آمن'
      }
    };

    this.transactions = {};
    this.wallets = {};
  }

  // إضافة طريقة دفع جديدة
  addPaymentMethod(methodId, config) {
    this.paymentMethods[methodId] = {
      name: config.name,
      type: config.type, // usd, crypto
      enabled: true,
      fee: config.fee || 0,
      description: config.description,
      walletAddress: config.walletAddress || null,
      apiKey: config.apiKey || null
    };

    return this.paymentMethods[methodId];
  }

  // تفعيل/تعطيل طريقة دفع
  togglePaymentMethod(methodId, enabled) {
    if (!this.paymentMethods[methodId]) return { error: 'Method not found' };

    this.paymentMethods[methodId].enabled = enabled;
    return this.paymentMethods[methodId];
  }

  // قائمة طرق الدفع
  getPaymentMethods() {
    return Object.entries(this.paymentMethods).map(([id, method]) => ({
      id,
      ...method
    }));
  }

  // معالجة الدفع
  processPayment(userId, amount, methodId) {
    if (!this.paymentMethods[methodId]) {
      return { error: 'Payment method not found' };
    }

    const method = this.paymentMethods[methodId];

    const transaction = {
      id: `txn_${Date.now()}`,
      userId,
      amount,
      methodId,
      methodName: method.name,
      type: method.type,
      fee: (amount * method.fee) / 100,
      netAmount: amount - (amount * method.fee) / 100,
      status: 'processing',
      createdAt: new Date(),
      completedAt: null
    };

    this.transactions[transaction.id] = transaction;

    // محاكاة معالجة الدفع
    setTimeout(() => {
      this.transactions[transaction.id].status = 'completed';
      this.transactions[transaction.id].completedAt = new Date();
    }, 1000);

    return transaction;
  }

  // الحصول على محفظة المستخدم
  getUserWallet(userId) {
    if (!this.wallets[userId]) {
      this.wallets[userId] = {
        userId,
        balance: 0,
        transactions: [],
        cryptoAddresses: {}
      };
    }

    return this.wallets[userId];
  }

  // إضافة رصيد إلى المحفظة
  addToWallet(userId, amount) {
    const wallet = this.getUserWallet(userId);
    wallet.balance += amount;
    return wallet;
  }

  // سحب من المحفظة
  withdrawFromWallet(userId, amount) {
    const wallet = this.getUserWallet(userId);

    if (amount > wallet.balance) {
      return { error: 'Insufficient balance' };
    }

    wallet.balance -= amount;
    return wallet;
  }

  // الحصول على سعر صرف العملات
  getExchangeRate(crypto) {
    const rates = {
      bitcoin: 45000,
      ethereum: 2500,
      usdt: 1,
      usd_stablecoin: 1,
      bnb: 600
    };

    return rates[crypto] || 0;
  }

  // تحويل من عملة إلى أخرى
  convertCurrency(fromCrypto, toCrypto, amount) {
    const fromRate = this.getExchangeRate(fromCrypto);
    const toRate = this.getExchangeRate(toCrypto);

    if (!fromRate || !toRate) {
      return { error: 'Exchange rate not found' };
    }

    const usdAmount = amount * fromRate;
    const toAmount = usdAmount / toRate;

    return {
      from: { crypto: fromCrypto, amount, rate: fromRate },
      to: { crypto: toCrypto, amount: toAmount, rate: toRate },
      usdEquivalent: usdAmount
    };
  }

  // إحصائيات الدفع
  getPaymentStats() {
    const transactions = Object.values(this.transactions);

    return {
      totalTransactions: transactions.length,
      completedTransactions: transactions.filter(t => t.status === 'completed').length,
      totalRevenue: transactions.reduce((sum, t) => sum + t.netAmount, 0),
      totalFees: transactions.reduce((sum, t) => sum + t.fee, 0),
      byMethod: this.groupByMethod(transactions),
      byType: this.groupByType(transactions)
    };
  }

  groupByMethod(transactions) {
    const grouped = {};
    transactions.forEach(t => {
      grouped[t.methodName] = (grouped[t.methodName] || 0) + t.netAmount;
    });
    return grouped;
  }

  groupByType(transactions) {
    const grouped = {};
    transactions.forEach(t => {
      grouped[t.type] = (grouped[t.type] || 0) + t.netAmount;
    });
    return grouped;
  }
}

module.exports = new CryptoPayments();
