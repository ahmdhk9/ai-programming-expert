// ========== ADVANCED SESSION-BASED REAL-TIME CHAT ==========
const socket = io({
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  transports: ['websocket', 'polling']
});

let currentUserId = null;
let connectedUserId = null;
let connectedUserName = null;
let currentSessionId = null;
let socialVoiceActive = false;
let searchInProgress = false;
let currentUsername = null;
let isConnected = false;
let reconnectAttempts = 0;
let socialRecognitionInstance = null;
let sessionStartTime = null;
let messageCount = 0;
const pinnedMessages = new Map();
const emojis = ['😀', '😂', '😍', '🔥', '💯', '👍', '✨', '🎉', '💪', '🚀', '👏', '🎊', '💖', '👌', '😎', '🙌'];

// Session timer
setInterval(() => {
  if (sessionStartTime && document.getElementById('profile-time')) {
    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    document.getElementById('profile-time').textContent = `<strong>المدة:</strong> ${mins}د ${secs}ث`;
  }
}, 1000);

// Socket Events
socket.on('connect', () => {
  console.log('✅ متصل بالخادم');
  isConnected = true;
  reconnectAttempts = 0;
  currentUserId = socket.id;

  const names = ['محمد', 'فاطمة', 'علي', 'أحمد', 'ليلى', 'سارة', 'حسن', 'مريم', 'عمر', 'نور'];
  const emojis = ['🌟', '💻', '🚀', '🎯', '🔥', '💡', '⭐', '🎨'];
  currentUsername = names[Math.floor(Math.random() * names.length)] +
                    emojis[Math.floor(Math.random() * emojis.length)];

  socket.emit('register', currentUsername);
});

socket.on('disconnect', () => {
  console.log('❌ قطع الاتصال');
  isConnected = false;
  showNotification('❌ قطع الاتصال - جاري إعادة الاتصال...', 'error');
});

socket.on('reconnect', () => {
  console.log('✅ تم إعادة الاتصال');
  showNotification('✅ تم استعادة الاتصال', 'success');
});

socket.on('registered', (data) => {
  currentUsername = data.username;
  currentUserId = data.userId;
  console.log('📝 مسجل:', currentUsername);
});

socket.on('searching', () => {
  const h3 = document.getElementById('social-loading')?.querySelector('h3');
  if (h3) h3.textContent = 'جاري البحث عن شخص... ⏳';
});

socket.on('user-found', (data) => {
  connectedUserId = data.connectedUserId;
  connectedUserName = data.username;
  currentSessionId = data.sessionId;
  sessionStartTime = Date.now();
  messageCount = 0;

  document.getElementById('social-loading').style.display = 'none';
  document.getElementById('social-chat').style.display = 'flex';
  document.getElementById('active-user-name').textContent = `💬 ${connectedUserName}`;
  document.getElementById('social-messages').innerHTML = '';
  document.getElementById('social-input').value = '';
  document.getElementById('social-input').focus();

  // Update profile
  document.getElementById('profile-name').textContent = connectedUserName;
  document.getElementById('profile-session').textContent = data.sessionId;
  document.getElementById('profile-msg-count').textContent = '0';

  // Initialize emoji panel
  const emojiGrid = document.getElementById('emoji-grid');
  emojiGrid.innerHTML = emojis.map(e => `<button onclick="insertEmoji('${e}')">${e}</button>`).join('');

  showNotification(`✅ متصل مع ${connectedUserName}`, 'success');
});

socket.on('receive-message', (msgRecord) => {
  addSocialMessage(`${msgRecord.content}`, 'other', msgRecord.from.username, msgRecord.id);
  socket.emit('mark-delivered', msgRecord.id);
  playNotificationSound();

  // Auto mark as read after 1 second
  setTimeout(() => {
    socket.emit('mark-read', msgRecord.id);
  }, 1000);
});

socket.on('message-delivered', (data) => {
  updateMessageStatus(data.msgId, '✓');
});

socket.on('message-read', (data) => {
  updateMessageStatus(data.msgId, '✓✓');
});

