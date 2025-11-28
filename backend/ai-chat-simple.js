// ==========================================
// Simple AI Chat Handler (fallback)
// ==========================================

const defaultResponses = {
  'كود': 'يمكنك استخدام JavaScript أو Python لكتابة الكود. ما نوع الكود الذي تريده؟',
  'خطأ': 'يمكنني مساعدتك في إصلاح الخطأ. هل تستطيع نسخ رسالة الخطأ؟',
  'واجهة': 'تصميم الواجهات الحديثة يتطلب HTML + CSS + JavaScript. أي إطار عمل تفضل؟',
  'مفهوم': 'سأشرح لك المفهوم بطريقة بسيطة وسهلة الفهم.',
  'نشر': 'يمكنك نشر التطبيق على Vercel أو Netlify أو AWS.',
  'default': 'سؤال جيد! دعني أساعدك بشأن هذا.'
};

function getAIResponse(message) {
  const lower = message.toLowerCase();
  
  for (const [key, response] of Object.entries(defaultResponses)) {
    if (key !== 'default' && lower.includes(key)) {
      return {
        reply: response,
        quality: 0.85,
        model: 'Fallback',
        time: 100
      };
    }
  }
  
  return {
    reply: defaultResponses.default,
    quality: 0.8,
    model: 'Fallback',
    time: 100
  };
}

module.exports = { getAIResponse };
