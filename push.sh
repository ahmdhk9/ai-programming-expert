#!/bin/bash

echo "🚀 دفع التعديلات إلى GitHub..."
echo ""

# إزالة الـ lock
rm -f .git/index.lock

# تأكد من الـ user
git config user.name "ahmdhk9"
git config user.email "ahmdhk9@users.noreply.github.com"

# أضف الملفات
echo "📦 إضافة الملفات..."
git add .

# اعمل commit
echo "📝 عمل commit..."
git commit -m "🚀 Add Smart CI/CD Pipeline

✨ GitHub Actions workflow
✨ Deployment scripts (Vercel, Firebase, Fly.io)
✨ Health monitoring and auto-recovery
✨ Status tracking (deploy.config.json)
✨ Smart config engine (config-engine.js)"

# ارفع على GitHub
echo "📤 رفع إلى GitHub..."
git push origin main

echo ""
echo "✅ تم الرفع بنجاح!"
echo ""
echo "🔗 شاهد GitHub Actions:"
echo "https://github.com/ahmdhk9/ai-programming-expert/actions"
