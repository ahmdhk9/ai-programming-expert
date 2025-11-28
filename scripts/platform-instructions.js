#!/usr/bin/env node

/**
 * 🎯 UNIFIED PLATFORM INSTRUCTIONS
 * تعليمات موحدة لكل المنصات والعمليات
 */

const instructions = {
  vercel: {
    name: 'Vercel (Frontend)',
    token: 'VERCEL_TOKEN',
    endpoints: ['https://ai-programming-expert-ppgxu0wcr.vercel.app'],
    healthCheck: '/health',
    buildCommand: 'mkdir -p .vercel/output/static && cp -r public/* .vercel/output/static/',
    deployCommand: 'vercel deploy --token $VERCEL_TOKEN --prod',
    preChecks: [
      'Verify vercel.json exists',
      'Check buildCommand is correct',
      'Validate public files exist',
      'Confirm VERCEL_TOKEN is set'
    ],
    postChecks: [
      'Verify deployment URL is accessible',
      'Check health endpoint responds',
      'Validate frontend loads correctly',
      'Test API connectivity'
    ]
  },

  fly: {
    name: 'Fly.io (Backend)',
    token: 'FLY_API_TOKEN',
    endpoints: ['https://agent-backend-ahmd1.fly.dev'],
    healthCheck: '/api/health',
    deployCommand: 'flyctl deploy --token $FLY_API_TOKEN',
    preChecks: [
      'Verify fly.toml exists',
      'Check backend/server.js is valid',
      'Confirm PORT=8000 in env',
      'Validate FLY_API_TOKEN is set'
    ],
    postChecks: [
      'Verify deployment completed',
      'Check health endpoint responds',
      'Validate API endpoints work',
      'Test database connection'
    ]
  },

  firebase: {
    name: 'Firebase (Hosting)',
    token: 'FIREBASE_CONFIG',
    endpoints: ['https://ai-programming-expert.firebaseapp.com'],
    healthCheck: '/',
    deployCommand: 'firebase deploy --token $FIREBASE_CONFIG',
    preChecks: [
      'Verify firebase.json exists',
      'Check public folder has content',
      'Confirm FIREBASE_CONFIG is set',
      'Validate project ID'
    ],
    postChecks: [
      'Verify deployment completed',
      'Check hosting URL is accessible',
      'Validate static files loaded',
      'Test redirects and rewrites'
    ]
  }
};

const agentInstructions = {
  monitor: {
    role: 'المراقب - Monitor Agent',
    tasks: [
      'فحص حالة كل المنصات الثلاثة',
      'اختبار endpoints الصحية',
      'قياس response times',
      'تتبع error rates',
      'كشف التوقف والمشاكل'
    ],
    interval: 300000, // 5 دقائق
    reportTo: 'coordinator'
  },

  analyzer: {
    role: 'المحلل - Analyzer Agent',
    tasks: [
      'تحليل البيانات من Monitor',
      'كشف الأنماط والمشاكل',
      'تصنيف الأولويات',
      'اقتراح الحلول',
      'التنبؤ بالمشاكل المستقبلية'
    ],
    interval: 600000, // 10 دقائق
    reportTo: 'coordinator'
  },

  fixer: {
    role: 'المصلح - Fixer Agent',
    tasks: [
      'تطبيق الإصلاحات التلقائية',
      'إعادة تشغيل الخدمات',
      'تحديث الإعدادات',
      'تصحيح الأخطاء',
      'التحقق من الإصلاحات'
    ],
    interval: 900000, // 15 دقائق
    reportTo: 'coordinator'
  },

  reporter: {
    role: 'المقرر - Reporter Agent',
    tasks: [
      'جمع جميع التقارير',
      'إنشاء ملخصات شاملة',
      'رفع على GitHub',
      'إرسال الإشعارات',
      'أرشفة البيانات'
    ],
    interval: 1800000, // 30 دقائق
    reportTo: 'coordinator'
  },

  coordinator: {
    role: 'المنسق - Coordinator Agent',
    tasks: [
      'تنسيق بين جميع الوكلاء',
      'إدارة التقارير المشتركة',
      'اتخاذ القرارات',
      'إصدار الأوامر',
      'مراقبة الأداء العام'
    ],
    interval: 1800000, // 30 دقائق
    reportTo: null
  }
};

