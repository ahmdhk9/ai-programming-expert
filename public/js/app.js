// Tab Switching
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.bottom-tab').forEach(t => t.classList.remove('active'));

  // Show selected tab
  const tabId = tabName + '-tab';
  const tab = document.getElementById(tabId);
  if (tab) {
    tab.classList.add('active');
  }

  // Mark buttons as active
  const navBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (navBtn) {
    navBtn.classList.add('active');
  }

  const bottomBtn = document.querySelector(`.bottom-tab[onclick="switchTab('${tabName}')"]`);
  if (bottomBtn) {
    bottomBtn.classList.add('active');
  }
}

// Send Message
function sendMessage() {
  const input = document.getElementById('messageInput');
  const msg = input.value.trim();
  
  if (!msg) return;

  const messagesDiv = document.querySelector('.chat-messages');
  
  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'msg-user';
  userMsg.textContent = msg;
  messagesDiv.appendChild(userMsg);

  // AI response
  const aiMsg = document.createElement('div');
  aiMsg.className = 'msg-ai';
  aiMsg.innerHTML = `<span>🤖</span><div>تم استقبال طلبك: ${msg}</div>`;
  messagesDiv.appendChild(aiMsg);

  input.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Use Tool
function useTool(toolName) {
  const messagesDiv = document.querySelector('.chat-messages');
  const aiMsg = document.createElement('div');
  aiMsg.className = 'msg-ai';
  aiMsg.innerHTML = `<span>🔧</span><div>تم استخدام أداة: ${toolName}</div>`;
  messagesDiv.appendChild(aiMsg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  switchTab('chat');
});
