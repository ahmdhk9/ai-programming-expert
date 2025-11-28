#!/usr/bin/env node

/**
 * 🔍 INTELLIGENT PROBLEM CLASSIFIER
 * تصنيف المشاكل من البسيطة للمعقدة
 */

class ProblemClassifier {
  constructor() {
    this.problems = [];
    this.categories = {
      simple: { level: 1, fixTime: 100 },      // ملي ثانية
      medium: { level: 2, fixTime: 500 },
      complex: { level: 3, fixTime: 2000 },
      critical: { level: 4, fixTime: 5000 }
    };
  }

  classify(issue) {
    const classification = {
      id: Math.random().toString(36).substr(2, 9),
      issue,
      category: this.determineCategory(issue),
      severity: this.calculateSeverity(issue),
      priority: this.calculatePriority(issue),
      timeToFix: this.estimateFixTime(issue),
      solutions: this.suggestSolutions(issue),
      timestamp: new Date().toISOString()
    };

    this.problems.push(classification);
    return classification;
  }

  determineCategory(issue) {
    const lowerIssue = issue.toLowerCase();

    // مشاكل بسيطة جداً
    if (lowerIssue.includes('cache') || lowerIssue.includes('clear')) {
      return 'simple';
    }
    if (lowerIssue.includes('reload') || lowerIssue.includes('refresh')) {
      return 'simple';
    }
    if (lowerIssue.includes('timeout') && !lowerIssue.includes('persistent')) {
      return 'simple';
    }

    // مشاكل متوسطة
    if (lowerIssue.includes('connection') || lowerIssue.includes('network')) {
      return 'medium';
    }
    if (lowerIssue.includes('memory') || lowerIssue.includes('performance')) {
      return 'medium';
    }
    if (lowerIssue.includes('api') && !lowerIssue.includes('critical')) {
      return 'medium';
    }

    // مشاكل معقدة
    if (lowerIssue.includes('database') || lowerIssue.includes('data')) {
      return 'complex';
    }
    if (lowerIssue.includes('deployment') || lowerIssue.includes('build')) {
      return 'complex';
    }

    // مشاكل حرجة
    if (lowerIssue.includes('down') || lowerIssue.includes('crash')) {
      return 'critical';
    }
    if (lowerIssue.includes('security') || lowerIssue.includes('breach')) {
      return 'critical';
    }

    return 'medium'; // افتراضي
  }

  calculateSeverity(issue) {
    const lowerIssue = issue.toLowerCase();

    let score = 50; // قيمة أساسية

    // زيادة النقاط حسب الكلمات المفتاحية
    if (lowerIssue.includes('critical')) score += 50;
    if (lowerIssue.includes('urgent')) score += 40;
    if (lowerIssue.includes('all users')) score += 30;
    if (lowerIssue.includes('production')) score += 25;
    if (lowerIssue.includes('down')) score += 50;
    if (lowerIssue.includes('data loss')) score += 60;

    // تقليل النقاط للمشاكل البسيطة
    if (lowerIssue.includes('minor')) score -= 30;
    if (lowerIssue.includes('occasional')) score -= 20;
    if (lowerIssue.includes('offline')) score -= 15;

    return Math.min(100, Math.max(1, score));
  }

  calculatePriority(issue) {
    const category = this.determineCategory(issue);
    const severity = this.calculateSeverity(issue);

    // Matrix: Category + Severity = Priority
    const priorityMatrix = {
      simple: { low: 1, medium: 2, high: 3 },
      medium: { low: 2, medium: 4, high: 5 },
      complex: { low: 4, medium: 6, high: 7 },
      critical: { low: 7, medium: 8, high: 9 }
    };

    const severityLevel = severity < 30 ? 'low' : severity < 70 ? 'medium' : 'high';
    return priorityMatrix[category][severityLevel];
  }

  estimateFixTime(issue) {
    const category = this.determineCategory(issue);
    const baseTime = this.categories[category].fixTime;

    // تعديل الوقت حسب تعقيد المشكلة
    const complexity = this.calculateSeverity(issue);
    const multiplier = 1 + (complexity / 100);

    return Math.round(baseTime * multiplier);
  }

  suggestSolutions(issue) {
    const lowerIssue = issue.toLowerCase();
    const solutions = [];

    // حلول للمشاكل البسيطة
    if (lowerIssue.includes('cache')) {
      solutions.push({ step: 1, action: 'clearCache', desc: 'Clear browser cache' });
      solutions.push({ step: 2, action: 'refresh', desc: 'Refresh page' });
    }

    if (lowerIssue.includes('timeout')) {
      solutions.push({ step: 1, action: 'wait', desc: 'Wait 30 seconds' });
      solutions.push({ step: 2, action: 'retry', desc: 'Retry connection' });
    }

    if (lowerIssue.includes('memory')) {
      solutions.push({ step: 1, action: 'closeOther', desc: 'Close other tabs' });
      solutions.push({ step: 2, action: 'restart', desc: 'Restart browser' });
    }

    // حلول للمشاكل المتوسطة
    if (lowerIssue.includes('connection')) {
      solutions.push({ step: 1, action: 'checkNetwork', desc: 'Check network' });
      solutions.push({ step: 2, action: 'reconnect', desc: 'Reconnect' });
      solutions.push({ step: 3, action: 'switchBackend', desc: 'Switch backend' });
    }

    // حلول للمشاكل المعقدة
    if (lowerIssue.includes('database')) {
      solutions.push({ step: 1, action: 'healthCheck', desc: 'Check DB health' });
      solutions.push({ step: 2, action: 'reconnect', desc: 'Reconnect to DB' });
      solutions.push({ step: 3, action: 'failover', desc: 'Failover to backup' });
    }

    // حلول للمشاكل الحرجة
    if (lowerIssue.includes('down')) {
      solutions.push({ step: 1, action: 'alertTeam', desc: 'Alert team' });
      solutions.push({ step: 2, action: 'startRecovery', desc: 'Start recovery' });
      solutions.push({ step: 3, action: 'notifyUsers', desc: 'Notify users' });
      solutions.push({ step: 4, action: 'monitor', desc: 'Monitor status' });
    }

    return solutions.length > 0 ? solutions : this.getDefaultSolutions();
  }

  getDefaultSolutions() {
    return [
      { step: 1, action: 'identify', desc: 'Identify issue' },
      { step: 2, action: 'isolate', desc: 'Isolate component' },
      { step: 3, action: 'fix', desc: 'Apply fix' },
      { step: 4, action: 'test', desc: 'Test solution' }
    ];
  }

  sortByPriority() {
    return this.problems.sort((a, b) => b.priority - a.priority);
  }

  getByCategory(category) {
    return this.problems.filter(p => p.category === category);
  }

  getSummary() {
    const summary = {
      total: this.problems.length,
      byCategory: {},
      byPriority: {}
    };

    this.problems.forEach(p => {
      summary.byCategory[p.category] = (summary.byCategory[p.category] || 0) + 1;
      summary.byPriority[p.priority] = (summary.byPriority[p.priority] || 0) + 1;
    });

    return summary;
  }
}

module.exports = ProblemClassifier;
