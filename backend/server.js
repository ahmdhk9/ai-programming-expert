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

// ========== ADVANCED SESSION MANAGEMENT ==========
const users = new Map(); // socketId -> {username, searching, sessionId, partner, timestamp}
const sessions = new Map(); // sessionId -> {user1, user2, messages[], created_at}
const waitingQueue = [];
const usernames = ['محمد', 'فاطمة', 'علي', 'أحمد', 'ليلى', 'سارة', 'حسن', 'مريم', 'عمر', 'نور'];
const emojis = ['🌟', '💻', '🚀', '🎯', '🔥', '💡', '⭐', '🎨'];

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substr(2, 12);
}

function getRandomUsername() {
  const name = usernames[Math.floor(Math.random() * usernames.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return `${name}${emoji}`;
}

io.on('connection', (socket) => {
  console.log(`✅ اتصال جديد: ${socket.id}`);

  socket.on('register', (username) => {
    if (!username || username.trim().length === 0) {
      username = getRandomUsername();
    }

    users.set(socket.id, {
      username,
      searching: false,
      sessionId: null,
      partner: null,
      socket,
      joinedAt: Date.now()
    });

    socket.emit('registered', { username, userId: socket.id });
    console.log(`📝 تسجيل: ${username} (${socket.id})`);
    io.emit('online-count', users.size);
  });

  socket.on('find-user', () => {
    const currentUser = users.get(socket.id);
    if (!currentUser) {
      socket.emit('error', 'لم يتم تسجيل المستخدم');
      return;
    }

    currentUser.searching = true;

    // Search for waiting user
    let partnerSocketId = null;
    for (let [id, user] of users) {
      if (id !== socket.id && user.searching && !user.sessionId) {
        partnerSocketId = id;
        break;
      }
    }

    if (!partnerSocketId) {
      waitingQueue.push(socket.id);
      socket.emit('searching');
      console.log(`⏳ في انتظار: ${currentUser.username}`);
      return;
    }

    // Create new session
    const partnerUser = users.get(partnerSocketId);
    const sessionId = generateSessionId();
    
    // Create session record
    sessions.set(sessionId, {
      id: sessionId,
      user1: { id: socket.id, username: currentUser.username },
      user2: { id: partnerSocketId, username: partnerUser.username },
      messages: [],
      createdAt: Date.now(),
      status: 'active'
    });

    // Update users
    currentUser.sessionId = sessionId;
    currentUser.partner = partnerSocketId;
    currentUser.searching = false;
    
    partnerUser.sessionId = sessionId;
    partnerUser.partner = socket.id;
    partnerUser.searching = false;

    // Remove from queue
    const idx = waitingQueue.indexOf(partnerSocketId);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    console.log(`🔗 جلسة جديدة: ${currentUser.username} ↔ ${partnerUser.username}`);
    console.log(`📌 معرف الجلسة: ${sessionId}`);

    // Notify both users
    socket.emit('user-found', {
      username: partnerUser.username,
      connectedUserId: partnerSocketId,
      sessionId: sessionId
    });

    io.to(partnerSocketId).emit('user-found', {
      username: currentUser.username,
      connectedUserId: socket.id,
      sessionId: sessionId
    });
  });

  socket.on('send-message', (data) => {
    const sender = users.get(socket.id);
    if (!sender || !sender.sessionId || !sender.partner) {
      socket.emit('error', 'لا يوجد جلسة نشطة');
      return;
    }

    const message = typeof data === 'string' ? data : data.message;
    if (!message || message.trim().length === 0) return;

    const session = sessions.get(sender.sessionId);
    const recipient = users.get(sender.partner);

    if (!session || !recipient) {
      socket.emit('error', 'فشل إرسال الرسالة');
      return;
    }

    // Create message record
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

    // Save to session
    session.messages.push(msgRecord);

    console.log(`💬 رسالة من ${sender.username} إلى ${recipient.username}`);
    console.log(`   المحتوى: ${message.trim()}`);
    console.log(`   الجلسة: ${sender.sessionId}`);

    // Send to recipient ONLY
    io.to(sender.partner).emit('receive-message', msgRecord);

    // Send confirmation to sender
    socket.emit('message-sent', {
      msgId: msgRecord.id,
      timestamp: msgRecord.timestamp
    });
  });

  socket.on('mark-delivered', (msgId) => {
    const user = users.get(socket.id);
    if (!user || !user.sessionId) return;

    const session = sessions.get(user.sessionId);
    if (!session) return;

    const msg = session.messages.find(m => m.id === msgId);
    if (msg) {
      msg.delivered = true;
      console.log(`✅ تسليم: ${msg.id}`);
      
      // Notify sender
      io.to(msg.from.id).emit('message-delivered', { msgId });
    }
  });

  socket.on('mark-read', (msgId) => {
    const user = users.get(socket.id);
    if (!user || !user.sessionId) return;

    const session = sessions.get(user.sessionId);
    if (!session) return;

    const msg = session.messages.find(m => m.id === msgId);
    if (msg) {
      msg.read = true;
      console.log(`👁️ قراءة: ${msg.id}`);
      
      // Notify sender
      io.to(msg.from.id).emit('message-read', { msgId });
    }
  });

  socket.on('end-call', () => {
    const user = users.get(socket.id);
    if (!user) return;

    if (user.sessionId && user.partner) {
      const session = sessions.get(user.sessionId);
      if (session) {
        session.status = 'ended';
        session.endedAt = Date.now();
        console.log(`⏹️ إنهاء الجلسة: ${session.id}`);
      }

      const partner = users.get(user.partner);
      if (partner) {
        partner.sessionId = null;
        partner.partner = null;
        io.to(user.partner).emit('session-ended', { reason: 'user-ended' });
      }
    }

    user.sessionId = null;
    user.partner = null;
    user.searching = false;

    const idx = waitingQueue.indexOf(socket.id);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    socket.emit('session-ended');
  });

  socket.on('typing', (data) => {
    const user = users.get(socket.id);
    if (user && user.partner) {
      io.to(user.partner).emit('user-typing', {
        username: user.username,
        sessionId: user.sessionId
      });
    }
  });

  socket.on('get-session', () => {
    const user = users.get(socket.id);
    if (user && user.sessionId) {
      const session = sessions.get(user.sessionId);
      if (session) {
        socket.emit('session-info', session);
      }
    }
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (!user) return;

    console.log(`❌ قطع: ${user.username}`);

    if (user.sessionId && user.partner) {
      const session = sessions.get(user.sessionId);
      if (session) {
        session.status = 'disconnected';
        console.log(`🔌 قطع الاتصال في الجلسة: ${session.id}`);
      }

      const partner = users.get(user.partner);
      if (partner) {
        partner.sessionId = null;
        partner.partner = null;
        io.to(user.partner).emit('partner-disconnected', { username: user.username });
      }
    }

    const idx = waitingQueue.indexOf(socket.id);
    if (idx !== -1) waitingQueue.splice(idx, 1);

    users.delete(socket.id);
    io.emit('online-count', users.size);
  });
});

// AI Chat
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'رسالة مفقودة' });
    }

    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: `أنت مساعد ذكي احترافي - رد قصير (2-3 جمل). إذا سُئلت عن المطور: "تم تطويرها بواسطة احمد العويني التميمي البصراوي"` },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      max_tokens: 250
    });

    res.json({ success: true, response: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في الذكاء الصناعي' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'AI Programming Expert v5.0',
    activeSessions: sessions.size,
    activeUsers: users.size,
    waitingUsers: waitingQueue.length
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 منصة AI Programming Expert v5.0`);
  console.log(`👥 نظام جلسات متقدم مع تأكيد التسليم`);
  console.log(`📍 الخادم: http://localhost:${PORT}\n`);
});
