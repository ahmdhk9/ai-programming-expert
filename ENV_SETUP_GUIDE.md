# 🔐 دليل إعداد متغيرات البيئة (Environment Variables)

## 📋 متغيرات البيئة المتاحة:

| المتغير | القيمة | الموقع |
|--------|--------|--------|
| `PORT` | `5000` | server.js - منفذ الاستماع |
| `NODE_ENV` | `production` | server.js - بيئة التشغيل |
| `HOST` | `0.0.0.0` | server.js - اسم المضيف |
| `GROQ_API_KEY` | `required` | server.js - مفتاح Groq API |
| `OPENAI_API_KEY` | `required` | server.js - مفتاح OpenAI API |

---

## 🚀 الإعداد على منصات مختلفة:

### 1️⃣ **Replit (Development)**
```bash
# الملفات الموجودة:
backend/.env           ← متغيرات التطوير (test keys)
backend/.env.example   ← قالب المتغيرات المطلوبة
```

✅ **بدء التطبيق:**
```bash
cd backend
node server.js
```

---

### 2️⃣ **Fly.io (Production)**

**الخطوة 1: تعيين المتغيرات:**
```bash
flyctl secrets set GROQ_API_KEY=your_actual_key
flyctl secrets set OPENAI_API_KEY=your_actual_key
flyctl secrets set STRIPE_SECRET_KEY=your_actual_key
flyctl secrets set SESSION_SECRET=your_secure_secret
```

**الخطوة 2: تحقق من الإعدادات:**
```bash
flyctl config show
flyctl secrets list
```

**الخطوة 3: انشر:**
```bash
flyctl deploy
```

---

### 3️⃣ **Vercel (Frontend)**

**Settings → Environment Variables:**
```
BACKEND_URL=https://agent-backend-ahmd1.fly.dev
GROQ_API_KEY=your_key
OPENAI_API_KEY=your_key
```

---

### 4️⃣ **Firebase**

في `firebase.json`:
```json
{
  "functions": {
    "source": "backend",
    "runtime": "nodejs20",
    "environmentVariables": {
      "GROQ_API_KEY": "your_key",
      "OPENAI_API_KEY": "your_key"
    }
  }
}
```

---

## 🔑 كيفية الحصول على المفاتيح:

### 🟢 **Groq API:**
1. اذهب إلى: https://console.groq.com
2. اختر "API Keys"
3. انسخ المفتاح

### 🔴 **OpenAI API:**
1. اذهب إلى: https://platform.openai.com/account/api-keys
2. اضغط "Create new secret key"
3. انسخ المفتاح

---

## ⚠️ **الأخطاء الشائعة والحل:**

### ❌ "Cannot read property 'apiKey' of undefined"
```
❌ المشكلة: متغير البيئة غير موجود
✅ الحل:
  1. تحقق من backend/.env
  2. تأكد من أن المتغير موجود
  3. أعد تشغيل التطبيق: flyctl restart
```

### ❌ "dotenv is not defined"
```
❌ المشكلة: لم يتم تثبيت dotenv
✅ الحل:
  cd backend
  npm install dotenv
```

### ❌ "PORT is already in use"
```
❌ المشكلة: المنفذ 5000 مستخدم
✅ الحل:
  PORT=3001 node server.js
```

---

## 📝 الهيكل الكامل:

```
backend/
├── .env                 ← متغيرات التطوير (لا تُرسل لـ Git)
├── .env.example         ← قالب (يُرسل لـ Git)
├── .gitignore           ← يشمل .env
├── fly.toml             ← إعدادات Fly.io
├── Dockerfile           ← يقرأ من fly.toml
└── server.js            ← require('dotenv').config()
```

---

## ✅ تحقق من الإعداد:

```bash
# 1. اختبر المتغيرات محلياً
cd backend
node -e "require('dotenv').config(); console.log(process.env.GROQ_API_KEY)"

# 2. على Fly.io
flyctl logs --follow

# 3. على الرابط المباشر
curl https://agent-backend-ahmd1.fly.dev/api/health
```

---

**كل شيء جاهز الآن! 🎉**
