// ========== REAL-TIME SOCIAL CHAT WITH ADVANCED FEATURES ==========
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
let socialVoiceActive = false;
let searchInProgress = false;
let currentUsername = null;
let isConnected = false;
let reconnectAttempts = 0;
let socialRecognitionInstance = null;

// Auto-reconnect handler
socket.on('connect', () => {
  console.log('✅ متصل بالخادم');
  isConnected = true;
  reconnectAttempts = 0;
  currentUserId = socket.id;

  // Register user
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

socket.on('connect_error', (error) => {
  console.error('❌ خطأ في الاتصال:', error);
  reconnectAttempts++;
  if (reconnectAttempts > 3) {
    showNotification('⚠️ مشكلة في الاتصال، تحقق من الإنترنت', 'error');
  }
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

  document.getElementById('social-loading').style.display = 'none';
  document.getElementById('social-chat').style.display = 'flex';
  document.getElementById('active-user-name').textContent = `💬 ${connectedUserName}`;
  document.getElementById('social-messages').innerHTML = '';
  document.getElementById('social-input').value = '';
  document.getElementById('social-input').focus();

  showNotification(`✅ متصل مع ${connectedUserName}`, 'success');
});

socket.on('receive-message', (data) => {
  addSocialMessage(data.message, 'other');
  playNotificationSound();
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

socket.on('call-ended', (data) => {
  resetSocialChat();
  showNotification(data?.reason === 'user-ended' ? '📞 أنهى الطرف الآخر الاتصال' : '❌ تم إنهاء الاتصال', 'info');
});

socket.on('user-disconnected', (data) => {
  resetSocialChat();
  showNotification(`❌ ${data.username} قطع الاتصال`, 'error');
});

socket.on('error', (error) => {
  console.error('❌ خطأ Socket:', error);
  showNotification(`❌ ${error}`, 'error');
});

socket.on('online-count', (count) => {
  const statusEl = document.getElementById('search-status');
  if (statusEl && !searchInProgress) {
    statusEl.textContent = `👥 ${count} مستخدم متصل حالياً`;
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
  }
}

function sendSocialMessage() {
  if (!isConnected || !connectedUserId) {
    showNotification('❌ لا يوجد اتصال نشط', 'error');
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
    showNotification('❌ لا يوجد اتصال نشط', 'error');
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
    showNotification('❌ الصوت غير مدعوم في متصفحك', 'error');
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
    console.log('🎤 بدء الاستماع');
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
    console.error('❌ خطأ الصوت:', event.error);
    if (event.error !== 'aborted') {
      showNotification(`⚠️ ${event.error}`, 'error');
    }
  };

  try {
    socialRecognitionInstance.start();
  } catch (e) {
    console.error('خطأ في بدء الاستماع:', e);
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
  
  showNotification('⏹️ تم إيقاف الاستماع', 'info');
}

function addSocialMessage(text, type) {
  const messagesDiv = document.getElementById('social-messages');
  if (!messagesDiv) return;

  const messageEl = document.createElement('div');
  messageEl.className = `social-message ${type}`;
  messageEl.textContent = text;
  messageEl.style.animation = 'slideIn 0.3s ease';
  messagesDiv.appendChild(messageEl);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showNotification(message, type = 'info') {
  const color = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#00d4ff';
  console.log(message);

  // Toast notification
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
}

// Heartbeat
setInterval(() => {
  if (isConnected) {
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

  // Add user message
  const userMessageEl = document.createElement('div');
  userMessageEl.className = 'message user-message';
  userMessageEl.innerHTML = `
    <span class="message-icon">👤</span>
    <div class="message-content">${message}</div>
  `;
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
      aiMessageEl.innerHTML = `
        <span class="message-icon">🤖</span>
        <div class="message-content">${data.response}</div>
      `;
      messagesDiv.appendChild(aiMessageEl);
    } else {
      const errorEl = document.createElement('div');
      errorEl.className = 'message ai-message';
      errorEl.innerHTML = `
        <span class="message-icon">⚠️</span>
        <div class="message-content">خطأ: ${data.error}</div>
      `;
      messagesDiv.appendChild(errorEl);
    }

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (error) {
    loadingDiv.style.display = 'none';
    const errorEl = document.createElement('div');
    errorEl.className = 'message ai-message';
    errorEl.innerHTML = `
      <span class="message-icon">❌</span>
      <div class="message-content">خطأ في الاتصال</div>
    `;
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

  if (tabName === 'chat') {
    setTimeout(() => {
      const input = document.getElementById('chat-input');
      if (input) input.focus();
    }, 100);
  }
}

// Initialize app
window.addEventListener('load', () => {
  console.log('✅ تم تحميل التطبيق');
});

// Prevent accidental page close
window.addEventListener('beforeunload', (e) => {
  if (connectedUserId) {
    e.preventDefault();
    e.returnValue = 'لديك اتصال نشط. هل أنت متأكد من الخروج؟';
  }
});
