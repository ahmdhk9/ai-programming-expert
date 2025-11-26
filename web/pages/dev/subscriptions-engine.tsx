import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function SubscriptionsEngine() {
  return (
    <SmoothLayout title="🔄 الاشتراكات" subtitle="دفع متكرر تلقائي">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
        <div style={{ background: "#667eea", color: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem" }}>نشط</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>125</div>
        </div>
        <div style={{ background: "#4CAF50", color: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem" }}>دخل شهري</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>$12.5K</div>
        </div>
        <div style={{ background: "#2196F3", color: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem" }}>احتفاظ</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>97%</div>
        </div>
      </div>
    </SmoothLayout>
  );
}
