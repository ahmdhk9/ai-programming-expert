/**
 * 🎯 System Monitor - مراقب النظام الرئيسي
 * ينسق جميع المكونات ويوفر واجهة موحدة
 */

const FileScanner = require('./file-scanner');
const DependencyAnalyzer = require('./dependency-analyzer');
const SelfHealing = require('./self-healing');
const SystemReporter = require('./system-reporter');
const DocumentationLinker = require('./documentation-linker');

class SystemMonitor {
  constructor(projectRoot = '../..') {
    this.projectRoot = projectRoot;
    this.scanner = new FileScanner(projectRoot);
    this.analyzer = new DependencyAnalyzer(projectRoot);
    this.healer = new SelfHealing(projectRoot);
    this.reporter = new SystemReporter(projectRoot);
    this.docLinker = new DocumentationLinker(projectRoot);
    this.lastFullScan = null;
  }

  /**
   * 🔍 فحص شامل للنظام
   */
  async fullSystemCheck() {
    console.log('🔍 جاري الفحص الشامل للنظام...\n');

    try {
      // الخطوة 1: فحص الملفات
      console.log('1️⃣ فحص الملفات...');
      const scanResult = await this.scanner.scanComplete();
      console.log(`   ✅ تم فحص ${scanResult.files.length} ملف\n`);

      // الخطوة 2: تحليل التبعيات
      console.log('2️⃣ تحليل الروابط والتبعيات...');
      const dependencies = await this.analyzer.analyzeDependencies();
      console.log(`   ✅ تم اكتشاف ${dependencies.dead.length} ملف ميت\n`);

      // الخطوة 3: التشخيص
      console.log('3️⃣ تشخيص المشاكل...');
      const diagnosis = await this.healer.diagnose();
      console.log(`   ✅ عدد المشاكل: ${diagnosis.issues.length}\n`);

      // الخطوة 4: توثيق الروابط
      console.log('4️⃣ ربط التوثيق...');
      const docs = await this.docLinker.buildDocumentationMap();
      console.log(`   ✅ تم بناء خريطة التوثيق\n`);

      // الخطوة 5: إنشاء التقرير
      console.log('5️⃣ إنشاء التقرير الشامل...');
      const report = await this.reporter.generateReport(scanResult, dependencies, diagnosis);
      console.log(`   ✅ تم إنشاء التقرير\n`);

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

      return this.lastFullScan.results;
    } catch (error) {
      console.error('❌ خطأ أثناء الفحص:', error.message);
      return null;
    }
  }

  /**
   * 🩹 تطبيق الإصلاحات التلقائية
   */
  async autoHeal() {
    console.log('\n🩹 تطبيق الإصلاحات التلقائية...\n');

    try {
      const fixes = await this.healer.applyAutoFixes();
      
      console.log('✅ الإصلاحات المطبقة:');
      fixes.forEach(fix => console.log(`   ${fix}`));

      return {
        success: true,
        applied: fixes.length,
        fixes: fixes
      };
    } catch (error) {
      console.error('❌ خطأ:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * 📊 عرض ملخص الصحة
   */
  displayHealthSummary(report) {
    if (!report) return;

    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║        📊 ملخص صحة النظام                        ║');
    console.log('╚════════════════════════════════════════════════════╝\n');

    console.log(`🏥 الحالة: ${report.summary.status.toUpperCase()}`);
    console.log(`📈 درجة الصحة: ${report.summary.health}%\n`);

    console.log('📊 الإحصائيات:');
    console.log(`  • الملفات الكلية: ${report.summary.totalFiles}`);
    console.log(`  • الملفات المستخدمة: ${report.summary.usedFiles}`);
    console.log(`  • الملفات الميتة: ${report.summary.deadFiles}`);
    console.log(`  • الملفات المكررة: ${report.summary.duplicates}`);
    console.log(`  • المشاكل: ${report.summary.issues}\n`);

    console.log('💡 أهم التوصيات:');
    report.recommendations.slice(0, 3).forEach((rec, i) => {
      console.log(`  ${i + 1}. [${rec.priority}] ${rec.title}`);
      console.log(`     → ${rec.description}`);
    });

    console.log('\n');
  }

  /**
   * 🔄 مراقبة مستمرة
   */
  async continuousMonitoring(intervalMinutes = 60) {
    console.log(`\n🔄 بدء المراقبة المستمرة (كل ${intervalMinutes} دقيقة)\n`);

    setInterval(async () => {
      console.log(`\n⏰ فحص دوري: ${new Date().toLocaleString('ar-SA')}`);
      await this.fullSystemCheck();
    }, intervalMinutes * 60 * 1000);
  }

  /**
   * 📧 التقرير النهائي
   */
  async generateFinalReport() {
    if (!this.lastFullScan) {
      await this.fullSystemCheck();
    }

    const results = this.lastFullScan.results;

    // حفظ التقرير JSON
    const jsonReport = this.reporter.saveReport(results.report);
    console.log(`\n${jsonReport.message}`);

    // حفظ الملخص النصي
    const textReport = this.reporter.saveSummary(results.report);
    if (textReport.success) {
      console.log(`✅ تم حفظ الملخص النصي: ${textReport.path}`);
    }

    // طباعة الملخص
    this.reporter.printSummary(results.report);

    return {
      jsonReport: jsonReport.path,
      textReport: textReport.path || null,
      report: results.report
    };
  }

  /**
   * 🚀 الاستخدام السريع
   */
  async quickCheck() {
    console.log('⚡ فحص سريع للنظام\n');

    try {
      const scanResult = await this.scanner.scanComplete();
      const diagnosis = await this.healer.diagnose();

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
  const monitor = new SystemMonitor();

  (async () => {
    const results = await monitor.fullSystemCheck();
    monitor.displayHealthSummary(results?.report);
    await monitor.autoHeal();
    await monitor.generateFinalReport();
  })();
}

module.exports = SystemMonitor;
