// ==========================================
// 🔄 AUTO-BACKUP SYSTEM
// Automatic data backup
// ==========================================

class AutoBackupSystem {
  constructor() {
    this.backupInterval = 5 * 60 * 1000; // 5 minutes
    this.maxBackups = 10;
    this.init();
  }

  init() {
    this.startAutoBackup();
    console.log('✅ Auto-Backup System initialized');
  }

  startAutoBackup() {
    setInterval(() => this.createBackup(), this.backupInterval);
  }

  createBackup() {
    const backup = {
      timestamp: Date.now(),
      data: {
        messages: localStorage.getItem('chatMessages'),
        projects: localStorage.getItem('projects'),
        interactions: localStorage.getItem('interactions'),
        profile: localStorage.getItem('userProfile'),
        settings: localStorage.getItem('settings')
      }
    };

    const backups = JSON.parse(localStorage.getItem('backups') || '[]');
    backups.push(backup);

    // Keep only last N backups
    if (backups.length > this.maxBackups) {
      backups.shift();
    }

    localStorage.setItem('backups', JSON.stringify(backups));
    console.log('💾 Backup created');
  }

  restore(timestamp) {
    const backups = JSON.parse(localStorage.getItem('backups') || '[]');
    const backup = backups.find(b => b.timestamp === timestamp);

    if (backup) {
      Object.entries(backup.data).forEach(([key, value]) => {
        if (value) localStorage.setItem(key, value);
      });
      window.showNotification('✅ تم استرجاع البيانات');
      location.reload();
    }
  }

  listBackups() {
    const backups = JSON.parse(localStorage.getItem('backups') || '[]');
    return backups.map(b => ({
      timestamp: b.timestamp,
      date: new Date(b.timestamp).toLocaleString('ar-SA')
    }));
  }
}

window.autoBackupSystem = new AutoBackupSystem();
