// نظام الإشعارات البريدية الحقيقي
const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // إرسال إشعار أرباح يومي
  async sendEarningsNotification(email, amount) {
    return await this.transporter.sendMail({
      from: 'earnings@ai-expert.io',
      to: email,
      subject: `💰 أرباح اليوم: $${amount}`,
      html: `
        <h1>أرباحك لهذا اليوم</h1>
        <p>المبلغ: <strong>$${amount}</strong></p>
        <p>تحقق من لوحة التحكم لمزيد من التفاصيل</p>
      `
    });
  }

  // إشعار سحب
  async sendWithdrawalNotification(email, amount, status) {
    return await this.transporter.sendMail({
      from: 'withdrawals@ai-expert.io',
      to: email,
      subject: `🔄 حالة السحب: ${status}`,
      html: `
        <h1>تحديث حول طلب السحب</h1>
        <p>المبلغ: <strong>$${amount}</strong></p>
        <p>الحالة: <strong>${status}</strong></p>
      `
    });
  }

  // إشعار نشر جديد
  async sendDeploymentNotification(email, platform, url) {
    return await this.transporter.sendMail({
      from: 'deployments@ai-expert.io',
      to: email,
      subject: `🚀 نشر جديد على ${platform}`,
      html: `
        <h1>تم النشر بنجاح</h1>
        <p>المنصة: <strong>${platform}</strong></p>
        <p>الرابط: <a href="${url}">${url}</a></p>
      `
    });
  }
}

module.exports = new NotificationService();
