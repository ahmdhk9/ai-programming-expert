import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function AutoGrowth() {
  return (
    <SmoothLayout title="🚀 النمو التلقائي" subtitle="يبحث ويطور 24/7">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        <div style={{ background: "#667eea", color: "white", padding: "2rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>87</div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>مشاريع نشطة</div>
        </div>
        <div style={{ background: "#4CAF50", color: "white", padding: "2rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>$215K</div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>إيرادات شهرية</div>
        </div>
        <div style={{ background: "#FF9800", color: "white", padding: "2rem", borderRadius: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>+35%</div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>نمو شهري</div>
        </div>
      </div>
    </SmoothLayout>
  );
}
