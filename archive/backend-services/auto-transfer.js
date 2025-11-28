// نظام التحويل التلقائي للأرباح إلى المحافظ

class AutoTransferSystem {
  constructor() {
    this.transferQueue = [];
    this.transferHistory = [];
  }

  // إضافة طلب تحويل للطابور
  queueTransfer(userId, walletId, amount, reason = 'daily_earnings') {
    const transfer = {
      id: `auto_transfer_${Date.now()}`,
      userId,
      walletId,
      amount,
      reason,
      status: 'queued',
      createdAt: Date.now(),
      processedAt: null,
      txHash: null
    };
    
    this.transferQueue.push(transfer);
    return transfer;
  }

  // معالجة الطابور التلقائي
  async processQueue() {
    while (this.transferQueue.length > 0) {
      const transfer = this.transferQueue.shift();
      
      try {
        // محاكاة معالجة التحويل
        transfer.status = 'processing';
        
        // تأخير محاكي للمعالجة
        await new Promise(resolve => setTimeout(resolve, 100));
        
        transfer.status = 'completed';
        transfer.processedAt = Date.now();
        transfer.txHash = `0x${Math.random().toString(16).slice(2)}`;
        
        // إضافة إلى السجل
        this.transferHistory.push(transfer);
        
        // إرسال إشعار
        console.log(`✅ تحويل ${transfer.amount} إلى محفظة ${transfer.walletId}`);
        
      } catch (error) {
        transfer.status = 'failed';
        transfer.error = error.message;
        this.transferHistory.push(transfer);
        console.error(`❌ فشل التحويل: ${error.message}`);
      }
    }
  }

  // التحويل اليومي التلقائي
  async processDailyTransfers(userEarnings) {
    for (const user of userEarnings) {
      const { userId, amount, wallets } = user;
      
      // توزيع الأرباح على جميع المحافظ
      const perWallet = amount / wallets.length;
      
      for (const wallet of wallets) {
        this.queueTransfer(userId, wallet.id, perWallet, 'daily_earnings');
      }
    }
    
    // معالجة الطابور
    await this.processQueue();
  }

  // الحصول على سجل التحويلات
  getHistory(userId = null) {
    if (userId) {
      return this.transferHistory.filter(t => t.userId === userId);
    }
    return this.transferHistory;
  }

  // إحصائيات التحويلات
  getStats() {
    const completed = this.transferHistory.filter(t => t.status === 'completed');
    const failed = this.transferHistory.filter(t => t.status === 'failed');
    const totalAmount = completed.reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalTransfers: this.transferHistory.length,
      completed: completed.length,
      failed: failed.length,
      queued: this.transferQueue.length,
      totalAmountTransferred: totalAmount,
      successRate: (completed.length / (completed.length + failed.length) * 100).toFixed(2) + '%'
    };
  }
}

module.exports = new AutoTransferSystem();
