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
  transports: ['websocket', 'polling']
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ========== REAL SOCIAL CHAT SYSTEM WITH WEBSOCKET ==========
const users = new Map(); // Map of socketId -> {username, searching, connectedWith}
const waitingQueue = []; // Queue of users searching

io.on('connection', (socket) => {
  console.log(`✅ مستخدم جديد متصل: ${socket.id}`);

  // Register user
  socket.on('register', (username) => {
    users.set(socket.id, {
      username,
      searching: false,
      connectedWith: null,
      socket
    });
    console.log(`📝 تسجيل: ${username}`);
  });

  // Find random user
  socket.on('find-user', () => {
    const currentUser = users.get(socket.id);
    if (!currentUser) return;

    currentUser.searching = true;

    // Find waiting user
    let connectedUserSocketId = null;
    for (let [id, user] of users) {
      if (id !== socket.id && user.searching && !user.connectedWith) {
        connectedUserSocketId = id;
        break;
      }
    }

    // If no one waiting, add to queue
    if (!connectedUserSocketId) {
      waitingQueue.push(socket.id);
      socket.emit('searching');
      return;
    }

    // Connect both users
    const connectedUser = users.get(connectedUserSocketId);
    
    currentUser.connectedWith = connectedUserSocketId;
    connectedUser.connectedWith = socket.id;
    currentUser.searching = false;
    connectedUser.searching = false;

    // Remove from queue if there
    const idx = waitingQueue.indexOf(connectedUserSocketId);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    console.log(`🔗 ربط: ${currentUser.username} مع ${connectedUser.username}`);

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

  // Send text message
  socket.on('send-message', (message) => {
    const user = users.get(socket.id);
    if (!user || !user.connectedWith) return;

    const connectedUser = users.get(user.connectedWith);
    if (!connectedUser) return;

    // Send to connected user
    io.to(user.connectedWith).emit('receive-message', {
      from: user.username,
      message,
      type: 'text'
    });

    console.log(`💬 رسالة من ${user.username} إلى ${connectedUser.username}: ${message}`);
  });

  // Send voice data
  socket.on('send-voice', (voiceData) => {
    const user = users.get(socket.id);
    if (!user || !user.connectedWith) return;

    io.to(user.connectedWith).emit('receive-voice', {
      from: user.username,
      audio: voiceData
    });
  });

  // End connection
  socket.on('end-call', () => {
    const user = users.get(socket.id);
    if (!user) return;

    if (user.connectedWith) {
      const connectedUser = users.get(user.connectedWith);
      if (connectedUser) {
        connectedUser.connectedWith = null;
        io.to(user.connectedWith).emit('call-ended');
      }
    }

    user.connectedWith = null;
    user.searching = false;

    // Remove from waiting queue
    const idx = waitingQueue.indexOf(socket.id);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    console.log(`❌ إنهاء الاتصال: ${user.username}`);
    socket.emit('call-ended');
  });

  // User disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (!user) return;

    console.log(`❌ قطع الاتصال: ${user.username}`);

    // Notify connected user
    if (user.connectedWith) {
      const connectedUser = users.get(user.connectedWith);
      if (connectedUser) {
        connectedUser.connectedWith = null;
        io.to(user.connectedWith).emit('user-disconnected');
      }
    }

    // Remove from queue
    const idx = waitingQueue.indexOf(socket.id);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    users.delete(socket.id);
  });
});

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// AI Chat with Real Groq
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
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
      top_p: 0.95,
      stream: false
    });

    const aiResponse = response.choices[0].message.content;
    
    res.json({ 
      success: true, 
      response: aiResponse,
      model: 'Llama 3.3 70B - Optimized'
    });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ 
      error: 'خطأ في الذكاء الصناعي',
      details: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'AI Programming Expert v5.0 - Real AI Edition',
    ai_engine: 'Groq - Llama 3.3 70B',
    social_chat: 'Real-time WebSocket',
    response_time: '< 100ms'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 منصة AI Programming Expert v5.0`);
  console.log(`💡 الذكاء الصناعي: Groq - Llama 3.3 70B`);
  console.log(`👥 التواصل الاجتماعي: WebSocket متصل مباشرة`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  if (process.env.GROQ_API_KEY) {
    console.log(`✅ مفتاح Groq API متصل بنجاح`);
  }
});
