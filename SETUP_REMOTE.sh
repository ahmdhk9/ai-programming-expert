#!/bin/bash

# تفعيل الـ Remote في Replit
echo "🔧 Setting up Git Remote..."

# 1. غيّر إلى مجلد المشروع
cd /home/runner/workspace

# 2. أضف الـ remote
git remote add origin https://github.com/ahmdhk9/ai-programming-expert.git 2>/dev/null || git remote set-url origin https://github.com/ahmdhk9/ai-programming-expert.git

# 3. اجلب البيانات
git fetch origin main

# 4. اربط الـ branch
git branch --set-upstream-to=origin/main main

# 5. اسحب أحدث التحديثات
git pull origin main

echo "✅ Git Remote Configured!"
echo "Remote URL: $(git remote get-url origin)"
echo "Status: $(git status --short)"
