// ==========================================
// ⚡ QUICK ACTIONS
// One-click common tasks
// ==========================================

class QuickActions {
  constructor() {
    this.actions = [
      { name: 'جديد محادثة', emoji: '💬', action: () => this.newChat() },
      { name: 'نسخ احتياطية', emoji: '💾', action: () => window.autoBackupSystem?.createBackup() },
      { name: 'تصدير البيانات', emoji: '📥', action: () => window.exportManager?.exportJSON() },
      { name: 'إعادة تعيين', emoji: '🔄', action: () => this.reset() },
      { name: 'المساعدة', emoji: '❓', action: () => this.showHelp() }
    ];
    console.log('✅ Quick Actions initialized');
  }

  newChat() {
    document.getElementById('chat-input').value = '';
    document.getElementById('chat-input').focus();
    window.showNotification('محادثة جديدة جاهزة');
  }

  reset() {
    if (confirm('هل تريد تصفير كل البيانات؟')) {
      localStorage.clear();
      window.showNotification('✅ تم تصفير البيانات - إعادة تحميل...');
      setTimeout(() => location.reload(), 1000);
    }
  }

  showHelp() {
    window.showNotification(window.helpSystem?.showAll() || 'لا توجد معلومات');
  }
}

window.quickActions = new QuickActions();
