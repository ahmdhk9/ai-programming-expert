#!/bin/bash

# نسخة احتياطية شاملة
BACKUP_DIR=".backups/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

echo "📦 إنشاء نسخة احتياطية..."

# نسخ الملفات الهامة
cp -r web/pages $BACKUP_DIR/
cp -r backend $BACKUP_DIR/
cp -r docs $BACKUP_DIR/
cp package.json $BACKUP_DIR/
cp README.md $BACKUP_DIR/

# ضغط النسخة
tar -czf "$BACKUP_DIR.tar.gz" $BACKUP_DIR
rm -rf $BACKUP_DIR

echo "✅ تم إنشاء نسخة احتياطية: $BACKUP_DIR.tar.gz"
