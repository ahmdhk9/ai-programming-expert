import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  response: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ response: "", error: "Method not allowed" });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ response: "", error: "No message provided" });
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

    const response = await fetch(`${backendUrl}/api/agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: history || [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({ response: data.response || "تمت معالجة الطلب" });
  } catch (error) {
    console.error("Agent API Error:", error);
    
    // استجابة ذكية بدون Backend
    return res.status(200).json({
      response: getSmartResponse(message),
    });
  }
}

function getSmartResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (
    lowerMsg.includes("كود") ||
    lowerMsg.includes("برمج") ||
    lowerMsg.includes("function")
  ) {
    return "📝 **كتابة الكود الذكي**\n\nيمكنني كتابة:\n• React/Vue Components\n• API Endpoints (Express/Next.js)\n• Database Queries (Firestore/SQL)\n• Unit Tests & Integration Tests\n\nأخبرني ما تريد وسأكتبه لك! 💻";
  }

  if (lowerMsg.includes("خطأ") || lowerMsg.includes("bug") || lowerMsg.includes("مشكلة")) {
    return "🐛 **تصحيح الأخطاء**\n\nأستطيع:\n• تحليل رسائل الخطأ\n• تتبع مصدر المشكلة\n• اقتراح الحلول\n• كتابة الكود الصحيح\n\nأخبرني عن الخطأ الذي تواجهه! 🔍";
  }

  if (lowerMsg.includes("نشر") || lowerMsg.includes("deploy") || lowerMsg.includes("production")) {
    return "🚀 **النشر الذكي**\n\nأتولى:\n• إعداد CI/CD Workflows\n• اختيار البيئة المناسبة (Vercel/Fly.io/AWS)\n• التعامل مع المتغيرات البيئية\n• مراقبة الـ Deployment\n\nمتى تريد النشر؟ 🌍";
  }

  if (
    lowerMsg.includes("معمار") ||
    lowerMsg.includes("design") ||
    lowerMsg.includes("architecture")
  ) {
    return "🏗️ **تصميم المعمارية**\n\nأقترح:\n• Microservices vs Monolithic\n• Frontend/Backend Separation\n• Database Design\n• Scalability Patterns\n\nما نوع المشروع الذي تخطط له؟ 📐";
  }

  if (lowerMsg.includes("اختبار") || lowerMsg.includes("test") || lowerMsg.includes("testing")) {
    return "🧪 **الاختبار التلقائي**\n\nأكتب:\n• Unit Tests (Jest/Vitest)\n• Integration Tests\n• E2E Tests (Cypress)\n• Test Coverage Reports\n\nأي نوع من الاختبارات تريد؟ ✅";
  }

  if (lowerMsg.includes("أداء") || lowerMsg.includes("performance") || lowerMsg.includes("optimization")) {
    return "📊 **تحسين الأداء**\n\nأحلل:\n• Bottlenecks في الكود\n• Database Query Optimization\n• Frontend Performance (Lighthouse)\n• Memory Leaks\n\nأرسل لي الكود أو الرابط! ⚡";
  }

  if (lowerMsg.includes("أمان") || lowerMsg.includes("security") || lowerMsg.includes("safe")) {
    return "🔒 **الأمان بالتصميم**\n\nأوفر:\n• Security Audits\n• Protection من SQL Injection\n• Authentication/Authorization\n• Encryption Best Practices\n\nما الذي تقلق بشأنه؟ 🛡️";
  }

  if (lowerMsg.includes("مساعدة") || lowerMsg.includes("help") || lowerMsg.includes("شرح")) {
    return "👋 **كيفية استخدام الخبير البرمجي**\n\nيمكنك طلب:\n📝 كتابة كود جديد\n🐛 تصحيح الأخطاء\n🏗️ تصميم المعمارية\n🧪 كتابة الاختبارات\n🚀 نشر التطبيق\n📊 تحليل الأداء\n🔒 تحسين الأمان\n\nما الذي تريد الآن؟ 🚀";
  }

  return "✨ **الخبير البرمجي الذكي**\n\nأنا هنا للمساعدة في:\n📝 كتابة الكود\n🐛 إصلاح الأخطاء\n🏗️ تصميم الأنظمة\n🧪 الاختبار\n🚀 النشر\n📊 التحسين\n🔒 الأمان\n\nأخبرني كيف يمكنني مساعدتك! 💡";
}
