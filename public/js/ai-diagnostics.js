// ==========================================
// 🤖 AI Diagnostics Engine
// نظام تحليل ذكي شامل لمشاكل التطبيق
// ==========================================

class AIDiagnosticsEngine {
  constructor() {
    this.diagnosis = null;
    this.problemAnalysis = [];
    this.recommendations = [];
    this.severity = 'none';
    this.initialized = false;
    
    this.init();
  }

  init() {
    this.waitForMonitor();
  }

  // انتظر المراقب
  waitForMonitor() {
    if (window.advancedMonitor) {
      this.initialized = true;
      console.log('🤖 AI Diagnostics Engine ready');
      this.startDiagnostics();
    } else {
      setTimeout(() => this.waitForMonitor(), 500);
    }
  }

  // ==================== التشخيص الشامل ====================
  startDiagnostics() {
    setInterval(() => {
      this.performComprehensiveDiagnosis();
    }, 5000); // كل 5 ثواني
  }

  performComprehensiveDiagnosis() {
    if (!window.advancedMonitor) return;

    const report = window.advancedMonitor.getFullReport();
    
    this.problemAnalysis = [];
    this.recommendations = [];

    // تحليل كل مشكلة
    this.analyzeAllIssues(report.issues);
    
    // تحليل المقاييس
    this.analyzeMetrics(report.metrics);
    
    // تحليل الصحة العامة
    this.analyzeHealthPattern(report);

    this.diagnosis = {
      timestamp: Date.now(),
      issues: this.problemAnalysis,
      recommendations: this.recommendations,
      severity: this.calculateOverallSeverity(),
      summary: this.generateSummary()
    };

    // حفظ التشخيص
    this.saveDiagnosis();
  }

  // ==================== تحليل جميع المشاكل ====================
  analyzeAllIssues(issues) {
    const grouped = this.groupIssuesByCategory(issues);

    Object.entries(grouped).forEach(([category, items]) => {
      this.analyzeCategory(category, items);
    });
  }

  groupIssuesByCategory(issues) {
    const grouped = {};
    issues.forEach(issue => {
      if (!grouped[issue.category]) {
        grouped[issue.category] = [];
      }
      grouped[issue.category].push(issue);
    });
    return grouped;
  }

  analyzeCategory(category, issues) {
    switch (category) {
      case 'performance':
        this.analyzePerfIssues(issues);
        break;
      case 'memory':
        this.analyzeMemoryIssues(issues);
        break;
      case 'network':
        this.analyzeNetworkIssues(issues);
        break;
      case 'socket':
        this.analyzeSocketIssues(issues);
        break;
      case 'backend':
        this.analyzeBackendIssues(issues);
        break;
      case 'dom':
        this.analyzeDOMIssues(issues);
        break;
      case 'storage':
        this.analyzeStorageIssues(issues);
        break;
      case 'dependencies':
        this.analyzeDependencyIssues(issues);
        break;
      case 'config':
        this.analyzeConfigIssues(issues);
        break;
      case 'data':
        this.analyzeDataIssues(issues);
        break;
    }
  }

  // ==================== تحليل الأداء ====================
  analyzePerfIssues(issues) {
    const count = issues.length;
    
    if (count === 0) {
      this.problemAnalysis.push({
        category: 'performance',
        severity: 'good',
        summary: '✅ الأداء ممتازة',
        details: 'التطبيق يعمل بسرعة جيدة'
      });
      return;
    }

    const hasHighIssues = issues.some(i => i.severity === 'high');
    const avgCount = issues.reduce((a, b) => a + b.count, 0) / count;

    if (hasHighIssues) {
      this.problemAnalysis.push({
        category: 'performance',
        severity: 'critical',
        summary: '🔴 مشاكل أداء حرجة',
        details: [
          `• عدد المشاكل: ${count}`,
          `• التكرار المتوسط: ${Math.round(avgCount)}`,
          '• التأثير: يؤثر على تجربة المستخدم بشكل كبير',
          '• الحل: قلل حجم الـ assets، استخدم lazy loading'
        ].join('\n')
      });
      
      this.recommendations.push({
        type: 'performance',
        priority: 'critical',
        title: 'تحسين الأداء الحرجة',
        actions: [
          '1. قلل حجم الصور والـ CSS/JS',
          '2. فعّل Gzip compression',
          '3. استخدم CDN للـ assets',
          '4. قلل عدد الـ requests'
        ]
      });
    } else {
      this.problemAnalysis.push({
        category: 'performance',
        severity: 'medium',
        summary: '🟡 أداء متوسطة',
        details: `${count} مشكلة متوسطة في الأداء`
      });
    }
  }

