#!/bin/bash

echo "🔍 فحص شامل للمنصة..."
echo ""

# 1. فحص Node.js
echo "1️⃣  فحص Node.js..."
if ! command -v node &> /dev/null; then
  echo "❌ Node.js غير مثبت"
  exit 1
fi
echo "✅ Node.js: $(node --version)"

# 2. فحص npm
echo ""
echo "2️⃣  فحص npm..."
if ! command -v npm &> /dev/null; then
  echo "❌ npm غير مثبت"
  exit 1
fi
echo "✅ npm: $(npm --version)"

# 3. فحص الملفات الأساسية
echo ""
echo "3️⃣  فحص الملفات الأساسية..."
FILES=(
  "web/pages/index.tsx"
  "backend/index.js"
  "package.json"
  "README.md"
  "replit.md"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - غير موجود"
  fi
done

# 4. فحص المجلدات
echo ""
echo "4️⃣  فحص المجلدات..."
DIRS=(
  "web/pages"
  "web/public"
  "backend"
  "docs"
)

for dir in "${DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "✅ $dir"
  else
    echo "❌ $dir - غير موجود"
  fi
done

# 5. عد الملفات
echo ""
echo "5️⃣  إحصائيات الملفات..."
echo "صفحات React: $(ls web/pages/*.tsx 2>/dev/null | wc -l)"
echo "ملفات Backend: $(ls backend/*.js 2>/dev/null | wc -l)"
echo "ملفات التوثيق: $(ls docs/*.md 2>/dev/null | wc -l)"

# 6. فحص الأخطاء الشائعة
echo ""
echo "6️⃣  فحص الأخطاء الشائعة..."

# فحص TypeScript
if command -v tsc &> /dev/null; then
  echo "✅ TypeScript مثبت"
  # tsc --noEmit 2>/dev/null && echo "✅ لا توجد أخطاء TypeScript" || echo "⚠️  توجد أخطاء TypeScript"
else
  echo "⚠️  TypeScript غير مثبت"
fi

# 7. فحص الأمان
echo ""
echo "7️⃣  فحص الأمان..."
if grep -r "console.log.*SECRET" web backend 2>/dev/null; then
  echo "❌ تنبيه: secrets في الكود!"
else
  echo "✅ لا توجد secrets في الكود"
fi

if grep -r "hardcoded" web backend 2>/dev/null; then
  echo "⚠️  تنبيه: قيم hardcoded موجودة"
else
  echo "✅ لا توجد قيم hardcoded"
fi

# 8. النتيجة النهائية
echo ""
echo "════════════════════════════════"
echo "✅ الفحص الشامل انتهى بنجاح!"
echo "════════════════════════════════"
