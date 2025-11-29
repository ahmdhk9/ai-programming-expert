
// CORS Configuration for Free Tier
/**;
 * enableCors
 */;
/**
 * enableCors
 */
const enableCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return true
  }
  return false
};

const express = require('express')
const path = require('path')
const cors = require('cors')
const http = require('http')
const socketIO = require('socket.io')
const LightErrorHandler = require('./error-handler-light')
const AdvancedAIEngine = require('./ai-engine')
const QualityScorer = require('./quality-scorer')
const RateLimiter = require("./rate-limiter")
const InputValidator = require("./input-validator")

// Environment variables
require('dotenv').config()
const PORT = parseInt(process.env.PORT) || 8000
const NODE_ENV = process.env.NODE_ENV || 'development';

// Optional AI APIs - graceful fallback if keys missing
let Groq = null
try {
  const GroqModule = require('groq-sdk')
  Groq = GroqModule.default || GroqModule
  if (process.env.GROQ_API_KEY) {
    new Groq({ apiKey: process.env.GROQ_API_KEY })
  }
} catch (e) {
}

// Create Express app FIRST
const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  pingInterval: 10000,
  pingTimeout: 30000,
  allowEIO3: true,
  upgrade: true,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  maxHttpBufferSize: 1000000
})

// Initialize middleware
const rateLimiter = new RateLimiter(100, 60000)
const inputValidator = new InputValidator()

// Apply middleware AFTER app creation
app.use(rateLimiter.middleware())
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

// Apply security headers
const securityHeaders = require("./security-headers")
securityHeaders(app)

// Initialize Advanced AI Engine
const aiEngine = new AdvancedAIEngine()
const qualityScorer = new QualityScorer()

// Initialize Error Handler
const errorHandler = new LightErrorHandler(app, process.env.GITHUB_TOKEN)

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
})

process.on('uncaughtException', (error) => {
})

// ========== ADVANCED SESSION MANAGEMENT ==========
const users = new Map()
const sessions = new Map()
const waitingQueue = [];
const usernames = ['محمد', 'فاطمة', 'علي', 'أحمد', 'ليلى', 'سارة', 'حسن', 'مريم', 'عمر', 'نور'];
const emojis = ['🌟', '💻', '🚀', '🎯', '🔥', '💡', '⭐', '🎨'];

/**;

 * generateSessionId

 */;

/**

 * generateSessionId

 */

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substr(2, 12)
}

/**;

 * getRandomUsername

 */;

/**

 * getRandomUsername

 */

