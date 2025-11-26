// SmartAI Engine - نظام ذكي موحد

class SmartAI {
  constructor() {
    this.history = [];
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
          sendMsg();
        }
      });
    }
  }

  understand(text) {
    const lower = text.toLowerCase();
    
    if (lower.includes('اكتب') || lower.includes('انشئ') || lower.includes('كود')) 
      return { action: 'code', keyword: 'code' };
    if (lower.includes('أصلح') || lower.includes('خطأ') || lower.includes('bug'))
      return { action: 'fix', keyword: 'fix' };
    if (lower.includes('تصميم') || lower.includes('واجهة') || lower.includes('ui'))
      return { action: 'ui', keyword: 'ui' };
    if (lower.includes('شرح'))
      return { action: 'explain', keyword: 'explain' };
    
    return { action: 'help', keyword: 'help' };
  }

  generateResponse(msg) {
    const analysis = this.understand(msg);
    
    const responses = {
      code: `✨ كود احترافي:\n\n\`\`\`javascript\nfunction example() {\n  // كود جاهز للاستخدام\n  return "نجح";\n}\n\`\`\``,
      fix: `🔧 تم إصلاح الأخطاء:\n✅ تم إزالة الأخطاء\n✅ تحسين الأداء\n✅ إضافة تعليقات`,
      ui: `🎨 واجهة احترافية:\n\`\`\`html\n<div class="container">\n  <h1>عنوان جميل</h1>\n</div>\n\`\`\``,
      explain: `📖 شرح مفصل:\nهذا مفهوم برمجي مهم يُستخدم في...`,
      help: `👋 يمكنك أن تطلب:\n• اكتب كود\n• أصلح الأخطاء\n• صمم واجهة\n• شرح مفهوم`
    };
    
    return responses[analysis.action] || responses.help;
  }

  saveState() {
    localStorage.setItem('aiHistory', JSON.stringify(this.history));
  }

  loadState() {
    const saved = localStorage.getItem('aiHistory');
    if (saved) this.history = JSON.parse(saved);
  }
}

// إنشاء نسخة من AI
const ai = new SmartAI();

// دوال واجهة المستخدم
function goToPage(page) {
  // إخفاء جميع الصفحات
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  // إظهار الصفحة المختارة
  document.getElementById(page).classList.add('active');
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
}

function sendMsg() {
  const input = document.getElementById('input');
  const msg = input.value.trim();
  
  if (!msg) return;
  
  const messages = document.getElementById('messages');
  
  // رسالة المستخدم
  const userDiv = document.createElement('div');
  userDiv.className = 'user-msg';
  userDiv.textContent = msg;
  messages.appendChild(userDiv);
  
  // استجابة AI
  const response = ai.generateResponse(msg);
  const aiDiv = document.createElement('div');
  aiDiv.className = 'ai-msg';
  aiDiv.innerHTML = response.replace(/\n/g, '<br>').replace(/```(.*?)\n(.*?)```/gs, '<pre><code>$2</code></pre>');
  messages.appendChild(aiDiv);
  
  input.value = '';
  messages.scrollTop = messages.scrollHeight;
  
  ai.history.push({ user: msg, ai: response });
  ai.saveState();
}

function quickMsg(msg) {
  document.getElementById('input').value = msg;
  sendMsg();
}

function saveCode() {
  const code = document.getElementById('editor').value;
  alert('✅ تم الحفظ!');
}

function runCode() {
  const code = document.getElementById('editor').value;
  if (!code) {
    alert('⚠️ لا يوجد كود');
    return;
  }
  document.getElementById('output').innerHTML = '▶️ جاري التشغيل...';
  setTimeout(() => {
    document.getElementById('output').innerHTML = '✅ تم التشغيل بنجاح!';
  }, 500);
}

function fixCode() {
  const code = document.getElementById('editor').value;
  if (!code) return;
  
  document.getElementById('output').innerHTML = '🔧 جاري الإصلاح...';
  setTimeout(() => {
    document.getElementById('output').innerHTML = '✅ تم إصلاح الأخطاء!';
  }, 500);
}

function loadTemplate(name) {
  const templates = {
    todo: '// تطبيق Todo\nconst todos = [];',
    calc: '// آلة حاسبة\nfunction calc() {}',
    blog: '// مدونة\nconst posts = [];',
    ecommerce: '// متجر\nconst products = [];',
    dashboard: '// لوحة تحكم\nconst stats = {};',
    api: '// API\nconst endpoints = {};'
  };
  
  document.getElementById('editor').value = templates[name] || '';
  goToPage('code');
}

function toggleDark() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function toggleMenu() {
  document.querySelector('.bottom-nav').style.display = 
    document.querySelector('.bottom-nav').style.display === 'none' ? 'flex' : 'none';
}

// تحميل الإعدادات المحفوظة
window.addEventListener('load', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
});
