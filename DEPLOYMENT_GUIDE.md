# 🚀 دليل النشر الكامل

## المرحلة 1️⃣: نشر على Vercel (الواجهة الأمامية)

### الخطوة 1: إعداد المشروع
```bash
# تأكد من أن جميع الملفات محفوظة
git add .
git commit -m "🚀 نشر على Vercel"
```

### الخطوة 2: النشر على Vercel
```bash
# تثبيت Vercel CLI
npm install -g vercel

# دخول إلى Vercel
vercel login

# نشر الإنتاج
vercel --prod
```

### الخطوة 3: الروابط
```
🔗 الواجهة الأمامية: https://ai-platform.vercel.app
🔗 API: https://ai-platform.vercel.app/api
🔗 Static: https://ai-platform.vercel.app/public
```

---

## المرحلة 2️⃣: نشر الخادم الخلفي على Fly.io

### الخطوة 1: إعداد Fly.io
```bash
# تثبيت Fly CLI
curl -L https://fly.io/install.sh | sh

# دخول إلى Fly.io
flyctl auth login

# الانتقال لمجلد Backend
cd backend
```

### الخطوة 2: إنشاء التطبيق
```bash
# إنشاء تطبيق جديد
flyctl launch --name ai-platform-backend

# أو النشر مباشرة
flyctl deploy
```

### الخطوة 3: الروابط
```
🔗 الخادم: https://ai-platform-backend.fly.dev
🔗 API: https://ai-platform-backend.fly.dev/api
🔗 Health: https://ai-platform-backend.fly.dev/api/health
🔗 WebSocket: wss://ai-platform-backend.fly.dev/socket.io
```

---

## 📝 متغيرات البيئة المطلوبة

### على Vercel:
```
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
BACKEND_URL=https://ai-platform-backend.fly.dev
```

### على Fly.io:
```
NODE_ENV=production
PORT=5000
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
```

---

## 🔧 الإعدادات المهمة

### Vercel Settings:
- Root Directory: `.`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node Version: 20.x

### Fly.io Settings:
- Region: ams (Amsterdam)
- Memory: 512MB
- CPU: 1 shared
- Auto Stop: Enabled

---

## ✅ التحقق من النشر

### فحص Vercel:
```bash
curl https://ai-platform.vercel.app/api/health
```

### فحص Fly.io:
```bash
curl https://ai-platform-backend.fly.dev/api/health
```

---

## 🔗 ربط المنصات

بعد النشر على كلا المنصتين:

1. **في `public/js/app.js`**: حدّث الـ API URL
```javascript
const API_URL = 'https://ai-platform-backend.fly.dev';
const SOCKET_URL = 'https://ai-platform-backend.fly.dev';
```

2. **في Fly.io**: أضف متغير البيئة
```bash
flyctl secrets set FRONTEND_URL=https://ai-platform.vercel.app
```

3. **في Vercel**: أضف متغيرات البيئة من Settings → Environment Variables

---

## 📱 النتيجة النهائية

```
Frontend (Vercel)     Backend (Fly.io)     Database
     ↓                      ↓                   ↓
user → vercel.app → fly.dev API → Groq/Firebase/PostgreSQL
                  ↓
            Socket.io (Real-time)
```

---

## 🎯 ملخص الروابط

| المنصة | الرابط | الحالة |
|--------|--------|--------|
| **Replit (Dev)** | https://replit-domain.replit.dev | ✅ نشط |
| **Vercel (Frontend)** | https://ai-platform.vercel.app | 📋 جاهز |
| **Fly.io (Backend)** | https://ai-platform-backend.fly.dev | 📋 جاهز |

---

**المشروع جاهز 100% للنشر!** 🚀
