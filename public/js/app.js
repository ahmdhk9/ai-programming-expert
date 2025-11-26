function sendMessage() {
  const input = document.getElementById('input-chat');
  const msg = input.value.trim();
  
  if (!msg) return;

  const messages = document.getElementById('messages-chat');
  const welcomeBox = document.querySelector('.welcome-box');

  // Hide welcome box on first message
  if (welcomeBox && welcomeBox.style.display !== 'none') {
    welcomeBox.style.display = 'none';
  }

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'msg-user';
  userMsg.textContent = msg;
  messages.appendChild(userMsg);

  // AI response
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'msg-ai';
    aiMsg.innerHTML = `
      <span class="msg-icon">🤖</span>
      <div class="msg-content">تم استقبال طلبك: ${msg}</div>
    `;
    messages.appendChild(aiMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 500);

  input.value = '';
  messages.scrollTop = messages.scrollHeight;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input-chat');
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  input.focus();
});
