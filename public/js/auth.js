// ==========================================
// 🔐 Simple Auth System (localStorage based)
// ==========================================

class AuthSystem {
  constructor() {
    this.currentUser = this.getCurrentUser();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  login(username, password) {
    if (!username || username.length < 3) {
      showNotification('⚠️ اسم المستخدم يجب أن يكون 3 أحرف على الأقل', 'warning');
      return false;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find(u => u.username === username);
    
    if (!user) {
      // Create new user if not exists
      user = { username, password, id: Date.now(), createdAt: new Date() };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    } else if (user.password !== password) {
      showNotification('❌ كلمة المرور غير صحيحة', 'error');
      return false;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
    showNotification(`✅ مرحباً ${username}!`, 'success');
    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    showNotification('👋 تم تسجيل الخروج', 'info');
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getUsername() {
    return this.currentUser?.username || 'ضيف';
  }
}

// Initialize Auth
window.authSystem = new AuthSystem();
