// نظام المصادقة المتقدم
const crypto = require('crypto');

class AuthService {
  constructor() {
    this.users = new Map();
    this.sessions = new Map();
    this.devUser = {
      email: 'ahmdalbsrawe@gmail.com',
      passwordHash: crypto.createHash('sha256').update('Ahmed_Secure_2025_Supreme').digest('hex'),
      role: 'admin'
    };
  }

  login(email, password) {
    if (email === this.devUser.email) {
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      if (hash === this.devUser.passwordHash) {
        const sessionId = crypto.randomBytes(32).toString('hex');
        const session = {
          email, role: 'admin', createdAt: Date.now(),
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
        };
        this.sessions.set(sessionId, session);
        return { success: true, sessionId, user: { email, role: 'admin' } };
      }
    }
    return { success: false, error: 'بيانات تسجيل الدخول غير صحيحة' };
  }

  verify(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) return { valid: false };
    if (session.expiresAt < Date.now()) return { valid: false };
    return { valid: true, user: { email: session.email, role: session.role } };
  }

  logout(sessionId) {
    this.sessions.delete(sessionId);
    return { success: true };
  }
}

module.exports = new AuthService();
