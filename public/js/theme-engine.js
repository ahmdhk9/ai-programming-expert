// ==========================================
// 🎨 THEME ENGINE
// Dark/Light mode with persistence
// ==========================================

class ThemeEngine {
  constructor() {
    this.themes = {
      dark: {
        bg: '#0f1419',
        text: '#ffffff',
        primary: '#00d4ff',
        secondary: '#1a1f2e',
        accent: '#ff00ff'
      },
      light: {
        bg: '#ffffff',
        text: '#0f1419',
        primary: '#0066cc',
        secondary: '#f0f0f0',
        accent: '#ff0066'
      }
    };
    
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.apply());
    } else {
      this.apply();
    }
    console.log('✅ Theme Engine initialized');
  }

  apply() {
    const theme = this.themes[this.currentTheme];
    const root = document.documentElement;
    root.style.setProperty('--bg-color', theme.bg);
    root.style.setProperty('--text-color', theme.text);
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--accent-color', theme.accent);
    
    if (document.body) {
      document.body.style.backgroundColor = theme.bg;
      document.body.style.color = theme.text;
    }
  }

  toggle() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.currentTheme);
    this.apply();
    window.showNotification(`تم التبديل إلى الوضع ${this.currentTheme === 'dark' ? 'الليلي' : 'النهاري'}`);
  }

  set(theme) {
    if (this.themes[theme]) {
      this.currentTheme = theme;
      localStorage.setItem('theme', theme);
      this.apply();
    }
  }
}

window.themeEngine = new ThemeEngine();
