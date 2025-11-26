function setTab(tabName) {
  console.log('📄 فتح الصفحة:', tabName);
  
  // إخفاء جميع الصفحات
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.style.display = 'none';
    p.classList.remove('active');
  });
  
  // إزالة التفعيل من الأزرار
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.bottom-tab').forEach(t => t.classList.remove('active'));
  
  // فتح الصفحة المطلوبة
  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.style.display = 'block';
    targetTab.classList.add('active');
    console.log('✅ تم فتح الصفحة:', tabName);
  } else {
    console.error('❌ الصفحة غير موجودة:', tabName);
  }
  
  // تفعيل الزر المناسب
  document.querySelectorAll('[onclick*="setTab"]').forEach(btn => {
    if (btn.onclick.toString().includes(`'${tabName}'`)) {
      btn.classList.add('active');
    }
  });
  
  if (tabName === 'ai-chat-page') {
    setTimeout(() => {
      const input = document.getElementById('chat-input-full');
      if (input) input.focus();
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
    // Call real Groq API via backend - Optimized for speed
    const startTime = performance.now();
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    const responseTime = Math.round(performance.now() - startTime);
    
    loadingDiv.style.display = 'none';
    
    if (data.success) {
      const aiResponse = data.response;
      
      const aiMessageEl = document.createElement('div');
      aiMessageEl.className = 'message ai-message';
      aiMessageEl.innerHTML = `
        <span class="message-icon">🤖</span>
        <div class="message-content">${aiResponse}</div>
        <button class="speak-btn" onclick="speakText('${aiResponse.replace(/'/g, "\\'")}')">🔊 إعادة</button>
      `;
      messagesDiv.appendChild(aiMessageEl);
      
      // تشغيل الكلام تلقائياً - فوري
      speakText(aiResponse);
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

// Speech Recognition - Toggle Voice Chat (Press to listen, press again to respond)
let isCurrentlyListening = false;
let currentRecognition = null;
let voiceIsPlaying = false;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function startVoiceListening() {
  console.log('🎤 بدء محادثة صوتية...');
  
  // الانتقال لصفحة الاستماع الصوتي المخصصة
  setTab('voice-chat-page');
  
  // التأكد من فتح الصفحة
  setTimeout(() => {
    const voicePage = document.getElementById('voice-chat-page');
    if (voicePage && voicePage.style.display !== 'none') {
      console.log('✅ صفحة الصوت مفتوحة، جاهز للاستماع');
      toggleVoiceListening();
    } else {
      console.error('❌ صفحة الصوت لم تفتح - محاولة مرة أخرى');
      setTab('voice-chat-page');
      setTimeout(toggleVoiceListening, 500);
    }
  }, 300);
}

// Toggle Voice - Press 1st time to listen, 2nd time to respond, then listen again
function toggleVoiceListening() {
  const listenBtn = document.getElementById('voice-listen-btn');
  const listeningText = document.getElementById('listening-text');

  if (!listenBtn || !listeningText) {
    console.error('❌ العناصر المطلوبة غير موجودة');
    return;
  }

  // إذا كان يستمع حالياً - توقف الاستماع وابدأ الرد
  if (isCurrentlyListening) {
    console.log('🛑 إيقاف الاستماع...');
    if (currentRecognition) {
      currentRecognition.stop();
    }
    isCurrentlyListening = false;
    return;
  }

  // إذا كان يتحدث - انتظر حتى ينتهي ثم ابدأ الاستماع
  if (voiceIsPlaying) {
    console.log('⏳ انتظار انتهاء الكلام الصوتي...');
    listeningText.textContent = '⏳ انتظر قليلاً...';
    return;
  }

  // ابدأ الاستماع
  startListeningSession();
}

function startListeningSession() {
  console.log('🎤 بدء جلسة استماع جديدة...');
  
  if (!SpeechRecognition) {
    alert('التحدث الصوتي غير مدعوم في متصفحك');
    return;
  }

  const listenBtn = document.getElementById('voice-listen-btn');
  const listeningText = document.getElementById('listening-text');
  const voiceTranscript = document.getElementById('voice-transcript');
  const voiceChatLog = document.getElementById('voice-chat-log');

  if (!listenBtn || !listeningText || !voiceTranscript || !voiceChatLog) {
    console.error('❌ العناصر المطلوبة غير موجودة');
    return;
  }

  // وقف أي استماع سابق
  if (currentRecognition) {
    currentRecognition.stop();
  }

  isCurrentlyListening = true;
  listenBtn.classList.add('listening');
  listenBtn.textContent = '🛑 اضغط للإيقاف';
  listeningText.textContent = '🎤 استمع...';

  const recognition = new SpeechRecognition();
  currentRecognition = recognition;
  recognition.lang = 'ar-SA';
  recognition.continuous = false;
  recognition.interimResults = true;

  let finalTranscript = '';

  recognition.onstart = () => {
    console.log('✅ بدأ الاستماع الفعلي');
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript.trim();
      if (event.results[i].isFinal) {
        finalTranscript = transcript;
      } else {
        interimTranscript = transcript;
      }
    }
    
    voiceTranscript.innerHTML = `<p>${finalTranscript || interimTranscript}</p>`;
  };

  recognition.onerror = (event) => {
    console.error('❌ خطأ في الاستماع:', event.error);
    listeningText.textContent = `❌ خطأ: ${event.error}`;
  };

  recognition.onend = async () => {
    console.log('🎤 انتهى الاستماع - النص:', finalTranscript);
    
    isCurrentlyListening = false;
    listenBtn.classList.remove('listening');
    listenBtn.textContent = '🎤 اضغط للاستماع';
    
    if (finalTranscript.trim()) {
      // أضف رسالة المستخدم
      voiceChatLog.innerHTML += `<div class="voice-message user"><strong>أنت:</strong> ${finalTranscript}</div>`;
      
      // احصل على رد من الـ AI
      try {
        listeningText.textContent = '⏳ جاري الرد...';
        voiceTranscript.innerHTML = `<p style="color: var(--primary);">معالجة...</p>`;
        console.log('📡 إرسال السؤال للـ AI...');
        
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: finalTranscript })
        });
        
        if (!response.ok) throw new Error(`خطأ الخادم: ${response.status}`);
        
        const data = await response.json();
        console.log('✅ حصلنا على الرد من الـ AI:', data.response);
        
        if (data.success) {
          const aiResponse = data.response;
          voiceChatLog.innerHTML += `<div class="voice-message ai"><strong>الذكي:</strong> ${aiResponse}</div>`;
          voiceTranscript.innerHTML = `<p>${aiResponse}</p>`;
          listeningText.textContent = '🔊 رد صوتي...';
          console.log('🔊 بدء الرد الصوتي...');
          
          // رد صوتي - وبعد انتهاء الصوت، ابدأ الاستماع تلقائياً
          speakTextAndListen(aiResponse);
        } else {
          throw new Error(data.error || 'خطأ غير متوقع');
        }
      } catch (error) {
        console.error('❌ خطأ:', error);
        voiceChatLog.innerHTML += `<div class="voice-message ai" style="color: #ff4757;"><strong>⚠️ خطأ:</strong> ${error.message}</div>`;
        listeningText.textContent = '❌ خطأ - اضغط مجدداً';
      }
    } else {
      listeningText.textContent = '⚠️ لم أسمع - حاول مجدداً';
    }
  };

  recognition.start();
}

