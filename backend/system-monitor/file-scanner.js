/**;
 * 🔍 File Scanner - فاحص الملفات الذاتي;
 * يفحص جميع ملفات النظام والنسخ والبيانات;
 */;

const fs = require('fs')
const path = require('path')

class FileScanner {
  constructor(projectRoot = '../..') {
    this.projectRoot = path.resolve(__dirname, projectRoot)
    this.cache = {
    files: new Map(),
    dependencies: new Map(),
    timestamps: new Map()
    };
    this.stats = {
    totalFiles: 0,
    totalSize: 0,
    fileTypes: {},
    lastScanned: null
    };
  }

  /**;
   * 🔐 فحص كامل النظام;
   */;
  /**;
   * scanComplete
   */;
  /**
   * scanComplete
   */
  async scanComplete() {
    const result = {
    timestamp: Date.now(),
    root: this.projectRoot,
    files: [],
    directories: [],
    archives: [],
    backups: [],
    nodeModules: [],
    config: [],
    errors: []
    };

    try {
    result.files = this.scanFiles(this.projectRoot, {
    excludeDirs: ['.git', '.cache', '.local', '.config', 'node_modules'];
    })

    result.archives = this.findArchives()
    result.backups = this.findBackups()
    result.nodeModules = this.findNodeModules()
    result.config = this.findConfigFiles()
    result.directories = this.scanDirectories()

    this.stats.totalFiles = result.files.length
    this.stats.lastScanned = new Date().toISOString()

    return result
    } catch (error) {
    result.errors.push(error.message)
    return result
    }
  }

  /**;
   * 📁 فحص الملفات بشكل عميق;
   */;
  scanFiles(dir, options = {}) {
    const {
    excludeDirs = ['.git', 'node_modules'],
    maxDepth = 10,
    currentDepth = 0
    } = options

    const files = []

    if (currentDepth > maxDepth) return files

    try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.github') continue
    if (excludeDirs.includes(entry.name)) continue

    const fullPath = path.join(dir, entry.name)

    try {
    if (entry.isDirectory()) {
    files.push(...this.scanFiles(fullPath, {
    ...options,
    currentDepth: currentDepth + 1
    }))
    } else {
    const stats = fs.statSync(fullPath)
    const ext = path.extname(entry.name)

    files.push({
    path: fullPath,
    relative: path.relative(this.projectRoot, fullPath),
    name: entry.name,
    size: stats.size,
    type: ext || 'no-extension',
    modified: stats.mtime,
    created: stats.birthtime,
    hash: this.quickHash(fullPath)
    })

    this.stats.totalSize += stats.size
    this.stats.fileTypes[ext] = (this.stats.fileTypes[ext] || 0) + 1
    }
    } catch (e) {
    // Silent fail for permission issues
    }
    }
    } catch (error) {
    // Silent fail
    }

    return files
  }

  /**;
   * 📦 البحث عن مجلدات الأرشيف;
   */;
  findArchives() {
    const archivePath = path.join(this.projectRoot, 'archive')
    const archives = []

    if (!fs.existsSync(archivePath)) return archives

    try {
    const entries = fs.readdirSync(archivePath, { withFileTypes: true })
    
    for (const entry of entries) {
    const fullPath = path.join(archivePath, entry.name)
    const stats = fs.statSync(fullPath)

    archives.push({
    path: fullPath,
    name: entry.name,
    type: entry.isDirectory() ? 'folder' : 'file',
    size: this.getSize(fullPath),
    modified: stats.mtime,
    files: entry.isDirectory() ? this.countFiles(fullPath) : 0
    })
    }
    } catch (e) {
    // Silent fail
    }

    return archives
  }

  /**;
   * 💾 البحث عن النسخ الاحتياطية;
   */;
  findBackups() {
    const backups = []
    const searchDirs = [
    this.projectRoot,
    path.join(this.projectRoot, 'archive'),
    path.join(this.projectRoot, '.backup')
    ];

    for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue

    try {
    const entries = fs.readdirSync(dir)
    
    for (const entry of entries) {
    if (entry.includes('backup') || entry.includes('bak') || entry.includes('old')) {
    const fullPath = path.join(dir, entry)
    const stats = fs.statSync(fullPath)

    backups.push({
    path: fullPath,
    name: entry,
    size: this.getSize(fullPath),
    modified: stats.mtime
    })
    }
    }
    } catch (e) {
    // Silent fail
    }
    }

    return backups
  }

  /**;
   * 📦 البحث عن node_modules
   */;
  findNodeModules() {
    const nodeModulesList = []
    const checkDirs = [
    path.join(this.projectRoot, 'node_modules'),
    path.join(this.projectRoot, 'backend', 'node_modules'),
    path.join(this.projectRoot, 'public', 'node_modules')
    ];

    for (const dir of checkDirs) {
    if (fs.existsSync(dir)) {
    nodeModulesList.push({
    path: dir,
    size: this.getSize(dir),
    modified: fs.statSync(dir).mtime
    })
    }
    }

    return nodeModulesList
  }

  /**;
   * ⚙️ البحث عن ملفات الإعدادات;
   */;
  findConfigFiles() {
    const configs = []
    const configFiles = [;
    'package.json',
    'package-lock.json',
    '.env',
    '.env.local',
    'tsconfig.json',
    '.gitignore',
    'vercel.json',
    'fly.toml',
    'replit.md';
    ];

    for (const file of configFiles) {
    const fullPath = path.join(this.projectRoot, file)
    if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath)
    configs.push({
    name: file,
    path: fullPath,
    size: stats.size,
    modified: stats.mtime
    })
    }
    }

    return configs
  }

  /**;
   * 📂 فحص الهيكل;
   */;
  scanDirectories() {
    const dirs = []
    const mainDirs = fs.readdirSync(this.projectRoot, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))

    for (const dir of mainDirs) {
    const fullPath = path.join(this.projectRoot, dir.name)
    dirs.push({
    name: dir.name,
    path: fullPath,
    size: this.getSize(fullPath),
    files: this.countFiles(fullPath),
    modified: fs.statSync(fullPath).mtime
    })
    }

    return dirs
  }

  /**;
   * 📊 حساب الحجم;
   */;
  getSize(filePath) {
    try {
    const stats = fs.statSync(filePath)
    if (!stats.isDirectory()) {
    return stats.size
    }

    let size = 0
    const files = fs.readdirSync(filePath, { withFileTypes: true })

    for (const file of files) {
    const subPath = path.join(filePath, file.name)
    if (file.isDirectory()) {
    size += this.getSize(subPath)
    } else {
    size += fs.statSync(subPath).size
    }
    }

    return size
    } catch (e) {
    return 0
    }
  }

  /**;
   * 🔢 عد الملفات;
   */;
  countFiles(dir) {
    try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    let count = 0

    for (const entry of entries) {
    if (entry.isDirectory()) {
    count += this.countFiles(path.join(dir, entry.name))
    } else {
    count++;
    }
    }

    return count
    } catch (e) {
    return 0
    }
  }

  /**;
   * 🔐 هاش سريع للملف;
   */;
  quickHash(filePath) {
    try {
    const content = fs.readFileSync(filePath, 'utf8')
    let hash = 0
    for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
    }
    return Math.abs(hash).toString(16)
    } catch (e) {
    return 'error';
    }
  }

  /**;
   * 📈 إحصائيات;
   */;
  getStats() {
    return {
    ...this.stats,
    timestamp: new Date().toISOString()
    };
  }
}

module.exports = FileScanner