/**
 * 🔍 Archive Search Module
 * يساعد التطبيق في البحث واستخدام ملفات من archive عند الحاجة
 */

const fs = require('fs');
const path = require('path');

const ARCHIVE_PATH = path.join(__dirname, '../archive');

class ArchiveSearch {
  /**
   * 📋 الحصول على قائمة جميع الملفات في archive
   */
  static listAll() {
    const result = {
      services: [],
      scripts: [],
      routes: [],
      html: []
    };

    try {
      // Services
      const servicesPath = path.join(ARCHIVE_PATH, 'backend-services');
      if (fs.existsSync(servicesPath)) {
        result.services = fs.readdirSync(servicesPath)
          .filter(f => f.endsWith('.js'))
          .map(f => f.replace('.js', ''));
      }

      // Scripts
      const scriptsPath = path.join(ARCHIVE_PATH, 'scripts-old');
      if (fs.existsSync(scriptsPath)) {
        result.scripts = fs.readdirSync(scriptsPath)
          .filter(f => f.endsWith('.js'))
          .map(f => f.replace('.js', ''));
      }

      // Routes
      const routesPath = path.join(ARCHIVE_PATH, 'backend-routes');
      if (fs.existsSync(routesPath)) {
        result.routes = fs.readdirSync(routesPath)
          .filter(f => f.endsWith('.js'))
          .map(f => f.replace('.js', ''));
      }

      // HTML
      result.html = fs.readdirSync(ARCHIVE_PATH)
        .filter(f => f.endsWith('.html'));

      return result;
    } catch (error) {
      return result;
    }
  }

  /**
   * 🔍 البحث عن ملف معين
   */
  static search(query) {
    const all = this.listAll();
    const results = {
      services: all.services.filter(s => s.includes(query)),
      scripts: all.scripts.filter(s => s.includes(query)),
      routes: all.routes.filter(r => r.includes(query)),
      html: all.html.filter(h => h.includes(query))
    };
    return results;
  }

  /**
   * 📖 الحصول على معلومات ملف معين
   */
  static getInfo(type, name) {
    let filePath = null;

    if (type === 'service') {
      filePath = path.join(ARCHIVE_PATH, 'backend-services', `${name}.js`);
    } else if (type === 'script') {
      filePath = path.join(ARCHIVE_PATH, 'scripts-old', `${name}.js`);
    } else if (type === 'route') {
      filePath = path.join(ARCHIVE_PATH, 'backend-routes', `${name}.js`);
    } else if (type === 'html') {
      filePath = path.join(ARCHIVE_PATH, `${name}.html`);
    }

    if (!filePath || !fs.existsSync(filePath)) {
      return null;
    }

    const stats = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;

    return {
      type,
      name,
      path: filePath,
      size: stats.size,
      lines,
      modified: stats.mtime
    };
  }

  /**
   * 📋 الحصول على دليل الاستخدام
   */
  static getIndex() {
    const indexPath = path.join(ARCHIVE_PATH, 'ARCHIVE-INDEX.md');
    if (fs.existsSync(indexPath)) {
      return fs.readFileSync(indexPath, 'utf8');
    }
    return null;
  }
}

// للاستخدام في التطبيق:
// const archive = require('./archive-search');
// const list = archive.listAll();
// const search = archive.search('payment');
// const info = archive.getInfo('service', 'payment');

module.exports = ArchiveSearch;
