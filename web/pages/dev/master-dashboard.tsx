import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function MasterDashboard() {
  const [data] = useState({
    monthly: 2896570,
    yearly: 34758840,
    tools: 58,
    platforms: 12,
    streams: 28,
    growth: '+85%'
  });

  return (
    <SmoothLayout title="🏆 لوحة التحكم الرئيسية" subtitle="كل الأنظمة موحدة ومدمجة">
      {/* الإحصائيات الرئيسية */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>الأرباح الشهرية</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>$2.9M</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)", color: "white", padding: "2rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>الأرباح السنوية</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>$34.7M</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)", color: "white", padding: "2rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>معدل النمو</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>{data.growth}</div>
        </div>
      </div>

      {/* الأنظمة النشطة */}
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0, color: "#667eea" }}>⚙️ الأنظمة النشطة</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          {[
            { icon: "🔬", name: "البحث العالمي", count: 500 },
            { icon: "🤖", name: "AI متقدم", count: 1500 },
            { icon: "💰", name: "تجميع أرباح", count: 28 },
            { icon: "🔗", name: "منصات عالمية", count: 12 },
            { icon: "💎", name: "ربح فوري", count: 10 },
            { icon: "📢", name: "ترويج ذكي", count: 2 },
            { icon: "🚀", name: "نمو ذاتي", count: 87 },
            { icon: "🏦", name: "دفع وسحب", count: 4 }
          ].map((s, i) => (
            <div key={i} style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{s.name}</div>
              <div style={{ color: "#667eea", fontWeight: "bold", marginTop: "0.5rem" }}>+{s.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* مصادر الأرباح */}
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
        <h3 style={{ marginTop: 0, color: "#667eea" }}>💰 28 مصدر أرباح</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {[
            "✅ الأنظمة الفورية",
            "✅ 12 منصة عالمية",
            "✅ مشاريع وبوتات",
            "✅ شراكات استراتيجية",
            "✅ ترويج سري وعلني",
            "✅ بحث عالمي 24/7",
            "✅ 10 أفكار قوية",
            "✅ 7 أفكار ذكية",
            "✅ تجميع دقيق",
            "✅ عملات رقمية",
            "✅ اشتراكات متكررة",
            "✅ إحالات وعمولات",
            "✅ مراجحة لحظية",
            "✅ بيع بيانات",
            "✅ ألعاب دقيقة",
            "✅ بث حي",
            "✅ استئجار طاقة",
            "✅ اختبار برامج",
            "✅ محتوى متوازي",
            "✅ إحالات متسلسلة",
            "✅ تنبيهات ذكية",
            "✅ دفع مجزأ",
            "✅ وقت ضائع",
            "✅ استهلاك طاقة",
            "✅ بيانات مجهولة",
            "✅ إشعارات",
            "✅ حل مشاكل",
            "✅ استثمار ذكي"
          ].map((s, i) => (
            <div key={i} style={{ padding: "0.75rem", fontSize: "0.95rem" }}>{s}</div>
          ))}
        </div>
      </div>
    </SmoothLayout>
  );
}
