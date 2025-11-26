// نظام الوعي بالسياق - Context Awareness
class ContextAwareness {
  constructor() {
    this.sessions = {};
    this.projectContext = {};
    this.userJourney = [];
  }

  // إنشاء سياق جديد للمستخدم
  createUserContext(userId) {
    this.sessions[userId] = {
      userId,
      startTime: new Date(),
      actions: [],
      decisions: [],
      currentWorkflow: null,
      projectsWorking: [],
      memory: {}
    };
    return this.sessions[userId];
  }

  // تسجيل إجراء
  recordAction(userId, action) {
    if (!this.sessions[userId]) this.createUserContext(userId);

    const actionRecord = {
      timestamp: new Date(),
      type: action.type,
      description: action.description,
      result: action.result,
      nextStep: action.nextStep
    };

    this.sessions[userId].actions.push(actionRecord);
    this.updateWorkflow(userId, action);

    return actionRecord;
  }

  // تحديث سير العمل
  updateWorkflow(userId, action) {
    const session = this.sessions[userId];
    
    session.currentWorkflow = {
      lastAction: action.type,
      progress: this.calculateProgress(session.actions),
      nextExpectedAction: this.predictNextAction(session.actions),
      completionPercentage: this.getCompletion(session)
    };
  }

  // حساب التقدم
  calculateProgress(actions) {
    if (actions.length === 0) return 0;
    const successful = actions.filter(a => a.result === 'success').length;
    return (successful / actions.length) * 100;
  }

  // التنبؤ بالخطوة التالية
  predictNextAction(actions) {
    if (actions.length === 0) return 'ابدأ المشروع';
    
    const lastAction = actions[actions.length - 1].type;
    const predictMap = {
      'create': 'تكوين',
      'config': 'اختبار',
      'test': 'تحسين',
      'optimize': 'نشر',
      'deploy': 'مراقبة'
    };

    return predictMap[lastAction] || 'الخطوة التالية';
  }

  // الحصول على نسبة الإتمام
  getCompletion(session) {
    const milestones = ['إنشاء', 'تكوين', 'اختبار', 'تحسين', 'نشر'];
    const reached = session.actions.filter(a => 
      milestones.some(m => a.type.includes(m))
    ).length;

    return (reached / milestones.length) * 100;
  }

  // الحصول على السياق الكامل
  getFullContext(userId) {
    const session = this.sessions[userId];
    if (!session) return { error: 'No session found' };

    return {
      session,
      timeline: this.getTimeline(userId),
      decisions: this.getDecisionHistory(userId),
      nextSteps: this.getRecommendations(userId)
    };
  }

  // الحصول على الجدول الزمني
  getTimeline(userId) {
    return this.sessions[userId]?.actions?.map(a => ({
      time: a.timestamp,
      what: a.description,
      result: a.result
    })) || [];
  }

  // سجل القرارات
  getDecisionHistory(userId) {
    return this.sessions[userId]?.decisions || [];
  }

  // التوصيات التالية
  getRecommendations(userId) {
    const session = this.sessions[userId];
    if (!session) return [];

    const recommendations = [];
    
    if (session.actions.length < 3) {
      recommendations.push('انهِ المراحل الأساسية');
    }
    if (this.calculateProgress(session.actions) < 50) {
      recommendations.push('رتب أولوياتك');
    }
    if (session.currentWorkflow?.nextExpectedAction) {
      recommendations.push(`الخطوة التالية: ${session.currentWorkflow.nextExpectedAction}`);
    }

    return recommendations;
  }

  // نظرة عامة شاملة
  overallView(userId) {
    const session = this.sessions[userId];
    if (!session) return null;

    return {
      status: 'مستمر',
      totalActions: session.actions.length,
      successRate: this.calculateProgress(session.actions),
      progress: session.currentWorkflow?.completionPercentage || 0,
      estimatedCompletion: this.estimateCompletion(session),
      keypoints: this.getKeyPoints(session)
    };
  }

  // تقدير وقت الإنجاز
  estimateCompletion(session) {
    const avgTimePerAction = 15; // دقيقة
    const remainingActions = 5 - session.actions.length;
    return remainingActions * avgTimePerAction + ' دقيقة';
  }

  // النقاط الرئيسية
  getKeyPoints(session) {
    return session.actions.slice(-3).map(a => a.description);
  }
}

module.exports = new ContextAwareness();
