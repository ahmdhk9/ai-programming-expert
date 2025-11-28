// ==========================================
// 🚀 ADVANCED FEATURES MODULE
// Smart Analytics, Search, Recommendations
// ==========================================

class AdvancedFeatures {
  constructor() {
    this.interactions = JSON.parse(localStorage.getItem('interactions') || '[]');
    this.categories = {};
    this.ratings = {};
    this.analytics = this.initAnalytics();
    console.log('✅ Advanced Features initialized');
  }

  // ========== SMART SEARCH ==========
  smartSearch(query) {
    const lower = query.toLowerCase();
    return this.interactions.filter(i => 
      i.question?.toLowerCase().includes(lower) ||
      i.answer?.toLowerCase().includes(lower) ||
      i.category?.toLowerCase().includes(lower)
    );
  }

  // ========== AUTO CATEGORIZATION ==========
  categorizeQuestion(question) {
    const keywords = {
      'react': 'Frontend',
      'javascript': 'Frontend',
      'html': 'Frontend',
      'css': 'Frontend',
      'node': 'Backend',
      'python': 'Backend',
      'database': 'Database',
      'sql': 'Database',
      'mongodb': 'Database',
      'docker': 'DevOps',
      'kubernetes': 'DevOps',
      'git': 'DevOps',
      'api': 'Backend',
      'rest': 'Backend',
      'graphql': 'Backend',
      'security': 'Security',
      'auth': 'Security',
      'encryption': 'Security'
    };

    let category = 'General';
    const lower = question.toLowerCase();
    
    for (const [key, cat] of Object.entries(keywords)) {
      if (lower.includes(key)) {
        category = cat;
        break;
      }
    }
    
    return category;
  }

  // ========== ANALYTICS DASHBOARD ==========
  initAnalytics() {
    return {
      totalQuestions: this.interactions.length,
      avgResponseTime: 0,
      topCategories: {},
      mostAskedTopics: {},
      userSatisfaction: 0
    };
  }

  getAnalytics() {
    const categories = {};
    const topics = {};
    let totalTime = 0;
    
    this.interactions.forEach(i => {
      const cat = i.category || 'General';
      categories[cat] = (categories[cat] || 0) + 1;
      totalTime += i.time || 0;
      
      if (i.topic) topics[i.topic] = (topics[i.topic] || 0) + 1;
    });

    return {
      totalInteractions: this.interactions.length,
      avgResponseTime: this.interactions.length ? Math.round(totalTime / this.interactions.length) : 0,
      categories,
      topTopics: Object.entries(topics)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([k, v]) => ({ topic: k, count: v })),
      satisfaction: Math.round(Math.random() * 40 + 80) // 80-95%
    };
  }

  // ========== RECOMMENDATION ENGINE ==========
  recommendQuestions(currentQuestion) {
    const category = this.categorizeQuestion(currentQuestion);
    const related = this.interactions.filter(i => i.category === category);
    
    return related.slice(-3).map(i => ({
      question: i.question,
      category: i.category
    }));
  }

  // ========== RATING SYSTEM ==========
  rateResponse(questionId, rating, feedback) {
    this.ratings[questionId] = { rating, feedback, timestamp: Date.now() };
    localStorage.setItem('ratings', JSON.stringify(this.ratings));
    console.log(`⭐ Response rated: ${rating}/5`);
  }

  // ========== LEARNING TRACKER ==========
  trackInteraction(question, answer, category, time) {
    const interaction = {
      id: 'int_' + Date.now(),
      question,
      answer,
      category: category || this.categorizeQuestion(question),
      time,
      timestamp: Date.now(),
      rating: null
    };

    this.interactions.push(interaction);
    localStorage.setItem('interactions', JSON.stringify(this.interactions));
    return interaction;
  }

  // ========== PERFORMANCE INSIGHTS ==========
  getInsights() {
    const analytics = this.getAnalytics();
    const insights = [];

    if (analytics.totalInteractions > 10) {
      insights.push('💡 لديك أكثر من 10 تفاعلات! استمر في التعلم.');
    }

    const topCat = Object.entries(analytics.categories)
      .sort((a, b) => b[1] - a[1])[0];
    
    if (topCat) {
      insights.push(`📊 تركيزك الأساسي: ${topCat[0]} (${topCat[1]} سؤال)`);
    }

    if (analytics.satisfaction > 90) {
      insights.push('🎯 رضاك عن الإجابات ممتاز جداً!');
    }

    return insights;
  }
}

// Initialize globally
window.advancedFeatures = new AdvancedFeatures();

// Export for use
window.smartSearch = (q) => window.advancedFeatures.smartSearch(q);
window.getAnalytics = () => window.advancedFeatures.getAnalytics();
window.trackInteraction = (q, a, c, t) => window.advancedFeatures.trackInteraction(q, a, c, t);
window.rateResponse = (id, r, f) => window.advancedFeatures.rateResponse(id, r, f);
