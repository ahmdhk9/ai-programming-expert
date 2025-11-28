// ==========================================
// ⌨️ KEYBOARD SHORTCUTS
// Quick access with keyboard
// ==========================================

class KeyboardShortcuts {
  constructor() {
    this.shortcuts = {
      '/': () => this.focusSearch(),
      'ctrl+enter': () => this.sendCurrentMessage(),
      'ctrl+shift+e': () => window.exportManager?.exportJSON(),
      'ctrl+,': () => window.themeEngine?.toggle(),
      'ctrl+h': () => this.showHelp(),
      'ctrl+?': () => this.showShortcuts()
    };

    this.init();
    console.log('✅ Keyboard Shortcuts initialized');
  }

  init() {
    document.addEventListener('keydown', (e) => this.handleKeypress(e));
  }

  handleKeypress(e) {
    const key = this.getKey(e);
    if (this.shortcuts[key]) {
      e.preventDefault();
      this.shortcuts[key]();
    }
  }

  getKey(e) {
    let key = e.key.toLowerCase();
    if (e.ctrlKey) key = 'ctrl+' + key;
    if (e.shiftKey && e.key !== 'Shift') key = key.replace('ctrl+', 'ctrl+shift+');
    return key;
  }

  focusSearch() {
    const search = document.getElementById('advanced-search');
    if (search) search.focus();
  }

  sendCurrentMessage() {
    const input = document.getElementById('chat-input');
    if (input && input.value) {
      window.sendChatMessage?.();
    }
  }

  showHelp() {
    window.showNotification('اضغط Ctrl+? لعرض الاختصارات');
  }

  showShortcuts() {
    const shortcuts = `
⌨️ الاختصارات المتاحة:
/ - فتح البحث
Ctrl+Enter - إرسال الرسالة
Ctrl+Shift+E - تصدير البيانات
Ctrl+, - تبديل المظهر
Ctrl+H - عرض المساعدة
Ctrl+? - عرض الاختصارات
    `;
    alert(shortcuts);
  }
}

window.keyboardShortcuts = new KeyboardShortcuts();
