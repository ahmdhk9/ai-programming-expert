const fs = require('fs');
const path = require('path');

// نظام حماية الكود المصدري
class CodeProtection {
  constructor() {
    this.protectedPaths = [
      'web/pages',
      'backend',
      'docs',
      'package.json'
    ];
    this.fileHashes = {};
    this.initializeHashes();
  }

  // حساب hash للملفات
  calculateHash(filepath) {
    const crypto = require('crypto');
    const content = fs.readFileSync(filepath, 'utf8');
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  // تهيئة الهاش الأولي
  initializeHashes() {
    this.protectedPaths.forEach(dirPath => {
      if (fs.existsSync(dirPath)) {
        this.hashDirectory(dirPath);
      }
    });
  }

  // حساب hash لجميع الملفات في المجلد
  hashDirectory(dirPath, baseDir = dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const relativePath = path.relative(baseDir, fullPath);

      if (fs.statSync(fullPath).isDirectory()) {
        this.hashDirectory(fullPath, baseDir);
      } else if (this.isSourceFile(file)) {
        try {
          this.fileHashes[relativePath] = this.calculateHash(fullPath);
        } catch (e) {
          console.log(`Could not hash ${relativePath}`);
        }
      }
    });
  }

  // التحقق من تعديلات الملفات
  verifyIntegrity() {
    const changes = [];

    for (const [filepath, originalHash] of Object.entries(this.fileHashes)) {
      const fullPath = path.join('.', filepath);

      if (!fs.existsSync(fullPath)) {
        changes.push({ file: filepath, type: 'deleted' });
      } else {
        const currentHash = this.calculateHash(fullPath);
        if (currentHash !== originalHash) {
          changes.push({ file: filepath, type: 'modified' });
        }
      }
    }

    return changes;
  }

  // منع الحذف
  watchForDeletion() {
    setInterval(() => {
      const changes = this.verifyIntegrity();

      changes.forEach(change => {
        if (change.type === 'deleted') {
          console.warn(`⚠️ ALERT: File deleted - ${change.file}`);
          // استعادة الملف من النسخة الاحتياطية
          this.restoreFile(change.file);
        }
      });
    }, 60000); // كل دقيقة
  }

  // استعادة الملف
  restoreFile(filepath) {
    console.log(`🔄 Attempting to restore ${filepath}`);
    // يمكن تطبيق استعادة من Git أو Backup
  }

  // التحقق من نوع الملف
  isSourceFile(filename) {
    const extensions = ['.tsx', '.ts', '.js', '.json', '.md'];
    return extensions.some(ext => filename.endsWith(ext));
  }

  // قفل المشروع
  lockProject() {
    const lockFile = path.join('.', '.project-lock');
    fs.writeFileSync(lockFile, JSON.stringify({
      locked: true,
      lockedAt: new Date(),
      lockedBy: 'admin'
    }));
    return true;
  }

  // فتح المشروع
  unlockProject(password) {
    if (password === process.env.PROJECT_UNLOCK_PASSWORD) {
      const lockFile = path.join('.', '.project-lock');
      if (fs.existsSync(lockFile)) {
        fs.unlinkSync(lockFile);
      }
      return true;
    }
    return false;
  }

  // التحقق من حالة القفل
  isProjectLocked() {
    return fs.existsSync(path.join('.', '.project-lock'));
  }
}

module.exports = new CodeProtection();
