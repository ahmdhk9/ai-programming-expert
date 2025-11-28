// ==========================================
// 🧠 Self-Learning Engine
// يتعلم من التفاعلات ويحسّن الردود
// ==========================================

class LearningEngine {
  constructor() {
    this.interactions = [];
    this.patterns = {};
    this.quality_scores = {};
    this.learning_rate = 0.1;
    
    this.loadFromStorage();
    console.log('🧠 Learning Engine initialized');
  }

  // تسجيل تفاعل جديد
  recordInteraction(question, answer, rating = 0.7) {
    const interaction = {
      question,
      answer,
      rating,
      timestamp: Date.now(),
      length: question.length,
      category: this.detectCategory(question)
    };
    
    this.interactions.push(interaction);
    this.updatePatterns(interaction);
    this.updateQualityScore(interaction.category, rating);
    
    if (this.interactions.length % 10 === 0) {
      this.saveToStorage();
    }
    
    console.log(`📊 Learned from: "${question.substring(0, 30)}..."  (Rating: ${rating})`);
  }

  // اكتشاف فئة السؤال
  detectCategory(question) {
    const q = question.toLowerCase();
    
    if (q.includes('كيف') || q.includes('طريقة')) return 'how-to';
    if (q.includes('شنو') || q.includes('ما') || q.includes('إيش')) return 'what';
    if (q.includes('ليش') || q.includes('لماذا') || q.includes('سبب')) return 'why';
    if (q.includes('كود') || q.includes('برنامج') || q.includes('code')) return 'code';
    if (q.includes('مشكلة') || q.includes('خطأ') || q.includes('error')) return 'bug';
    if (q.includes('تصميم') || q.includes('ui') || q.includes('ux')) return 'design';
    
    return 'general';
  }

  // تحديث الأنماط المكتشفة
  updatePatterns(interaction) {
    const category = interaction.category;
    
    if (!this.patterns[category]) {
      this.patterns[category] = {
        count: 0,
        avg_length: 0,
        avg_rating: 0,
        keywords: {}
      };
    }
    
    const p = this.patterns[category];
    p.count++;
    p.avg_length = (p.avg_length + interaction.length) / 2;
    p.avg_rating = (p.avg_rating + interaction.rating) / 2;
    
    // استخراج كلمات مفتاحية
    const words = interaction.question.split(/\s+/).slice(0, 5);
    words.forEach(word => {
      if (word.length > 2) {
        p.keywords[word] = (p.keywords[word] || 0) + 1;
      }
    });
  }

  // تحديث درجة الجودة
  updateQualityScore(category, rating) {
    if (!this.quality_scores[category]) {
      this.quality_scores[category] = rating;
    } else {
      this.quality_scores[category] = 
        this.quality_scores[category] * (1 - this.learning_rate) + 
        rating * this.learning_rate;
    }
  }

  // الحصول على نصيحة adaptive للرد
  getAdaptiveHint(question) {
    const category = this.detectCategory(question);
    const pattern = this.patterns[category];
    
    if (!pattern || pattern.count < 3) {
      return null; // لم نتعلم كفاية بعد
    }
    
    return {
      category,
      confidence: Math.min(pattern.count / 10, 1),
      quality: this.quality_scores[category] || 0.7,
      suggestion: this.generateSuggestion(category, pattern)
    };
  }

  // توليد اقتراح تحسين
  generateSuggestion(category, pattern) {
    if (category === 'bug') {
      return '🔍 هذا سؤال عن خطأ برمجي. ركز على: الخطأ الدقيق + السياق + الحل المجرب';
    } else if (category === 'code') {
      return '💻 سؤال برمجي. أفضل رد: كود نظيف + شرح + مثال عملي';
    } else if (category === 'how-to') {
      return '📝 سؤال تعليمي. أفضل رد: خطوات واضحة + أمثلة + نصائح';
    }
    return null;
  }

  // حساب مستوى التحسن
  getImprovement() {
    if (this.interactions.length < 5) return 0;
    
    const recent = this.interactions.slice(-5);
    const older = this.interactions.slice(-10, -5);
    
    const recent_avg = recent.reduce((a, i) => a + i.rating, 0) / recent.length;
    const older_avg = older.reduce((a, i) => a + i.rating, 0) / older.length;
    
    return ((recent_avg - older_avg) / older_avg * 100).toFixed(1);
  }

  // حفظ البيانات
  saveToStorage() {
    try {
      localStorage.setItem('learning_data', JSON.stringify({
        interactions: this.interactions.slice(-100), // آخر 100
        patterns: this.patterns,
        quality_scores: this.quality_scores
      }));
      console.log('💾 Learning data saved');
    } catch (e) {
      console.warn('⚠️ Storage full, clearing old data...');
      localStorage.removeItem('learning_data');
    }
  }

  // تحميل البيانات
  loadFromStorage() {
    try {
      const data = localStorage.getItem('learning_data');
      if (data) {
        const parsed = JSON.parse(data);
        this.interactions = parsed.interactions || [];
        this.patterns = parsed.patterns || {};
        this.quality_scores = parsed.quality_scores || {};
        console.log(`✅ Loaded ${this.interactions.length} interactions`);
      }
    } catch (e) {
      console.warn('⚠️ Could not load learning data');
    }
  }

  // إحصائيات التعلم
  getStats() {
    return {
      total_interactions: this.interactions.length,
      categories: Object.keys(this.patterns),
      improvement: this.getImprovement(),
      avg_quality: Object.values(this.quality_scores).length > 0 ?
        (Object.values(this.quality_scores).reduce((a, b) => a + b) / Object.values(this.quality_scores).length).toFixed(2) : 0
    };
  }
}

// Global instance
window.learningEngine = new LearningEngine();
console.log('✅ Learning Engine ready');
