import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function ReferralMarketing() {
  return (
    <SmoothLayout title="🤝 الإحالات" subtitle="شارك واكسب 20%">
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: "0 0 1rem 0" }}>كودك الخاص: REF_ABC123</h2>
        <button style={{ padding: "0.75rem 1.5rem", background: "white", color: "#667eea", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          📋 نسخ
        </button>
      </div>
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
        <div style={{ padding: "1rem", background: "#f5f5f5", borderRadius: "8px", marginBottom: "1rem" }}>
          <strong>إحالات هذا الشهر:</strong> 125 شخص
        </div>
        <div style={{ padding: "1rem", background: "#f5f5f5", borderRadius: "8px" }}>
          <strong>الأرباح:</strong> <span style={{ color: "#4CAF50", fontWeight: "bold" }}>$2,500</span>
        </div>
      </div>
    </SmoothLayout>
  );
}
