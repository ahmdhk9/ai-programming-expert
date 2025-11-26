import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function MicroEarnings() {
  return (
    <SmoothLayout title="💵 تجميع الأرباح" subtitle="كل فلس يُجمع وتراكم ذكي">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
          <h3 style={{ marginTop: 0, color: "#667eea" }}>💰 تجميع فوري</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ padding: "0.5rem 0", borderBottom: "1px solid #f0f0f0" }}>✅ حتى $0.0001</li>
            <li style={{ padding: "0.5rem 0", borderBottom: "1px solid #f0f0f0" }}>✅ جميع المصادر</li>
            <li style={{ padding: "0.5rem 0", borderBottom: "1px solid #f0f0f0" }}>✅ 25 عملة</li>
            <li style={{ padding: "0.5rem 0" }}>✅ تحويل ذكي</li>
          </ul>
        </div>
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px" }}>
          <h3 style={{ marginTop: 0 }}>📈 النمو</h3>
          <div style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}>$1,370/شهر</div>
          <p style={{ margin: 0 }}>من الأرباح الدقيقة فقط</p>
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
        <h3 style={{ marginTop: 0, color: "#667eea" }}>🚀 10 أفكار قوية جديدة</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {[
            { num: 1, name: "المراجحة اللحظي", earn: "$45K" },
            { num: 2, name: "بيع البيانات", earn: "$500K" },
            { num: 3, name: "الألعاب الدقيقة", earn: "$75K" },
            { num: 4, name: "البث الحي", earn: "$72K" },
            { num: 5, name: "استئجار الطاقة", earn: "$36K" },
            { num: 6, name: "اختبار البرامج", earn: "$75K" },
            { num: 7, name: "المحتوى المتوازي", earn: "$200K" },
            { num: 8, name: "الإحالات المتسلسلة", earn: "$150K" },
            { num: 9, name: "التنبيهات الذكية", earn: "$120K" },
            { num: 10, name: "الدفع المجزأ", earn: "$5K" }
          ].map(item => (
            <div key={item.num} style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
              <div style={{ fontWeight: "bold" }}>#{item.num} {item.name}</div>
              <div style={{ color: "#4CAF50", fontWeight: "bold", marginTop: "0.5rem" }}>+{item.earn}/شهر</div>
            </div>
          ))}
        </div>
      </div>
    </SmoothLayout>
  );
}