  // ==================== تحليل الذاكرة ====================
  analyzeMemoryIssues(issues) {
    const critical = issues.filter(i => i.severity === 'critical').length;
    const high = issues.filter(i => i.severity === 'high').length;

    if (critical > 0) {
      this.problemAnalysis.push({
        category: 'memory',
        severity: 'critical',
        summary: '🔴 تسرب ذاكرة خطير',
        details: [
          `• مشاكل حرجة: ${critical}`,
          '• احتمال memory leak في الـ listeners أو timers',
          '• يسبب تعطل التطبيق مع الوقت',
          '• التأثير: تدهور الأداء المستمر'
        ].join('\n')
      });

      this.recommendations.push({
        type: 'memory',
        priority: 'critical',
        title: 'إصلاح تسرب الذاكرة',
        actions: [
          '1. ابحث عن setInterval/setTimeout غير منتهي',
          '2. أزل event listeners عند حذف العناصر',
          '3. مسح المتغيرات الكبيرة عند انتهاؤها',
          '4. استخدم WeakMap للـ cached data'
        ]
      });
    } else if (high > 0) {
      this.problemAnalysis.push({
        category: 'memory',
        severity: 'high',
        summary: '🟠 استهلاك ذاكرة عالي',
        details: `${high} مشاكل في استهلاك الذاكرة`
      });
    }
  }

  // ==================== تحليل الشبكة ====================
  analyzeNetworkIssues(issues) {
    const hasConnection = issues.some(i => i.message.includes('Connection'));
    const hasTimeout = issues.some(i => i.message.includes('Timeout'));
    const slowResources = issues.filter(i => i.message.includes('Slow')).length;

    if (hasConnection) {
      this.problemAnalysis.push({
        category: 'network',
        severity: 'critical',
        summary: '🔴 مشكلة اتصال شبكة',
        details: [
          '• لا يمكن الوصول للـ backend بشكل مستقر',
          '• قد تكون مشكلة في الخادم أو الشبكة',
          '• التأثير: عدم القدرة على استخدام الـ AI والـ API'
        ].join('\n')
      });

      this.recommendations.push({
        type: 'network',
        priority: 'critical',
        title: 'إصلاح مشكلة الاتصال',
        actions: [
          '1. تحقق من حالة الخادم',
          '2. تأكد من الـ Backend URL صحيح',
          '3. تحقق من اتصال الإنترنت',
          '4. أعد تحميل الصفحة'
        ]
      });
    }

    if (slowResources > 0) {
      this.problemAnalysis.push({
        category: 'network',
        severity: 'high',
        summary: '🟠 موارد بطيئة',
        details: `${slowResources} موارد تحميل بطيء جداً`
      });
    }
  }

  // ==================== تحليل Socket.IO ====================
  analyzeSocketIssues(issues) {
    const disconnected = issues.some(i => i.message.includes('غير متصل'));
    const errors = issues.filter(i => i.severity === 'critical').length;

    if (disconnected || errors > 0) {
      this.problemAnalysis.push({
        category: 'socket',
        severity: 'critical',
        summary: '🔴 Socket.IO منقطع',
        details: [
          '• الدردشة الحية غير عاملة',
          '• التحديثات الفورية معطلة',
          '• قد تكون مشكلة في الخادم أو التكوين'
        ].join('\n')
      });

      this.recommendations.push({
        type: 'socket',
        priority: 'critical',
        title: 'إصلاح اتصال Socket.IO',
        actions: [
          '1. تأكد من تشغيل الخادم',
          '2. تحقق من CORS settings',
          '3. أعد تشغيل الخادم',
          '4. تحقق من console logs في الخادم'
        ]
      });
    }
  }

  // ==================== تحليل Backend ====================
  analyzeBackendIssues(issues) {
    const unreachable = issues.some(i => i.message.includes('غير متاح'));
    const errors = issues.filter(i => i.severity === 'critical').length;

    if (unreachable || errors > 0) {
      this.problemAnalysis.push({
        category: 'backend',
        severity: 'critical',
        summary: '🔴 الخادم معطل',
        details: [
          '• لا يمكن الوصول للخادم',
          '• جميع API calls ستفشل',
          '• التطبيق لن يعمل بدون Backend'
        ].join('\n')
      });

      this.recommendations.push({
        type: 'backend',
        priority: 'critical',
        title: 'إصلاح الخادم',
        actions: [
          '1. تحقق من حالة الخادم على Fly.io',
          '2. تأكد من وجود قوة معالجة كافية',
          '3. تحقق من ملفات السجل في الخادم',
          '4. أعد تشغيل الخادم إذا لزم الحال'
        ]
      });
    }
  }

