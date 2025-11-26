const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const Groq = require('groq-sdk').default;

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  pingInterval: 25000,
  pingTimeout: 60000
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ========== ADVANCED REAL-TIME SOCIAL CHAT ==========
const users = new Map();
const waitingQueue = [];
const messageHistory = new Map();

const usernames = ['محمد', 'فاطمة', 'علي', 'أحمد', 'ليلى', 'سارة', 'حسن', 'مريم', 'عمر', 'نور', 'يوسف', 'هناء'];
const emojis = ['🌟', '💻', '🚀', '🎯', '🔥', '💡', '⭐', '🎨', '🏆', '💎', '🎭', '🎪'];

function getRandomUsername() {
  const name = usernames[Math.floor(Math.random() * usernames.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return `${name}${emoji}`;
}

io.on('connection', (socket) => {
  console.log(`✅ متصل جديد: ${socket.id}`);

  socket.on('register', (username) => {
    if (!username || username.trim().length === 0) {
      username = getRandomUsername();
    }

    users.set(socket.id, {
      username,
      searching: false,
      connectedWith: null,
      socket,
      connected_at: Date.now(),
      last_active: Date.now()
    });

    socket.emit('registered', { username, userId: socket.id });
    console.log(`📝 تسجيل: ${username} (${socket.id})`);

    // Broadcast online count
    io.emit('online-count', users.size);
  });

  socket.on('find-user', () => {
    const currentUser = users.get(socket.id);
    if (!currentUser) {
      socket.emit('error', 'لم يتم تسجيل المستخدم');
      return;
    }

    currentUser.searching = true;
    currentUser.last_active = Date.now();

    // Find waiting user
    let connectedUserSocketId = null;
    for (let [id, user] of users) {
      if (id !== socket.id && user.searching && !user.connectedWith) {
        connectedUserSocketId = id;
        break;
      }
    }

    if (!connectedUserSocketId) {
      waitingQueue.push(socket.id);
      socket.emit('searching');
      console.log(`⏳ في قائمة الانتظار: ${currentUser.username}`);
      return;
    }

    // Connect both users
    const connectedUser = users.get(connectedUserSocketId);
    if (!connectedUser) {
      socket.emit('error', 'حدث خطأ، حاول مجدداً');
      return;
    }

    currentUser.connectedWith = connectedUserSocketId;
    connectedUser.connectedWith = socket.id;
    currentUser.searching = false;
    connectedUser.searching = false;

    // Remove from queue
    const idx = waitingQueue.indexOf(connectedUserSocketId);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    // Initialize message history
    const roomId = [socket.id, connectedUserSocketId].sort().join('-');
    if (!messageHistory.has(roomId)) {
      messageHistory.set(roomId, []);
    }

    console.log(`🔗 ربط: ${currentUser.username} ↔ ${connectedUser.username}`);

    // Notify both users
    socket.emit('user-found', {
      username: connectedUser.username,
      connectedUserId: connectedUserSocketId
    });

    io.to(connectedUserSocketId).emit('user-found', {
      username: currentUser.username,
      connectedUserId: socket.id
    });
  });

  socket.on('send-message', (message) => {
    const user = users.get(socket.id);
    if (!user || !user.connectedWith) {
      socket.emit('error', 'لا يوجد اتصال نشط');
      return;
    }

    if (!message || message.trim().length === 0) return;

    user.last_active = Date.now();
    const msgData = {
      from: user.username,
      message: message.trim(),
      timestamp: Date.now(),
      type: 'text'
    };

    io.to(user.connectedWith).emit('receive-message', msgData);

    // Save to history
    const roomId = [socket.id, user.connectedWith].sort().join('-');
    if (messageHistory.has(roomId)) {
      messageHistory.get(roomId).push(msgData);
    }

    console.log(`💬 ${user.username} → ${messageHistory.get(roomId) ? 'محفوظة' : 'مرسلة'}`);
  });

  socket.on('end-call', () => {
    const user = users.get(socket.id);
    if (!user) return;

    if (user.connectedWith) {
      const connectedUser = users.get(user.connectedWith);
      if (connectedUser) {
        connectedUser.connectedWith = null;
        io.to(user.connectedWith).emit('call-ended', { reason: 'user-ended' });
      }
    }

    user.connectedWith = null;
    user.searching = false;

    // Remove from queue
    const idx = waitingQueue.indexOf(socket.id);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    console.log(`❌ إنهاء: ${user.username}`);
    socket.emit('call-ended');
  });

  socket.on('typing', () => {
    const user = users.get(socket.id);
    if (user && user.connectedWith) {
      io.to(user.connectedWith).emit('user-typing', { username: user.username });
    }
  });

  socket.on('ping', () => {
    socket.emit('pong');
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (!user) return;

    console.log(`❌ قطع: ${user.username}`);

    if (user.connectedWith) {
      const connectedUser = users.get(user.connectedWith);
      if (connectedUser) {
        connectedUser.connectedWith = null;
        io.to(user.connectedWith).emit('user-disconnected', { username: user.username });
      }
    }

    const idx = waitingQueue.indexOf(socket.id);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    users.delete(socket.id);
    io.emit('online-count', users.size);
  });

  socket.on('error', (err) => {
    console.error(`❌ خطأ Socket: ${err}`);
  });
});

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// AI Chat API
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'رسالة مفقودة' });
    }

    const systemPrompt = `أنت مساعد ذكي احترافي في منصة "AI Programming Expert" - متخصص في البرمجة والتقنية.
🎯 تحدث بشكل طبيعي جداً كأنك إنسان حقيقي - بدون تكلف أو رسميات زائدة.

⚡ **ردود متوازنة - مختصرة لكن مفيدة (2-3 جمل قصيرة):**
- تجنب الفقرات الطويلة جداً والحشو
- كن مباشراً وعملياً وودياً
- ركز على الإجابة الأساسية فقط

⚡ الفهم الذكي:
- إذا سُئلت عن المطور/المُنشِئ (أي صيغة)، رد: "تم تطويرها بواسطة احمد العويني التميمي البصراوي"
- في أسئلة البرمجة: أعط حلولاً عملية قصيرة فوراً
- كن مختصراً وذكياً - تجنب التكرار والملل

💡 أسلوب الحوار:
- ردود طبيعية وسلسة وودية
- فهم السياق بذكاء - لا تسأل أسئلة واضحة
- استخدم كلمات قليلة فقط
- سرعة في الرد والفهم`;

    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      max_tokens: 250,
      top_p: 0.95
    });

    res.json({
      success: true,
      response: response.choices[0].message.content,
      model: 'Llama 3.3 70B'
    });
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      error: 'خطأ في الذكاء الصناعي',
      message: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'AI Programming Expert v5.0',
    ai: 'Groq Llama 3.3 70B',
    social: 'Real-time WebSocket',
    users: users.size,
    waiting: waitingQueue.length,
    uptime: process.uptime()
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 منصة AI Programming Expert v5.0`);
  console.log(`💡 الذكاء الصناعي: Groq - Llama 3.3 70B`);
  console.log(`👥 التواصل: WebSocket + REST API`);
  console.log(`📍 الخادم: http://localhost:${PORT}\n`);
});
