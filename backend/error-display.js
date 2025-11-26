// نظام عرض الأخطاء بوضوح
class ErrorDisplay {
  constructor() {
    this.displayMode = 'detailed';
  }

  // عرض الخطأ بشكل واضح وجميل
  formatError(error) {
    return {
      timestamp: new Date().toISOString(),
      type: error.type,
      severity: error.severity,
      icon: this.getSeverityIcon(error.severity),
      message: error.message,
      file: error.file,
      line: error.line,
      code: error.code,
      solution: error.solution,
      details: {
        description: this.getDetailedDescription(error.type),
        reason: this.getReasonExplanation(error.type),
        howToFix: this.getFixInstructions(error.type)
      }
    };
  }

  getSeverityIcon(severity) {
    const icons = {
      'critical': '🔴',
      'high': '🟠',
      'medium': '🟡',
      'low': '🟢'
    };
    return icons[severity] || '⚪';
  }

  getDetailedDescription(type) {
    const descriptions = {
      'SYNTAX_ERROR': 'خطأ في بنية الكود - الكود لا يتبع قواعد لغة البرمجة',
      'TYPE_ERROR': 'خطأ في نوع البيانات - استخدام نوع خاطئ',
      'INFINITE_LOOP': 'حلقة لا تنتهي - قد تسبب تعليق البرنامج',
      'SECURITY_ERROR': 'مشكلة أمان - الكود قد يكون عرضة للهجوم',
      'DATABASE_ERROR': 'خطأ قاعدة بيانات - عملية خطيرة على البيانات'
    };
    return descriptions[type] || 'خطأ غير معروف';
  }

  getReasonExplanation(type) {
    const reasons = {
      'SYNTAX_ERROR': 'قد تكون هناك علامات ترقيم ناقصة أو زائدة',
      'TYPE_ERROR': 'قد تحاول استخدام عملية غير متوافقة مع نوع البيانات',
      'INFINITE_LOOP': 'قد تنسى شرط الخروج من الحلقة',
      'SECURITY_ERROR': 'قد تستخدم دوال غير آمنة مثل eval()',
      'DATABASE_ERROR': 'قد تحاول حذف بيانات مهمة بدون تأكيد'
    };
    return reasons[type] || 'سبب غير معروف';
  }

  getFixInstructions(type) {
    const instructions = {
      'SYNTAX_ERROR': ['تحقق من الأقواس', 'تأكد من علامات الترقيم', 'استخدم محرر مع إبراز الأخطاء'],
      'TYPE_ERROR': ['أضف تحقق من نوع المتغير', 'استخدم typeof للتحقق', 'أضف تحويل نوع إذا لزم'],
      'INFINITE_LOOP': ['أضف عداد للحلقة', 'أضف شرط للخروج', 'تأكد من تقدم المتغير'],
      'SECURITY_ERROR': ['استبدل eval بـ JSON.parse', 'استخدم دوال آمنة', 'تحقق من مصدر البيانات'],
      'DATABASE_ERROR': ['أضف تأكيد قبل الحذف', 'استخدم soft delete', 'أضف نسخة احتياطية']
    };
    return instructions[type] || ['تحقق من الكود', 'جرب حل مختلف'];
  }

  // عرض في لوحة معلومات
  createDashboard(errors) {
    return {
      summary: {
        total: errors.length,
        critical: errors.filter(e => e.severity === 'critical').length,
        high: errors.filter(e => e.severity === 'high').length,
        medium: errors.filter(e => e.severity === 'medium').length
      },
      byType: this.groupByType(errors),
      timeline: errors.map(e => ({ time: e.timestamp, type: e.type })),
      recommendations: this.generateRecommendations(errors)
    };
  }

  groupByType(errors) {
    const grouped = {};
    errors.forEach(e => {
      grouped[e.type] = (grouped[e.type] || 0) + 1;
    });
    return grouped;
  }

  generateRecommendations(errors) {
    const recommendations = [];
    if (errors.some(e => e.type === 'SECURITY_ERROR')) {
      recommendations.push('⚠️ تحسين الأمان - استخدم دوال آمنة');
    }
    if (errors.some(e => e.type === 'INFINITE_LOOP')) {
      recommendations.push('⚠️ مراجعة الحلقات - تأكد من شروط الخروج');
    }
    if (errors.some(e => e.severity === 'critical')) {
      recommendations.push('🔴 أخطاء حرجة تحتاج إصلاح فوري');
    }
    return recommendations;
  }
}

module.exports = new ErrorDisplay();
