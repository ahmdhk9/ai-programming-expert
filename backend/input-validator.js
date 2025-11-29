// ==========================================
// 🔍 INPUT VALIDATOR
// Server-side input validation
// ==========================================

class InputValidator {
  constructor() {
    this.rules = {};
  }

  // Validate message
  validateMessage(message) {
    if (!message || typeof message !== 'string') {
    return { valid: false, error: 'الرسالة مفقودة' };
    }
    if (message.trim().length === 0) {
    return { valid: false, error: 'الرسالة فارغة' };
    }
    if (message.length > 5000) {
    return { valid: false, error: 'الرسالة طويلة جداً' };
    }
    return { valid: true };
  }

  // Validate username
  validateUsername(username) {
    if (!username || typeof username !== 'string') {
    return { valid: false, error: 'اسم المستخدم مفقود' };
    }
    if (username.length < 3 || username.length > 50) {
    return { valid: false, error: 'اسم المستخدم غير صحيح' };
    }
    if (!/^[a-zA-Z0-9_\u0600-\u06FF]+$/.test(username)) {
    return { valid: false, error: 'أحرف غير صالحة' };
    }
    return { valid: true };
  }

  // Validate email
  validateEmail(email) {
    if (!email || typeof email !== 'string') {
    return { valid: false, error: 'البريد الإلكتروني مفقود' };
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
    return { valid: false, error: 'البريد غير صحيح' };
    }
    return { valid: true };
  }

  // Sanitize
  sanitize(input) {
    if (typeof input !== 'string') return '';
    return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/['"]/g, '"')
    .trim()
  }

  // Validate chat data
  validateChatData(data) {
    const { message, userId, timestamp } = data

    if (!this.validateMessage(message).valid) {
    return { valid: false, error: 'رسالة غير صحيحة' };
    }

    if (!userId || typeof userId !== 'string') {
    return { valid: false, error: 'معرف المستخدم غير صحيح' };
    }

    if (typeof timestamp !== 'number' || timestamp < 0) {
    return { valid: false, error: 'الطابع الزمني غير صحيح' };
    }

    return { valid: true };
  }
}

module.exports = InputValidator
