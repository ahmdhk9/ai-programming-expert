// ==========================================
// 🔥 Advanced Social Chat System - Pro Version
// نظام دردشة متقدم قوي مع مميزات عالية
// ==========================================

class SocialChatPro {
  constructor() {
    this.messageHistory = new Map();
    this.userProfiles = new Map();
    this.blockedUsers = new Set();
    this.savedMessages = new Map();
    this.chatSessions = new Map();
    this.currentSession = null;
    this.messageCounter = 0;
    this.isTyping = false;
    this.typingTimeout = null;

    this.init();
    console.log('🔥 Social Chat Pro initialized');
  }

  init() {
    this.setupSocketListeners();
    this.loadStoredData();
    this.setupUIHandlers();
  }

  // ==================== Socket Listeners ====================
  setupSocketListeners() {
    if (!window.socket) return;

    // User found - جلسة جديدة
    window.socket.on('user-found', (data) => {
      this.currentSession = {
        sessionId: data.sessionId,
        partnerId: data.connectedUserId,
        partnerName: data.username,
        startTime: Date.now(),
        messages: [],
        active: true
      };
      
      this.chatSessions.set(data.sessionId, this.currentSession);
      this.showChatUI(data.username, data.connectedUserId);
      this.logEvent('SESSION_CREATED', data.sessionId);
      console.log('✅ جلسة جديدة:', data.username);
    });

    // Receive message
    window.socket.on('receive-message', (data) => {
      this.handleReceivedMessage(data);
    });

    // User typing
    window.socket.on('user-typing', (data) => {
      this.showTypingIndicator(data);
    });

    // Message delivered
    window.socket.on('message-delivered', (data) => {
      this.updateMessageStatus(data.msgId, 'delivered');
    });

    // Message read
    window.socket.on('message-read', (data) => {
      this.updateMessageStatus(data.msgId, 'read');
    });

    // Session ended
    window.socket.on('session-ended', (data) => {
      this.endChatSession(data.reason || 'ended');
    });

    // Error
    window.socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
      this.handleError(error);
    });

    console.log('✅ Socket listeners configured');
  }

  // ==================== Message Handling ====================
  handleReceivedMessage(data) {
    if (!this.currentSession) return;

    const messageId = data.id || `msg_${Date.now()}`;
    const message = {
      id: messageId,
      from: data.from.username,
      fromId: data.from.id,
      content: data.content,
      timestamp: data.timestamp || Date.now(),
      delivered: data.delivered,
      read: false,
      type: this.detectMessageType(data.content)
    };

    // Add to history
    this.currentSession.messages.push(message);
    this.messageHistory.set(messageId, message);

    // Display
    this.displayMessage(message, 'received');

    // Auto-mark as delivered
    if (window.socket && window.socket.connected) {
      window.socket.emit('mark-delivered', messageId);
    }

    // Auto-mark as read after 1 second
    setTimeout(() => {
      if (window.socket && window.socket.connected) {
        window.socket.emit('mark-read', messageId);
      }
    }, 1000);

    this.logEvent('MESSAGE_RECEIVED', { id: messageId, from: data.from.username });
  }

  detectMessageType(content) {
    if (content.match(/^(😀|😂|😍|🤔|😎|🥳|😢|😡|🤝|👍|❤️|🔥|✨|💯|🚀|🎉)$/)) {
      return 'emoji';
    }
    if (content.includes('http') || content.includes('www')) {
      return 'link';
    }
    return 'text';
  }

  displayMessage(message, type = 'sent') {
    const container = document.getElementById('social-messages');
    if (!container) return;

    const msgEl = document.createElement('div');
    msgEl.className = `social-message ${type}-message`;
    msgEl.id = `msg_${message.id}`;
    msgEl.style.cssText = `
      margin: 8px 0;
      padding: 10px 12px;
      border-radius: 12px;
      max-width: 80%;
      background: ${type === 'sent' ? '#0084FF' : '#E5E5EA'};
      color: ${type === 'sent' ? '#FFF' : '#000'};
      ${type === 'sent' ? 'margin-left: auto;' : 'margin-right: auto;'}
      word-break: break-word;
    `;

    // Content
    const content = document.createElement('div');
    content.textContent = message.content;
    msgEl.appendChild(content);

    // Status indicator
    if (type === 'sent') {
      const status = document.createElement('small');
      status.className = 'msg-status';
      status.style.cssText = `
        display: block;
        margin-top: 4px;
        opacity: 0.8;
        font-size: 11px;
      `;
      status.textContent = message.delivered ? '✓✓' : '✓';
      msgEl.appendChild(status);
    }

    // Time
    const time = document.createElement('small');
    time.style.cssText = `
      display: block;
      margin-top: 4px;
      opacity: 0.6;
      font-size: 11px;
    `;
    time.textContent = new Date(message.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    msgEl.appendChild(time);

    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
  }

  // ==================== Typing Indicator ====================
  showTypingIndicator(data) {
    const area = document.getElementById('typing-area');
    if (!area) return;

    const userEl = document.getElementById('typing-user');
    if (userEl) {
      userEl.textContent = `${data.username} يكتب...`;
    }

    area.style.display = 'flex';

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      area.style.display = 'none';
    }, 2000);
  }

  emitTyping() {
    if (this.isTyping || !window.socket) return;

    this.isTyping = true;
    window.socket.emit('typing', { sessionId: this.currentSession?.sessionId });

    setTimeout(() => {
      this.isTyping = false;
    }, 1000);
  }

  // ==================== Message Status ====================
  updateMessageStatus(msgId, status) {
    const msgEl = document.getElementById(`msg_${msgId}`);
    if (!msgEl) return;

    const statusEl = msgEl.querySelector('.msg-status');
    if (!statusEl) return;

    if (status === 'delivered') {
      statusEl.textContent = '✓✓';
    } else if (status === 'read') {
      statusEl.textContent = '✓✓ ✓';
      statusEl.style.color = '#0084FF';
    }
  }

  // ==================== UI Handlers ====================
  setupUIHandlers() {
    const input = document.getElementById('social-input');
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });

      input.addEventListener('input', () => {
        this.emitTyping();
      });
    }
  }

  sendMessage() {
    const input = document.getElementById('social-input');
    const message = input.value.trim();

    if (!message || !this.currentSession) return;

    const msgId = `msg_${Date.now()}`;
    const msgData = {
      id: msgId,
      message: message,
      sessionId: this.currentSession.sessionId,
      timestamp: Date.now()
    };

    // Send via socket
    if (window.socket && window.socket.connected) {
      window.socket.emit('send-message', msgData);

      // Add to UI immediately (optimistic)
      const sentMsg = {
        id: msgId,
        from: currentUser,
        fromId: window.socket.id,
        content: message,
        timestamp: Date.now(),
        delivered: false,
        read: false,
        type: this.detectMessageType(message)
      };

      this.currentSession.messages.push(sentMsg);
      this.messageHistory.set(msgId, sentMsg);
      this.displayMessage(sentMsg, 'sent');

      input.value = '';
      this.logEvent('MESSAGE_SENT', { id: msgId, content: message });
    } else {
      this.handleError('لم يتم الاتصال');
    }
  }

  // ==================== Advanced Features ====================
  saveMessage(msgId) {
    const msg = this.messageHistory.get(msgId);
    if (!msg) return;

    this.savedMessages.set(msgId, {
      ...msg,
      savedAt: Date.now()
    });

    this.logEvent('MESSAGE_SAVED', msgId);
    this.showNotification('✅ تم حفظ الرسالة', 'success');
  }

  blockUser(userId) {
    this.blockedUsers.add(userId);
    this.logEvent('USER_BLOCKED', userId);
    this.showNotification('🚫 تم حظر المستخدم', 'success');
  }

  unblockUser(userId) {
    this.blockedUsers.delete(userId);
    this.logEvent('USER_UNBLOCKED', userId);
  }

  reportMessage(msgId, reason) {
    this.logEvent('MESSAGE_REPORTED', { msgId, reason });
    this.showNotification('📝 تم إرسال التقرير', 'success');
  }

  // ==================== UI Display ====================
  showChatUI(partnerName, partnerId) {
    document.getElementById('social-search').style.display = 'none';
    document.getElementById('social-loading').style.display = 'none';
    document.getElementById('social-chat').style.display = 'block';

    document.getElementById('active-user-name').textContent = partnerName;
    document.getElementById('partner-avatar').textContent = partnerName.charAt(0);

    document.getElementById('profile-name').textContent = partnerName;
    document.getElementById('profile-session').textContent = this.currentSession?.sessionId || '';

    this.updateChatDuration();
  }

  updateChatDuration() {
    if (!this.currentSession) return;

    const updateDuration = () => {
      const now = Date.now();
      const duration = Math.floor((now - this.currentSession.startTime) / 1000);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;

      const durationEl = document.getElementById('profile-time');
      if (durationEl) {
        durationEl.innerHTML = `<strong>المدة:</strong> ${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    };

    updateDuration();
    setInterval(updateDuration, 1000);
  }

  endChatSession(reason) {
    if (!this.currentSession) return;

    this.currentSession.active = false;
    this.currentSession.endedAt = Date.now();
    this.currentSession.endReason = reason;

    this.logEvent('SESSION_ENDED', {
      sessionId: this.currentSession.sessionId,
      reason: reason,
      messageCount: this.currentSession.messages.length,
      duration: this.currentSession.endedAt - this.currentSession.startTime
    });

    document.getElementById('social-chat').style.display = 'none';
    document.getElementById('social-search').style.display = 'flex';
    document.getElementById('search-status').textContent = 'الجلسة انتهت';

    this.showNotification(`👋 انتهت الجلسة: ${reason}`, 'info');

    setTimeout(() => {
      document.getElementById('search-status').textContent = 'جاهز للبحث';
    }, 3000);
  }

  // ==================== Data Management ====================
  loadStoredData() {
    try {
      const saved = localStorage.getItem('social_chat_data');
      if (saved) {
        const data = JSON.parse(saved);
        this.blockedUsers = new Set(data.blockedUsers || []);
        this.savedMessages = new Map(data.savedMessages || []);
      }
    } catch (e) {
      console.warn('⚠️ Could not load stored data');
    }
  }

  saveData() {
    try {
      localStorage.setItem('social_chat_data', JSON.stringify({
        blockedUsers: Array.from(this.blockedUsers),
        savedMessages: Array.from(this.savedMessages.entries())
      }));
    } catch (e) {
      console.warn('⚠️ Could not save data');
    }
  }

  // ==================== Logging & Notifications ====================
  logEvent(type, data) {
    const event = {
      type,
      data,
      timestamp: Date.now(),
      sessionId: this.currentSession?.sessionId
    };

    console.log(`📊 [${type}]`, event);

    // Store for analytics
    const events = JSON.parse(localStorage.getItem('chat_events') || '[]');
    events.push(event);
    if (events.length > 100) events.shift();
    localStorage.setItem('chat_events', JSON.stringify(events));
  }

  showNotification(message, type = 'info') {
    if (window.showNotification) {
      window.showNotification(message, type);
    } else {
      console.log(`[${type}] ${message}`);
    }
  }

  handleError(error) {
    console.error('❌ Chat Error:', error);
    this.logEvent('ERROR', error);
    this.showNotification('❌ حدث خطأ، حاول مجدداً', 'error');
  }

  // ==================== Stats & Analytics ====================
  getStats() {
    return {
      totalSessions: this.chatSessions.size,
      totalMessages: this.messageHistory.size,
      savedMessages: this.savedMessages.size,
      blockedUsers: this.blockedUsers.size,
      currentSession: this.currentSession ? {
        duration: Date.now() - this.currentSession.startTime,
        messageCount: this.currentSession.messages.length,
        partner: this.currentSession.partnerName
      } : null
    };
  }

  generateReport() {
    const stats = this.getStats();
    const events = JSON.parse(localStorage.getItem('chat_events') || '[]');

    return {
      stats,
      sessionCount: this.chatSessions.size,
      totalInteractions: events.length,
      recentEvents: events.slice(-10)
    };
  }
}

// ==================== Global Instance ====================
window.socialChatPro = new SocialChatPro();
console.log('✅ Social Chat Pro ready');

// Auto-save every 30 seconds
setInterval(() => {
  if (window.socialChatPro) {
    window.socialChatPro.saveData();
  }
}, 30000);
