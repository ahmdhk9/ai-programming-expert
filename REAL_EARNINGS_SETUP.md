# إعداد نظام الأرباح الحقيقي

## المتطلبات للأرباح الحقيقية 100%:

### 1. Google AdSense
```bash
# أنشئ حساب: https://www.google.com/adsense/
GOOGLE_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
```

### 2. Amazon Affiliate
```bash
# أنشئ حساب: https://affiliate-program.amazon.com/
AMAZON_AFFILIATE_ID=yourID
AMAZON_SECRET_KEY=your-secret-key
```

### 3. Stripe (للمبيعات)
```bash
# أنشئ حساب: https://stripe.com/
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Crypto Staking
```bash
# محفظة للـ Staking:
CRYPTO_WALLET_ADDRESS=0x...
CRYPTO_PRIVATE_KEY=encrypted_key
```

### 5. Mailgun (للإشعارات)
```bash
MAILGUN_DOMAIN=sandbox...
MAILGUN_KEY=key-...
```

## خطوات التفعيل:

1. انسخ المتطلبات أعلاه
2. أضفها في Secrets من Replit
3. اختبر كل مصدر: `POST /earnings/calculate-real`
4. تحقق من: `GET /earnings/real-status`
5. السحب مباشرة من `/account/wallets`

## المتوقع:

- أرباح يومية من 5 مصادر مختلفة
- تحويل تلقائي للمحافظ
- إشعارات بريدية فورية
- بدون تأخير أو وسيط
