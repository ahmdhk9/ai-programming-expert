import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function ResearchEngine() {
  const [data] = useState({
    daily_discoveries: 500,
    implemented: 80,
    revenue: 350000,
    fields: 18,
    accuracy: 88
  });

  return (
    <SmoothLayout title="🔬 محرك البحث العالمي" subtitle="يبحث في كل العالم عن فرص الربح">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#667eea", color: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>اكتشافات يومية</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>{data.daily_discoveries}</div>
        </div>
        <div style={{ background: "#4CAF50", color: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>تطبيقات يومية</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>{data.implemented}</div>
        </div>
        <div style={{ background: "#FF9800", color: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>أرباح شهرية</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>${data.revenue / 1000}K</div>
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>🌍 18 مجال يبحث فيها</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {[
            "💻 التكنولوجيا", "💰 المال", "🎬 الترفيه", "📚 التعليم",
            "🏥 الصحة", "🛍️ E-commerce", "📱 وسائل التواصل", "🎮 الألعاب",
            "🤖 AI/ML", "⛓️ البلوكتشين", "✍️ المحتوى", "🔧 الخدمات",
            "⚙️ الأتمتة", "📊 البيانات", "📢 التسويق", "💼 الاستشارات",
            "💾 البرمجيات", "🌱 الاستدامة"
          ].map((field, i) => (
            <div key={i} style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
              {field}
            </div>
          ))}
        </div>
      </div>
    </SmoothLayout>
  );
}
