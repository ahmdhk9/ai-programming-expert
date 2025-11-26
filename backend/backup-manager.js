const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// نظام النسخ الاحتياطية التلقائية
class BackupManager {
  constructor() {
    this.backupDir = '.backups/automated';
    this.maxBackups = 50;
    this.backupSchedule = {
      interval: 3600000, // كل ساعة
      daily: true,
      weekly: true
    };

    this.ensureBackupDir();
    this.startAutoBackup();
  }

  ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  // إنشاء نسخة احتياطية
  createBackup(data) {
    const timestamp = new Date().toISOString();
    const filename = `backup_${timestamp.replace(/[:.]/g, '-')}.json.enc`;
    const filepath = path.join(this.backupDir, filename);

    // تشفير البيانات قبل الحفظ
    const encrypted = this.encryptData(data);

    // حفظ الملف
    fs.writeFileSync(filepath, encrypted);

    // حذف النسخ القديمة
    this.cleanOldBackups();

    return {
      filename,
      timestamp,
      size: fs.statSync(filepath).size,
      encrypted: true
    };
  }

  // استعادة نسخة احتياطية
  restoreBackup(filename) {
    const filepath = path.join(this.backupDir, filename);

    if (!fs.existsSync(filepath)) {
      throw new Error('Backup not found');
    }

    const encrypted = fs.readFileSync(filepath, 'utf8');
    return this.decryptData(encrypted);
  }

  // تشفير البيانات
  encryptData(data) {
    const key = process.env.BACKUP_KEY || 'default-backup-key';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.scryptSync(key, 'salt', 32), iv);

    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
  }

  // فك تشفير البيانات
  decryptData(encryptedData) {
    const key = process.env.BACKUP_KEY || 'default-backup-key';
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts[0], 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', crypto.scryptSync(key, 'salt', 32), iv);
    let decrypted = decipher.update(parts[1], 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }

  // حذف النسخ القديمة
  cleanOldBackups() {
    const files = fs.readdirSync(this.backupDir)
      .map(f => ({
        name: f,
        time: fs.statSync(path.join(this.backupDir, f)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length > this.maxBackups) {
      files.slice(this.maxBackups).forEach(f => {
        fs.unlinkSync(path.join(this.backupDir, f.name));
      });
    }
  }

  // بدء النسخ الاحتياطية التلقائية
  startAutoBackup() {
    setInterval(() => {
      const data = {
        timestamp: new Date(),
        backup: {
          users: [],
          projects: [],
          settings: {}
        }
      };

      this.createBackup(data);
      console.log('✅ Backup created');
    }, this.backupSchedule.interval);
  }

  // قائمة النسخ المتاحة
  listBackups() {
    return fs.readdirSync(this.backupDir)
      .map(f => ({
        filename: f,
        path: path.join(this.backupDir, f),
        size: fs.statSync(path.join(this.backupDir, f)).size,
        created: fs.statSync(path.join(this.backupDir, f)).mtime
      }))
      .sort((a, b) => b.created.getTime() - a.created.getTime());
  }
}

module.exports = new BackupManager();
