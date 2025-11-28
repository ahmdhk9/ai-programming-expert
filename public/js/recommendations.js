// ==========================================
// 💡 RECOMMENDATION ENGINE
// Smart Suggestions & Learning
// ==========================================

class RecommendationEngine {
  constructor() {
    this.history = [];
    this.patterns = {};
    this.init();
  }

  init() {
    console.log('✅ Recommendation Engine initialized');
  }

  // Generate recommendations based on question
  getRecommendations(question) {
    const category = window.advancedFeatures?.categorizeQuestion(question);
    
    return [
      {
        title: `تعمق أكثر في ${category}`,
        description: `اطرح أسئلة أكثر تفصيلاً عن ${category}`,
        action: 'expand'
      },
      {
        title: 'اطلب أمثلة عملية',
        description: 'استخدم أمثلة حقيقية لفهم أفضل',
        action: 'examples'
      },
      {
        title: 'ارجع للأساسيات',
        description: 'تأكد من فهمك للمفاهيم الأساسية',
        action: 'basics'
      }
    ];
  }

  // Track learning progress
  trackProgress(category, difficulty) {
    if (!this.patterns[category]) {
      this.patterns[category] = { easy: 0, medium: 0, hard: 0 };
    }
    this.patterns[category][difficulty]++;
  }

  // Get learning path
  getLearningPath(category) {
    return {
      level1: `أساسيات ${category}`,
      level2: `مفاهيم وسطى في ${category}`,
      level3: `مواضيع متقدمة في ${category}`,
      level4: `أفضل الممارسات في ${category}`,
      level5: `المشاريع العملية في ${category}`
    };
  }

  // Display recommendations UI
  showRecommendations(question) {
    const recommendations = this.getRecommendations(question);
    const container = document.getElementById('recommendations-panel');
    
    if (!container) return;

    container.innerHTML = `
      <div class="recommendations">
        <h4>💡 الاقتراحات</h4>
        ${recommendations.map((r, i) => `
          <div class="recommendation-item" onclick="selectRecommendation('${r.action}')">
            <strong>${r.title}</strong>
            <p>${r.description}</p>
            <span class="action-arrow">→</span>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// Initialize globally
window.recommendationEngine = new RecommendationEngine();

// Show recommendations after AI response
function showRecommendationsAfterResponse(question) {
  window.recommendationEngine.showRecommendations(question);
}

function selectRecommendation(action) {
  const messages = {
    'expand': 'دعني أساعدك بمزيد من التفاصيل...',
    'examples': 'إليك بعض الأمثلة العملية:',
    'basics': 'دعنا نراجع الأساسيات:'
  };
  
  if (messages[action]) {
    document.getElementById('chat-input').value = messages[action];
    document.getElementById('chat-input').focus();
  }
}
