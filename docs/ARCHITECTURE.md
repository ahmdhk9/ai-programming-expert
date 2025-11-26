# 🏗️ Architecture - البنية المعمارية

## 📋 نظرة عامة

منصة AI Programming Expert مبنية بـ 3 طبقات:

```
┌─────────────────────┐
│ Presentation Layer  │ ← Next.js + React
├─────────────────────┤
│ Business Logic Layer│ ← Express.js
├─────────────────────┤
│ Data Layer          │ ← Firebase + IndexedDB
└─────────────────────┘
```

## 🎯 المكونات الرئيسية

### 1. Frontend (web/)
- **Framework**: Next.js 14
- **Language**: TypeScript + React
- **Features**:
  - 23 صفحة متقدمة
  - PWA Support
  - Offline-First
  - Real-time Updates

### 2. Backend (backend/)
- **Framework**: Express.js
- **Runtime**: Node.js
- **Features**:
  - REST API
  - Offline Processing
  - Self-Learning
  - Real-time Sync

### 3. Data Layer
- **Cloud**: Firebase (Firestore + Auth)
- **Local**: IndexedDB (Offline)
- **Cache**: In-Memory Cache

## 🔄 تدفق البيانات

### Online Mode
```
User Input
   ↓
React Component
   ↓
API Request
   ↓
Express Endpoint
   ↓
AI Model (Groq/Mistral)
   ↓
Process Result
   ↓
Firebase Storage
   ↓
Response to Client
   ↓
Update UI
```

### Offline Mode
```
User Input
   ↓
React Component
   ↓
Local Processing
   ↓
IndexedDB Storage
   ↓
Service Worker Cache
   ↓
Update UI
   ↓
[Pending Sync]
```

### Hybrid Mode
```
Check Connection
   ↓
Online? Use API    ← Yes
   ↓
No ↓
Use Local Processing
   ↓
Sync Queue (when online)
```

## 🌐 API Architecture

```
/api
├── /agent              POST    محادثة ذكية
├── /features           GET     الميزات
├── /offline/
│   ├── /process        POST    معالجة بلا انترنت
│   └── /sync           POST    مزامنة
├── /learning/
│   ├── /learn          POST    تعلم ذاتي
│   ├── /improvements   GET     التحسينات
│   └── /stats          GET     الإحصائيات
└── /github-sync        GET     مزامنة GitHub
```

## 💾 Data Models

### Project
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  type: 'website' | 'app' | 'game' | 'tool';
  technologies: string[];
  code: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
```

### Feature
```typescript
interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  speed: number; // 1-5
  models: string[];
  enabled: boolean;
}
```

### LearningData
```typescript
interface LearningData {
  id: string;
  input: object;
  output: object;
  accuracy: number;
  timestamp: Date;
  offline: boolean;
}
```

## 🔐 Security Architecture

```
┌─────────────────────────────┐
│   Authentication Layer       │
│ (Firebase Auth)             │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│   Authorization Middleware   │
│ (Role-based Access)         │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│   Validation Layer           │
│ (Input Validation)          │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│   Encryption Layer           │
│ (End-to-End Encryption)     │
└─────────────────────────────┘
```

## ⚡ Performance Optimization

### Frontend
- **Code Splitting**: تقسيم الكود تلقائياً
- **Image Optimization**: تحسين الصور
- **Caching**: حفظ الملفات محلياً
- **Lazy Loading**: تحميل عند الحاجة

### Backend
- **Connection Pooling**: تجميع الاتصالات
- **Caching**: حفظ النتائج
- **Database Indexing**: فهرسة البيانات
- **Load Balancing**: توازن الحمل

## 🧠 Self-Learning System

```
┌─────────────────┐
│  User Action    │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Record Data    │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Analyze        │
│  Patterns       │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Generate       │
│  Improvements   │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Optimize       │
│  Algorithm      │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Better Results │
└─────────────────┘
```

## 🔄 Sync Strategy

### Smart Sync Engine
```javascript
// الحالة الأولى: Online
- Upload pending items
- Download updates
- Merge conflicts

// الحالة الثانية: Offline
- Queue changes locally
- Show optimistic UI
- Retry on reconnect

// الحالة الثالثة: Reconnected
- Resume syncing
- Resolve conflicts
- Validate data
```

## 🌍 Deployment Architecture

```
                    Internet
                       ↓
        ┌──────────────────────────┐
        │    Cloudflare CDN        │
        │  (Global Distribution)   │
        └──────────┬───────────────┘
                   ↓
        ┌──────────────────────────┐
        │   Vercel (Frontend)      │
        │  Edge Functions          │
        │  Auto-Scaling            │
        └──────────┬───────────────┘
                   ↓
        ┌──────────────────────────┐
        │   Fly.io (Backend)       │
        │  Regional Deployment     │
        │  Auto-Scaling            │
        └──────────┬───────────────┘
                   ↓
        ┌──────────────────────────┐
        │   Firebase (Database)    │
        │  Firestore               │
        │  Authentication          │
        │  Cloud Functions         │
        └──────────────────────────┘
```

## 📊 Database Schema

### Collections
```
users/
├── {uid}/
│   ├── profile
│   ├── projects
│   └── settings

projects/
├── {projectId}/
│   ├── metadata
│   ├── files
│   ├── versions
│   └── collaborators

learning/
├── {learnId}/
│   ├── input
│   ├── output
│   └── accuracy
```

## 🔄 State Management

```
┌─────────────────┐
│   React State   │ ← Component Level
└────────┬────────┘
         ↓
┌─────────────────┐
│   Context API   │ ← App Level
└────────┬────────┘
         ↓
┌─────────────────┐
│   Local Storage │ ← Browser Level
└────────┬────────┘
         ↓
┌─────────────────┐
│   IndexedDB     │ ← Offline Level
└────────┬────────┘
         ↓
┌─────────────────┐
│   Firebase      │ ← Cloud Level
└─────────────────┘
```

## 🧪 Testing Architecture

```
Unit Tests (Jest)
↓
Integration Tests (Supertest)
↓
E2E Tests (Playwright)
↓
Performance Tests (Lighthouse)
↓
Security Tests (OWASP)
```

## 📈 Scalability

### Horizontal Scaling
- Multiple Vercel instances
- Multiple Fly.io regions
- Firebase auto-scaling

### Vertical Scaling
- Increase server resources
- Database optimization
- Caching improvements

## 🔍 Monitoring & Logging

```
Application
    ↓
┌─────────────────┐
│   Logging       │ ← Console/File
├─────────────────┤
│   Monitoring    │ ← Metrics/Alerts
├─────────────────┤
│   Tracing       │ ← Request Tracing
├─────────────────┤
│   Analytics     │ ← User Behavior
└─────────────────┘
```

## 🎯 Design Patterns

### Microservices
- Feature-based separation
- Independent deployment
- API-driven communication

### Repository Pattern
- Separation of concerns
- Data abstraction
- Testability

### Factory Pattern
- Object creation
- Flexibility
- Reusability

---

**للمزيد من التفاصيل، اقرأ [DEVELOPER.md](./DEVELOPER.md)**
