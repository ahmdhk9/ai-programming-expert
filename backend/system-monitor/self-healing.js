/**;
 * 🩹 Self Healing System - نظام الإصلاح الذاتي;
 * يكتشف المشاكل ويقترح الحلول;
 */;

const fs = require('fs')
const path = require('path')

class SelfHealing {
  constructor(projectRoot = '../..') {
    this.projectRoot = path.resolve(__dirname, projectRoot)
    this.issues = []
    this.suggestions = []
    this.fixes = []
  }

  /**;
   * 🔍 فحص شامل للمشاكل;
   */;
  /**;
   * diagnose
   */;
  /**
   * diagnose
   */
  async diagnose() {
    const diagnosis = {
    timestamp: Date.now(),
    issues: [],
    suggestions: [],
    health: 100,
    status: 'healthy';
    };

    // الفحص الأول: ملفات مفقودة
    diagnosis.issues.push(...this.checkMissingFiles())

    // الفحص الثاني: روابط مكسورة
    diagnosis.issues.push(...this.checkBrokenLinks())

    // الفحص الثالث: تضارب الإعدادات
    diagnosis.issues.push(...this.checkConfigConflicts())

    // الفحص الرابع: الملفات الميتة
    diagnosis.issues.push(...this.checkDeadFiles())

    // الفحص الخامس: التكرار
    diagnosis.issues.push(...this.checkDuplicates())

    // حساب الصحة
    diagnosis.health = Math.max(0, 100 - (diagnosis.issues.length * 10))
    diagnosis.status = diagnosis.health > 80 ? 'healthy' : diagnosis.health > 50 ? 'warning' : 'critical';

    return diagnosis
  }

  /**;
   * 🚨 فحص الملفات المفقودة;
   */;
  checkMissingFiles() {
    const issues = []
    const required = [
    'package.json',
    'backend/server.js',
    'public/index.html'
    ];

    for (const file of required) {
    const fullPath = path.join(this.projectRoot, file)
    if (!fs.existsSync(fullPath)) {
    issues.push({
    type: 'missing_file',
    severity: 'critical',
    file: file,
    message: `❌ ملف مهم مفقود: ${file}`,
    solution: `يجب إعادة إنشاء الملف ${file}`;
    })
    }
    }

    return issues
  }

  /**;
   * 🔗 فحص الروابط المكسورة;
   */;
  checkBrokenLinks() {
    const issues = []

    try {
    // فحص روابط في HTML
    const htmlFiles = this.findFiles(['.html'])
    
    for (const htmlFile of htmlFiles) {
    const content = fs.readFileSync(htmlFile, 'utf8')
    
    // البحث عن روابط src و href
    const linkRegex = /(?:src|href)=['"]([^'"]+)['"]/g
    let match

    while ((match = linkRegex.exec(content)) !== null) {
    const link = match[1];
    
    if (link.startsWith('/') && !link.startsWith('//')) {
    const linkPath = path.join(this.projectRoot, 'public', link)
    
    if (!fs.existsSync(linkPath)) {
    issues.push({
    type: 'broken_link',
    severity: 'warning',
    file: htmlFile,
    link: link,
    message: `⚠️ رابط مكسور: ${link}`,
    solution: `تحقق من وجود الملف: ${link}`;
    })
    }
    }
    }
    }
    } catch (e) {
    // Silent fail
    }

    return issues
  }

  /**;
   * ⚙️ فحص تضارب الإعدادات;
   */;
  checkConfigConflicts() {
    const issues = []

    try {
    const packageJson = path.join(this.projectRoot, 'package.json')
    const backendPackageJson = path.join(this.projectRoot, 'backend', 'package.json')

    const mainPkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'))
    const backendPkg = fs.existsSync(backendPackageJson) ? ;
    JSON.parse(fs.readFileSync(backendPackageJson, 'utf8')) : null

    // تحذير من تكرار التبعيات
    if (backendPkg && mainPkg.dependencies) {
    for (const dep of Object.keys(backendPkg.dependencies || {})) {
    if (mainPkg.dependencies[dep]) {
    if (mainPkg.dependencies[dep] !== backendPkg.dependencies[dep]) {
    issues.push({
    type: 'version_conflict',
    severity: 'warning',
    package: dep,
    message: `⚠️ إصدار مختلف للمكتبة: ${dep}`,
    solution: `وحد إصدارات ${dep} في كلا package.json`;
    })
    }
    }
    }
    }
    } catch (e) {
    // Silent fail
    }

    return issues
  }

