function switchTab(tabName) {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach((btn, idx) => {
    btn.classList.remove('active');
    if ((tabName === 'chat' && idx === 0) ||
        (tabName === 'design' && idx === 1) ||
        (tabName === 'tools' && idx === 2) ||
        (tabName === 'code' && idx === 3) ||
        (tabName === 'more' && idx === 4)) {
      btn.classList.add('active');
    }
  });
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
});

function sendMessage() {
  const input = document.getElementById('messageInput');
  const msg = input.value.trim();
  
  if (!msg) return;

  const container = document.querySelector('.messages-container');
  
  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'message-block';
  userMsg.innerHTML = `
    <div class="message-time">now</div>
    <div class="message-box" style="background: var(--primary); color: var(--bg); align-self: flex-end;">${msg}</div>
  `;
  container.appendChild(userMsg);

  // AI response
  const aiMsg = document.createElement('div');
  aiMsg.className = 'message-block ai-block';
  aiMsg.innerHTML = `
    <div class="message-time">1 second ago</div>
    <div class="message-box ai-message">تم استقبال طلبك: ${msg}</div>
  `;
  container.appendChild(aiMsg);

  input.value = '';
  container.scrollTop = container.scrollHeight;
}