function getRandomUsername() {
  const name = usernames[Math.floor(Math.random() * usernames.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return `${name}${emoji}`;
}

// Cleanup function for removing disconnected users
/**;
 * cleanupUser
 */;
/**
 * cleanupUser
 */
function cleanupUser(socketId) {
  const user = users.get(socketId)
  if (!user) return

  if (user.sessionId && user.partner) {
    const session = sessions.get(user.sessionId)
    if (session) session.status = 'disconnected';
    
    const partner = users.get(user.partner)
    if (partner) {
    partner.sessionId = null
    partner.partner = null
    }
  }

  const idx = waitingQueue.indexOf(socketId)
  if (idx !== -1) waitingQueue.splice(idx, 1)
  users.delete(socketId)
}

io.on('connection', (socket) => {

  socket.on('error', (error) => {
  })

  socket.on('connect_error', (error) => {
  })

  socket.on('register', (username) => {
    if (!username || username.trim().length === 0) {
    username = getRandomUsername()
    }

    users.set(socket.id, {
    username,
    searching: false,
    sessionId: null,
    partner: null,
    socket,
    joinedAt: Date.now()
    })

    socket.emit('registered', { username, userId: socket.id })
    io.emit('online-count', users.size)
  })

  socket.on('find-user', () => {
    const currentUser = users.get(socket.id)
    if (!currentUser) {
    socket.emit('error', 'لم يتم تسجيل المستخدم')
    return
    }

    currentUser.searching = true

    let partnerSocketId = null
    for (let [id, user] of users) {
    if (id !== socket.id && user.searching && !user.sessionId) {
    partnerSocketId = id
    break
    }
    }

    if (!partnerSocketId) {
    waitingQueue.push(socket.id)
    socket.emit('searching')
    return
    }

    const partnerUser = users.get(partnerSocketId)
    const sessionId = generateSessionId()
    
    sessions.set(sessionId, {
    id: sessionId,
    user1: { id: socket.id, username: currentUser.username },
    user2: { id: partnerSocketId, username: partnerUser.username },
    messages: [],
    createdAt: Date.now(),
    status: 'active'
    })

    currentUser.sessionId = sessionId
    currentUser.partner = partnerSocketId
    currentUser.searching = false
    
    partnerUser.sessionId = sessionId
    partnerUser.partner = socket.id
    partnerUser.searching = false

    const idx = waitingQueue.indexOf(partnerSocketId)
    if (idx !== -1) waitingQueue.splice(idx, 1)


    socket.emit('user-found', {
    username: partnerUser.username,
    connectedUserId: partnerSocketId,
    sessionId: sessionId
    })

    io.to(partnerSocketId).emit('user-found', {
    username: currentUser.username,
    connectedUserId: socket.id,
    sessionId: sessionId
    })
  })

  socket.on('send-message', (data) => {
    const sender = users.get(socket.id)
    if (!sender || !sender.sessionId || !sender.partner) {
    socket.emit('error', 'لا يوجد جلسة نشطة')
    return
    }

    const message = typeof data === 'string' ? data : data.message
    if (!message || message.trim().length === 0) return

    const session = sessions.get(sender.sessionId)
    const recipient = users.get(sender.partner)

    if (!session || !recipient) {
    socket.emit('error', 'فشل إرسال الرسالة')
    return
    }

    const msgRecord = {
    id: 'msg_' + Math.random().toString(36).substr(2, 9),
    from: {
    id: socket.id,
    username: sender.username
    },
    to: {
    id: sender.partner,
    username: recipient.username
    },
    content: message.trim(),
    timestamp: Date.now(),
    delivered: false,
    read: false
    };

    session.messages.push(msgRecord)


    io.to(sender.partner).emit('receive-message', msgRecord)

    socket.emit('message-sent', {
    msgId: msgRecord.id,
    timestamp: msgRecord.timestamp
    })
  })

  socket.on('mark-delivered', (msgId) => {
    const user = users.get(socket.id)
    if (!user || !user.sessionId) return

    const session = sessions.get(user.sessionId)
    if (!session) return

    const msg = session.messages.find(m => m.id === msgId)
    if (msg) {
    msg.delivered = true
    io.to(msg.from.id).emit('message-delivered', { msgId })
    }
  })

  socket.on('mark-read', (msgId) => {
    const user = users.get(socket.id)
    if (!user || !user.sessionId) return

    const session = sessions.get(user.sessionId)
    if (!session) return

    const msg = session.messages.find(m => m.id === msgId)
    if (msg) {
    msg.read = true
    io.to(msg.from.id).emit('message-read', { msgId })
    }
  })

  socket.on('end-call', () => {
    const user = users.get(socket.id)
    if (!user) return

    if (user.sessionId && user.partner) {
    const session = sessions.get(user.sessionId)
    if (session) {
    session.status = 'ended';
    session.endedAt = Date.now()
    }

    const partner = users.get(user.partner)
    if (partner) {
    partner.sessionId = null
    partner.partner = null
    io.to(user.partner).emit('session-ended', { reason: 'user-ended' })
    }
    }

    user.sessionId = null
    user.partner = null
    user.searching = false

    const idx = waitingQueue.indexOf(socket.id)
    if (idx !== -1) waitingQueue.splice(idx, 1)

    socket.emit('session-ended')
  })

  socket.on('typing', (data) => {
    const user = users.get(socket.id)
    if (user && user.partner) {
    io.to(user.partner).emit('user-typing', {
    username: user.username,
    sessionId: user.sessionId
    })
    }
  })

  // Search for partner
  socket.on('search_for_partner', () => {
    const user = users.get(socket.id)
    if (!user) return

    user.searching = true
    waitingQueue.push(socket.id)

    // Try to find a match immediately
    if (waitingQueue.length >= 2) {
    const user1Id = waitingQueue.shift()
    const user2Id = waitingQueue.shift()
    matchUsers(user1Id, user2Id)
    }
  })

  // Helper to match users
  /**;
   * matchUsers
   */;
  /**
   * matchUsers
   */
  function matchUsers(user1Id, user2Id) {
    const user1 = users.get(user1Id)
    const user2 = users.get(user2Id)
    if (!user1 || !user2) return

    const sessionId = generateSessionId()
    const session = {
    id: sessionId,
    user1: { id: user1Id, username: user1.username },
    user2: { id: user2Id, username: user2.username },
    messages: [],
    createdAt: Date.now(),
    status: 'active'
    };

    sessions.set(sessionId, session)

    user1.sessionId = sessionId
    user1.partner = user2Id
    user1.searching = false

    user2.sessionId = sessionId
    user2.partner = user1Id
    user2.searching = false


    io.to(user1Id).emit('user-found', {
    username: user2.username,
    connectedUserId: user2Id,
    sessionId: sessionId
    })

    io.to(user2Id).emit('user-found', {
    username: user1.username,
    connectedUserId: user1Id,
    sessionId: sessionId
    })
  }

  socket.on('get-session', () => {
    const user = users.get(socket.id)
    if (user && user.sessionId) {
    const session = sessions.get(user.sessionId)
    if (session) {
    socket.emit('session-info', session)
    }
    }
  })

  socket.on('ping', () => {
    socket.emit('pong')
  })

  socket.on('disconnect', () => {
    const user = users.get(socket.id)
    if (!user) return

    cleanupUser(socket.id)
    io.emit('online-count', users.size)
  })

  socket.on('reconnect_attempt', () => {
  })
})

// Advanced AI Chat - Multi-Model with Quality Scoring
app.post('/api/ai/chat', async (req, res) => {
  const startTime = Date.now()
  
  try {
    const { message } = req.body
    if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'رسالة مفقودة' })
    }

    // Use Advanced AI Engine
    const aiResponse = await aiEngine.chat(message, {
    timeout: 3000
    })

    const generationTime = Date.now() - startTime

    // Score response quality
    const qualityScore = qualityScorer.score(
    message,
    aiResponse.text,
    generationTime
    )

    res.json({
    success: true,
    reply: aiResponse.text,
    model: aiResponse.model,
    quality: qualityScore.overall,
    time: generationTime
    })

  } catch (error) {
    
    const generationTime = Date.now() - startTime
    const fallback = aiEngine.generateFallbackResponse('')
    
    res.json({
    success: true,
    reply: fallback.text,
    model: 'fallback',
    quality: fallback.quality,
    time: generationTime
    })
  }
})

