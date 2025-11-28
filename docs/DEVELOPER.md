# 👨‍💻 دليل المطورين

## البدء السريع

```bash
# استنساخ المستودع
git clone https://github.com/AIExpert/platform.git
cd platform

# تثبيت الاعتمادیات
npm install

# تشغيل البيئة الإنمائية
npm run dev

# الوصول
http://localhost:5000
```

## هيكل المشروع

```
web/pages/       - صفحات React (23 صفحة)
web/components/  - مكونات معاد استخدامها
backend/routes/  - API endpoints (40+)
backend/services/- خدمات الأعمال
```

## إضافة ميزة جديدة

1. إنشاء صفحة في web/pages/
2. إضافة API endpoint في backend/routes/
3. ربط الاثنين
4. اختبار
5. نشر

## المتطلبات

- Node.js 18+
- npm 9+
- Firebase Account
- Vercel Account (اختياري)
