import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function SmartEarnings() {
  const [report] = useState({
    currentMonthly: 5250,
    projectedNext3: 13000,
    yearlyProjection: 262500,
    opportunities: [
      { feature: "إضافة اشتراك شهري", impact: "+280%", revenue: "+$2000/شهر", desc: "يمكنك إضافة نسخة بريميوم بـ $4.99/شهر" },
      { feature: "In-App Purchases", impact: "+200%", revenue: "+$1500/شهر", desc: "أضف عملات أو ميزات إضافية" },
      { feature: "رعايات وشراكات", impact: "+500%", revenue: "+$5000/شهر", desc: "تواصل مع الشركات الكبرى" }
    ],
    roadmap: [
      { month: "الآن", revenue: 5250, status: "✅" },
      { month: "الشهر 2", revenue: 8000, status: "📈" },
      { month: "الشهر 3", revenue: 13000, status: "🎯" },
      { month: "الشهر 6", revenue: 30000, status: "🚀" }
    ]
  });

  return (
    <SmoothLayout title="🚀 الأرباح الذكية" subtitle="AI يحسّب ويوصي بأفضل طرق الربح">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)", padding: "1.5rem", borderRadius: "12px", color: "white", textAlign: "center" }}>
          <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>الشهر الحالي</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "0.5rem" }}>${report.currentMonthly}</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)", padding: "1.5rem", borderRadius: "12px", color: "white", textAlign: "center" }}>
          <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>القادم 3 أشهر</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "0.5rem" }}>${report.projectedNext3}</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)", padding: "1.5rem", borderRadius: "12px", color: "white", textAlign: "center" }}>
          <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>السنة الأولى</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "0.5rem" }}>${report.yearlyProjection}</div>
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "2rem" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>💡 فرص ذهبية</h2>
        {report.opportunities.map((opp, idx) => (
          <div key={idx} style={{ padding: "1.5rem", background: "#f0f4ff", borderRadius: "8px", marginBottom: "1rem", borderLeft: "4px solid #667eea" }}>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#667eea" }}>✨ {opp.feature}</h4>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#666" }}>{opp.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "#999" }}>التأثير: {opp.impact}</span>
              <span style={{ fontWeight: "bold", color: "#4CAF50" }}>{opp.revenue}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>📈 خارطة الأرباح المتصاعدة</h2>
        {report.roadmap.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>{item.month} {item.status}</span>
              <strong>${item.revenue}</strong>
            </div>
            <div style={{ height: "8px", background: "#f0f0f0", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${(item.revenue / 30000) * 100}%`, height: "100%", background: "linear-gradient(90deg, #667eea, #764ba2)" }}></div>
            </div>
          </div>
        ))}
      </div>
    </SmoothLayout>
  );
}