// Speak and then listen again automatically
function speakTextAndListen(text) {
  if (!('speechSynthesis' in window)) {
    console.error('❌ Text-to-Speech not supported');
    return;
  }

  window.speechSynthesis.cancel();
  const cleanText = text.replace(/[\`\*\_\[\]\(\)\#\@\>\<]/g, '').trim();
  if (!cleanText) return;

  voiceIsPlaying = true;
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ar-SA';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1;

  const assignVoice = () => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      setTimeout(() => {
        voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const arabicVoice = voices.find(v => v.lang.startsWith('ar-SA') || v.lang.startsWith('ar')) || voices[0];
          if (arabicVoice) utterance.voice = arabicVoice;
        }
      }, 200);
    } else {
      const arabicVoice = voices.find(v => v.lang.startsWith('ar-SA') || v.lang.startsWith('ar')) || voices[0];
      if (arabicVoice) utterance.voice = arabicVoice;
    }
  };

  utterance.onstart = () => {
    console.log('🔊 بدء التحدث');
    const listeningText = document.getElementById('listening-text');
    if (listeningText) listeningText.textContent = '🔊 جاري الكلام...';
  };

  utterance.onend = () => {
    console.log('✅ انتهى الكلام - بدء الاستماع مجدداً تلقائياً');
    voiceIsPlaying = false;
    
    const listeningText = document.getElementById('listening-text');
    if (listeningText) listeningText.textContent = '🎤 استمع...';
    
    // ابدأ الاستماع تلقائياً بعد الرد
    setTimeout(() => {
      startListeningSession();
    }, 500);
  };

  utterance.onerror = (e) => {
    console.error('❌ خطأ صوت:', e.error);
    voiceIsPlaying = false;
    const listeningText = document.getElementById('listening-text');
    if (listeningText) listeningText.textContent = '❌ خطأ صوت';
  };

  assignVoice();
  try {
    window.speechSynthesis.speak(utterance);
    console.log('📢 تم تشغيل الصوت');
  } catch (error) {
    console.error('❌ خطأ تشغيل:', error);
    voiceIsPlaying = false;
  }
}

function speakTextVoice(text) {
  if (!('speechSynthesis' in window)) {
    console.log('❌ Text-to-Speech not supported');
    const listeningText = document.getElementById('listening-text');
    if (listeningText) listeningText.textContent = '❌ السماعة غير مدعومة في متصفحك';
    return;
  }

  // إلغاء أي كلام سابق
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/[\`\*\_\[\]\(\)\#\@\>\<]/g, '').trim();
  if (!cleanText) return;

  // إنشاء utterance جديد
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ar-SA';
  utterance.rate = 1.0;  // سرعة عادية
  utterance.pitch = 1.0;  // نبرة عادية
  utterance.volume = 1;    // مستوى صوت كامل (100%)

  console.log('🔊 إعدادات الصوت:', { rate: utterance.rate, pitch: utterance.pitch, volume: utterance.volume });

  // تحديد الصوت - عملية حرجة
  const assignVoice = () => {
    let voices = window.speechSynthesis.getVoices();
    console.log('🎙️ عدد الأصوات المتاحة:', voices.length);
    
    if (voices.length === 0) {
      // محاولة إعادة التحميل
      setTimeout(() => {
        voices = window.speechSynthesis.getVoices();
        console.log('🎙️ إعادة التحميل - عدد الأصوات:', voices.length);
        if (voices.length > 0) {
          const arabicVoice = voices.find(v => v.lang.startsWith('ar-SA') || v.lang.startsWith('ar')) || voices[0];
          if (arabicVoice) {
            utterance.voice = arabicVoice;
            console.log('✅ تم اختيار الصوت:', arabicVoice.name, arabicVoice.lang);
          }
        }
      }, 200);
    } else {
      // اختيار الصوت العربي الأفضل
      const arabicVoice = voices.find(v => v.lang.startsWith('ar-SA') || v.lang.startsWith('ar')) || voices[0];
      if (arabicVoice) {
        utterance.voice = arabicVoice;
        console.log('✅ تم اختيار الصوت:', arabicVoice.name, arabicVoice.lang);
      }
    }
  };

  utterance.onstart = () => {
    console.log('🔊 بدء التحدث - الصوت يجب أن يكون واضحاً الآن');
    const listeningText = document.getElementById('listening-text');
    if (listeningText) listeningText.textContent = '🔊 جاري التحدث...';
  };

  utterance.onend = () => {
    console.log('✅ انتهى التحدث');
    const listeningText = document.getElementById('listening-text');
    if (listeningText) {
      listeningText.textContent = '✅ تم الرد - اضغط مجدداً للمتابعة';
    }
  };

  utterance.onerror = (e) => {
    console.error('❌ خطأ في الصوت:', e.error);
    const listeningText = document.getElementById('listening-text');
    if (listeningText) {
      listeningText.textContent = `❌ خطأ: ${e.error} - تأكد من عدم كتم الصوت`;
    }
  };

  // تحديد الصوت
  assignVoice();
  
  try {
    window.speechSynthesis.speak(utterance);
    console.log('📢 تم إرسال الكلام للنظام');
  } catch (error) {
    console.error('❌ استثناء في تشغيل الصوت:', error);
  }
}

function toggleVoiceInput() {
  if (!SpeechRecognition) {
    alert('التحدث الصوتي غير مدعوم في متصفحك');
    return;
  }

  const btn = document.getElementById('voice-btn');
  const input = document.getElementById('chat-input-full');
  const controlPanel = document.getElementById('voice-control-panel');
  
  if (isListening) {
    isListening = false;
    btn.classList.remove('listening');
    controlPanel.style.display = 'none';
    clearTimeout(silenceTimer);
    if (recognitionInstance) {
      recognitionInstance.abort();
    }
    return;
  }

  // عرض لوحة التحكم
  controlPanel.style.display = 'block';
  
  isListening = true;
  btn.classList.add('listening');
  btn.textContent = '🎤 اسمع...';
  input.value = '';

  recognitionInstance = new SpeechRecognition();
  recognitionInstance.lang = 'ar-SA';
  recognitionInstance.continuous = false;
  recognitionInstance.interimResults = true;
  recognitionInstance.maxAlternatives = 1;

  let finalTranscript = '';
  let lastSpeechTime = Date.now();
  let hasSpokenSomething = false;

  recognitionInstance.onstart = () => {
    btn.classList.add('listening');
    document.getElementById('audio-visualizer').classList.add('active');
    lastSpeechTime = Date.now();
  };

  recognitionInstance.onresult = (event) => {
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript.trim();
      
      if (event.results[i].isFinal) {
        if (transcript.length > 0) {
          finalTranscript = transcript;
          hasSpokenSomething = true;
          lastSpeechTime = Date.now();
          
          // عند سماع كلام نهائي - اوقف الاستماع بسرعة
          clearTimeout(silenceTimer);
          silenceTimer = setTimeout(() => {
            if (isListening) {
              recognitionInstance.stop();
            }
          }, 800); // انتظر 0.8 ثانية فقط للكلام النهائي
        }
      } else {
        if (transcript.length > 0) {
          interimTranscript = transcript;
          hasSpokenSomething = true;
        }
      }
    }
    
    // اعرض الكلام الوسيط أو النهائي
    input.value = finalTranscript || interimTranscript;
  };

  recognitionInstance.onend = () => {
    btn.classList.remove('listening');
    btn.textContent = '🎤';
    document.getElementById('audio-visualizer').classList.remove('active');
    isListening = false;
    controlPanel.style.display = 'none';
    clearTimeout(silenceTimer);
    
    // إرسال الرسالة تلقائياً إذا كان هناك كلام
    if (finalTranscript.trim() && hasSpokenSomething) {
      input.value = finalTranscript;
      setTimeout(() => sendChatMessage(), 200);
    }
  };

  recognitionInstance.onerror = (event) => {
    console.log('Speech recognition error:', event.error);
    btn.classList.remove('listening');
    btn.textContent = '🎤';
    document.getElementById('audio-visualizer').classList.remove('active');
    isListening = false;
    clearTimeout(silenceTimer);
  };

  recognitionInstance.onabort = () => {
    btn.classList.remove('listening');
    btn.textContent = '🎤';
    document.getElementById('audio-visualizer').classList.remove('active');
    isListening = false;
  };

  recognitionInstance.start();
  
  // Timeout عام - 15 ثانية كحد أقصى
  clearTimeout(silenceTimer);
  silenceTimer = setTimeout(() => {
    if (isListening && recognitionInstance) {
      recognitionInstance.stop();
    }
  }, 15000);
}

// 🎙️ Advanced Text-to-Speech - Web Speech API
let voiceSettings = {
  rate: 1.2,
  pitch: 0.9,
  volume: 1
};

let currentSpeech = null;

function updateVoiceSettings() {
  voiceSettings.rate = Math.min(parseFloat(document.getElementById('voice-rate')?.value || 1.2), 1.5);
  voiceSettings.pitch = parseFloat(document.getElementById('voice-pitch')?.value || 0.9);
  
  document.getElementById('rate-value').textContent = voiceSettings.rate + 'x';
  document.getElementById('pitch-value').textContent = voiceSettings.pitch.toFixed(2);
}

function speakText(text) {
  const btn = document.getElementById('voice-btn');
  const visualizer = document.getElementById('audio-visualizer');
  
  if (!('speechSynthesis' in window)) {
    console.log('❌ Text-to-Speech not supported');
    return;
  }

  // إيقاف أي كلام قديم
  window.speechSynthesis.cancel();

  // تنظيف النص - إزالة الرموز الزائدة
  const cleanText = text.replace(/[\`\*\_\[\]\(\)\#\@\>\<]/g, '').trim();

  if (!cleanText) return;

  // تحديث الواجهة
  btn?.classList.add('speaking');
  visualizer?.classList.add('active');

  // إنشاء utterance جديد
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ar-SA';
  utterance.rate = 1.0;  // سرعة عادية
  utterance.pitch = 1.0;  // نبرة عادية
  utterance.volume = 1;    // مستوى صوت 100%

  // اختيار صوت عربي - مع تأخير لتحميل الأصوات
  const selectVoice = () => {
    let voices = window.speechSynthesis.getVoices();
    console.log('📊 عدد الأصوات:', voices.length);
    
    if (voices.length === 0) {
      // إذا لم تحمل الأصوات، جرب مرة أخرى
      setTimeout(() => {
        voices = window.speechSynthesis.getVoices();
        applyVoice(voices);
      }, 200);
    } else {
      applyVoice(voices);
    }
  };

  const applyVoice = (voices) => {
    const arabicVoice = voices.find(v => 
      v.lang.startsWith('ar-SA') || 
      v.lang.startsWith('ar-AE') || 
      v.lang.startsWith('ar')
    ) || voices.find(v => v.lang.startsWith('ar')) || voices[0];
    
    if (arabicVoice) {
      utterance.voice = arabicVoice;
      console.log('✅ صوت مختار:', arabicVoice.name, '- اللغة:', arabicVoice.lang);
    }
  };

  utterance.onstart = () => {
    btn?.classList.add('speaking');
    visualizer?.classList.add('active');
    console.log('🔊 التحدث بدأ - تأكد من عدم كتم الصوت!');
  };

  utterance.onend = () => {
    btn?.classList.remove('speaking');
    visualizer?.classList.remove('active');
    console.log('✅ انتهى التحدث');
  };

  utterance.onerror = (e) => {
    console.error('❌ خطأ في الصوت:', e.error);
    btn?.classList.remove('speaking');
    visualizer?.classList.remove('active');
  };

  // تحديد الصوت قبل التحدث
  selectVoice();
  
  currentSpeech = utterance;
  try {
    window.speechSynthesis.speak(utterance);
    console.log('📢 تم إرسال الكلام للنظام');
  } catch (error) {
    console.error('❌ خطأ في تشغيل الصوت:', error);
  }
}

// 📱 PWA Installation Handler - Advanced
let deferredPrompt;
const installBtn = document.getElementById('install-btn');
let isAppInstalled = false;

// Check if app is already installed
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove('hidden');
  console.log('✅ PWA install prompt ready');
});

window.addEventListener('appinstalled', () => {
  console.log('✅ App installed successfully!');
  isAppInstalled = true;
  installBtn.classList.add('hidden');
  deferredPrompt = null;
});

// Check if PWA is running as installed app
if (window.matchMedia('(display-mode: standalone)').matches) {
  isAppInstalled = true;
  installBtn.classList.add('hidden');
  console.log('✅ App is running as installed PWA');
}

function installApp() {
  if (deferredPrompt) {
    // Native install prompt - no messages
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User accepted PWA installation');
      }
      deferredPrompt = null;
      installBtn.classList.add('hidden');
    });
  } else {
    // Fallback for browsers without native prompt
    console.log('⬇️ تنصيب التطبيق: نسخ الرابط وفتحه في متصفح محدث');
  }
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    console.log('✅ Service Worker registered successfully');
  }).catch((err) => {
    console.log('⚠️ Service Worker registration failed:', err);
  });
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
  
  // Show install button if not already installed
  if (!isAppInstalled) {
    // Always show the button for manual installation
    setTimeout(() => {
      if (!deferredPrompt) {
        installBtn.classList.remove('hidden');
      }
    }, 2000);
  } else {
    installBtn.classList.add('hidden');
  }
  
  console.log('✅ Platform initialized successfully');
  console.log('🤖 AI Programming Expert Platform v5.0');
  console.log('💬 AI Chat ready with real responses!');
  console.log('🎤 Voice input enabled!');
  console.log('🔊 Text-to-Speech ready!');
  console.log('📱 PWA ready for installation!');
  console.log('⬇️ زر التنصيب متاح - يمكنك تثبيت التطبيق على جهازك!');
});