socket.on('message-sent', (data) => {
  console.log('✅ تم إرسال الرسالة');
});

socket.on('message-delivered', (data) => {
  console.log('✅ تم التسليم:', data.msgId);
});

socket.on('message-read', (data) => {
  console.log('👁️ تمت القراءة:', data.msgId);
});

socket.on('user-typing', (data) => {
  const messagesDiv = document.getElementById('social-messages');
  let typingEl = document.getElementById('typing-indicator');
  if (!typingEl) {
    typingEl = document.createElement('div');
    typingEl.id = 'typing-indicator';
    typingEl.style.cssText = 'color: var(--text-muted); font-size: 12px; padding: 8px; margin: 4px 0;';
    messagesDiv.appendChild(typingEl);
  }
  typingEl.textContent = `${data.username} يكتب...`;

  setTimeout(() => {
    if (typingEl && typingEl.parentElement) {
      typingEl.remove();
    }
  }, 2000);
});

socket.on('session-ended', (data) => {
  resetSocialChat();
  showNotification(data?.reason === 'user-ended' ? '📞 أنهى الطرف الآخر الاتصال' : '❌ تم إنهاء الجلسة', 'info');
});

socket.on('partner-disconnected', (data) => {
  resetSocialChat();
  showNotification(`❌ ${data.username} قطع الاتصال`, 'error');
});

socket.on('online-count', (count) => {
  const statusEl = document.getElementById('search-status');
  if (statusEl && !searchInProgress) {
    statusEl.textContent = `👥 ${count} مستخدم متصل`;
  }
});

// UI Functions
function findRandomUser() {
  if (!isConnected) {
    showNotification('❌ غير متصل بالخادم', 'error');
    return;
  }

  searchInProgress = true;
  document.getElementById('social-search').style.display = 'none';
  document.getElementById('social-loading').style.display = 'flex';
  socket.emit('find-user');
}

function cancelSearch() {
  searchInProgress = false;
  socket.emit('end-call');
  resetSocialChat();
}

function endConnection() {
  stopSocialVoiceChat();
  socket.emit('end-call');
  resetSocialChat();
}

function handleSocialKeypress(event) {
  if (event.key === 'Enter') {
    sendSocialMessage();
  } else if (event.type === 'input') {
    socket.emit('typing');
  }
}

function sendSocialMessage() {
  if (!isConnected || !connectedUserId || !currentSessionId) {
    showNotification('❌ لا يوجد جلسة نشطة', 'error');
    return;
  }

  const input = document.getElementById('social-input');
  const message = input.value.trim();

  if (!message) return;

  addSocialMessage(message, 'user');
  socket.emit('send-message', message);
  input.value = '';
  input.focus();
}

function resetSocialChat() {
  connectedUserId = null;
  connectedUserName = null;
  currentSessionId = null;
  socialVoiceActive = false;
  searchInProgress = false;

  document.getElementById('social-chat').style.display = 'none';
  document.getElementById('social-loading').style.display = 'none';
  document.getElementById('social-search').style.display = 'flex';
  document.getElementById('search-status').textContent = '👥 جاهز للبحث';
  document.getElementById('social-messages').innerHTML = '';
  document.getElementById('social-input').value = '';
}

function toggleSocialVoiceChat() {
  if (!connectedUserId) {
    showNotification('❌ لا يوجد جلسة نشطة', 'error');
    return;
  }

  if (socialVoiceActive) {
    stopSocialVoiceChat();
  } else {
    startSocialVoiceChat();
  }
}

