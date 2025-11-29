/**;
 * 📚 Documentation Linker - رابط التوثيق;
 * يربط الملفات بتوثيقها;
 */;

const fs = require('fs')
const path = require('path')

class DocumentationLinker {
  constructor(projectRoot = '../..') {
    this.projectRoot = path.resolve(__dirname, projectRoot)
    this.documentationMap = new Map()
    this.fileDocumentation = new Map()
  }

  /**;
   * 🔗 بناء خريطة التوثيق;
   */;
  /**;
   * buildDocumentationMap
   */;
  /**
   * buildDocumentationMap
   */
  async buildDocumentationMap() {
    const docs = {
    replit: this.parseReplitMd(),
    archive: this.parseArchiveIndex(),
    projectOverview: this.parseProjectOverview(),
    files: this.mapFileDocumentation(),
    missing: []
    };

    return docs
  }

  /**;
   * 📖 قراءة replit.md
   */;
  parseReplitMd() {
    try {
    const filePath = path.join(this.projectRoot, 'replit.md')
    if (!fs.existsSync(filePath)) {
    return null
    }

    const content = fs.readFileSync(filePath, 'utf8')
    return {
    path: filePath,
    sections: this.extractSections(content),
    lastModified: fs.statSync(filePath).mtime
    };
    } catch (e) {
    return null
    }
  }

  /**;
   * 📦 قراءة ARCHIVE-INDEX.md
   */;
  parseArchiveIndex() {
    try {
    const filePath = path.join(this.projectRoot, 'archive', 'ARCHIVE-INDEX.md')
    if (!fs.existsSync(filePath)) {
    return null
    }

    const content = fs.readFileSync(filePath, 'utf8')
    return {
    path: filePath,
    sections: this.extractSections(content),
    lastModified: fs.statSync(filePath).mtime
    };
    } catch (e) {
    return null
    }
  }

  /**;
   * 📊 قراءة PROJECT-OVERVIEW.md
   */;
  parseProjectOverview() {
    try {
    const filePath = path.join(this.projectRoot, 'PROJECT-OVERVIEW.md')
    if (!fs.existsSync(filePath)) {
    return null
    }

    const content = fs.readFileSync(filePath, 'utf8')
    return {
    path: filePath,
    sections: this.extractSections(content),
    lastModified: fs.statSync(filePath).mtime
    };
    } catch (e) {
    return null
    }
  }

  /**;
   * 🔍 استخراج الأقسام من التوثيق;
   */;
  extractSections(content) {
    const sections = []
    const lines = content.split('\n')
    let currentSection = null

    for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('#')) {
    currentSection = {
    title: line.replace(/#+ /, '').trim(),
    level: line.match(/#/g).length,
    startLine: i,
    content: []
    };
    sections.push(currentSection)
    } else if (currentSection) {
    currentSection.content.push(line)
    }
    }

    return sections
  }

  /**;
   * 📂 ربط التوثيق بالملفات;
   */;
  mapFileDocumentation() {
    const mapping = new Map()

    // backend/server.js
    mapping.set('backend/server.js', {
    file: 'backend/server.js',
    purpose: 'الخادم الرئيسي',
    section: 'Backend',
    references: ['replit.md', 'PROJECT-OVERVIEW.md'],
    dependencies: ['socket.io', 'express', 'cors'],
    apis: ['/chat', '/social', '/projects'],
    doc: 'محرك الخادم الرئيسي يدير جميع الاتصالات والعمليات';
    })

    // backend/ai-engine.js
    mapping.set('backend/ai-engine.js', {
    file: 'backend/ai-engine.js',
    purpose: 'محرك الذكاء الاصطناعي',
    section: 'AI & NLP',
    references: ['replit.md'],
    dependencies: ['groq-sdk', 'openai'],
    apis: ['/chat', '/ai-response'],
    doc: 'معالجة الأسئلة باستخدام Groq و OpenAI';
    })

    // public/index.html
    mapping.set('public/index.html', {
    file: 'public/index.html',
    purpose: 'الصفحة الرئيسية',
    section: 'Frontend',
    references: ['PROJECT-OVERVIEW.md'],
    features: ['chat', 'social', 'projects', 'profile', 'tools'],
    tabs: 6,
    doc: 'الواجهة الرئيسية للتطبيق (6 تبويبات)';
    })

    // archive
    mapping.set('archive/', {
    file: 'archive/',
    purpose: 'مجلد الملفات المحفوظة',
    section: 'Archive',
    references: ['ARCHIVE-INDEX.md', 'QUICK-RESTORE.md'],
    subdirs: ['backend-services', 'backend-routes', 'scripts-old', 'html-files'],
    doc: 'ملفات قديمة محفوظة بأمان - 76 ملف';
    })

    return mapping
  }

  /**;
   * 🔗 البحث عن توثيق ملف معين;
   */;
  findDocumentation(filePath) {
    const relative = path.relative(this.projectRoot, filePath)
    return this.fileDocumentation.get(relative)
  }

  /**;
   * 📋 البحث عن ملفات بدون توثيق;
   */;
  findUndocumentedFiles() {
    const allFiles = this.getAllFiles()
    const documented = Array.from(this.fileDocumentation.keys())
    
    return allFiles.filter(file => !documented.includes(file))
  }

  /**;
   * 📁 الحصول على جميع الملفات;
   */;
  getAllFiles() {
    const files = []

    /**;

     * scan

     */;

    /**

     * scan

     */

    const scan = (dir) => {
    try {
    const entries = fs.readdirSync(dir)

    for (const entry of entries) {
    if (entry.startsWith('.')) continue
    if (['node_modules', '.git'].includes(entry)) continue

    const fullPath = path.join(dir, entry)
    const relative = path.relative(this.projectRoot, fullPath)

    if (fs.statSync(fullPath).isDirectory()) {
    scan(fullPath)
    } else {
    files.push(relative)
    }
    }
    } catch (e) {
    // Silent fail
    }
    };

    scan(this.projectRoot)
    return files
  }

  /**;
   * 🔄 تحديث خريطة التوثيق;
   */;
  updateDocumentationMap(fileUpdates) {
    for (const update of fileUpdates) {
    this.fileDocumentation.set(update.file, update.data)
    }

    return {
    success: true,
    updated: fileUpdates.length,
    timestamp: new Date().toISOString()
    };
  }

  /**;
   * 📊 تقرير التوثيق;
   */;
  generateDocumentationReport() {
    const allFiles = this.getAllFiles()
    const documented = Array.from(this.fileDocumentation.keys())
    const undocumented = allFiles.filter(f => !documented.includes(f))

    return {
    totalFiles: allFiles.length,
    documentedFiles: documented.length,
    undocumentedFiles: undocumented.length,
    coverage: ((documented.length / allFiles.length) * 100).toFixed(2) + '%',
    undocumented: undocumented.slice(0, 20)
    };
  }
}

module.exports = DocumentationLinker