import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function PublishingStages() {
  const [stages] = useState([
    { id: 1, name: "التطوير", icon: "🛠️", status: "current", color: "#667eea" },
    { id: 2, name: "الاختبار", icon: "✅", status: "next", color: "#FF9800" },
    { id: 3, name: "App Store", icon: "🍎", status: "locked", color: "#999", cost: "$99/سنة" },
    { id: 4, name: "Google Play", icon: "🤖", status: "locked", color: "#999", cost: "$25 لمرة" },
    { id: 5, name: "متجر بلي", icon: "📦", status: "locked", color: "#999", cost: "مجاني" },
    { id: 6, name: "متجرك", icon: "🌐", status: "available", color: "#4CAF50", cost: "مجاني" }
  ]);

  return (
    <SmoothLayout title="📱 مراحل النشر" subtitle="اختر أين تريد نشر تطبيقك">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
        {stages.map((stage, idx) => (
          <div
            key={stage.id}
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              animation: `slideIn 0.5s ease-out ${idx * 100}ms both`,
              borderTop: `4px solid ${stage.color}`,
              opacity: stage.status === "locked" ? 0.6 : 1,
              cursor: stage.status === "available" ? "pointer" : "default"
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{stage.icon}</div>
            <h3 style={{ margin: 0, color: stage.color }}>{stage.name}</h3>
            {stage.cost && <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", color: "#666" }}>{stage.cost}</p>}
            
            {stage.status === "current" && <span style={{ display: "inline-block", marginTop: "1rem", padding: "0.5rem 1rem", background: "#667eea", color: "white", borderRadius: "20px", fontSize: "0.85rem" }}>✅ حالياً</span>}
            {stage.status === "next" && <span style={{ display: "inline-block", marginTop: "1rem", padding: "0.5rem 1rem", background: "#FF9800", color: "white", borderRadius: "20px", fontSize: "0.85rem" }}>⏭️ التالي</span>}
            {stage.status === "locked" && <span style={{ display: "inline-block", marginTop: "1rem", padding: "0.5rem 1rem", background: "#999", color: "white", borderRadius: "20px", fontSize: "0.85rem" }}>🔒 مقفول</span>}
            {stage.status === "available" && <button style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", background: "#4CAF50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>النشر الآن</button>}
          </div>
        ))}
      </div>
    </SmoothLayout>
  );
}
