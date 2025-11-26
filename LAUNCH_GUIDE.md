# 🚀 LAUNCH GUIDE - دليل الإطلاق

## الخطوة 1: تشغيل الموقع

```bash
npm run dev
# الموقع يفتح على http://localhost:5000
```

## الخطوة 2: البيانات الأساسية

### حساب المطور (أحمد):
- البريد: ahmdalbsrawe@gmail.com
- كلمة السر: ahmed2024
- الدور: Admin

### دخول Admin:
- الرابط: `/admin` أو `/admin-access`
- كلمة السر: ahmed2024

### دخول Developer:
- الرابط: `/developer/dashboard`
- يحتاج تسجيل دخول عادي

## الخطوة 3: إعدادات الأمان

1. قم بتحديث متغيرات البيئة:
```env
ENCRYPTION_KEY=your-key
BACKUP_KEY=your-backup-key
PROJECT_UNLOCK_PASSWORD=password
```

2. فعّل الخدمات:
- [ ] Google OAuth
- [ ] Stripe Payment
- [ ] Firebase Database
- [ ] Email Service

## الخطوة 4: الاختبار

```bash
# اختبر التسجيل
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# اختبر الدفع
curl -X POST http://localhost:5000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"userId":"123","planId":"pro"}'

# اختبر الأرباح
curl http://localhost:5000/api/dev/revenue-stats
```

## الخطوة 5: الإطلاق الفعلي

1. انقر على "Publish" من Replit
2. اختر النطاق الخاص بك
3. فعّل HTTPS
4. أضف DNS Records
5. اختبر الموقع

## الخطوة 6: الدعم والمراقبة

- لوحة Admin: `/admin`
- لوحة المطور: `/developer/dashboard`
- الأرباح: `/developer/revenue`
- AI مساعد: `/developer/ai-assistant`

---

**المنصة جاهزة الآن للإطلاق!** 🚀

