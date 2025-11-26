import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function PaymentIntegration() {
  return (
    <SmoothLayout title="💳 بوابات الدفع" subtitle="تحويل سلس للأموال">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
        {["🔵 Stripe", "🅿️ PayPal", "📱 محافظ", "₿ عملات"].map((name, i) => (
          <div key={i} style={{ background: "white", padding: "2rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{name.split(" ")[0]}</div>
            <h3 style={{ color: "#667eea" }}>{name.split(" ")[1]}</h3>
            <p style={{ margin: 0, color: "#4CAF50" }}>✅ متصل</p>
          </div>
        ))}
      </div>
    </SmoothLayout>
  );
}
