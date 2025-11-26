// نظام الذكاء الصناعي الموجّه - AI Coach
class AICoach {
  constructor() {
    this.context = { currentProject: null, stage: 'init', decisions: [], memory: {} };
    this.understanding = {};
    this.conversationHistory = [];
  }

  // فهم المشروع الحالي
  understandProject(projectInfo) {
    this.context.currentProject = projectInfo;
    this.context.stage = this.analyzeStage(projectInfo);
    this.updateMemory(projectInfo);
    return { understood: true, stage: this.context.stage };
  }

  // تحليل مرحلة المشروع
  analyzeStage(project) {
    if (!project) return 'init';
    if (project.features?.length > 50) return 'advanced';
    if (project.users?.length > 10) return 'growth';
    if (project.payment) return 'monetization';
    return 'development';
  }

  // تحديث الذاكرة
  updateMemory(data) {
    this.context.memory = {
      ...this.context.memory,
      lastUpdate: new Date(),
      projectName: data?.name,
      team: data?.team,
      features: data?.features,
      stage: this.context.stage
    };
  }

  // قراءة نية المستخدم
  readIntent(userMessage) {
    const intent = {
      action: null,
      target: null,
      context: null,
      isRelated: false
    };

    // تحليل الرسالة
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('اضيف') || lower.includes('إضافة')) intent.action = 'add';
    if (lower.includes('عدل') || lower.includes('تعديل')) intent.action = 'edit';
    if (lower.includes('احذف') || lower.includes('حذف')) intent.action = 'delete';
    if (lower.includes('شوف') || lower.includes('عرض')) intent.action = 'view';
    if (lower.includes('اصلح') || lower.includes('إصلاح')) intent.action = 'fix';

    // تحديد الهدف
    if (lower.includes('مستخدم')) intent.target = 'user';
    if (lower.includes('ميزه') || lower.includes('ميزة')) intent.target = 'feature';
    if (lower.includes('دفع')) intent.target = 'payment';
    if (lower.includes('أمان')) intent.target = 'security';
    if (lower.includes('أداء')) intent.target = 'performance';

    // التحقق من الارتباط بالمشروع
    intent.isRelated = this.isRelatedToCurrentProject(userMessage);

    return intent;
  }

  isRelatedToCurrentProject(message) {
    if (!this.context.currentProject) return false;
    
    const projectKeywords = [
      this.context.currentProject?.name,
      this.context.stage,
      'المنصة',
      'الموقع',
      'البرنامج'
    ];

    return projectKeywords.some(k => message.includes(k));
  }

  // فهم الخطة الكاملة
  comprehensivePlan(objective) {
    const plan = {
      objective,
      stage: this.context.stage,
      currentMemory: this.context.memory,
      recommendedActions: [],
      potentialIssues: [],
      successCriteria: []
    };

    // حسب المرحلة
    switch (this.context.stage) {
      case 'init':
        plan.recommendedActions = ['إنشاء البنية الأساسية', 'إعداد قاعدة البيانات', 'ربط الخوادم'];
        break;
      case 'development':
        plan.recommendedActions = ['إضافة الميزات', 'اختبار شامل', 'تحسين الأداء'];
        break;
      case 'monetization':
        plan.recommendedActions = ['فعّل الدفع', 'أضف الإعلانات', 'تابع الأرباح'];
        break;
      case 'growth':
        plan.recommendedActions = ['زد المستخدمين', 'حسّن الخدمة', 'وسّع الميزات'];
        break;
      case 'advanced':
        plan.recommendedActions = ['تطوير متقدم', 'توسع عالمي', 'ابحث عن فرص جديدة'];
        break;
    }

    return plan;
  }

  // تسجيل القرار
  logDecision(decision) {
    const log = {
      timestamp: new Date(),
      decision,
      stage: this.context.stage,
      impact: 'pending'
    };

    this.context.decisions.push(log);
    return log;
  }

  // شرح واضح للخطة
  explainPlan(plan) {
    const explanation = `
🎯 الهدف: ${plan.objective}

📍 المرحلة الحالية: ${this.getMrahlahName(plan.stage)}

💡 الخطوات الموصى بها:
${plan.recommendedActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

⚠️ احذر من:
${plan.potentialIssues.map((i) => `• ${i}`).join('\n')}

✅ معايير النجاح:
${plan.successCriteria.map((s) => `• ${s}`).join('\n')}

📝 السياق الحالي: لديك ${this.context.memory.features?.length || 0} ميزة، في مرحلة ${plan.stage}
    `;

    return explanation;
  }

  getMrahlahName(stage) {
    const names = {
      'init': 'البداية والتحضير',
      'development': 'التطوير الأساسي',
      'monetization': 'الربحية والدفع',
      'growth': 'النمو والتوسع',
      'advanced': 'المرحلة المتقدمة'
    };
    return names[stage] || 'غير معروف';
  }

  // تقرير الحالة
  statusReport() {
    return {
      projectName: this.context.currentProject?.name || 'بدون مشروع',
      stage: this.context.stage,
      decisions: this.context.decisions.length,
      features: this.context.memory.features?.length || 0,
      memorySize: Object.keys(this.context.memory).length,
      lastUpdate: this.context.memory.lastUpdate
    };
  }
}

module.exports = new AICoach();
