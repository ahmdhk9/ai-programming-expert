// Advanced AI Engine with Smart Features

class AdvancedAI {
  constructor() {
    this.history = [];
    this.currentStage = 'dev';
    this.tools = {};
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadState();
  }

  setupEventListeners() {
    const input = document.getElementById('input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }
  }

  analyzeRequest(text) {
    const lower = text.toLowerCase();
    
    if (lower.includes('اكتب') || lower.includes('انشئ') || lower.includes('كود'))
      return { action: 'generate', icon: '💻' };
    if (lower.includes('أصلح') || lower.includes('خطأ') || lower.includes('bug'))
      return { action: 'fix', icon: '🔧' };
    if (lower.includes('تصميم') || lower.includes('واجهة'))
      return { action: 'design', icon: '🎨' };
    if (lower.includes('شرح') || lower.includes('كيف'))
      return { action: 'explain', icon: '📖' };
    
    return { action: 'help', icon: '💡' };
  }

  generateResponse(msg) {
    const analysis = this.analyzeRequest(msg);
    
    const responses = {
      generate: `${analysis.icon} تم توليد الكود:\n\nfunction solution() {\n  return "جاهز!";\n}`,
      fix: `${analysis.icon} تم إصلاح الأخطاء:\n✅ إزالة أخطاء\n✅ تحسين الأداء\n✅ إضافة تعليقات`,
      design: `${analysis.icon} تم تصميم الواجهة:\n<div class="ui">\n  <h1>تصميم احترافي</h1>\n</div>`,
      explain: `${analysis.icon} شرح مفصل:\nهذا مفهوم برمجي مهم...`,
      help: `${analysis.icon} كيف يمكنني مساعدتك؟\n• توليد الكود\n• إصلاح الأخطاء\n• تصميم الواجهات`
    };
    
    return responses[analysis.action];
  }

  saveState() {
    localStorage.setItem('aiState', JSON.stringify({
      history: this.history,
      currentStage: this.currentStage
    }));
  }

  loadState() {
    const saved = localStorage.getItem('aiState');
    if (saved) {
      const state = JSON.parse(saved);
      this.history = state.history;
      this.currentStage = state.currentStage;
    }
  }
}

const ai = new AdvancedAI();

// دوال التحكم
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

function switchTab(tabId) {
  const content = document.getElementById(tabId);
  if (!content) return;
  
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  
  content.classList.add('active');
  
  document.querySelector(`[onclick="switchTab('${tabId}')"]`)?.classList.add('active');
  document.querySelector(`.nav-item[onclick="switchTab('${tabId}')"]`)?.classList.add('active');
}

function sendMessage() {
  const input = document.getElementById('input');
  const msg = input.value.trim();
  
  if (!msg) return;
  
  const messages = document.getElementById('messages');
  
  // رسالة المستخدم
  const userDiv = document.createElement('div');
  userDiv.style.cssText = 'align-self: flex-end; background: #7c3aed; color: white; padding: 12px; border-radius: 8px; max-width: 80%;';
  userDiv.textContent = msg;
  messages.appendChild(userDiv);
  
  // استجابة AI
  const response = ai.generateResponse(msg);
  const aiDiv = document.createElement('div');
  aiDiv.className = 'ai-msg';
  aiDiv.innerHTML = `<span class="avatar">🤖</span><p>${response.replace(/\n/g, '<br>')}</p>`;
  messages.appendChild(aiDiv);
  
  input.value = '';
  messages.scrollTop = messages.scrollHeight;
  
  ai.history.push({ user: msg, ai: response });
  ai.saveState();
}

function goToStage(stage) {
  document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
  event.target.closest('.stage')?.classList.add('active');
  ai.currentStage = stage;
  ai.saveState();
}

function useTool(toolId) {
  const messages = document.getElementById('messages');
  const aiDiv = document.createElement('div');
  aiDiv.className = 'ai-msg';
  aiDiv.innerHTML = `<span class="avatar">🔧</span><p>تم استخدام أداة: ${toolId}\nجاري المعالجة...</p>`;
  messages.appendChild(aiDiv);
  messages.scrollTop = messages.scrollHeight;
}

function goToPage(page) {
  switchTab(page);
}

// تحميل الحالة عند الفتح
window.addEventListener('load', () => {
  const input = document.getElementById('input');
  if (input) input.focus();
});