const processInstructions = {
  deployment: {
    name: 'عملية النشر',
    steps: [
      {
        phase: 1,
        name: 'Pre-Deployment Checks',
        actions: [
          'فحص جميع المنصات',
          'التحقق من التوكنات',
          'اختبار الاتصالات',
          'جمع البيانات الأساسية'
        ]
      },
      {
        phase: 2,
        name: 'Deploy to Vercel',
        actions: [
          'نسخ الملفات الثابتة',
          'تشغيل buildCommand',
          'نشر على Vercel',
          'اختبار Frontend'
        ]
      },
      {
        phase: 3,
        name: 'Deploy to Fly.io',
        actions: [
          'تحديث البيئة',
          'تشغيل الاختبارات',
          'نشر على Fly.io',
          'اختبار Backend'
        ]
      },
      {
        phase: 4,
        name: 'Deploy to Firebase',
        actions: [
          'تحضير الملفات',
          'تشغيل الاختبارات',
          'نشر على Firebase',
          'اختبار Hosting'
        ]
      },
      {
        phase: 5,
        name: 'Post-Deployment Validation',
        actions: [
          'اختبار شامل',
          'التحقق من الأداء',
          'التحقق من الأمان',
          'كتابة التقرير'
        ]
      }
    ]
  },

  monitoring: {
    name: 'عملية المراقبة',
    frequency: 'كل 5 دقائق',
    checks: [
      'فحص الصحة العامة',
      'قياس الأداء',
      'كشف الأخطاء',
      'تتبع الموارد',
      'تسجيل الأحداث'
    ]
  },

  recovery: {
    name: 'عملية الاستعادة',
    triggers: [
      'اكتشاف خطأ حرج',
      'توقف الخدمة',
      'فشل النشر',
      'مشكلة الأداء'
    ],
    steps: [
      'وقف الخدمة المتأثرة',
      'تحديد المشكلة',
      'تطبيق الحل',
      'إعادة تشغيل الخدمة',
      'التحقق والتوثيق'
    ]
  }
};

class PlatformInstructionsManager {
  getPlatformInfo(platform) {
    return instructions[platform] || null;
  }

  getAgentInstructions(agent) {
    return agentInstructions[agent] || null;
  }

  getProcessInstructions(process) {
    return processInstructions[process] || null;
  }

  getAllPlatforms() {
    return Object.keys(instructions);
  }

  getAllAgents() {
    return Object.keys(agentInstructions);
  }

  getAllProcesses() {
    return Object.keys(processInstructions);
  }

  printFullInstructions() {
    console.log('\n' + '═'.repeat(70));
    console.log('📋 UNIFIED PLATFORM INSTRUCTIONS');
    console.log('═'.repeat(70) + '\n');

    console.log('🌐 PLATFORMS:\n');
    Object.entries(instructions).forEach(([key, info]) => {
      console.log(`${key.toUpperCase()}: ${info.name}`);
      console.log(`  ✅ Token: ${info.token}`);
      console.log(`  ✅ Endpoints: ${info.endpoints.join(', ')}`);
      console.log(`  ✅ Health Check: ${info.healthCheck}\n`);
    });

    console.log('\n🧠 AGENTS:\n');
    Object.entries(agentInstructions).forEach(([key, info]) => {
      console.log(`${key.toUpperCase()}: ${info.role}`);
      console.log(`  ✅ Tasks: ${info.tasks.length}`);
      console.log(`  ✅ Interval: ${info.interval}ms\n`);
    });

    console.log('\n⚙️ PROCESSES:\n');
    Object.entries(processInstructions).forEach(([key, info]) => {
      console.log(`${key.toUpperCase()}: ${info.name}`);
      if (info.steps) console.log(`  ✅ Steps: ${info.steps.length}`);
      else console.log(`  ✅ Frequency: ${info.frequency}\n`);
    });

    console.log('═'.repeat(70) + '\n');
  }
}

module.exports = { PlatformInstructionsManager, instructions, agentInstructions, processInstructions };
