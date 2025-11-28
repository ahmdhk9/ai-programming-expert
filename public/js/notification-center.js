// ==========================================
// 🔔 NOTIFICATION CENTER
// Advanced notifications management
// ==========================================

class NotificationCenter {
  constructor() {
    this.notifications = [];
    this.container = null;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createContainer());
    } else {
      this.createContainer();
    }
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'notification-center';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
    `;
    document.body.appendChild(this.container);
    console.log('✅ Notification Center initialized');
  }

  show(message, type = 'info', duration = 3000) {
    if (!this.container) {
      console.warn('Container not ready');
      return;
    }

    const id = 'notif_' + Date.now();
    const notif = document.createElement('div');
    
    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#00d4ff'
    };

    notif.innerHTML = `
      <div style="
        background: ${colors[type]};
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
      ">
        ${message}
      </div>
    `;

    this.container.appendChild(notif);
    
    if (duration > 0) {
      setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
      }, duration);
    }

    return id;
  }

  success(msg) { return this.show(msg, 'success'); }
  error(msg) { return this.show(msg, 'error'); }
  warning(msg) { return this.show(msg, 'warning'); }
  info(msg) { return this.show(msg, 'info'); }
}

window.notificationCenter = new NotificationCenter();
window.showNotification = (msg, type = 'info') => window.notificationCenter.show(msg, type);
