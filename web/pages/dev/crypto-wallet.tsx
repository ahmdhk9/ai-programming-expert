import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function CryptoWallet() {
  const [wallet] = useState({
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f",
    balance: 125000,
    daily: 125,
    monthly: 3750,
    yearly: 45000,
    status: "🟢 يعمل 24/7"
  });

  return (
    <SmoothLayout title="💎 المحفظة الذكية" subtitle="أرباح تلقائية بدون تدخل">
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>📍 عنوان محفظتك:</h2>
        <code style={{ display: "block", marginTop: "1rem", background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", wordBreak: "break-all" }}>{wallet.address}</code>
        <button style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "white", color: "#667eea", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>📋 نسخ</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#f0f4ff", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#667eea", fontSize: "0.85rem" }}>الرصيد الحالي</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", marginTop: "0.5rem" }}>${wallet.balance.toLocaleString()}</div>
        </div>
        <div style={{ background: "#f0fff4", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#4CAF50", fontSize: "0.85rem" }}>يومياً</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", marginTop: "0.5rem" }}>${wallet.daily}</div>
        </div>
        <div style={{ background: "#fff0f4", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#FF6B6B", fontSize: "0.85rem" }}>شهرياً</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", marginTop: "0.5rem" }}>${wallet.monthly}</div>
        </div>
        <div style={{ background: "#fff4e0", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ color: "#FF9800", fontSize: "0.85rem" }}>سنوياً</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold", marginTop: "0.5rem" }}>${wallet.yearly}</div>
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>🤖 الأرباح التلقائية</h2>
        <div style={{ background: "#f0fff4", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #4CAF50", marginBottom: "1rem" }}>
          <strong style={{ color: "#4CAF50" }}>✅ النظام يعمل تلقائياً</strong>
          <p style={{ margin: "0.5rem 0 0 0", color: "#666" }}>لا تحتاج لأي تدخل - الأرباح تنهال كل ساعة</p>
        </div>

        <div style={{ display: "grid", gap: "0.75rem" }}>
          {[
            { name: "Staking", daily: "$15", status: "✅" },
            { name: "Farming", daily: "$25", status: "✅" },
            { name: "Arbitrage", daily: "$35", status: "✅" },
            { name: "Lending", daily: "$20", status: "✅" }
          ].map((s, i) => (
            <div key={i} style={{ padding: "1rem", background: "#f5f5f5", borderRadius: "6px", display: "flex", justifyContent: "space-between" }}>
              <span>{s.status} {s.name}</span>
              <strong>{s.daily}</strong>
            </div>
          ))}
        </div>
      </div>
    </SmoothLayout>
  );
}
