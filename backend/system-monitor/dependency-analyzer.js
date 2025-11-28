/**
 * 🔗 Dependency Analyzer - محلل الروابط والتبعيات
 * يكتشف الملفات المستخدمة والميتة والمكررة
 */

const fs = require('fs');
const path = require('path');

class DependencyAnalyzer {
  constructor(projectRoot = '../..') {
    this.projectRoot = path.resolve(__dirname, projectRoot);
    this.dependencies = new Map();
    this.usedFiles = new Set();
    this.deadCode = [];
    this.duplicates = [];
    this.orphans = [];
  }

  /**
   * 🔍 تحليل الروابط الكاملة
   */
  async analyzeDependencies() {
    const result = {
      used: [],
      dead: [],
      duplicates: [],
      orphans: [],
      imports: {},
      circular: [],
      issues: []
    };

    try {
      // فحص جميع ملفات المشروع
      const jsFiles = this.findFiles(['.js', '.json'], {
        excludeDirs: ['node_modules', '.git', 'archive']
      });

      // بناء خريطة الروابط
      for (const file of jsFiles) {
        result.imports[file] = this.extractImports(file);
      }

      // الكشف عن الملفات المستخدمة
      result.used = this.findUsedFiles(result.imports);

      // الكشف عن الملفات الميتة
      result.dead = this.findDeadCode(jsFiles, result.used);

      // الكشف عن المكررات
      result.duplicates = this.findDuplicates(jsFiles);

      // الكشف عن الملفات اليتيمة
      result.orphans = this.findOrphans(jsFiles, result.used);

      // الكشف عن الدورات
      result.circular = this.findCircularDependencies(result.imports);

      return result;
    } catch (error) {
      result.issues.push(error.message);
      return result;
    }
  }

  /**
   * 📂 البحث عن الملفات
   */
  findFiles(extensions, options = {}) {
    const { excludeDirs = ['node_modules'] } = options;
    const files = [];

    const scan = (dir) => {
      try {
        const entries = fs.readdirSync(dir);

        for (const entry of entries) {
          if (entry.startsWith('.')) continue;
          if (excludeDirs.includes(entry)) continue;

          const fullPath = path.join(dir, entry);
          const stats = fs.statSync(fullPath);

          if (stats.isDirectory()) {
            scan(fullPath);
          } else {
            const ext = path.extname(entry);
            if (extensions.includes(ext)) {
              files.push(fullPath);
            }
          }
        }
      } catch (e) {
        // Silent fail
      }
    };

    scan(this.projectRoot);
    return files;
  }

  /**
   * 📥 استخراج الواردات
   */
  extractImports(filePath) {
    const imports = [];

    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // require patterns
      const requireRegex = /require\(['"]([^'"]+)['"]\)/g;
      let match;
      while ((match = requireRegex.exec(content)) !== null) {
        imports.push(match[1]);
      }

      // import patterns
      const importRegex = /import\s+(?:.*?from\s+)?['"]([^'"]+)['"]/g;
      while ((match = importRegex.exec(content)) !== null) {
        imports.push(match[1]);
      }

      // onclick/onload patterns
      const eventRegex = /(?:onclick|onload|href)=['"]([^'"]+)['"]/g;
      while ((match = eventRegex.exec(content)) !== null) {
        if (!match[1].startsWith('http')) {
          imports.push(match[1]);
        }
      }
    } catch (e) {
      // Silent fail
    }

    return imports;
  }

  /**
   * ✅ البحث عن الملفات المستخدمة
   */
  findUsedFiles(imports) {
    const used = new Set();

    for (const file of Object.keys(imports)) {
      used.add(file);

      for (const imp of imports[file]) {
        const resolved = this.resolveImport(imp, file);
        if (resolved && fs.existsSync(resolved)) {
          used.add(resolved);
        }
      }
    }

    return Array.from(used);
  }

  /**
   * 💀 البحث عن الملفات الميتة
   */
  findDeadCode(allFiles, usedFiles) {
    const dead = [];
    const used = new Set(usedFiles);

    for (const file of allFiles) {
      if (!used.has(file)) {
        // تجاهل الملفات في archive
        if (!file.includes('archive')) {
          dead.push({
            path: file,
            relative: path.relative(this.projectRoot, file),
            size: fs.statSync(file).size
          });
        }
      }
    }

    return dead;
  }

  /**
   * 🔀 البحث عن المكررات
   */
  findDuplicates(files) {
    const duplicates = [];
    const hashes = new Map();

    for (const file of files) {
      const hash = this.hashFile(file);

      if (hashes.has(hash)) {
        duplicates.push({
          original: hashes.get(hash),
          duplicate: file,
          relative1: path.relative(this.projectRoot, hashes.get(hash)),
          relative2: path.relative(this.projectRoot, file)
        });
      } else {
        hashes.set(hash, file);
      }
    }

    return duplicates;
  }

  /**
   * 👻 البحث عن الملفات اليتيمة
   */
  findOrphans(allFiles, usedFiles) {
    const orphans = [];
    const used = new Set(usedFiles);

    for (const file of allFiles) {
      const basename = path.basename(file);
      
      // ملفات قد تكون مهمة
      const importantFiles = ['index', 'main', 'app', 'server', 'package'];
      const isImportant = importantFiles.some(name => basename.includes(name));

      if (!used.has(file) && !isImportant) {
        orphans.push({
          path: file,
          relative: path.relative(this.projectRoot, file),
          basename: basename
        });
      }
    }

    return orphans;
  }

  /**
   * 🔄 البحث عن الدورات
   */
  findCircularDependencies(imports) {
    const circular = [];
    const visited = new Set();

    const detectCycle = (file, path, visiting = new Set()) => {
      if (visiting.has(file)) {
        return path;
      }

      visiting.add(file);

      const imps = imports[file] || [];
      for (const imp of imps) {
        const resolved = this.resolveImport(imp, file);
        if (resolved && imports[resolved]) {
          const cycle = detectCycle(resolved, [...path, resolved], visiting);
          if (cycle) return cycle;
        }
      }

      visiting.delete(file);
      return null;
    };

    for (const file of Object.keys(imports)) {
      if (!visited.has(file)) {
        const cycle = detectCycle(file, [file]);
        if (cycle) {
          circular.push(cycle);
          cycle.forEach(f => visited.add(f));
        }
      }
    }

    return circular;
  }

  /**
   * 🔗 حل المسارات
   */
  resolveImport(imp, fromFile) {
    if (imp.startsWith('.')) {
      let resolved = path.resolve(path.dirname(fromFile), imp);
      
      if (!resolved.endsWith('.js')) {
        resolved += '.js';
      }

      if (fs.existsSync(resolved)) {
        return resolved;
      }
    }

    return null;
  }

  /**
   * 🔐 هاش الملف
   */
  hashFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let hash = 0;

      for (let i = 0; i < Math.min(content.length, 1000); i++) {
        const char = content.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }

      return Math.abs(hash).toString(16);
    } catch (e) {
      return 'error';
    }
  }
}

module.exports = DependencyAnalyzer;
