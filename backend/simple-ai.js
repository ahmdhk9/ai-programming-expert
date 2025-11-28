const fallbackResponses = [
  'حسناً، بناءً على خبرتي في البرمجة، أقترح عليك...',
  'سؤال ممتاز! الحل الأفضل هو...',
  'يمكنك استخدام React أو Vue.js لحل هذه المشكلة',
  'أنصحك بتقسيم الكود إلى وحدات صغيرة',
  'استخدم TypeScript لتحسين سلامة الكود',
  'جرب استخدام Git للتحكم في الإصدارات',
  'قم بكتابة اختبارات للتأكد من صحة الكود'
];

module.exports = () => fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
