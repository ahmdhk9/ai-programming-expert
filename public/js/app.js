// الحد الأدنى من الكود للتطبيق
let socket = null;
let BACKEND_URL = 'http://localhost:8000';

// تهيئة بسيطة
window.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // تهيئة Socket.IO
  try {
    socket = io(BACKEND_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });
    
    socket.on('connect', () => {
      if (window.showNotification) {
        window.showNotification('✅ متصل', 'success');
      }
    });
  } catch(e) {
    console.error('Connection error');
  }
}

// دوال أساسية فقط
function askAI(prompt) {
  if (!prompt.trim()) return;
  
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const msg = document.createElement('div');
  msg.className = 'message user-message';
  msg.textContent = prompt;
  chatMessages.appendChild(msg);
}

function setTab(tabName) {
  document.querySelectorAll('.tab-pane').forEach(tab => {
    tab.classList.remove('active');
  });
  
  const tab = document.getElementById(tabName);
  if (tab) tab.classList.add('active');
  
  document.querySelectorAll('.bar-btn').forEach(btn => {
    btn.classList.remove('active');
  });
}

// Notification system بسيط
window.showNotification = function(msg, type) {
  const notif = document.createElement('div');
  notif.style.cssText = 'position:fixed;top:20px;right:20px;background:#00d4ff;color:#000;padding:10px 20px;border-radius:5px;z-index:9999;';
  notif.textContent = msg;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
};
