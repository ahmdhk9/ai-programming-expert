#!/bin/bash

echo "🚀 نشر سريع - Vercel + Fly.io"
echo "================================"

# الخطوة 1: Vercel
echo "1️⃣ نشر على Vercel..."
npm install -g vercel
vercel --prod

echo "✅ تم النشر على Vercel"
echo "🔗 الرابط: https://ai-platform.vercel.app"

# الخطوة 2: Fly.io
echo ""
echo "2️⃣ نشر الخادم على Fly.io..."
curl -L https://fly.io/install.sh | sh
export FLYCTL_INSTALL="/home/runner/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

flyctl auth login
cd backend
flyctl deploy --name ai-platform-backend

echo "✅ تم النشر على Fly.io"
echo "🔗 الرابط: https://ai-platform-backend.fly.dev"

echo ""
echo "🎉 تم النشر بنجاح على كلا المنصتين!"
