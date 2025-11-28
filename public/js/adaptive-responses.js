// ==========================================
// 🎯 Adaptive Response System
// يعدّل الردود بناءً على تاريخ المستخدم
// ==========================================

class AdaptiveResponses {
  constructor() {
    this.user_style = 'formal'; // formal, casual, technical
    this.preferred_format = 'mixed'; // text, code, examples, mixed
    this.complexity_level = 'medium'; // simple, medium, advanced
    
    this.loadUserProfile();
    console.log('🎯 Adaptive Response System initialized');
  }

  // تحليل أسلوب المستخدم
  analyzeUserStyle(interactions) {
    if (!interactions || interactions.length < 5) return;
    
    const recent = interactions.slice(-10);
    let casual = 0, formal = 0, technical = 0;
    let prefers_code = 0, prefers_text = 0, prefers_examples = 0;
    
    recent.forEach(i => {
      const q = i.question.toLowerCase();
      
      // تحليل الأسلوب
      if (q.includes('شنو') || q.includes('يا') || q.includes('😂')) casual++;
      if (q.includes('هل') || q.includes('يرجى') || q.includes('متى')) formal++;
      if (q.includes('api') || q.includes('algorithm') || q.includes('protocol')) technical++;
      
      // تحليل التفضيلات
      if (q.includes('كود') || q.includes('code')) prefers_code++;
      if (q.includes('شرح') || q.includes('اشرح')) prefers_text++;
      if (q.includes('مثال') || q.includes('example')) prefers_examples++;
    });
    
    // تحديد الأسلوب الغالب
    if (technical > formal && technical > casual) {
      this.user_style = 'technical';
      this.complexity_level = 'advanced';
    } else if (casual > formal) {
      this.user_style = 'casual';
    } else {
      this.user_style = 'formal';
    }
    
    // تحديد التنسيق المفضل
    if (prefers_code > prefers_text && prefers_code > prefers_examples) {
      this.preferred_format = 'code';
    } else if (prefers_examples > prefers_text) {
      this.preferred_format = 'examples';
    } else if (prefers_text > 0) {
      this.preferred_format = 'text';
    }
    
    console.log(`👤 User profile: ${this.user_style}, ${this.preferred_format}, ${this.complexity_level}`);
  }

  // تكييف الرد حسب أسلوب المستخدم
  adaptResponse(original_response) {
    let adapted = original_response;
    
    // تعديل حسب الأسلوب
    if (this.user_style === 'casual') {
      adapted = adapted.replace(/يرجى/g, 'من فضلك');
      adapted = adapted.replace(/^على سبيل المثال/g, 'مثلاً');
    } else if (this.user_style === 'technical') {
      adapted = adapted.replace(/مشكلة/g, 'issue');
      adapted = adapted.replace(/حل/g, 'solution');
    }
    
    // إضافة أمثلة إذا كان المستخدم يفضلها
    if (this.preferred_format === 'examples' && !adapted.includes('مثال')) {
      adapted += '\n\n💡 مثال عملي: يمكنك تطبيق هذا على مشاريعك الحالية';
    }
    
    // تقليل التعقيد إذا كان المستخدم مبتدئاً
    if (this.complexity_level === 'simple') {
      adapted = adapted.replace(/algorithm/g, 'طريقة');
      adapted = adapted.replace(/method/g, 'دالة');
    }
    
    return adapted;
  }

  // اقتراح تحسينات للرد
  suggestImprovement(response, user_question) {
    const suggestions = [];
    
    // فحص الطول
    if (response.length < 50) {
      suggestions.push('الرد قصير جداً - أضف المزيد من التفاصيل');
    }
    
    // فحص الوضوح
    if (!response.includes('؟') && !response.includes('!')) {
      suggestions.push('الرد قد لا يكون واضحاً - أضف أسئلة توضيحية');
    }
    
    // فحص الأمثلة
    if (user_question.includes('مثال') && !response.includes('مثال')) {
      suggestions.push('المستخدم طلب مثال - أضف كود أو مثال عملي');
    }
    
    return suggestions;
  }

  // حفظ ملف المستخدم
  saveUserProfile() {
    try {
      localStorage.setItem('user_profile', JSON.stringify({
        user_style: this.user_style,
        preferred_format: this.preferred_format,
        complexity_level: this.complexity_level
      }));
    } catch (e) {
      console.warn('⚠️ Could not save user profile');
    }
  }

  // تحميل ملف المستخدم
  loadUserProfile() {
    try {
      const profile = localStorage.getItem('user_profile');
      if (profile) {
        const data = JSON.parse(profile);
        this.user_style = data.user_style || 'formal';
        this.preferred_format = data.preferred_format || 'mixed';
        this.complexity_level = data.complexity_level || 'medium';
      }
    } catch (e) {
      console.warn('⚠️ Could not load user profile');
    }
  }

  // احصل على توقعات الردود
  predictNextTopic(interactions) {
    if (!interactions || interactions.length < 3) return null;
    
    const recent_categories = interactions
      .slice(-5)
      .map(i => window.learningEngine.detectCategory(i.question));
    
    const category_counts = {};
    recent_categories.forEach(cat => {
      category_counts[cat] = (category_counts[cat] || 0) + 1;
    });
    
    const most_common = Object.keys(category_counts)
      .reduce((a, b) => category_counts[a] > category_counts[b] ? a : b);
    
    return most_common;
  }
}

// Global instance
window.adaptiveResponses = new AdaptiveResponses();
console.log('✅ Adaptive Responses ready');
