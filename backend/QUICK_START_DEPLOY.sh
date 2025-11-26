#!/bin/bash

echo "🚀 بدء النشر على Fly.io..."
echo ""

# التحقق من flyctl
if ! command -v flyctl &> /dev/null; then
    echo "❌ flyctl غير مثبت"
    echo "حمله من: https://fly.io/docs/hands-on/install-flyctl/"
    exit 1
fi

echo "✅ flyctl موجود"
echo ""

# تسجيل الدخول
echo "جاري التحقق من المصادقة..."
flyctl auth whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "🔐 تسجيل دخول مطلوب..."
    flyctl auth login
fi

echo ""
echo "🚀 جاري النشر..."
flyctl launch --name agent-backend-ahmd1

echo ""
echo "✅ اكتمل النشر!"
echo "الرابط: https://agent-backend-ahmd1.fly.dev"
