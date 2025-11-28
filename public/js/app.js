// ==========================================
// 🤖 AI Programming Expert Platform
// Enhanced with Smart Recovery
// ==========================================

// Get Backend URL from Config Engine
let BACKEND_URL = null;

// Socket.IO connection
let socket = null;
let currentUser = null;
let userColor = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize BACKEND_URL on page load
async function initializeBackend() {
  if (window.configEngine) {
    BACKEND_URL = await window.configEngine.detectBackendUrl();
    window.configEngine.startHealthCheck();
    initSocket();
  }
}

function initSocket() {
  if (!BACKEND_URL) {
    setTimeout(initSocket, 1000);
    return;
  }

  // Disconnect old socket
  if (socket) {
    socket.disconnect();
  }

  const socketOptions = {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
    reconnectionAttempts: Infinity,
    transports: ['websocket', 'polling'],
  };

  socket = io(BACKEND_URL, socketOptions);

  socket.on('connect', () => {
    reconnectAttempts = 0;
    currentUser = `User_${Math.random().toString(36).substr(2, 9)}`;
    userColor = getRandomColor();
    socket.emit('user_joined', { username: currentUser, color: userColor });
    if (window.showNotification) {
      window.showNotification('✅ متصل بالخادم', 'success');
    }
  });

  socket.on('disconnect', () => {
    reconnectAttempts++;
  });

  socket.on('message', (data) => {
    if (window.addMessageToSocial) {
      window.addMessageToSocial(data.username, data.message, data.color);
    }
  });

  socket.on('error', (error) => {
    // Silently handle errors
  });

  socket.on('connect_error', (error) => {
    if (reconnectAttempts > maxReconnectAttempts) {
      handleSocketFailure();
    }
  });
}

async function handleSocketFailure() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  if (window.configEngine) {
    BACKEND_URL = window.configEngine.getBackendUrl();
  }
  initSocket();
}

