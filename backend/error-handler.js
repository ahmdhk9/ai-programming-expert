// معالج الأخطاء المتقدم
class ErrorHandler {
  constructor() {
    this.errorCounts = {};
    this.errorPatterns = {};
  }

  // معالجة الخطأ الشامل
  handle(error, context = {}) {
    const errorId = `${error.name}_${Date.now()}`;
    
    // تسجيل الخطأ
    this.trackError(error);

    // اختيار استراتيجية المعالجة
    const strategy = this.chooseStrategy(error);

    // تطبيق الاستراتيجية
    const result = strategy.apply(error, context);

    // الإبلاغ
    this.reportError(error, errorId, result);

    return { errorId, ...result };
  }

  trackError(error) {
    const errorType = error.name || 'Unknown';
    this.errorCounts[errorType] = (this.errorCounts[errorType] || 0) + 1;
  }

  chooseStrategy(error) {
    const strategies = {
      ReferenceError: { apply: () => ({ retry: true, message: 'Reference error detected' }) },
      TypeError: { apply: () => ({ retry: false, message: 'Type error - check code' }) },
      SyntaxError: { apply: () => ({ retry: false, message: 'Syntax error detected' }) },
      RangeError: { apply: () => ({ retry: true, message: 'Range error - retry safely' }) },
      default: { apply: () => ({ retry: true, message: 'Generic error - attempting recovery' }) }
    };

    return strategies[error.name] || strategies.default;
  }

  reportError(error, errorId, result) {
    console.error(`❌ Error [${errorId}]: ${error.message}`);
    console.error(`   Strategy: ${result.message}`);
    console.error(`   Retry: ${result.retry ? 'Yes' : 'No'}`);
  }

  // إحصائيات الأخطاء
  getStats() {
    return this.errorCounts;
  }

  // إعادة تعيين الإحصائيات
  resetStats() {
    this.errorCounts = {};
    this.errorPatterns = {};
  }
}

module.exports = new ErrorHandler();
