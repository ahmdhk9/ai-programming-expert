# 🚀 دليل نشر على Fly.io

## المتطلبات:
1. تحميل [flyctl CLI](https://fly.io/docs/hands-on/install-flyctl/)
2. حساب Fly.io (مجاني)

## خطوات النشر:

### 1️⃣ تسجيل الدخول
```bash
flyctl auth login
```

### 2️⃣ انتقل إلى مجلد Backend
```bash
cd backend
```

### 3️⃣ انشر التطبيق
```bash
flyctl launch --name agent-backend-ahmd1
```

**الإجابات على الأسئلة:**
- `Do you want to copy its configuration to the new app?` → **y**
- `Would you like to set up a Postgresql database?` → **n** (استخدم Firebase)
- `Would you like to set up an Upstash Redis cache?` → **n**
- `Create .dockerignore?` → **n** (موجود عندنا)
- `Would you like to deploy?` → **y**

### 4️⃣ تحقق من الحالة
```bash
flyctl status
flyctl logs
```

---

## 🔧 إذا حصل خطأ "manifest was created for a app, but this is a NodeJS app":

احذف الملفات القديمة:
```bash
cd backend
rm -f fly.lock
flyctl launch --now --name agent-backend-ahmd1
```

---

## ⚙️ متغيرات البيئة على Fly.io:
```bash
flyctl secrets set GROQ_API_KEY=your_key_here
flyctl secrets set OPENAI_API_KEY=your_key_here
```

---

## 📊 معلومات مفيدة:
- **التطبيق:** https://agent-backend-ahmd1.fly.dev
- **قاعدة البيانات:** Firebase (ليس PostgreSQL)
- **الذاكرة:** 512MB
- **الـ CPU:** Shared (مجاني)

كل شيء جاهز الآن! ✅
