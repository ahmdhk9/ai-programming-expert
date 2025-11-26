# 🚀 Deployment Guide - دليل النشر

## نشر سريع

### Frontend (Vercel)
```bash
cd web
npm run build
# ثم اضغط Deploy على Vercel
```

### Backend (Fly.io)
```bash
cd backend
flyctl deploy
# fly.toml موجود بالفعل
```

## الإعدادات البيئية

```
NEXT_PUBLIC_API_URL=https://api.aiexpert.dev
FIREBASE_CONFIG=...
GROQ_API_KEY=...
```

تم! ✅
