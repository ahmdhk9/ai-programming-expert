import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function MarketingEngine() {
  return (
    <SmoothLayout title="📢 محرك الترويج" subtitle="ترويج سري + علني ذكي">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div style={{ background: "#f0f0f0", padding: "2rem", borderRadius: "12px" }}>
          <h3 style={{ margin: 0, color: "#666" }}>🤫 سري (35% لك)</h3>
          <p style={{ color: "#666" }}>• رسائل مخفية<br/>• بدون كشف الهوية<br/>• 500K وصول<br/>• $125K/شهر</p>
        </div>
        <div style={{ background: "#f0f4ff", padding: "2rem", borderRadius: "12px" }}>
          <h3 style={{ margin: 0, color: "#667eea" }}>📣 علني (25% لك)</h3>
          <p style={{ color: "#667eea" }}>• حملات معروفة<br/>• موثوقة وآمنة<br/>• 2M وصول<br/>• $75K/شهر</p>
        </div>
      </div>
    </SmoothLayout>
  );
}
