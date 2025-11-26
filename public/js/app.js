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
  
  if (tabName === 'ai-chat-page') {
    setTimeout(() => {
      document.getElementById('chat-input-full').focus();
    }, 100);
  }
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

// AI Chat Knowledge Base with Real Responses
const aiKnowledgeBase = {
  'python': 'Python هي لغة برمجة قوية وسهلة التعلم! مثالية للبيانات الكبيرة والذكاء الصناعي والتطوير السريع. يمكنك استخدامها في تطوير الويب، تحليل البيانات، الأتمتة والمزيد! 🐍',
  'javascript': 'JavaScript هي لغة الويب الأساسية! تُستخدم في تطوير الواجهات الأمامية التفاعلية والخوادم بـ Node.js. مع HTML و CSS، تُنشئ تطبيقات ويب حديثة وديناميكية! ⚡',
  'react': 'React هي مكتبة جافاسكريبت لبناء واجهات المستخدم! تستخدم الـ Virtual DOM لتحديثات سريعة والمكونات لإعادة الاستخدام. مثالية لبناء تطبيقات ويب معقدة وقابلة للتوسع! ⚛️',
  'node': 'Node.js هو بيئة تشغيل JavaScript على الخادم! يسمح ببناء APIs وتطبيقات الويب الخلفية بـ JavaScript. مع npm، يمكنك الوصول لملايين الحزم المفتوحة المصدر! 🚀',
  'database': 'قواعد البيانات تخزن البيانات بكفاءة واسترجاعها بسرعة! هناك قواعد علائقية (SQL) مثل MySQL و PostgreSQL، وقواعد NoSQL مثل MongoDB. اختر حسب احتياجات تطبيقك! 🗄️',
  'html': 'HTML هي لغة لإنشاء صفحات الويب! تستخدم tags لتنظيم المحتوى. مع CSS تحصل على التصميم، ومع JavaScript تحصل على التفاعلية. أساس كل موقع ويب! 🌐',
  'css': 'CSS تُستخدم لتصميم وتنسيق صفحات الويب! تتحكم في الألوان والحجم والمواضع والرسوميات. مع Flexbox و Grid، تستطيع إنشاء تخطيطات مرنة واحترافية! 🎨',
  'api': 'API تسمح للتطبيقات بالتواصل مع بعضها! REST APIs تستخدم HTTP لنقل البيانات. صمم APIs جيدة تكون واضحة وآمنة وسهلة الاستخدام! 🔌',
  'git': 'Git هي أداة للتحكم بالإصدارات! تسمح بحفظ تاريخ التغييرات والعودة لأي نسخة سابقة. GitHub توفر مستودعات سحابية للتعاون بين المطورين! 📦',
  'default': 'سؤال جميل! 🤔 في البرمجة، التصميم الجيد والممارسات الأفضل مهمة جداً. تذكر: اكتب كود نظيف وقابل للصيانة، واستخدم التعليقات لتوضيح الفكرة. كل خبرة تجعلك أفضل! 💪'
};

function generateAIResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  const arabicMessage = userMessage;
  
  // Check for keywords in Arabic and English
  for (const [keyword, response] of Object.entries(aiKnowledgeBase)) {
    if (lowerMessage.includes(keyword) || arabicMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Check for common Arabic keywords
  if (arabicMessage.includes('برمجة') || arabicMessage.includes('كود')) {
    return 'البرمجة تحتاج لصبر وممارسة مستمرة! ابدأ بأساسيات اللغة، ثم تقدم تدريجياً. هناك الكثير من الموارد المجانية اونلاين لتعليم البرمجة! 📚';
  }
  
  if (arabicMessage.includes('مشروع') || arabicMessage.includes('تطبيق')) {
    return 'فكرة رائعة! ابدأ بتحديد متطلبات مشروعك، ثم اختر التقنيات المناسبة. استخدم أساليب Agile للتطوير السريع والتكيفي. لا تتردد في البحث والاستفسار! 🛠️';
  }
  
  if (arabicMessage.includes('خطأ') || arabicMessage.includes('مشكلة')) {
    return 'لا تقلق! الأخطاء جزء طبيعي من البرمجة! اقرأ رسالة الخطأ بعناية، استخدم Debugger، وابحث عن الحل اونلاين. Stack Overflow مليء بالحلول! 🔍';
  }
  
  if (arabicMessage.includes('تعلم') || arabicMessage.includes('أتعلم')) {
    return 'رائع أنك تريد التعلم! اختر لغة برمجة أولى (مثل Python أو JavaScript)، اتبع دورات معتمدة، مارس على مشاريع صغيرة. الممارسة أهم من النظرية! 🎓';
  }
  
  if (arabicMessage.includes('أداء') || arabicMessage.includes('تحسين')) {
    return 'تحسين الأداء مهم! استخدم Profiling لتحديد الاختناقات، قلل عدد الطلبات للخادم، استخدم Caching، وأضغط الملفات الثقيلة. كل ميلي ثانية مهمة! ⚡';
  }
  
  // Default response
  return aiKnowledgeBase['default'];
}

function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input-full');
  const message = input.value.trim();
  
  if (!message) return;
  
  const messagesDiv = document.getElementById('chat-messages-full');
  const loadingDiv = document.getElementById('chat-loading-full');
  
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
    // Call real Groq API via backend
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    
    loadingDiv.style.display = 'none';
    
    if (data.success) {
      const aiResponse = data.response;
      
      const aiMessageEl = document.createElement('div');
      aiMessageEl.className = 'message ai-message';
      aiMessageEl.innerHTML = `
        <span class="message-icon">🤖</span>
        <div class="message-content">${aiResponse}</div>
      `;
      messagesDiv.appendChild(aiMessageEl);
    } else {
      const errorEl = document.createElement('div');
      errorEl.className = 'message ai-message';
      errorEl.innerHTML = `
        <span class="message-icon">⚠️</span>
        <div class="message-content">عذراً، حدث خطأ: ${data.error}</div>
      `;
      messagesDiv.appendChild(errorEl);
    }
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (error) {
    loadingDiv.style.display = 'none';
    
    const errorEl = document.createElement('div');
    errorEl.className = 'message ai-message';
    errorEl.innerHTML = `
      <span class="message-icon">⚠️</span>
      <div class="message-content">خطأ في الاتصال: ${error.message}</div>
    `;
    messagesDiv.appendChild(errorEl);
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
      document.querySelectorAll('.bottom-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  console.log('✅ Platform initialized successfully');
  console.log('🤖 AI Programming Expert Platform v5.0');
  console.log('💬 AI Chat ready with real responses!');
});
