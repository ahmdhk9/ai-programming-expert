#!/bin/bash

# 🔧 أداة استرجاع الملفات من Archive
# استخدام: ./restore-from-archive.sh [ملف/مجلد]

if [ -z "$1" ]; then
  echo "📦 أداة استرجاع الملفات من Archive"
  echo ""
  echo "الاستخدام:"
  echo "  ./restore-from-archive.sh payment       # استرجاع payment service"
  echo "  ./restore-from-archive.sh auth          # استرجاع auth service"
  echo "  ./restore-from-archive.sh monitor       # استرجاع monitor script"
  echo ""
  echo "📂 الملفات المتاحة:"
  echo ""
  echo "Backend Services:"
  ls archive/backend-services/ | grep -v README | sed 's/^/  - /'
  echo ""
  echo "Scripts:"
  ls archive/scripts-old/ | grep -v README | head -10 | sed 's/^/  - /'
  echo "  ... و المزيد"
  echo ""
  echo "HTML Dashboards:"
  ls archive/*.html 2>/dev/null | sed 's|.*\/||' | sed 's/^/  - /'
  exit 0
fi

TARGET=$1

# البحث في backend-services
if [ -f "archive/backend-services/$TARGET.js" ]; then
  if [ ! -d "backend/services" ]; then
    mkdir -p backend/services
    echo "✅ تم إنشاء backend/services/"
  fi
  cp "archive/backend-services/$TARGET.js" "backend/services/"
  echo "✅ تم استرجاع: backend/services/$TARGET.js"
  exit 0
fi

# البحث في scripts-old
if [ -f "archive/scripts-old/$TARGET.js" ]; then
  if [ ! -d "scripts" ]; then
    mkdir -p scripts
    echo "✅ تم إنشاء scripts/"
  fi
  cp "archive/scripts-old/$TARGET.js" "scripts/"
  echo "✅ تم استرجاع: scripts/$TARGET.js"
  exit 0
fi

# البحث في HTML
if [ -f "archive/$TARGET.html" ]; then
  cp "archive/$TARGET.html" "public/"
  echo "✅ تم استرجاع: public/$TARGET.html"
  exit 0
fi

echo "❌ لم يتم العثور على: $TARGET"
echo ""
echo "جرب: ./restore-from-archive.sh (بدون معاملات) لمعرفة الملفات المتاحة"
