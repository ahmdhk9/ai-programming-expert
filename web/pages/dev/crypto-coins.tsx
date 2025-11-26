import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function CryptoCoins() {
  const [coins] = useState([
    { name: "AI Pro Coin", symbol: "APC", supply: 1000000, price: 45, mc: "45M", change: "+156%" },
    { name: "Smart Token", symbol: "STK", supply: 5000000, price: 12, mc: "60M", change: "+89%" },
    { name: "Revenue Coin", symbol: "REV", supply: 2000000, price: 35, mc: "70M", change: "+234%" }
  ]);

  return (
    <SmoothLayout title="💎 العملات الرقمية" subtitle="عملات ذكية تنمو تلقائياً">
      <div style={{ display: "grid", gap: "1rem" }}>
        {coins.map((coin, i) => (
          <div key={i} style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "2px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, color: "#667eea" }}>{coin.name}</h3>
              <span style={{ background: "#4CAF50", color: "white", padding: "0.25rem 0.75rem", borderRadius: "12px", fontSize: "0.85rem", fontWeight: "bold" }}>{coin.change}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#999" }}>الرمز</div>
                <div style={{ fontWeight: "bold" }}>{coin.symbol}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#999" }}>السعر</div>
                <div style={{ fontWeight: "bold" }}>${coin.price}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#999" }}>Supply</div>
                <div style={{ fontWeight: "bold" }}>{coin.supply.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#999" }}>Cap</div>
                <div style={{ fontWeight: "bold" }}>${coin.mc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SmoothLayout>
  );
}