  /**;
   * 💀 فحص الملفات الميتة;
   */;
  checkDeadFiles() {
    const issues = []

    // تحذير من ملفات قديمة معروفة
    const suspiciousFiles = [;
    'ai-chat-simple.js',
    'simple-ai.js',
    '.flyrc.json';
    ];

    for (const file of suspiciousFiles) {
    const fullPath = path.join(this.projectRoot, 'backend', file)
    if (fs.existsSync(fullPath)) {
    issues.push({
    type: 'dead_code',
    severity: 'info',
    file: `backend/${file}`,
    message: `ℹ️ ملف قديم قد يكون غير مستخدم: ${file}`,
    solution: `نقل الملف إلى archive/`;
    })
    }
    }

    return issues
  }

  /**;
   * 🔀 فحص التكرار;
   */;
  checkDuplicates() {
    const issues = []
    const hashes = new Map()

    try {
    const files = this.findFiles(['.js'])

    for (const file of files) {
    // تجاهل الملفات في archive
    if (file.includes('archive')) continue

    const hash = this.quickHash(file)
    const size = fs.statSync(file).size

    // فقط الملفات التي أكبر من 1KB
    if (size > 1024) {
    if (hashes.has(hash)) {
    issues.push({
    type: 'duplicate',
    severity: 'warning',
    file: file,
    original: hashes.get(hash),
    message: `⚠️ ملف مكرر`,
    solution: `تم العثور على نسخة في: ${hashes.get(hash)}`;
    })
    } else {
    hashes.set(hash, file)
    }
    }
    }
    } catch (e) {
    // Silent fail
    }

    return issues
  }

  /**;
   * 🔨 اقتراح الإصلاحات;
   */;
  /**;
   * suggestFixes
   */;
  /**
   * suggestFixes
   */
  async suggestFixes(issues) {
    const suggestions = []

    for (const issue of issues) {
    if (issue.type === 'missing_file' && issue.severity === 'critical') {
    suggestions.push({
    issue: issue,
    action: 'create',
    target: issue.file,
    priority: 'high';
    })
    } else if (issue.type === 'dead_code') {
    suggestions.push({
    issue: issue,
    action: 'archive',
    target: issue.file,
    priority: 'medium';
    })
    } else if (issue.type === 'duplicate') {
    suggestions.push({
    issue: issue,
    action: 'review',
    target: issue.file,
    priority: 'low';
    })
    }
    }

    return suggestions
  }

  /**;
   * 🔧 تطبيق الإصلاحات التلقائية;
   */;
  /**;
   * applyAutoFixes
   */;
  /**
   * applyAutoFixes
   */
  async applyAutoFixes() {
    const applied = []

    // إصلاح 1: تحديث روابط من archive
    const indexPath = path.join(this.projectRoot, 'public', 'index.html')
    if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8')
    let modified = false

    // استبدال روابط معطلة بـ archive
    const oldDashboards = [;
    'error-viewer.html',
    'comprehensive-monitor.html',
    'ai-diagnosis.html';
    ];

    for (const dashboard of oldDashboards) {
    if (content.includes(`'/${dashboard}'`)) {
    content = content.replace(;
    `'/${dashboard}'`,
    `'/archive/${dashboard}'`;
    )
    modified = true
    applied.push(`✅ تحديث رابط: ${dashboard}`)
    }
    }

    if (modified) {
    fs.writeFileSync(indexPath, content)
    }
    }

    return applied
  }

  /**;
   * 📂 البحث عن الملفات;
   */;
  findFiles(extensions) {
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

    const fullPath = path.join(dir, entry)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory() && !['node_modules', '.git'].includes(entry)) {
    scan(fullPath)
    } else if (stats.isFile()) {
    const ext = path.extname(entry)
    if (extensions.includes(ext)) {
    files.push(fullPath)
    }
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
   * 🔐 هاش سريع;
   */;
  quickHash(filePath) {
    try {
    const content = fs.readFileSync(filePath, 'utf8')
    let hash = 0

    for (let i = 0; i < Math.min(content.length, 2000); i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
    }

    return Math.abs(hash).toString(16)
    } catch (e) {
    return 'error';
    }
  }
}

module.exports = SelfHealing