async function askAI(prompt) {
  if (!prompt.trim()) {
    if (window.showNotification) {
      window.showNotification('⚠️ اكتب رسالة أولاً', 'warning');
    }
    return;
  }

  const chatMessages = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  
  if (!chatMessages || !input) {
    console.error('❌ DOM elements not found');
    if (window.errorLogger) {
      window.errorLogger.logError({
        message: 'DOM elements not found for chat',
        type: 'ui-error'
      }, 'app-error');
    }
    return;
  }

  addChatMessage('أنت', prompt, true);
  input.value = '';
  input.disabled = true;

  // Show loading indicator
  const loadingId = 'loading_' + Date.now();
  const loadingMsg = document.createElement('div');
  loadingMsg.id = loadingId;
  loadingMsg.className = 'chat-message ai-msg loading';
  loadingMsg.innerHTML = '<strong>🤖 AI Expert:</strong> <span>⏳ جارٍ المعالجة...</span>';
  chatMessages.appendChild(loadingMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    // Use cached fetch
    const response = await fetch(`${BACKEND_URL}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // Remove loading
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();

    const reply = data.reply || '❌ لم أستطع الرد';
    const quality = data.quality ? ` (جودة: ${Math.round(data.quality * 100)}%)` : '';
    const model = data.model ? ` [${data.model}]` : '';
    
    if (window.addChatMessage) {
      window.addChatMessage('🤖 AI Expert', reply + quality + model, false);
    }
    addChatMessage('🤖 AI Expert', reply + quality, false);
    console.log(`✅ AI Response (${data.time}ms):`, reply.substring(0, 50));
    
    // 🚀 Record interaction for self-improvement
    if (window.selfImprovementSystem) {
      window.selfImprovementSystem.recordNewInteraction(prompt, reply);
    }
    return;

  } catch (error) {
    console.warn('⚠️ Using fallback:', error.message);
    
    // تسجيل الخطأ
    if (window.errorLogger) {
      window.errorLogger.logError({
        message: `AI Response Error: ${error.message}`,
        type: 'ai-error',
        prompt: prompt.substring(0, 50)
      }, 'api-error');
    }
    
    // Remove loading
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    
    // Use fallback
    const fallback = window.groqFallback || 'اعتذر، الاتصال بطيء حالياً. دعني أساعدك بطريقة أخرى...';
    addChatMessage('🤖 AI Expert', fallback, false);
    
    // Auto-fix
    if (window.autoFixEngine) {
      window.autoFixEngine.fixGroqTimeout();
    }
  } finally {
    input.disabled = false;
    input.focus();
  }
}

function addChatMessage(sender, message, isUser) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${isUser ? 'user-msg' : 'ai-msg'}`;
  msgDiv.innerHTML = `<strong>${sender}:</strong> <span>${message}</span>`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessageToSocial(username, message, color) {
  const socialContent = document.querySelector('#social .section-content');
  if (!socialContent) return;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = 'social-message';
  msgDiv.style.borderRightColor = color;
  msgDiv.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
      <div style="width: 36px; height: 36px; border-radius: 50%; background: ${color}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
        ${username.charAt(0)}
      </div>
      <strong style="color: ${color};">${username}</strong>
    </div>
    <div style="margin-right: 46px; color: #ddd; line-height: 1.4;">${message}</div>
  `;
  socialContent.appendChild(msgDiv);
}

function sendSocialMessage() {
  const input = document.getElementById('social-input');
  const message = input.value.trim();

  if (!message) return;

  if (socket && socket.connected) {
    socket.emit('message', {
      username: currentUser,
      message: message,
      color: userColor,
    });
    input.value = '';
    input.focus();
  } else {
    showNotification('⚠️ لم نتمكن من الاتصال. جاري إعادة الاتصال...', 'warning');
    setTimeout(() => sendSocialMessage(), 2000);
  }
}

function showNotification(message, type = 'info') {
  const notif = document.createElement('div');
  notif.textContent = message;
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#4ecdc4' : '#ffa07a'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

function setTab(tabName) {
  document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));
  const target = document.getElementById(tabName);
  if (target) target.classList.add('active');
}

function installApp() {
  if (typeof deferredPrompt !== 'undefined' && deferredPrompt) {
    deferredPrompt.prompt();
  } else {
    showNotification('💾 يمكنك إضافة التطبيق من الإعدادات', 'info');
  }
}

// Listen to Backend Switch Events
window.addEventListener('backendSwitched', (event) => {
  console.log('🔄 Backend switched to:', event.detail.newUrl);
  BACKEND_URL = event.detail.newUrl;
  initSocket();
  showNotification('🔄 تم التبديل إلى خادم آخر', 'success');
});

// Initialize on load
window.addEventListener('DOMContentLoaded', async () => {
  // Wait for Config Engine to initialize
  await new Promise(resolve => {
    if (window.configEngine && window.configEngine.currentBackendUrl) {
      resolve();
    } else {
      const checkInterval = setInterval(() => {
        if (window.configEngine && window.configEngine.currentBackendUrl) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    }
  });

  BACKEND_URL = window.configEngine.getBackendUrl();
  console.log('✅ تم تحميل التطبيق', { BACKEND_URL });

  initSocket();
  
  // Setup event listeners
  const chatInput = document.getElementById('chat-input');
  const socialInput = document.getElementById('social-input');
  const sendBtn = document.getElementById('send-btn');
  const socialSendBtn = document.getElementById('social-send-btn');

  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        askAI(chatInput.value);
      }
    });
  }

  if (socialInput) {
    socialInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendSocialMessage();
      }
    });
  }

  if (sendBtn) sendBtn.addEventListener('click', () => askAI(chatInput?.value));
  if (socialSendBtn) socialSendBtn.addEventListener('click', sendSocialMessage);

  // Tab navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      if (tabName) setTab(tabName);
    });
  });

  console.log('✅ التطبيق جاهز!');
});

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Ensure all globals are set
window.addChatMessage = addChatMessage;
window.addMessageToSocial = addMessageToSocial;

// ===== ADVANCED FEATURES INTEGRATION =====

// Track AI interactions
const originalAskAI = askAI;
askAI = async function(prompt) {
  const startTime = Date.now();
  const result = await originalAskAI.call(this, prompt);
  const responseTime = Date.now() - startTime;
  
  // Track the interaction
  if (window.advancedFeatures) {
    const category = window.advancedFeatures.categorizeQuestion(prompt);
    window.advancedFeatures.trackInteraction(prompt, 'AI Response', category, responseTime);
    window.recommendationEngine?.showRecommendations(prompt);
  }
  
  return result;
};

// Show advanced features button
const headerContent = document.querySelector('.header-content');
if (headerContent) {
  const advBtn = document.createElement('button');
  advBtn.innerHTML = '📊';
  advBtn.style.cssText = 'background: rgba(0,212,255,0.2); border: 1px solid #00d4ff; color: #00d4ff; padding: 8px 12px; border-radius: 5px; cursor: pointer; margin: 0 5px;';
  advBtn.onclick = () => {
    const dashboard = document.getElementById('analytics-dashboard');
    if (dashboard) {
      dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
      window.analyticsDashboard?.update();
    }
  };
  advBtn.title = 'عرض لوحة البيانات';
  headerContent.appendChild(advBtn);
}

console.log('✅ Advanced Features integrated with AI Chat');

// ===== NEW SYSTEMS INITIALIZATION =====
if (window.usageAnalytics) {
  window.usageAnalytics.trackEvent('app_load', { version: '6.0' });
}

// Add settings menu button
const settingsBtn = document.createElement('button');
settingsBtn.innerHTML = '⚙️';
settingsBtn.style.cssText = 'background: rgba(0,212,255,0.2); border: 1px solid #00d4ff; color: #00d4ff; padding: 8px 12px; border-radius: 5px; cursor: pointer; margin: 0 5px;';
settingsBtn.title = 'الإعدادات';
settingsBtn.onclick = () => {
  window.showNotification('⚙️ الإعدادات: Ctrl+, لتبديل المظهر | Ctrl+Shift+E للتصدير');
};
const header = document.querySelector('.header-content');
if (header) header.appendChild(settingsBtn);

// Add backup indicator
const backupIndicator = document.createElement('span');
backupIndicator.innerHTML = '💾';
backupIndicator.style.cssText = 'cursor: pointer; margin: 0 10px; font-size: 16px;';
backupIndicator.title = 'النسخ الاحتياطية المتاحة';
backupIndicator.onclick = () => {
  const backups = window.autoBackupSystem?.listBackups();
  window.showNotification(`📊 النسخ الاحتياطية المتاحة: ${backups?.length || 0}`);
};
if (header) header.appendChild(backupIndicator);

console.log('✅ All new systems integrated');

// ==========================================
// Auto-initialize on page load
// ==========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeBackend);
} else {
  initializeBackend();
}

// Initialize when config engine is ready
window.addEventListener('load', async () => {
  if (!BACKEND_URL && window.configEngine) {
    BACKEND_URL = await window.configEngine.detectBackendUrl();
    console.log('✅ التطبيق جاهز!');
  }
});