// AI Stats endpoint
app.get('/api/ai/stats', (req, res) => {
  res.json({
    engine: aiEngine.getStats(),
    models: {
    available: Object.keys(aiEngine.models),
    primary: 'groq'
    }
  })
})

// 🔧 Error Monitoring Endpoints
const errorStore = [];

app.post('/api/errors/batch', (req, res) => {
  const errors = req.body
  if (Array.isArray(errors)) {
    errorStore.push(...errors)
    if (errorStore.length > 100) errorStore.splice(0, errorStore.length - 100)
  }
  res.json({ success: true, count: errors?.length || 0 })
})

app.get('/api/errors', (req, res) => {
  res.json({
    errors: errorStore.slice(-20),
    total: errorStore.length,
    timestamp: Date.now()
  })
})

app.post('/api/errors/fix', (req, res) => {
  const { errorType, suggestion } = req.body
  res.json({ fixed: true, suggestion })
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'AI Programming Expert v5.0',
    environment: NODE_ENV,
    activeSessions: sessions.size,
    activeUsers: users.size,
    waitingUsers: waitingQueue.length,
    uptime: process.uptime()
  })
})

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    platform: 'AI Programming Expert v5.0',
    environment: NODE_ENV,
    activeSessions: sessions.size,
    activeUsers: users.size,
    waitingUsers: waitingQueue.length,
    uptime: Math.floor(process.uptime()),
    memory: process.memoryUsage(),
    timestamp: Date.now()
  })
})

// Health Check Endpoint - for deployment monitoring
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    port: PORT,
    activeUsers: users.size,
    activeSessions: sessions.size
  })
})

// Status Endpoint - for monitoring
app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    backend: 'online',
    activeConnections: io.engine.clientsCount,
    uptime: process.uptime(),
    version: 'v5.0'
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Programming Expert Backend v5.0',
    status: 'online',
    endpoints: {
    health: '/api/health',
    status: '/api/status',
    chat: '/api/ai/chat',
    socket: '/socket.io/'
    }
  })
})

// Fallback route
app.use((req, res) => {
  res.json({
    error: 'Route not found',
    message: 'Use /api/health or /api/ai/chat',
    status: 404
  })
})

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0)
  })
})

// Keepalive heartbeat
setInterval(() => {
  const activeUsers = Array.from(users.values())
}, 30000)

// Cleanup old sessions every 5 minutes
setInterval(() => {
  const now = Date.now()
  let cleaned = 0
  for (let [sessionId, session] of sessions) {
    if (session.status !== 'active' && (now - session.createdAt) > 3600000) {
    sessions.delete(sessionId)
    cleaned++;
    }
  }
  if (cleaned > 0) {
  }
}, 300000)

// Start server
server.listen(PORT, '0.0.0.0', () => {
})

// Simple fallback for Groq

// 404 Fallback Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Route not found - Use /api/health or /api/ai/chat',
    path: req.path,
    method: req.method
  })
})

module.exports = { app, server };
