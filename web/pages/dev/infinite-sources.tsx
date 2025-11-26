import React from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function InfiniteSources() {
  return (
    <SmoothLayout title="♾️ مصادر دخل لانهائية" subtitle="نظام ديناميكي يولد ملايين المصادر">
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>🚀 النظام اللانهائي</h2>
        <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>توليد ذكي لمليارات مصادر الدخل بشكل تلقائي</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
          <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>المصادر</div><div style={{ fontSize: "2rem", fontWeight: "bold" }}>♾️</div></div>
          <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>النمو</div><div style={{ fontSize: "2rem", fontWeight: "bold" }}>📈📈📈</div></div>
          <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>الذكاء</div><div style={{ fontSize: "2rem", fontWeight: "bold" }}>🧠✨</div></div>
        </div>
      </div>
    </SmoothLayout>
  );
}
