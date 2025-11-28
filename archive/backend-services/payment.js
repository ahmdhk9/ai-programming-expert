// نظام الدفع الحقيقي مع Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_demo');

class PaymentService {
  // إنشاء جلسة دفع
  async createCheckoutSession(amount) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'AI Platform Earnings' },
          unit_amount: Math.round(amount * 100)
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: 'https://ai-expert.io/success',
      cancel_url: 'https://ai-expert.io/cancel'
    });
    return session;
  }

  // معالجة الدفع
  async processPayment(paymentIntentId) {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return { status: intent.status, amount: intent.amount / 100 };
  }

  // التحويل إلى محفظة
  async transferToWallet(amount, walletId) {
    const transfer = await stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      destination: walletId
    });
    return transfer;
  }
}

module.exports = new PaymentService();
