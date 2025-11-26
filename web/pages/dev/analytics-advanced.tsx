import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function AdvancedAnalytics() {
  return (
    <SmoothLayout title="📊 تحليلات" subtitle="بيانات ذكية للقرارات">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { label: "الإيرادات", value: "$175/يوم" },
          { label: "المستخدمون", value: "5000" },
          { label: "التحويل", value: "12%" },
          { label: "القيمة", value: "$120" }
        ].map((m, i) => (
          <div key={i} style={{ background: "#f0f4ff", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "0.85rem", color: "#999" }}>{m.label}</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "0.5rem" }}>{m.value}</div>
          </div>
        ))}
      </div>
    </SmoothLayout>
  );
}