function startSocialVoiceChat() {
  if (!isConnected) {
    showNotification('❌ غير متصل بالخادم', 'error');
    return;
  }

  if (!SpeechRecognition) {
    showNotification('❌ الصوت غير مدعوم', 'error');
    return;
  }

  socialVoiceActive = true;
  const voiceBtn = document.getElementById('voice-chat-btn');
  if (voiceBtn) {
    voiceBtn.classList.add('recording');
    voiceBtn.textContent = '🎤 إيقاف';
  }

  let finalText = '';
  socialRecognitionInstance = new SpeechRecognition();
  socialRecognitionInstance.lang = 'ar-SA';
  socialRecognitionInstance.continuous = false;
  socialRecognitionInstance.interimResults = true;

  socialRecognitionInstance.onstart = () => {
    showNotification('🎤 جاري الاستماع...', 'info');
  };

  socialRecognitionInstance.onresult = (e) => {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        finalText = e.results[i][0].transcript;
      }
    }
  };

  socialRecognitionInstance.onend = () => {
    if (finalText.trim()) {
      addSocialMessage(`🎤 ${finalText}`, 'user');
      socket.emit('send-message', `🎤 ${finalText}`);
      finalText = '';
      showNotification('✅ تم إرسال الرسالة الصوتية', 'success');
    }

    if (socialVoiceActive && connectedUserId) {
      setTimeout(() => {
        try {
          if (socialRecognitionInstance) {
            socialRecognitionInstance.start();
          }
        } catch (e) {
          console.log('تم إيقاف الاستماع');
        }
      }, 500);
    }
  };

  socialRecognitionInstance.onerror = (event) => {
    if (event.error !== 'aborted') {
      showNotification(`⚠️ ${event.error}`, 'error');
    }
  };

  try {
    socialRecognitionInstance.start();
  } catch (e) {
    showNotification('❌ خطأ في تفعيل الصوت', 'error');
  }
}

function stopSocialVoiceChat() {
  socialVoiceActive = false;
  const voiceBtn = document.getElementById('voice-chat-btn');
  if (voiceBtn) {
    voiceBtn.classList.remove('recording');
    voiceBtn.textContent = '🎤 صوت';
  }

  if (socialRecognitionInstance) {
    try {
      socialRecognitionInstance.abort();
    } catch (e) {
      console.log('خطأ في إيقاف الاستماع');
    }
  }
}

