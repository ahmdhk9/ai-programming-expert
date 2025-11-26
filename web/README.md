# 🌐 Web Frontend - Next.js

## 📝 نظرة عامة

تطبيق الويب الأمامي مبني بـ **Next.js 14** و **React 18** مع **TypeScript**.

## ✨ المميزات

- 23 صفحة React متقدمة
- PWA Support (يعمل بدون انترنت)
- Responsive Design (متوافق مع جميع الأجهزة)
- SEO Optimized
- Performance Optimized
- Dark Mode Support

## 📁 البنية

```
web/
├── pages/              # 23 صفحة رئيسية
│   ├── index.tsx      # الصفحة الرئيسية
│   ├── chat.tsx       # محادثة AI
│   ├── dream-machine.tsx
│   ├── voice-commands.tsx
│   ├── standalone-download.tsx
│   ├── hybrid-mode.tsx
│   ├── export-builder.tsx
│   ├── marketplace.tsx
│   ├── free-forever.tsx
│   ├── 50-features.tsx
│   └── 13+ pages...
├── public/             # ملفات ثابتة
│   ├── manifest.json  # PWA Manifest
│   └── sw.js          # Service Worker
├── lib/                # مكتبات مساعدة
│   └── super-nav.ts   # Navigation
├── styles/             # CSS Global
└── next.config.js      # إعدادات Next.js
```

## 🚀 البدء السريع

```bash
cd web
npm install
npm run dev
# http://localhost:3000
```

## 📦 الاعتمادیات الرئيسية

```json
{
  "next": "14.2.3",
  "react": "18.2.0",
  "typescript": "5.3.3"
}
```

## 🔧 الأوامر المتاحة

```bash
npm run dev        # تشغيل البيئة الإنمائية
npm run build      # بناء الإنتاج
npm run start      # تشغيل الإنتاج
npm run lint       # فحص الكود
npm run type-check # فحص أنواع TypeScript
```

## 🎯 الصفحات الرئيسية

| الصفحة | الملف | الدور |
|--------|--------|--------|
| Home | index.tsx | الصفحة الرئيسية |
| Chat | chat.tsx | محادثة ذكية |
| Dream Machine | dream-machine.tsx | تحويل الأحلام |
| Voice | voice-commands.tsx | أوامر صوتية |
| Download | standalone-download.tsx | تحميل محلي |
| Hybrid | hybrid-mode.tsx | عمل هجين |
| Export | export-builder.tsx | تحويل صيغ |

## 🔌 الاتصال بـ Backend

```typescript
// استدعاء API
const response = await fetch('/api/agent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userInput })
})

const data = await response.json()
```

## 📱 PWA

يعمل كـ Progressive Web App:
```bash
# تثبيت على جهازك
1. افتح الموقع
2. اضغط "Install"
3. يصبح تطبيق محلي
4. يعمل بدون انترنت
```

## 🎨 التخصيص

### تغيير الألوان
```typescript
// استخدم CSS variables
const buttonStyle = {
  backgroundColor: '#667eea',
  color: 'white'
}
```

### إضافة صفحة جديدة
```bash
# 1. إنشاء ملف
web/pages/my-page.tsx

# 2. كتابة الكود
export default function MyPage() {
  return <div>My Page</div>
}

# 3. الصفحة متاحة في
# http://localhost:3000/my-page
```

## 🔍 SEO

تم تحسين جميع الصفحات للـ SEO:
- Meta Tags مناسبة
- Open Graph
- JSON-LD Schema
- Sitemap.xml

## ⚡ الأداء

- Image Optimization
- Code Splitting
- CSS Minification
- JavaScript Minification
- Caching Strategies

## 🐛 المشاكل الشائعة

### الصفحة بيضاء
```bash
# تحقق من console
npm run build
npm run start
```

### API لا يستجيب
```bash
# تأكد من Backend
curl http://localhost:5000/health
```

## 📚 المراجع

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 🤝 المساهمة

ارجع للـ [DEVELOPER.md](../docs/DEVELOPER.md)
