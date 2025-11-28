// ==========================================
// ⚙️ SETTINGS MANAGER
// Centralized settings management
// ==========================================

class SettingsManager {
  constructor() {
    this.defaults = {
      theme: 'dark',
      notifications: true,
      autoSave: true,
      language: 'ar',
      soundEnabled: true,
      aiModel: 'groq',
      maxResponseTime: 5000,
      autoBackup: true
    };

    this.settings = { ...this.defaults, ...this.load() };
    console.log('✅ Settings Manager initialized');
  }

  load() {
    try {
      return JSON.parse(localStorage.getItem('settings') || '{}');
    } catch {
      return {};
    }
  }

  save() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  get(key) {
    return this.settings[key] !== undefined ? this.settings[key] : this.defaults[key];
  }

  set(key, value) {
    this.settings[key] = value;
    this.save();
  }

  reset() {
    this.settings = { ...this.defaults };
    this.save();
    window.showNotification('✅ تم إعادة تعيين الإعدادات');
  }

  export() {
    return JSON.stringify(this.settings, null, 2);
  }
}

window.settingsManager = new SettingsManager();
