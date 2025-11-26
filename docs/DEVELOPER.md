# 👨‍💻 Developer Guide - دليل المبرمج

## مرحباً بالمبرمجين! 👋

هذا الدليل يساعدك على فهم وتطوير منصة AI Programming Expert.

## 🎯 قبل أن تبدأ

### 1. اقرأ README الرئيسي
```bash
cat README.md
```

### 2. فهم البنية
```bash
tree -L 2 -I 'node_modules'
```

### 3. إعداد البيئة
```bash
git clone ...
cd platform
npm install
npm run dev
```

## 📚 الموارد الرئيسية

| الملف | الوصف |
|------|--------|
| README.md | نظرة عامة على المشروع |
| ARCHITECTURE.md | البنية التقنية الكاملة |
| API.md | توثيق API |
| DEPLOYMENT.md | دليل النشر |

## 🛠️ إعداد البيئة الإنمائية

### المتطلبات
```bash
# Node.js 18+
node --version

# npm 9+
npm --version

# Git
git --version
```

### التثبيت
```bash
# 1. استنساخ المستودع
git clone https://github.com/AIExpert/platform.git
cd platform

# 2. تثبيت الاعتمادیات
cd web && npm install
cd ../backend && npm install

# 3. إعداد متغيرات البيئة
# web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000

# backend/.env
PORT=5000
NODE_ENV=development

# 4. تشغيل التطبيق
# Terminal 1
cd web && npm run dev

# Terminal 2
cd backend && npm start
```

## 🏗️ البنية المعمارية

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
┌──────▼──────────────────────┐
│   Next.js Frontend (web/)    │
│  - 23 React Pages           │
│  - PWA Support              │
│  - TypeScript               │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│  Express Backend (backend/)  │
│  - REST API                  │
│  - Offline Engine            │
│  - Self-Learning             │
└──────┬──────────────────────┘
       │
┌──────▼──────────────────────┐
│   Data Layer                 │
│  - Firebase                  │
│  - IndexedDB (Offline)       │
│  - Cache                     │
└─────────────────────────────┘
```

## 💡 مفاهيم أساسية

### 1. Online Mode
- جميع الطلبات تذهب للـ API
- نتائج من AI Models الحقيقية
- حفظ في Firebase
- تعاون جماعي

### 2. Offline Mode
- معالجة محلية بـ JavaScript
- تخزين في IndexedDB
- بدون انترنت تماماً
- مزامنة لاحقة

### 3. Hybrid Mode
- خليط من الاثنين
- مزامنة ذكية
- اختيار تلقائي

## 🔧 تطوير ميزة جديدة

### مثال: إضافة ميزة "تحليل الكود"

#### 1. إنشاء صفحة في web/
```typescript
// web/pages/code-analyzer.tsx
import React, { useState } from 'react';

export default function CodeAnalyzer() {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyze = async () => {
    const res = await fetch('/api/analyze-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    
    const data = await res.json();
    setAnalysis(data);
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={analyze}>تحليل</button>
      {analysis && <pre>{JSON.stringify(analysis, null, 2)}</pre>}
    </div>
  );
}
```

#### 2. إضافة API في backend/
```javascript
// backend/routes/analyze.js
app.post('/api/analyze-code', async (req, res) => {
  const { code } = req.body;
  
  // معالجة
  const analysis = {
    lines: code.split('\n').length,
    functions: (code.match(/function/g) || []).length,
    complexity: 'Medium'
  };
  
  res.json(analysis);
});
```

#### 3. إضافة الرابط في التنقل
```typescript
// web/pages/index.tsx
<Link href="/code-analyzer">📊 تحليل الكود</Link>
```

## 🧪 الاختبارات

### اختبارات Unit
```bash
npm run test
```

### اختبارات E2E
```bash
npm run test:e2e
```

### Coverage
```bash
npm run test:coverage
```

## 📝 معايير الكود

### TypeScript
- استخدم أنواع واضحة
- تجنب `any`
- اكتب interfaces للـ Props

```typescript
interface Props {
  title: string;
  onClick: () => void;
}

export default function Button({ title, onClick }: Props) {
  return <button onClick={onClick}>{title}</button>;
}
```

### Styling
- استخدم inline styles أو CSS Modules
- تجنب Global CSS
- Responsive Design

```typescript
const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem'
  }
};
```

### Backend
- استخدم Error Handling
- Validate Input
- Use Middleware

```javascript
app.post('/api/process', (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Missing data' });
    
    const result = processData(data);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

## 📦 إدارة الحزم

### إضافة حزمة جديدة
```bash
cd web
npm install package-name

# ثم أضفها في الكود
import Package from 'package-name';
```

### تحديث الحزم
```bash
npm update
npm audit fix
```

## 🔐 المتغيرات السرية

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=...
NEXT_PUBLIC_FIREBASE_CONFIG=...
```

### Backend (.env)
```
PORT=5000
FIREBASE_CREDENTIALS=...
GROQ_API_KEY=...
```

⚠️ لا تضع الـ Secrets في الـ Git!

## 🚀 النشر المحلي

### الاختبار
```bash
npm run build
npm run start
# جرّب في http://localhost:3000
```

### الإصلاحات الشائعة
```bash
# Cache مشكلة
rm -rf .next node_modules
npm install
npm run build

# Port مشغول
lsof -i :3000
kill -9 <PID>
```

## 📊 الأداء

### قياس الأداء
```bash
npm run build --analyze
```

### تحسينات شائعة
- Image Optimization
- Code Splitting
- Lazy Loading
- Caching

## 🐛 Debug

### Frontend
```typescript
// استخدم console
console.log('Debug:', data);

// أو DevTools
debugger;
```

### Backend
```javascript
// استخدم console
console.log('Debug:', data);

// أو استخدم nodemon
npm run dev
```

## 🔄 Git Workflow

### البدء
```bash
git checkout -b feature/my-feature
```

### التطوير
```bash
git add .
git commit -m "feat: add my feature"
```

### الإرسال
```bash
git push origin feature/my-feature
```

### Pull Request
1. اذهب لـ GitHub
2. Open Pull Request
3. اكتب الوصف
4. انتظر Review

## 📚 المراجع

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Firebase Docs](https://firebase.google.com/docs)

## ❓ أسئلة شائعة

**س: كيف أضيف ميزة جديدة؟**
ج: اتبع الخطوات في "تطوير ميزة جديدة" أعلاه

**س: كيف أختبر الـ Offline Mode؟**
ج: افتح DevTools → Network → Offline

**س: كيف أنشر التغييرات؟**
ج: اقرأ [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🤝 المساهمة

شكراً على اهتمامك بالمساهمة! اتبع هذه الخطوات:
1. Fork المستودع
2. Branch جديد
3. اكتب الكود
4. أرسل Pull Request

---

**تحتاج مساعدة؟**
- 💬 Open an Issue
- 📧 البريد: dev@aiexpert.dev
- 🌐 الموقع: https://docs.aiexpert.dev
