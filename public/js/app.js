function setTab(tabName) {
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.bottom-tab').forEach(t => t.classList.remove('active'));
  
  document.getElementById(tabName).classList.add('active');
  document.querySelectorAll('[onclick*="setTab"]').forEach(btn => {
    if (btn.onclick.toString().includes(`'${tabName}'`)) {
      btn.classList.add('active');
    }
  });
}

function selectFeature(el, featureType) {
  document.querySelectorAll('.feature-card').forEach(f => f.classList.remove('active'));
  el.classList.add('active');
  
  const details = {
    generate: {
      title: '💻 إنشاء الكود',
      content: 'أصف ما تريد، واحصل على كود احترافي جاهز للاستخدام بلغات متعددة:<br><ul><li>JavaScript / TypeScript</li><li>Python</li><li>Java</li><li>C++</li><li>PHP</li><li>Rust / Go</li></ul>'
    },
    fix: {
      title: '🔧 إصلاح الأخطاء',
      content: 'أرسل كودك، وسيتم:<br><ul><li>اكتشاف جميع الأخطاء</li><li>إصلاحها تلقائياً</li><li>تقديم اقتراحات للتحسين</li><li>شرح كل خطوة</li></ul>'
    },
    design: {
      title: '🎨 تصميم الواجهات',
      content: 'وصف واجهتك المطلوبة، واحصل على:<br><ul><li>HTML احترافي</li><li>CSS متقدم</li><li>تخطيط ريسبونسيف</li><li>مكونات جاهزة الاستخدام</li></ul>'
    },
    explain: {
      title: '📚 شرح المفاهيم',
      content: 'اسأل عن أي مفهوم برمجي واحصل على:<br><ul><li>شرح مفصل وسهل</li><li>أمثلة عملية</li><li>حالات الاستخدام</li><li>موارد تعليمية</li></ul>'
    },
    understand: {
      title: '🧠 فهم النية',
      content: 'النظام يفهم سياق طلبك:<br><ul><li>تحليل اللغة الطبيعية</li><li>التعرف على النية الحقيقية</li><li>دعم العربية والإنجليزية</li><li>توصيات ذكية</li></ul>'
    },
    deploy: {
      title: '🚀 النشر الذكي',
      content: 'نشر تطبيقك بسهولة:<br><ul><li>بضغطة واحدة فقط</li><li>اختبار تلقائي قبل النشر</li><li>رابط مباشر للتطبيق</li><li>مراقبة أداء التطبيق</li></ul>'
    }
  };
  
  const detail = details[featureType];
  const detailsDiv = document.getElementById('feature-details');
  if (detailsDiv && detail) {
    detailsDiv.innerHTML = `<div class="detail-card">
      <h3>${detail.title}</h3>
      <p>${detail.content}</p>
    </div>`;
  }
}

function selectTool(el) {
  document.querySelectorAll('.tool').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
}

// AI Chat Functions
function openAIChat() {
  document.getElementById('ai-modal').classList.add('active');
  document.getElementById('chat-input').focus();
}

function closeAIChat() {
  document.getElementById('ai-modal').classList.remove('active');
}

async function generateAIResponse(userMessage) {
  try {
    if (typeof pipeline !== 'undefined') {
      const classifier = await pipeline('zero-shot-classification');
      const result = await classifier(userMessage, [
        'برمجة Java',
        'برمجة Python', 
        'برمجة JavaScript',
        'ويب وتطوير',
        'قاعدة بيانات',
        'سؤال عام'
      ]);
      
      let response = '';
      const topCategory = result.labels[0];
      
      const responses = {
        'برمجة Java': 'Java هي لغة قوية للبرمجة الموجهة للكائنات! تُستخدم في تطوير التطبيقات الكبرى والأنظمة المؤسسية.',
        'برمجة Python': 'Python لغة سهلة وقوية! مثالية للبيانات الكبيرة والذكاء الصناعي والتطوير السريع.',
        'برمجة JavaScript': 'JavaScript هي لغة الويب! تُستخدم في تطوير الواجهات الأمامية والخوادم بـ Node.js.',
        'ويب وتطوير': 'تطوير الويب يجمع بين HTML و CSS و JavaScript لإنشاء مواقع تفاعلية جميلة!',
        'قاعدة بيانات': 'قواعد البيانات مهمة لتخزين البيانات بشكل آمن واسترجاعها بكفاءة. أشهرها MySQL و PostgreSQL.',
        'سؤال عام': `ممتاز! سؤالك هو: "${userMessage.substring(0, 50)}...". أنا هنا لمساعدتك في أي استفسار برمجي!`
      };
      
      response = responses[topCategory] || 'شكراً على سؤالك! هذا موضوع مثير للاهتمام في البرمجة.';
      return response;
    } else {
      throw new Error('AI not loaded');
    }
  } catch (error) {
    const responses = [
      'طلب رائع! هذا يتعلق بالبرمجة وتطوير الويب.',
      'سؤال ذكي جداً! الحل يعتمد على احتياجاتك المحددة.',
      'معك حق! هذه نقطة مهمة جداً في البرمجة.',
      'شرح ممتاز! دعني أساعدك بمزيد من التفاصيل عن هذا الموضوع.',
      'فكرة عبقرية! يمكننا تطبيقها بعدة طرق مختلفة.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

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
    const aiResponse = await generateAIResponse(message);
    loadingDiv.style.display = 'none';
    
    const aiMessageEl = document.createElement('div');
    aiMessageEl.className = 'message ai-message';
    aiMessageEl.innerHTML = `
      <span class="message-icon">🤖</span>
      <div class="message-content">${aiResponse}</div>
    `;
    messagesDiv.appendChild(aiMessageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (error) {
    loadingDiv.style.display = 'none';
    const errorMessageEl = document.createElement('div');
    errorMessageEl.className = 'message ai-message';
    errorMessageEl.innerHTML = `
      <span class="message-icon">⚠️</span>
      <div class="message-content">عذراً! حدث خطأ. جرب مجدداً.</div>
    `;
    messagesDiv.appendChild(errorMessageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const firstFeature = document.querySelector('.feature-card');
  if (firstFeature) {
    selectFeature(firstFeature, 'generate');
  }
  
  document.querySelectorAll('.bottom-tab').forEach((tab, index) => {
    tab.addEventListener('click', function() {
      if (!this.classList.contains('ai-center-btn')) {
        document.querySelectorAll('.bottom-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Close modal when clicking outside
  document.getElementById('ai-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeAIChat();
    }
  });
  
  console.log('✅ Platform initialized successfully');
  console.log('🤖 AI Programming Expert Platform v5.0');
  console.log('💬 AI Chat ready!');
});
