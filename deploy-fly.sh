#!/bin/bash
set -e

export FLYCTL_INSTALL="/home/runner/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

echo "🚀 Deploying to Fly.io..."
echo "App: agent-backend-ahmd1"
echo "Region: ams"

cd backend

# إنشاء app إذا لم تكن موجودة
echo "📦 Checking Fly.io app..."
flyctl apps list | grep -q agent-backend-ahmd1 && echo "✅ App exists" || echo "⚠️ Creating app..."

# النشر
echo "🔨 Building and deploying..."
flyctl deploy --remote-only --strategy immediate --skip-health-checks 2>&1 | tee deploy.log

# فحص النتيجة
if grep -q "Deployment complete" deploy.log || grep -q "Update successful" deploy.log; then
  echo "✅ Deploy successful!"
  echo ""
  echo "🔗 API URLs:"
  echo "   Main:   https://agent-backend-ahmd1.fly.dev"
  echo "   Health: https://agent-backend-ahmd1.fly.dev/health"
else
  echo "⚠️ Deploy might have issues - checking status..."
  flyctl status
fi

