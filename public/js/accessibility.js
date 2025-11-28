// ==========================================
// ♿ ACCESSIBILITY MODULE
// ARIA labels and a11y support
// ==========================================

class AccessibilityModule {
  constructor() {
    this.init();
    console.log('✅ Accessibility Module initialized');
  }

  init() {
    this.addARIALabels();
    this.setTabIndexes();
    this.addKeyboardSupport();
  }

  addARIALabels() {
    // Chat input
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.setAttribute('aria-label', 'حقل إدخال سؤال الذكاء الاصطناعي');
      chatInput.setAttribute('aria-describedby', 'chat-help');
    }

    // Search input
    const searchInput = document.getElementById('advanced-search');
    if (searchInput) {
      searchInput.setAttribute('aria-label', 'حقل البحث المتقدم');
    }

    // Main buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach((btn, i) => {
      if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', btn.textContent || `زر ${i}`);
      }
    });

    // Tabs
    const tabs = document.querySelectorAll('[role="tab"]');
    tabs.forEach(tab => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
    });
  }

  setTabIndexes() {
    // Make important elements keyboard accessible
    const interactive = document.querySelectorAll('button, input, [onclick]');
    interactive.forEach((el, i) => {
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
      }
    });
  }

  addKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
      // Tab navigation
      if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.addEventListener) {
          activeElement.style.outline = '2px solid #00d4ff';
        }
      }

      // Enter on buttons
      if (e.key === 'Enter') {
        const target = e.target;
        if (target && target.onclick) {
          e.preventDefault();
          target.onclick();
        }
      }
    });
  }

  announceMessage(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 3000);
  }
}

window.accessibilityModule = new AccessibilityModule();
