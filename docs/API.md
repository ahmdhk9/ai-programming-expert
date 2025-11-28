# 🔌 API Documentation

## Base URL
```
http://localhost:5000
https://api.aiexpert.dev (Production)
```

## Authentication
```
Authorization: Bearer {token}
```

## Endpoints

### Agent Chat
```
POST /api/agent
Body: { message: string, history: Message[] }
Response: { response: string }
```

### Features
```
GET /api/features
Response: { total: 60, online: 50, offline: 50, categories: [...] }
```

### Offline Processing
```
POST /api/offline/process
Body: { type: string, prompt: string }
Response: { isOffline: true, result: string }

POST /api/offline/sync
Response: { status: "syncing", itemsToSync: number }
```

### Self-Learning
```
POST /api/learning/learn
Body: { input: object, output: object }
Response: { learned: true }

GET /api/learning/improvements
Response: { accuracy: 95.5, improvements: [...] }

GET /api/learning/stats
Response: { totalLearnings: number, patterns: number }
```

---
**تم! ✅**
