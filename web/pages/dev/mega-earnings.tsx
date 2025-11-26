import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function MegaEarnings() {
  return (
    <SmoothLayout title="🏆 نظام الأرباح الضخم" subtitle="تجميع شامل من 28 مصدر">
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0, marginBottom: "1rem" }}>💰 الإجمالي الشامل النهائي</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>شهرياً</div><div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>$2.9M</div></div>
          <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>سنوياً</div><div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>$34.8M</div></div>
          <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>المصادر</div><div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>28</div></div>
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
        <h3 style={{ marginTop: 0, color: "#667eea" }}>7️⃣ أفكار قوية إضافية</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {[
            { name: "الوقت الضائع", earn: "$48K" },
            { name: "استهلاك الطاقة", earn: "$30K" },
            { name: "البيانات المجهولة", earn: "$200K" },
            { name: "الإشعارات", earn: "$75K" },
            { name: "حل المشاكل", earn: "$250K" },
            { name: "الاستثمار الذكي", earn: "$150K" },
            { name: "فجوات السوق", earn: "$120K" }
          ].map((item, i) => (
            <div key={i} style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{item.name}</div>
              <div style={{ color: "#4CAF50", fontWeight: "bold" }}>+{item.earn}/شهر</div>
            </div>
          ))}
        </div>
      </div>
    </SmoothLayout>
  );
}
