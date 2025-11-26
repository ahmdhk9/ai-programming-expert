// نظام التوجيه والتتبع الحقيقي للأرباح

class GuidedEarning {
  constructor() {
    this.userProgress = {};
    this.platforms = this.initializePlatformsWithSteps();
  }

  initializePlatformsWithSteps() {
    return {
      medium: {
        name: 'Medium',
        icon: '✍️',
        earning: 1,
        steps: [
          { id: 1, title: 'زيارة الموقع', url: 'https://medium.com', description: 'افتح الموقع الرسمي' },
          { id: 2, title: 'إنشاء حساب', description: 'سجل ببريدك أو Google' },
          { id: 3, title: 'تفعيل العضوية', description: 'اكمل التحقق من البريد' },
          { id: 4, title: 'كتابة أول مقالة', description: 'انشر مقالة واحدة (500+ كلمة)' },
          { id: 5, title: 'الانضمام للبرنامج', description: 'فعّل برنامج الشركاء' }
        ]
      },
      youtube: {
        name: 'YouTube',
        icon: '📺',
        earning: 5,
        steps: [
          { id: 1, title: 'إنشاء قناة', url: 'https://youtube.com', description: 'أنشئ قناة جديدة' },
          { id: 2, title: 'تحميل فيديو', description: 'حمّل فيديو واحد (5+ دقائق)' },
          { id: 3, title: 'الحصول على 1000 مشترك', description: 'اجمع 1000 مشترك و 4000 ساعة مشاهدة' },
          { id: 4, title: 'تفعيل المصادقة', description: 'وافق على شروط YouTube' },
          { id: 5, title: 'ربط AdSense', description: 'ربط حساب AdSense الخاص بك' }
        ]
      },
      fiverr: {
        name: 'Fiverr',
        icon: '💼',
        earning: 20,
        steps: [
          { id: 1, title: 'فتح الحساب', url: 'https://fiverr.com', description: 'سجل حساب بائع' },
          { id: 2, title: 'إكمال الملف الشخصي', description: 'أضف صورة وسيرة ذاتية' },
          { id: 3, title: 'إنشاء خدمة', description: 'أضف خدمة واحدة على الأقل' },
          { id: 4, title: 'التحقق من الهوية', description: 'أكمل التحقق بـ ID' },
          { id: 5, title: 'أول طلب', description: 'أكمل أول عملية بيع' }
        ]
      },
      upwork: {
        name: 'Upwork',
        icon: '👨‍💼',
        earning: 25,
        steps: [
          { id: 1, title: 'إنشاء حساب', url: 'https://upwork.com', description: 'سجل كعامل مستقل' },
          { id: 2, title: 'بناء الملف الشخصي', description: 'أضف مهاراتك والخبرة' },
          { id: 3, title: 'التحقق', description: 'أكمل التحقق من الجوال والبريد' },
          { id: 4, title: 'التقديم على عروض', description: 'قدّم على 5 عروض عمل' },
          { id: 5, title: 'أول عقد', description: 'أكمل عقد واحد بنجاح' }
        ]
      },
      swagbucks: {
        name: 'Swagbucks',
        icon: '🎮',
        earning: 0.5,
        steps: [
          { id: 1, title: 'التسجيل', url: 'https://swagbucks.com', description: 'أنشئ حساب مجاني' },
          { id: 2, title: 'تفعيل البريد', description: 'تحقق من بريدك' },
          { id: 3, title: 'أول استطلاع', description: 'أكمل استطلاع واحد' },
          { id: 4, title: 'مشاهدة فيديوهات', description: 'شاهد 5 فيديوهات' },
          { id: 5, title: 'اجمع 100 نقطة', description: 'اجمع أول 100 نقطة (= $1)' }
        ]
      }
    };
  }

  // بدء متابعة مستخدم
  startTracking(userId) {
    if (!this.userProgress[userId]) {
      this.userProgress[userId] = {
        userId,
        startDate: Date.now(),
        completedSteps: [],
        totalEarnings: 0,
        platforms: {}
      };
    }
    return this.userProgress[userId];
  }

  // تسجيل إكمال خطوة
  completeStep(userId, platformId, stepId) {
    if (!this.userProgress[userId]) this.startTracking(userId);
    
    const platform = this.platforms[platformId];
    if (!platform) return { error: 'منصة غير موجودة' };

    const step = platform.steps.find(s => s.id === stepId);
    if (!step) return { error: 'خطوة غير موجودة' };

    const stepKey = `${platformId}_${stepId}`;
    
    if (!this.userProgress[userId].completedSteps.includes(stepKey)) {
      this.userProgress[userId].completedSteps.push(stepKey);
      
      // إضافة الأرباح عند إكمال المرحلة 5
      if (stepId === 5) {
        this.userProgress[userId].totalEarnings += platform.earning;
        this.userProgress[userId].platforms[platformId] = 'completed';
      }
    }

    return {
      success: true,
      platform: platform.name,
      step: step.title,
      earning: stepId === 5 ? platform.earning : 0,
      totalEarnings: this.userProgress[userId].totalEarnings
    };
  }

  // الحصول على الخطوات التالية للمستخدم
  getNextSteps(userId) {
    if (!this.userProgress[userId]) this.startTracking(userId);

    const platformList = [];
    for (const [platformId, platform] of Object.entries(this.platforms)) {
      let nextStep = 1;
      
      for (let i = 1; i <= 5; i++) {
        const stepKey = `${platformId}_${i}`;
        if (!this.userProgress[userId].completedSteps.includes(stepKey)) {
          nextStep = i;
          break;
        }
      }

      platformList.push({
        id: platformId,
        name: platform.name,
        icon: platform.icon,
        nextStep: platform.steps[nextStep - 1],
        progress: (nextStep - 1) * 20,
        earning: platform.earning,
        completionPercentage: ((nextStep - 1) / 5) * 100
      });
    }

    return platformList;
  }

  // الحصول على الإحصائيات
  getStats(userId) {
    if (!this.userProgress[userId]) this.startTracking(userId);

    const user = this.userProgress[userId];
    const totalStepsCompleted = user.completedSteps.length;
    const platformsCompleted = Object.keys(user.platforms).length;

    return {
      totalEarnings: user.totalEarnings.toFixed(2),
      stepsCompleted: totalStepsCompleted,
      platformsCompleted,
      nextMilestone: (platformsCompleted + 1) * 20 + '$',
      estimatedDailyEarning: (user.totalEarnings * 5).toFixed(2),
      estimatedMonthlyEarning: (user.totalEarnings * 150).toFixed(2)
    };
  }
}

module.exports = new GuidedEarning();
