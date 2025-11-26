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
  
  // Update feature details based on selection
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set default feature
  const firstFeature = document.querySelector('.feature-card');
  if (firstFeature) {
    selectFeature(firstFeature, 'generate');
  }
  
  // Initialize bottom tabs click handlers
  document.querySelectorAll('.bottom-tab').forEach((tab, index) => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.bottom-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  console.log('✅ Platform initialized successfully');
  console.log('🤖 AI Programming Expert Platform v5.0');
});
