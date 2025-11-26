// نظام الاختيار الذكي للموارد
class IntelligentSelector {
  constructor() {
    this.resources = {
      models: [],
      apis: [],
      services: []
    };
    this.history = [];
    this.metrics = {};
  }

  // اختيار أفضل موارد بناءً على الطلب
  selectBest(requirement) {
    const candidates = this.findCandidates(requirement);
    
    if (candidates.length === 0) {
      return this.selectFallback();
    }

    const scored = candidates.map(c => ({
      ...c,
      score: this.calculateScore(c, requirement)
    }));

    const best = scored.sort((a, b) => b.score - a.score)[0];
    
    this.logSelection(requirement, best);
    return best;
  }

  // البحث عن المرشحين
  findCandidates(requirement) {
    return this.resources.models.filter(m => 
      this.matchesRequirement(m, requirement)
    );
  }

  // التحقق من التوافق
  matchesRequirement(resource, requirement) {
    return (
      resource.capabilities.includes(requirement.type) &&
      resource.performance >= (requirement.minPerformance || 0) &&
      resource.available === true
    );
  }

  // حساب النقاط
  calculateScore(resource, requirement) {
    let score = 100;

    // أداء
    score += resource.performance * 10;

    // تكلفة
    score -= resource.cost * 5;

    // التاريخ الناجح
    const history = this.metrics[resource.id] || {};
    score += (history.successRate || 0) * 5;

    // السرعة
    score += (100 - (resource.latency || 0)) * 2;

    return score;
  }

  // الخيار الاحتياطي
  selectFallback() {
    return this.resources.models.find(m => m.available) || null;
  }

  // تسجيل الاختيار
  logSelection(requirement, selected) {
    this.history.push({
      timestamp: new Date(),
      requirement: requirement.type,
      selected: selected.name,
      success: null
    });
  }

  // تحديث النجاح/الفشل
  updateResult(historyIndex, success) {
    if (this.history[historyIndex]) {
      this.history[historyIndex].success = success;
      
      const selected = this.history[historyIndex].selected;
      if (!this.metrics[selected]) {
        this.metrics[selected] = { success: 0, fail: 0, successRate: 0 };
      }

      if (success) {
        this.metrics[selected].success++;
      } else {
        this.metrics[selected].fail++;
      }

      const total = this.metrics[selected].success + this.metrics[selected].fail;
      this.metrics[selected].successRate = (this.metrics[selected].success / total) * 100;
    }
  }

  // إضافة موارد
  addResource(resource) {
    if (resource.type === 'model') {
      this.resources.models.push(resource);
    } else if (resource.type === 'api') {
      this.resources.apis.push(resource);
    } else if (resource.type === 'service') {
      this.resources.services.push(resource);
    }
  }

  // الحصول على التقرير
  getReport() {
    return {
      totalResources: this.resources.models.length + this.resources.apis.length + this.resources.services.length,
      models: this.resources.models.length,
      apis: this.resources.apis.length,
      services: this.resources.services.length,
      totalSelections: this.history.length,
      metrics: this.metrics
    };
  }
}

module.exports = new IntelligentSelector();
