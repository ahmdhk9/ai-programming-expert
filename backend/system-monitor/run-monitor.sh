#!/bin/bash

# 🎯 System Monitor - CLI Runner
# استخدام: ./run-monitor.sh [full|quick|heal|report|watch]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/../.."

# الألوان
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# الدالات
run_full_check() {
  echo -e "${BLUE}🔍 فحص شامل للنظام${NC}\n"
  node "$SCRIPT_DIR/system-monitor.js"
}

run_quick_check() {
  echo -e "${BLUE}⚡ فحص سريع${NC}\n"
  node -e "
    const SystemMonitor = require('./system-monitor.js');
    const monitor = new SystemMonitor();
    monitor.quickCheck().then(result => {
      console.log(JSON.stringify(result, null, 2));
    });
  "
}

run_heal() {
  echo -e "${BLUE}🩹 الإصلاح الذاتي${NC}\n"
  node -e "
    const SystemMonitor = require('./system-monitor.js');
    const monitor = new SystemMonitor();
    monitor.autoHeal().then(result => {
      console.log(JSON.stringify(result, null, 2));
    });
  "
}

run_report() {
  echo -e "${BLUE}📊 إنشاء التقرير${NC}\n"
  node -e "
    const SystemMonitor = require('./system-monitor.js');
    const monitor = new SystemMonitor();
    monitor.generateFinalReport();
  "
}

run_watch() {
  echo -e "${BLUE}🔄 المراقبة المستمرة${NC}\n"
  node -e "
    const SystemMonitor = require('./system-monitor.js');
    const monitor = new SystemMonitor();
    monitor.continuousMonitoring(5);
  "
}

# الخيارات الرئيسية
case "${1:-full}" in
  full)
    run_full_check
    ;;
  quick)
    run_quick_check
    ;;
  heal)
    run_heal
    ;;
  report)
    run_report
    ;;
  watch)
    run_watch
    ;;
  *)
    echo "Usage: $0 [full|quick|heal|report|watch]"
    echo ""
    echo "full   - فحص شامل للنظام"
    echo "quick  - فحص سريع"
    echo "heal   - إصلاح ذاتي"
    echo "report - إنشاء تقرير"
    echo "watch  - مراقبة مستمرة"
    ;;
esac
