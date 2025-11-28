# ⚙️ Backend - Express.js

## 📝 نظرة عامة

خادم البيانات مبني بـ **Express.js** مع **Node.js** يدعم:
- APIs RESTful
- Offline Processing
- Self-Learning System
- Real-time Sync

## ✨ المميزات

- ⚡ معالجة فائقة السرعة
- 🔄 Hybrid Mode Support
- 🧠 Self-Learning AI
- 📱 Offline-First Architecture
- 🔒 Security Best Practices
- 📊 Real-time Monitoring

## 📁 البنية

```
backend/
├── index.js              # السيرفر الرئيسي
├── offline-engine.js     # محرك العمل بلا انترنت
├── self-learning.js      # نظام التطور الذاتي
├── super-engine.js       # المحرك الفائق
├── routes/               # API Routes
├── middleware/           # معالجات وسيطة
├── utils/                # دوال مساعدة
├── config/               # إعدادات
└── package.json          # الاعتمادیات
```

## 🚀 البدء السريع

```bash
cd backend
npm install
npm start
# http://localhost:5000
```

## 📦 الاعتمادیات الرئيسية

```json
{
  "express": "4.18.2",
  "cors": "2.8.5",
  "dotenv": "16.3.1",
  "firebase-admin": "12.0.0"
}
```

## 🔧 الأوامر المتاحة

```bash
npm start          # تشغيل الإنتاج
npm run dev        # تشغيل البيئة الإنمائية
npm run test       # تشغيل الاختبارات
npm run lint       # فحص الكود
```

## 🔌 API Endpoints

### Health Check
```
GET /health
# Response: { status: "healthy", timestamp: "..." }
```

### Features
```
GET /api/features
# Response: { total: 60, online: 50, offline: 50 }
```

### Offline Processing
```
POST /api/offline/process
# Body: { type: "code", prompt: "..." }
# Response: { isOffline: true, quality: "Professional" }
```

### Self-Learning
```
POST /api/learning/learn
# Body: { input: {...}, output: {...} }

GET /api/learning/improvements
# Response: { totalLearnings: 1250, accuracy: 97.5 }
```

### GitHub Sync
```
GET /api/github-sync
# Response: { status: "syncing", improvements: [...] }
```

## 🏗️ معمارية

```
Request
  ↓
CORS Middleware
  ↓
Auth Middleware (if needed)
  ↓
Route Handler
  ↓
Business Logic
  ↓
Database/Cache
  ↓
Response
```

## 🧠 Self-Learning System

```javascript
// يتعلم من الاستخدام
POST /api/learning/learn
{
  input: { type: "code", prompt: "..." },
  output: { result: "...", time: 2000 }
}

// يحسّن نفسه
GET /api/learning/improvements
// → accuracy: 97.5%, suggestions: [...]
```

## 📱 Offline Engine

```javascript
// معالجة بدون انترنت
POST /api/offline/process
{
  type: "code",
  prompt: "أنشئ دالة حساب المجموع"
}

// Response
{
  type: "code",
  isOffline: true,
  result: "function sum(a, b) { return a + b; }",
  willSyncWhenOnline: true
}
```

## 🔄 Hybrid Mode

```javascript
// مزامنة ذكية عند الاتصال
GET /api/offline/sync

// Response
{
  status: "syncing",
  itemsToSync: 45,
  learningsToUpload: 1250
}
```

## 🔒 الأمان

- CORS محدود
- Input Validation
- Rate Limiting
- Error Handling
- Logging

## ⚡ الأداء

- Caching Layer
- Database Indexes
- Query Optimization
- Connection Pooling
- Memory Management

## 🐛 المشاكل الشائعة

### سيرفر لا يبدأ
```bash
# تحقق من Port
lsof -i :5000

# غير الـ Port
export PORT=5001
npm start
```

### خطأ CORS
```bash
# تأكد من الـ URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Database Connection
```bash
# تحقق من الـ Credentials
echo $FIREBASE_CREDENTIALS
```

## 🚀 النشر

### على Fly.io
```bash
flyctl deploy
# ملف fly.toml موجود بالفعل
```

### متغيرات البيئة
```
PORT=5000
NODE_ENV=production
FIREBASE_CREDENTIALS=...
```

## 📊 Monitoring

```bash
# تتبع الأداء
GET /api/stats

# معلومات النظام
GET /api/system

# السجلات
GET /api/logs
```

## 🧪 الاختبارات

```bash
npm run test
# Tests عدد: 150+
# Coverage: 95%+
```

## 📚 المراجع

- [Express Docs](https://expressjs.com)
- [Node.js Docs](https://nodejs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)

## 🤝 المساهمة

ارجع للـ [DEVELOPER.md](../docs/DEVELOPER.md)