function toggleUserProfile() {
  const panel = document.getElementById('profile-panel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function toggleEmojiPanel() {
  const panel = document.getElementById('emoji-panel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function toggleQuickReactions() {
  const panel = document.getElementById('quick-reactions');
  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
}

function toggleSearchMessages() {
  const bar = document.getElementById('search-bar');
  bar.style.display = bar.style.display === 'none' ? 'block' : 'none';
  if (bar.style.display === 'block') {
    document.getElementById('search-input').focus();
  }
}

function insertEmoji(emoji) {
  const input = document.getElementById('social-input');
  input.value += emoji;
  input.focus();
}

function sendQuickReaction(reaction) {
  const input = document.getElementById('social-input');
  input.value = reaction;
  sendSocialMessage();
  document.getElementById('quick-reactions').style.display = 'none';
}

function searchMessages(query) {
  const messagesDiv = document.getElementById('social-messages');
  const messages = messagesDiv.querySelectorAll('.social-message');
  const resultsDiv = document.getElementById('search-results');
  
  if (!query.trim()) {
    resultsDiv.innerHTML = '';
    messages.forEach(m => m.style.opacity = '1');
    return;
  }

  resultsDiv.innerHTML = '';
  let found = 0;

  messages.forEach(msg => {
    const content = msg.textContent.toLowerCase();
    if (content.includes(query.toLowerCase())) {
      msg.style.opacity = '1';
      found++;
      const snippet = msg.textContent.substr(0, 50) + '...';
      const result = document.createElement('div');
      result.className = 'search-result';
      result.textContent = snippet;
      result.onclick = () => msg.scrollIntoView({ behavior: 'smooth' });
      resultsDiv.appendChild(result);
    } else {
      msg.style.opacity = '0.3';
    }
  });

  if (found === 0) {
    resultsDiv.innerHTML = '<div class="search-result">لا توجد نتائج</div>';
  }
}

function pinMessage(msgId) {
  const msg = document.getElementById(`msg-${msgId}`);
  if (msg) {
    pinnedMessages.set(msgId, msg.textContent);
    showNotification('📌 تم تثبيت الرسالة', 'success');
  }
}

function addSocialMessage(text, type, fromUser = null, msgId = null) {
  const messagesDiv = document.getElementById('social-messages');
  if (!messagesDiv) return;

  const now = new Date();
  const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                  now.getMinutes().toString().padStart(2, '0');

  const messageEl = document.createElement('div');
  messageEl.className = `social-message ${type}`;
  messageEl.id = `msg-${msgId || 'local-' + Date.now()}`;
  
  if (type === 'other' && fromUser) {
    messageEl.innerHTML = `
      <div class="msg-header">
        <strong>${fromUser}</strong>
        <span class="msg-time">${timeStr}</span>
      </div>
      <div class="msg-content">${text}</div>
    `;
  } else {
    messageEl.innerHTML = `
      <div class="msg-content">${text}</div>
      <div class="msg-footer">
        <span class="msg-time">${timeStr}</span>
        <span class="msg-status" id="status-${msgId}">⏱️</span>
      </div>
    `;
  }
  
  messageEl.style.animation = 'slideIn 0.3s ease';
  messageEl.onmouseenter = () => {
    const actions = document.createElement('span');
    actions.style.cssText = 'cursor: pointer; color: var(--primary); font-size: 11px;';
    actions.textContent = ' 📌';
    actions.onclick = () => pinMessage(msgId);
  };
  messagesDiv.appendChild(messageEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  messageCount++;
  if (document.getElementById('profile-msg-count')) {
    document.getElementById('profile-msg-count').textContent = messageCount;
  }
}

function updateMessageStatus(msgId, status) {
  const statusEl = document.getElementById(`status-${msgId}`);
  if (statusEl) {
    if (status === '✓') {
      statusEl.textContent = '✓';
      statusEl.style.color = '#00d4ff';
    } else if (status === '✓✓') {
      statusEl.textContent = '✓✓';
      statusEl.style.color = '#10b981';
    }
  }
}

function showNotification(message, type = 'info') {
  const color = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#00d4ff';
  console.log(message);

  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${color};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 12px;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

function playNotificationSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log('خطأ في الصوت');
  }
}

// Heartbeat
setInterval(() => {
  if (isConnected && currentSessionId) {
    socket.emit('ping');
  }
}, 30000);

// Keep existing AI chat functions
function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message) return;

  const messagesDiv = document.getElementById('chat-messages');
  const loadingDiv = document.getElementById('chat-loading');

  const userMessageEl = document.createElement('div');
  userMessageEl.className = 'message user-message';
  userMessageEl.innerHTML = `<span class="message-icon">👤</span><div class="message-content">${message}</div>`;
  messagesDiv.appendChild(userMessageEl);

  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  loadingDiv.style.display = 'block';

  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    loadingDiv.style.display = 'none';

    if (data.success) {
      const aiMessageEl = document.createElement('div');
      aiMessageEl.className = 'message ai-message';
      aiMessageEl.innerHTML = `<span class="message-icon">🤖</span><div class="message-content">${data.response}</div>`;
      messagesDiv.appendChild(aiMessageEl);
    } else {
      const errorEl = document.createElement('div');
      errorEl.className = 'message ai-message';
      errorEl.innerHTML = `<span class="message-icon">⚠️</span><div class="message-content">خطأ: ${data.error}</div>`;
      messagesDiv.appendChild(errorEl);
    }

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (error) {
    loadingDiv.style.display = 'none';
    const errorEl = document.createElement('div');
    errorEl.className = 'message ai-message';
    errorEl.innerHTML = `<span class="message-icon">❌</span><div class="message-content">خطأ في الاتصال</div>`;
    messagesDiv.appendChild(errorEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

function setTab(tabName) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const targetTab = document.getElementById(tabName);
  if (targetTab) targetTab.classList.add('active');

  document.querySelectorAll('.bar-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.bar-btn').forEach(btn => {
    if (btn.onclick && btn.onclick.toString().includes(`'${tabName}'`)) {
      btn.classList.add('active');
    }
  });
}

window.addEventListener('load', () => {
  console.log('✅ تم تحميل التطبيق');
});

window.addEventListener('beforeunload', (e) => {
  if (connectedUserId) {
    e.preventDefault();
    e.returnValue = 'لديك جلسة نشطة. هل أنت متأكد؟';
  }
});