  // ==================== تحليل DOM ====================
  analyzeDOMIssues(issues) {
    const missing = issues.filter(i => i.message.includes('Missing')).length;

    if (missing > 0) {
      this.problemAnalysis.push({
        category: 'dom',
        severity: 'high',
        summary: '🟠 عناصر DOM مفقودة',
        details: `${missing} عنصر DOM مفقود - قد يسبب أخطاء في الوظائف`
      });

      this.recommendations.push({
        type: 'dom',
        priority: 'high',
        title: 'إصلاح عناصر DOM',
        actions: [
          '1. تأكد من تحميل جميع الـ HTML',
          '2. تحقق من console للأخطاء',
          '3. أعد تحميل الصفحة'
        ]
      });
    }
  }

  // ==================== تحليل LocalStorage ====================
  analyzeStorageIssues(issues) {
    const corrupted = issues.some(i => i.message.includes('Corrupted'));
    const large = issues.some(i => i.message.includes('كبير'));

    if (corrupted) {
      this.problemAnalysis.push({
        category: 'storage',
        severity: 'high',
        summary: '🟠 بيانات LocalStorage تالفة',
        details: 'بعض بيانات التطبيق تالفة - قد تفقد البيانات المحفوظة'
      });

      this.recommendations.push({
        type: 'storage',
        priority: 'high',
        title: 'إصلاح البيانات التالفة',
        actions: [
          '1. امسح LocalStorage المعطوب',
          '2. أعد تحميل الصفحة',
          '3. تحقق من التطبيق بعد التحديث'
        ]
      });
    }

    if (large) {
      this.problemAnalysis.push({
        category: 'storage',
        severity: 'medium',
        summary: '🟡 LocalStorage كبير جداً',
        details: 'حجم البيانات المحفوظة كبير - قد يبطء الأداء'
      });
    }
  }

  // ==================== تحليل التبعيات ====================
  analyzeDependencyIssues(issues) {
    const missing = issues.filter(i => i.message.includes('Missing')).length;

    if (missing > 0) {
      this.problemAnalysis.push({
        category: 'dependencies',
        severity: 'high',
        summary: '🟠 مكتبات مفقودة',
        details: `${missing} مكتبة أساسية لم تحمّل - قد تسبب أخطاء`
      });

      this.recommendations.push({
        type: 'dependencies',
        priority: 'high',
        title: 'تحميل المكتبات المفقودة',
        actions: [
          '1. تحقق من ملف index.html',
          '2. تأكد من تحميل جميع الـ scripts',
          '3. افحص console للأخطاء'
        ]
      });
    }
  }

  // ==================== تحليل التكوين ====================
  analyzeConfigIssues(issues) {
    if (issues.length > 0) {
      this.problemAnalysis.push({
        category: 'config',
        severity: 'high',
        summary: '🟠 خطأ في التكوين',
        details: 'بعض إعدادات التطبيق غير صحيحة'
      });

      this.recommendations.push({
        type: 'config',
        priority: 'high',
        title: 'تصحيح التكوين',
        actions: [
          '1. تحقق من البيئة والإعدادات',
          '2. تأكد من وجود المتغيرات البيئية',
          '3. تحقق من console للأخطاء'
        ]
      });
    }
  }

  // ==================== تحليل البيانات ====================
  analyzeDataIssues(issues) {
    const corrupted = issues.some(i => i.message.includes('Corrupted'));
    
    if (corrupted) {
      this.problemAnalysis.push({
        category: 'data',
        severity: 'critical',
        summary: '🔴 تكامل البيانات متضرر',
        details: 'بعض البيانات الأساسية تالفة - قد يسبب فقدان البيانات'
      });
    }
  }

  // ==================== تحليل المقاييس ====================
  analyzeMetrics(metrics) {
    // تحليل الأداء
    if (metrics.performance?.pageLoadTime > 5000) {
      this.recommendations.push({
        type: 'optimization',
        priority: 'high',
        title: 'تحسين سرعة التحميل',
        actions: [
          '1. استخدم asset minification',
          '2. فعّل code splitting',
          '3. استخدم image optimization'
        ]
      });
    }

    // تحليل الذاكرة
    if (metrics.memory?.percentage > 80) {
      this.recommendations.push({
        type: 'optimization',
        priority: 'high',
        title: 'تقليل استهلاك الذاكرة',
        actions: [
          '1. ابحث عن memory leaks',
          '2. أزل listeners غير المستخدمة',
          '3. استخدم object pooling'
        ]
      });
    }
  }

