// ==========================================
// 🔍 Pattern Detector
// يكتشف الأنماط في تفاعلات المستخدم
// ==========================================

class PatternDetector {
  constructor() {
    this.patterns = [];
    this.anomalies = [];
    this.trends = {};
    
    console.log('🔍 Pattern Detector initialized');
  }

  // كتشاف الأنماط الزمنية
  detectTimePatterns(interactions) {
    if (!interactions || interactions.length < 5) return null;
    
    const times = interactions.map(i => new Date(i.timestamp).getHours());
    const most_common_hour = this.getMostCommon(times);
    
    const days_of_week = interactions.map(i => new Date(i.timestamp).getDay());
    const most_active_day = this.getMostCommon(days_of_week);
    
    return {
      peak_hour: most_common_hour,
      most_active_day,
      activity_frequency: interactions.length / 
        ((new Date() - new Date(interactions[0].timestamp)) / (1000 * 60 * 60 * 24))
    };
  }

  // كتشاف أنماط الأسئلة
  detectQuestionPatterns(interactions) {
    if (!interactions || interactions.length < 5) return null;
    
    const patterns = {};
    
    interactions.forEach(i => {
      const q = i.question.toLowerCase();
      
      // نمط الطول
      const length_range = Math.floor(q.length / 10) * 10;
      patterns[`length_${length_range}`] = (patterns[`length_${length_range}`] || 0) + 1;
      
      // نمط الكلمات
      const words = q.split(/\s+/);
      words.forEach(word => {
        if (word.length > 3) {
          patterns[word] = (patterns[word] || 0) + 1;
        }
      });
    });
    
    // ترتيب الأنماط بالتكرار
    return Object.entries(patterns)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([pattern, count]) => ({ pattern, frequency: count }));
  }

  // كتشاف الشذوذات
  detectAnomalies(interactions) {
    if (!interactions || interactions.length < 10) return [];
    
    const anomalies = [];
    const ratings = interactions.map(i => i.rating);
    const avg_rating = ratings.reduce((a, b) => a + b) / ratings.length;
    const std_dev = Math.sqrt(
      ratings.reduce((a, r) => a + Math.pow(r - avg_rating, 2), 0) / ratings.length
    );
    
    interactions.forEach(i => {
      if (Math.abs(i.rating - avg_rating) > 2 * std_dev) {
        anomalies.push({
          question: i.question.substring(0, 50),
          rating: i.rating,
          deviation: ((i.rating - avg_rating) / std_dev).toFixed(2)
        });
      }
    });
    
    return anomalies;
  }

  // التنبؤ بنوع السؤال التالي
  predictNextQuestionType(interactions) {
    if (!interactions || interactions.length < 5) return null;
    
    const categories = interactions.map(i => 
      window.learningEngine.detectCategory(i.question)
    );
    
    const recent_categories = categories.slice(-5);
    const category_transitions = {};
    
    for (let i = 0; i < recent_categories.length - 1; i++) {
      const current = recent_categories[i];
      const next = recent_categories[i + 1];
      const key = `${current}_to_${next}`;
      category_transitions[key] = (category_transitions[key] || 0) + 1;
    }
    
    if (Object.keys(category_transitions).length === 0) return null;
    
    const most_likely = Object.entries(category_transitions)
      .sort((a, b) => b[1] - a[1])[0][0];
    
    return most_likely.split('_to_')[1];
  }

  // اكتشاف أنماط الأداء
  detectPerformanceTrends(interactions) {
    if (!interactions || interactions.length < 10) return null;
    
    const chunks = [];
    for (let i = 0; i < interactions.length; i += 5) {
      const chunk = interactions.slice(i, i + 5);
      const avg = chunk.reduce((a, int) => a + int.rating, 0) / chunk.length;
      chunks.push(avg);
    }
    
    // حساب الاتجاه
    let trend = 'stable';
    if (chunks[chunks.length - 1] > chunks[0]) {
      trend = 'improving';
    } else if (chunks[chunks.length - 1] < chunks[0]) {
      trend = 'declining';
    }
    
    return {
      trend,
      current_avg: chunks[chunks.length - 1].toFixed(2),
      previous_avg: chunks[0].toFixed(2),
      momentum: (chunks[chunks.length - 1] - chunks[0]).toFixed(2)
    };
  }

  // دالة مساعدة
  getMostCommon(arr) {
    const counts = {};
    arr.forEach(item => {
      counts[item] = (counts[item] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => 
      counts[a] > counts[b] ? a : b
    );
  }

  // حفظ الأنماط
  savePatterns() {
    try {
      localStorage.setItem('detected_patterns', JSON.stringify({
        patterns: this.patterns,
        trends: this.trends
      }));
    } catch (e) {
      console.warn('⚠️ Could not save patterns');
    }
  }
}

// Global instance
window.patternDetector = new PatternDetector();
console.log('✅ Pattern Detector ready');
