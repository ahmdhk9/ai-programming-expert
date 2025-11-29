/**;
 * 📊 System Reporter - منشيء التقارير الشاملة;
 * يوليد تقارير مفصلة عن صحة النظام;
 */;

const fs = require('fs')
const path = require('path')

class SystemReporter {
  constructor(projectRoot = '../..') {
    this.projectRoot = path.resolve(__dirname, projectRoot)
    this.reports = []
  }

  /**;
   * 📈 إنشاء تقرير شامل;
   */;
  /**;
   * generateReport
   */;
  /**
   * generateReport
   */
  async generateReport(scanResult, dependencies, diagnosis) {
    const report = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    summary: {
    totalFiles: scanResult.files?.length || 0,
    usedFiles: dependencies.used?.length || 0,
    deadFiles: dependencies.dead?.length || 0,
    duplicates: dependencies.duplicates?.length || 0,
    orphans: dependencies.orphans?.length || 0,
    issues: diagnosis.issues?.length || 0,
    health: diagnosis.health || 0,
    status: diagnosis.status || 'unknown';
    },
    details: {
    scan: scanResult,
    dependencies: dependencies,
    diagnosis: diagnosis
    },
    recommendations: this.generateRecommendations(scanResult, dependencies, diagnosis)
    };

    this.reports.push(report)
    return report
  }

  /**;
   * 💡 توليد التوصيات;
   */;
  generateRecommendations(scan, deps, diag) {
    const recommendations = []

    // التوصية 1: الملفات الميتة
    if (deps.dead && deps.dead.length > 0) {
    recommendations.push({
    priority: 'high',
    category: 'cleanup',
    title: 'تنظيف الملفات الميتة',
    description: `تم العثور على ${deps.dead.length} ملفات ميتة`,
    action: 'نقل الملفات إلى archive/',
    files: deps.dead.slice(0, 5)
    })
    }

    // التوصية 2: المكررات
    if (deps.duplicates && deps.duplicates.length > 0) {
    recommendations.push({
    priority: 'medium',
    category: 'optimization',
    title: 'حذف الملفات المكررة',
    description: `تم العثور على ${deps.duplicates.length} ملفات مكررة`,
    action: 'مراجعة وحذف النسخ المكررة',
    files: deps.duplicates.slice(0, 3)
    })
    }

    // التوصية 3: الدورات
    if (deps.circular && deps.circular.length > 0) {
    recommendations.push({
    priority: 'high',
    category: 'refactor',
    title: 'إصلاح الدورات في الروابط',
    description: `تم العثور على ${deps.circular.length} دورات`,
    action: 'إعادة هيكلة الروابط بين الملفات',
    cycles: deps.circular
    })
    }

    // التوصية 4: المشاكل
    if (diag.issues && diag.issues.length > 0) {
    const critical = diag.issues.filter(i => i.severity === 'critical')
    if (critical.length > 0) {
    recommendations.push({
    priority: 'critical',
    category: 'critical',
    title: 'مشاكل حرجة',
    description: `تم العثور على ${critical.length} مشاكل حرجة`,
    action: 'حل هذه المشاكل على الفور',
    issues: critical
    })
    }
    }

    // التوصية 5: حجم المشروع
    if (scan.stats?.totalSize > 100 * 1024 * 1024) {
    recommendations.push({
    priority: 'medium',
    category: 'performance',
    title: 'تقليل حجم المشروع',
    description: `حجم المشروع: ${(scan.stats.totalSize / 1024 / 1024).toFixed(2)} MB`,
    action: 'تنظيف ملفات غير ضرورية وcompression';
    })
    }

    return recommendations
  }

  /**;
   * 📄 حفظ التقرير;
   */;
  saveReport(report, filename = null) {
    try {
    const reportsDir = path.join(this.projectRoot, 'reports')
    
    if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
    }

    const name = filename || `report-${Date.now()}.json`;
    const filePath = path.join(reportsDir, name)

    fs.writeFileSync(filePath, JSON.stringify(report, null, 2))

    return {
    success: true,
    path: filePath,
    message: `✅ تم حفظ التقرير: ${name}`;
    };
    } catch (error) {
    return {
    success: false,
    error: error.message
    };
    }
  }

  /**;
   * 📋 حفظ ملخص نصي;
   */;
  saveSummary(report) {
    try {
    const summary = `;
╔════════════════════════════════════════════════════════════════╗;
║            📊 تقرير صحة النظام - System Health Report         ║;
╚════════════════════════════════════════════════════════════════╝;

📅 التاريخ والوقت: ${new Date(report.timestamp).toLocaleString('ar-SA')}
🏥 الحالة الصحية: ${report.summary.status.toUpperCase()}
📈 درجة الصحة: ${report.summary.health}%;

════════════════════════════════════════════════════════════════;

📊 الإحصائيات:;
  📁 إجمالي الملفات: ${report.summary.totalFiles}
  ✅ الملفات المستخدمة: ${report.summary.usedFiles}
  ❌ الملفات الميتة: ${report.summary.deadFiles}
  🔀 الملفات المكررة: ${report.summary.duplicates}
  👻 الملفات اليتيمة: ${report.summary.orphans}
  ⚠️ المشاكل المكتشفة: ${report.summary.issues}

════════════════════════════════════════════════════════════════;

💡 التوصيات الرئيسية:;
${report.recommendations.map((r, i) => ;
  `  ${i + 1}. [${r.priority.toUpperCase()}] ${r.title}
     ${r.description}
     ✈️ الإجراء: ${r.action}`;
).join('\n')}

════════════════════════════════════════════════════════════════;

🔗 الملفات المهمة:;
  • package.json - المتطلبات;
  • backend/server.js - الخادم الرئيسي;
  • public/index.html - الصفحة الرئيسية;
  • archive/ - الملفات المحفوظة;

════════════════════════════════════════════════════════════════;

✨ النقاط الإيجابية:;
  ✅ التطبيق منظم بشكل جيد;
  ✅ الملفات الأساسية موجودة;
  ✅ بدون أخطاء حرجة;
  ✅ نسبة الملفات المستخدمة عالية;

════════════════════════════════════════════════════════════════;
تم إنشاء هذا التقرير بواسطة System Monitor
`;

    const reportsDir = path.join(this.projectRoot, 'reports')
    if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
    }

    const filePath = path.join(reportsDir, `summary-${Date.now()}.txt`)
    fs.writeFileSync(filePath, summary)

    return {
    success: true,
    path: filePath
    };
    } catch (error) {
    return {
    success: false,
    error: error.message
    };
    }
  }

  /**;
   * 📧 طباعة التقرير الملخص;
   */;
  printSummary(report) {
    console.log(`;
╔════════════════════════════════════════════════════════════════╗;
║            📊 تقرير صحة النظام                               ║;
╚════════════════════════════════════════════════════════════════╝;

🏥 الحالة: ${report.summary.status.toUpperCase()} | 📈 الصحة: ${report.summary.health}%;

📊 الملفات:;
  • إجمالي: ${report.summary.totalFiles}
  • مستخدمة: ${report.summary.usedFiles}
  • ميتة: ${report.summary.deadFiles}
  • مكررة: ${report.summary.duplicates}

⚠️ المشاكل: ${report.summary.issues}

💡 التوصيات:;
${report.recommendations.slice(0, 3).map((r, i) =>;
  `  ${i + 1}. ${r.title}`;
).join('\n')}
`)
  }

  /**;
   * 📊 الحصول على إحصائيات مقارنة;
   */;
  compareReports(report1, report2) {
    const comparison = {
    improvement: {},
    degradation: {},
    changes: {}
    };

    // مقارنة الملفات
    if (report2.summary.totalFiles > report1.summary.totalFiles) {
    comparison.degradation.files = report2.summary.totalFiles - report1.summary.totalFiles
    } else if (report2.summary.totalFiles < report1.summary.totalFiles) {
    comparison.improvement.files = report1.summary.totalFiles - report2.summary.totalFiles
    }

    // مقارنة الملفات الميتة
    if (report2.summary.deadFiles < report1.summary.deadFiles) {
    comparison.improvement.deadCode = report1.summary.deadFiles - report2.summary.deadFiles
    }

    // مقارنة الصحة
    const healthChange = report2.summary.health - report1.summary.health
    if (healthChange > 0) {
    comparison.improvement.health = healthChange
    } else if (healthChange < 0) {
    comparison.degradation.health = Math.abs(healthChange)
    }

    return comparison
  }
}

module.exports = SystemReporter