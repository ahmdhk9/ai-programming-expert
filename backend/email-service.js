const express = require('express');
const router = express.Router();

// خدمة الرسائل - إرسال رسائل إلى أحمد البصراوي
class EmailService {
  constructor() {
    this.messages = [];
  }

  async sendEmail(to, subject, message) {
    // تخزين الرسالة
    this.messages.push({
      id: Date.now(),
      to,
      subject,
      message,
      timestamp: new Date(),
      status: 'pending'
    });

    // في الإنتاج، ستستخدم خدمة بريد حقيقية (SendGrid, Mailgun, etc)
    // للآن، نحفظها في الذاكرة
    
    console.log(`📧 رسالة جديدة للبريد: ${to}`);
    console.log(`الموضوع: ${subject}`);
    console.log(`الرسالة: ${message}`);
    
    return {
      status: 'sent',
      messageId: this.messages[this.messages.length - 1].id,
      to,
      timestamp: new Date()
    };
  }

  getMessages() {
    return this.messages;
  }
}

const emailService = new EmailService();

// API Endpoints
router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    
    if (!to || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await emailService.sendEmail(to, subject, message);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/messages', (req, res) => {
  res.json({
    total: emailService.getMessages().length,
    messages: emailService.getMessages()
  });
});

module.exports = router;
