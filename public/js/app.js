function navigateTo(section) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item, idx) => {
    item.classList.remove('active');
    if ((section === 'apps' && idx === 0) ||
        (section === 'create' && idx === 1) ||
        (section === 'account' && idx === 2)) {
      item.classList.add('active');
    }
  });
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const msg = input.value.trim();
  
  if (!msg) return;

  const messagesArea = document.getElementById('messagesArea');
  
  // If welcome section is visible, remove it
  const welcomeSection = document.querySelector('.welcome-section');
  if (welcomeSection) {
    welcomeSection.style.display = 'none';
  }

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'msg-user';
  userMsg.textContent = msg;
  messagesArea.appendChild(userMsg);

  // Simulate AI response
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'msg-ai';
    aiMsg.innerHTML = `
      <span class="msg-icon">🤖</span>
      <div class="msg-content">تم استقبال طلبك: ${msg}</div>
    `;
    messagesArea.appendChild(aiMsg);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }, 500);

  input.value = '';
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('messageInput');
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Focus on input
  input.focus();
});
