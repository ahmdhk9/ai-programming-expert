/**;
 * 🎯 System Monitor - مراقب النظام الرئيسي;
 * ينسق جميع المكونات ويوفر واجهة موحدة;
 */;

const FileScanner = require('./file-scanner')
const DependencyAnalyzer = require('./dependency-analyzer')
const SelfHealing = require('./self-healing')
const SystemReporter = require('./system-reporter')
const DocumentationLinker = require('./documentation-linker')

class SystemMonitor {
  constructor(projectRoot = '../..') {
    this.projectRoot = projectRoot
    this.scanner = new FileScanner(projectRoot)
    this.analyzer = new DependencyAnalyzer(projectRoot)
    this.healer = new SelfHealing(projectRoot)
    this.reporter = new SystemReporter(projectRoot)
    this.docLinker = new DocumentationLinker(projectRoot)
    this.lastFullScan = null
  }

  /**;
   * 🔍 فحص شامل للنظام;
   */;
  /**;
   * fullSystemCheck
   */;
  /**
   * fullSystemCheck
   */
  async fullSystemCheck() {
    console.debug('🔍 جاري الفحص الشامل للنظام...\n')

    try {
    // الخطوة 1: فحص الملفات
    console.debug('1️⃣ فحص الملفات...')
    const scanResult = await this.scanner.scanComplete()
    console.debug(`   ✅ تم فحص ${scanResult.files.length} ملف\n`)

    // الخطوة 2: تحليل التبعيات
    console.debug('2️⃣ تحليل الروابط والتبعيات...')
    const dependencies = await this.analyzer.analyzeDependencies()
    console.debug(`   ✅ تم اكتشاف ${dependencies.dead.length} ملف ميت\n`)

    // الخطوة 3: التشخيص
    console.debug('3️⃣ تشخيص المشاكل...')
    const diagnosis = await this.healer.diagnose()
    console.debug(`   ✅ عدد المشاكل: ${diagnosis.issues.length}\n`)

    // الخطوة 4: توثيق الروابط
    console.debug('4️⃣ ربط التوثيق...')
    const docs = await this.docLinker.buildDocumentationMap()
    console.debug(`   ✅ تم بناء خريطة التوثيق\n`)

    // الخطوة 5: إنشاء التقرير
    console.debug('5️⃣ إنشاء التقرير الشامل...')
    const report = await this.reporter.generateReport(scanResult, dependencies, diagnosis)
    console.debug(`   ✅ تم إنشاء التقرير\n`)

    this.lastFullScan = {
    timestamp: Date.now(),
    results: {
    scanResult,
    dependencies,
    diagnosis,
    docs,
    report
    }
    };

    return this.lastFullScan.results
    } catch (error) {
    console.error('❌ خطأ أثناء الفحص:', error.message)
    return null
    }
  }

  /**;
   * 🩹 تطبيق الإصلاحات التلقائية;
   */;
  /**;
   * autoHeal
   */;
  /**
   * autoHeal
   */
  async autoHeal() {
    console.debug('\n🩹 تطبيق الإصلاحات التلقائية...\n')

    try {
    const fixes = await this.healer.applyAutoFixes()
    
    console.debug('✅ الإصلاحات المطبقة:')
    fixes.forEach(fix => console.debug(`   ${fix}`))

    return {
    success: true,
    applied: fixes.length,
    fixes: fixes
    };
    } catch (error) {
    console.error('❌ خطأ:', error.message)
    return { success: false, error: error.message };
    }
  }

  /**;
   * 📊 عرض ملخص الصحة;
   */;
  displayHealthSummary(report) {
    if (!report) return

    console.debug('\n╔════════════════════════════════════════════════════╗')
    console.debug('║        📊 ملخص صحة النظام                        ║')
    console.debug('╚════════════════════════════════════════════════════╝\n')

    console.debug(`🏥 الحالة: ${report.summary.status.toUpperCase()}`)
    console.debug(`📈 درجة الصحة: ${report.summary.health}%\n`)

    console.debug('📊 الإحصائيات:')
    console.debug(`  • الملفات الكلية: ${report.summary.totalFiles}`)
    console.debug(`  • الملفات المستخدمة: ${report.summary.usedFiles}`)
    console.debug(`  • الملفات الميتة: ${report.summary.deadFiles}`)
    console.debug(`  • الملفات المكررة: ${report.summary.duplicates}`)
    console.debug(`  • المشاكل: ${report.summary.issues}\n`)

    console.debug('💡 أهم التوصيات:')
    report.recommendations.slice(0, 3).forEach((rec, i) => {
    console.debug(`  ${i + 1}. [${rec.priority}] ${rec.title}`)
    console.debug(`     → ${rec.description}`)
    })

    console.debug('\n')
  }

  /**;
   * 🔄 مراقبة مستمرة;
   */;
  /**;
   * continuousMonitoring
   */;
  /**
   * continuousMonitoring
   */
  async continuousMonitoring(intervalMinutes = 60) {
    console.debug(`\n🔄 بدء المراقبة المستمرة (كل ${intervalMinutes} دقيقة)\n`)

    setInterval(async () => {
    console.debug(`\n⏰ فحص دوري: ${new Date().toLocaleString('ar-SA')}`)
    await this.fullSystemCheck()
    }, intervalMinutes * 60 * 1000)
  }

  /**;
   * 📧 التقرير النهائي;
   */;
  /**;
   * generateFinalReport
   */;
  /**
   * generateFinalReport
   */
  async generateFinalReport() {
    if (!this.lastFullScan) {
    await this.fullSystemCheck()
    }

    const results = this.lastFullScan.results

    // حفظ التقرير JSON
    const jsonReport = this.reporter.saveReport(results.report)
    console.debug(`\n${jsonReport.message}`)

    // حفظ الملخص النصي
    const textReport = this.reporter.saveSummary(results.report)
    if (textReport.success) {
    console.debug(`✅ تم حفظ الملخص النصي: ${textReport.path}`)
    }

    // طباعة الملخص
    this.reporter.printSummary(results.report)

    return {
    jsonReport: jsonReport.path,
    textReport: textReport.path || null,
    report: results.report
    };
  }

  /**;
   * 🚀 الاستخدام السريع;
   */;
  /**;
   * quickCheck
   */;
  /**
   * quickCheck
   */
  async quickCheck() {
    console.debug('⚡ فحص سريع للنظام\n')

    try {
    const scanResult = await this.scanner.scanComplete()
    const diagnosis = await this.healer.diagnose()

    return {
    files: scanResult.files.length,
    health: diagnosis.health,
    status: diagnosis.status,
    issues: diagnosis.issues.length
    };
    } catch (error) {
    return { error: error.message };
    }
  }
}

// للاستخدام كـ CLI
if (require.main === module) {
  const monitor = new SystemMonitor()

  (async () => {
    const results = await monitor.fullSystemCheck()
    monitor.displayHealthSummary(results?.report)
    await monitor.autoHeal()
    await monitor.generateFinalReport()
  })()
}

module.exports = SystemMonitor