  // ==================== تحليل نمط الصحة ====================
  analyzeHealthPattern(report) {
    const health = report.health.score;
    
    if (health < 50) {
      this.problemAnalysis.push({
        category: 'overall',
        severity: 'critical',
        summary: '🔴 صحة التطبيق سيئة جداً',
        details: [
          `• درجة الصحة: ${health}/100`,
          '• هناك مشاكل حرجة متعددة',
          '• التطبيق قد لا يعمل بشكل صحيح',
          '• يحتاج تدخل فوري'
        ].join('\n')
      });

      this.recommendations.push({
        type: 'critical',
        priority: 'critical',
        title: '🚨 تدخل عاجل مطلوب',
        actions: [
          '1. افحص جميع الأخطاء الحرجة أعلاه',
          '2. أصلح الـ Backend أولاً',
          '3. ثم أصلح الأخطاء الأخرى بالترتيب',
          '4. اختبر كل جزء بعد الإصلاح'
        ]
      });
    } else if (health < 70) {
      this.problemAnalysis.push({
        category: 'overall',
        severity: 'high',
        summary: '🟠 صحة التطبيق متوسطة',
        details: `درجة الصحة: ${health}/100 - هناك مشاكل تحتاج حل`
      });
    } else if (health < 85) {
      this.problemAnalysis.push({
        category: 'overall',
        severity: 'medium',
        summary: '🟡 صحة التطبيق جيدة',
        details: `درجة الصحة: ${health}/100 - يعمل بشكل معقول`
      });
    } else {
      this.problemAnalysis.push({
        category: 'overall',
        severity: 'good',
        summary: '🟢 صحة التطبيق ممتازة',
        details: `درجة الصحة: ${health}/100 - التطبيق يعمل بشكل ممتاز!`
      });
    }
  }

  // ==================== حساب الخطورة العامة ====================
  calculateOverallSeverity() {
    if (this.problemAnalysis.some(p => p.severity === 'critical')) {
      return 'critical';
    }
    if (this.problemAnalysis.some(p => p.severity === 'high')) {
      return 'high';
    }
    if (this.problemAnalysis.some(p => p.severity === 'medium')) {
      return 'medium';
    }
    return 'good';
  }

  // ==================== تنويض التقرير ====================
  generateSummary() {
    const criticalCount = this.problemAnalysis.filter(p => p.severity === 'critical').length;
    const highCount = this.problemAnalysis.filter(p => p.severity === 'high').length;
    const mediumCount = this.problemAnalysis.filter(p => p.severity === 'medium').length;

    let summary = `التشخيص: ${criticalCount} حرجة، ${highCount} عالية، ${mediumCount} متوسطة\n\n`;

    if (criticalCount > 0) {
      summary += '🚨 هناك مشاكل حرجة تحتاج إصلاح فوري!\n';
    } else if (highCount > 0) {
      summary += '⚠️ هناك مشاكل مهمة بحاجة للحل\n';
    } else if (mediumCount > 0) {
      summary += '💡 بعض التحسينات الموصى بها متاحة\n';
    } else {
      summary += '✅ التطبيق يعمل بشكل ممتاز!\n';
    }

    return summary;
  }

  // ==================== حفظ التشخيص ====================
  saveDiagnosis() {
    localStorage.setItem('ai_diagnosis', JSON.stringify(this.diagnosis));
  }

  // ==================== الحصول على التشخيص ====================
  getDiagnosis() {
    return this.diagnosis;
  }

  // ==================== الحصول على تقرير شامل ====================
  getComprehensiveReport() {
    return {
      timestamp: this.diagnosis?.timestamp,
      problems: this.diagnosis?.issues || [],
      recommendations: this.diagnosis?.recommendations || [],
      severity: this.diagnosis?.severity,
      summary: this.diagnosis?.summary,
      totalIssues: this.problemAnalysis.length,
      criticalIssues: this.problemAnalysis.filter(p => p.severity === 'critical').length,
      highIssues: this.problemAnalysis.filter(p => p.severity === 'high').length,
      mediumIssues: this.problemAnalysis.filter(p => p.severity === 'medium').length,
      fullAnalysis: this.problemAnalysis
    };
  }
}

// Initialize
window.aiDiagnostics = new AIDiagnosticsEngine();
console.log('🤖 AI Diagnostics Engine loaded');
