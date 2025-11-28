// ==========================================
// 🚀 Self-Improvement Orchestrator
// يركب كل الأنظمة معاً
// ==========================================

class SelfImprovementSystem {
  constructor() {
    this.stats = {
      learning_sessions: 0,
      improvements_made: 0,
      avg_response_quality: 0.7
    };
    
    this.initializeSystems();
    console.log('🚀 Self-Improvement System ready');
  }

  initializeSystems() {
    // تأكد من تحميل جميع الأنظمة
    if (!window.learningEngine) {
      console.error('❌ Learning Engine not loaded');
      return;
    }
    
    // تحديث ملف المستخدم
    if (window.learningEngine.interactions.length > 5) {
      window.adaptiveResponses.analyzeUserStyle(
        window.learningEngine.interactions
      );
    }
  }

  // سجل تفاعل جديد
  recordNewInteraction(question, answer) {
    if (!window.learningEngine) return;
    
    // نسخة مبسطة من التقييم (يمكن للمستخدم تقييمها لاحقاً)
    let rating = 0.7; // افتراضي
    
    // تقييم تلقائي بناءً على الطول والوضوح
    if (answer.length > 100) rating += 0.1;
    if (answer.includes('مثال') || answer.includes('كود')) rating += 0.1;
    if (answer.includes('✅') || answer.includes('❌')) rating += 0.05;
    
    rating = Math.min(rating, 1);
    
    window.learningEngine.recordInteraction(question, answer, rating);
    this.stats.learning_sessions++;
    
    // تطبيق التحسينات التكيفية
    if (window.learningEngine.interactions.length % 5 === 0) {
      this.applyImprovements();
    }
  }

  // تطبيق التحسينات التلقائية
  applyImprovements() {
    const interactions = window.learningEngine.interactions;
    
    if (interactions.length < 5) return;
    
    // 1. تحديث ملف المستخدم
    window.adaptiveResponses.analyzeUserStyle(interactions);
    window.adaptiveResponses.saveUserProfile();
    
    // 2. كتشاف الأنماط
    const time_patterns = window.patternDetector.detectTimePatterns(interactions);
    const question_patterns = window.patternDetector.detectQuestionPatterns(interactions);
    const performance_trends = window.patternDetector.detectPerformanceTrends(interactions);
    
    console.log('📊 Patterns detected:', {
      time: time_patterns,
      questions: question_patterns?.length,
      performance: performance_trends
    });
    
    this.stats.improvements_made++;
    
    // 3. اقتراح تحسينات
    this.suggestImprovements(interactions, time_patterns);
  }

  // اقتراح تحسينات للنظام
  suggestImprovements(interactions, patterns) {
    const suggestions = [];
    
    if (patterns?.activity_frequency < 1) {
      suggestions.push('💡 المستخدم نشط جداً - هل تحتاج لواجهة أسرع؟');
    }
    
    if (window.learningEngine.getImprovement() > 10) {
      suggestions.push('🎉 تحسن كبير في جودة الردود!');
    }
    
    if (window.learningEngine.interactions.length > 50) {
      suggestions.push('📚 لديك الكثير من البيانات التعليمية - سيؤدي لردود أفضل');
    }
    
    if (suggestions.length > 0) {
      console.log('✨ Suggestions:', suggestions);
    }
  }

  // احصل على حالة النظام
  getSystemStatus() {
    const learningStats = window.learningEngine.getStats();
    
    return {
      ...this.stats,
      learning: learningStats,
      user_style: window.adaptiveResponses.user_style,
      preferred_format: window.adaptiveResponses.preferred_format,
      system_health: this.calculateSystemHealth()
    };
  }

  // حساب صحة النظام
  calculateSystemHealth() {
    const score = 
      (window.learningEngine.interactions.length / 100 * 25) +
      (window.learningEngine.getStats().avg_quality * 25) +
      (this.stats.improvements_made / 10 * 25) +
      25; // Base score
    
    return Math.min(score, 100).toFixed(1);
  }

  // عرض تقرير التطور
  generateProgressReport() {
    const stats = this.getSystemStatus();
    
    return `
╔════════════════════════════════════════╗
║  🚀 تقرير التطور الذاتي              ║
╠════════════════════════════════════════╣
│ عدد التفاعلات: ${stats.learning.total_interactions}
│ متوسط الجودة: ${stats.learning.avg_quality}
│ التحسّن: ${stats.learning.improvement}%
│ صحة النظام: ${stats.system_health}%
│ أسلوب المستخدم: ${stats.user_style}
│ التنسيق المفضل: ${stats.preferred_format}
╚════════════════════════════════════════╝
    `;
  }

  // تفعيل وضع التعلم السريع
  enableFastLearning() {
    window.learningEngine.learning_rate = 0.3; // أسرع
    console.log('⚡ Fast Learning Mode enabled');
  }

  // تفعيل وضع التعلم العميق
  enableDeepLearning() {
    window.learningEngine.learning_rate = 0.05; // أبطأ لكن أعمق
    console.log('🧠 Deep Learning Mode enabled');
  }
}

// Global instance
window.selfImprovementSystem = new SelfImprovementSystem();
console.log('✅ Self-Improvement System ready');

// Auto-save periodically
setInterval(() => {
  if (window.learningEngine) {
    window.learningEngine.saveToStorage();
  }
  if (window.adaptiveResponses) {
    window.adaptiveResponses.saveUserProfile();
  }
}, 60000); // كل دقيقة

// اعرض التقرير كل 30 تفاعل
let interaction_count = 0;
const originalRecord = window.selfImprovementSystem?.recordNewInteraction;
if (originalRecord) {
  window.selfImprovementSystem.recordNewInteraction = function(...args) {
    originalRecord.apply(this, args);
    interaction_count++;
    if (interaction_count % 30 === 0) {
      console.log(this.generateProgressReport());
    }
  };
}
