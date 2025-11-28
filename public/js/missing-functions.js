// ==========================================
// Missing Social & UI Functions
// ==========================================

// Social Chat Function (using Pro System)
function sendSocialMessage() {
  if (window.socialChatPro) {
    window.socialChatPro.sendMessage();
  }
}

// Social Functions
function findRandomUser() {
  const searchStatus = document.getElementById('search-status');
  const searchContent = document.getElementById('social-search');
  const loadingContent = document.getElementById('social-loading');
  
  if (window.socket && window.socket.connected) {
    searchStatus.textContent = 'جاري البحث...';
    searchContent.style.display = 'none';
    loadingContent.style.display = 'flex';
    
    // Emit search request to backend
    window.socket.emit('search_for_partner', {});
    
    if (window.socialChatPro) {
      window.socialChatPro.logEvent('SEARCH_STARTED', {});
    }
  } else {
    showNotification('⚠️ لم يتم الاتصال بالخادم', 'warning');
  }
}

function cancelSearch() {
  if (window.socket && window.socket.connected) {
    window.socket.emit('cancel_search', {});
  }
  
  document.getElementById('social-search').style.display = 'flex';
  document.getElementById('social-loading').style.display = 'none';
  document.getElementById('social-chat').style.display = 'none';
  document.getElementById('search-status').textContent = 'تم الإلغاء';
}

function endConnection() {
  if (window.socket && window.socket.connected && window.socialChatPro?.currentSession) {
    window.socket.emit('end-call', { sessionId: window.socialChatPro.currentSession.sessionId });
  }
  
  if (window.socialChatPro) {
    window.socialChatPro.endChatSession('user-ended');
  }
}

function toggleUserProfile() {
  const panel = document.getElementById('profile-panel');
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }
}

function toggleEmojiPanel() {
  const panel = document.getElementById('emoji-panel');
  if (!panel) return;
  
  if (panel.style.display === 'none') {
    generateEmojiPanel();
    panel.style.display = 'grid';
  } else {
    panel.style.display = 'none';
  }
}

function generateEmojiPanel() {
  const grid = document.getElementById('emoji-grid');
  if (!grid || grid.children.length > 0) return;
  
  const emojis = ['😀', '😂', '😍', '🤔', '😎', '🥳', '😢', '😡', '🤝', '👍', '❤️', '🔥', '✨', '💯', '🚀', '🎉'];
  emojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.onclick = () => sendQuickReaction(emoji);
    grid.appendChild(btn);
  });
}

function emitTyping() {
  if (window.socket && window.socket.connected) {
    window.socket.emit('typing', { typing: true });
  }
}

function toggleTemplates() {
  const panel = document.getElementById('templates-panel');
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }
}

function toggleSocialVoiceChat() {
  showNotification('🎤 ميزة البث الصوتي قيد التطوير', 'info');
}

function toggleSavedMessages() {
  const panel = document.getElementById('saved-panel');
  if (panel) {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }
}

function sendQuickReaction(emoji) {
  if (window.socket && window.socket.connected) {
    window.socket.emit('message', {
      username: currentUser || 'مستخدم',
      message: emoji,
      color: userColor || '#4ECDC4'
    });
  }
}

function toggleSearchMessages() {
  const bar = document.getElementById('search-bar');
  if (bar) {
    bar.style.display = bar.style.display === 'none' ? 'block' : 'none';
  }
}

function searchMessages(query) {
  const messages = document.querySelectorAll('.social-message');
  const results = document.getElementById('search-results');
  if (!results) return;
  
  results.innerHTML = '';
  
  if (!query.trim()) return;
  
  const lower = query.toLowerCase();
  messages.forEach(msg => {
    if (msg.textContent.toLowerCase().includes(lower)) {
      const result = document.createElement('div');
      result.style.cssText = 'padding: 8px; background: rgba(0, 212, 255, 0.1); margin: 4px 0; border-radius: 4px; cursor: pointer;';
      result.textContent = msg.textContent.substring(0, 50) + '...';
      result.onclick = () => msg.scrollIntoView({ behavior: 'smooth' });
      results.appendChild(result);
    }
  });
}

function sendTemplate(text) {
  const input = document.getElementById('social-input');
  input.value = text;
  sendSocialMessage();
  document.getElementById('templates-panel').style.display = 'none';
}

function addCustomTemplate() {
  const template = prompt('أدخل رسالة سريعة جديدة:');
  if (template) {
    showNotification('✅ تم حفظ الرسالة السريعة', 'success');
  }
}

function handleSocialKeypress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendSocialMessage();
  }
}

// Socket.IO Events Setup
window.addEventListener('DOMContentLoaded', () => {
  if (window.socket) {
    window.socket.on('match_found', (data) => {
      document.getElementById('social-loading').style.display = 'none';
      document.getElementById('social-chat').style.display = 'flex';
      document.getElementById('active-user-name').textContent = data.username || 'مستخدم';
      document.getElementById('partner-avatar').textContent = (data.username || 'U').charAt(0);
      document.getElementById('profile-name').textContent = data.username || 'مستخدم';
      showNotification('✅ تم العثور على شخص!', 'success');
    });

    window.socket.on('match_disconnected', () => {
      showNotification('❌ انقطع الاتصال بالشخص الآخر', 'warning');
      document.getElementById('social-chat').style.display = 'none';
      document.getElementById('social-search').style.display = 'flex';
    });

    window.socket.on('typing', () => {
      const typingArea = document.getElementById('typing-area');
      if (typingArea) {
        typingArea.style.display = 'flex';
        setTimeout(() => {
          typingArea.style.display = 'none';
        }, 3000);
      }
    });
  }
});
