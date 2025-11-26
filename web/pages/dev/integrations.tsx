import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function Integrations() {
  const platforms = [
    { icon: "💬", name: "Telegram", revenue: "$225/يوم", status: "✅" },
    { icon: "👻", name: "Snapchat", revenue: "$230/يوم", status: "✅" },
    { icon: "🎬", name: "YouTube", revenue: "$330/يوم", status: "✅" },
    { icon: "🎵", name: "TikTok", revenue: "$350/يوم", status: "✅" },
    { icon: "📸", name: "Instagram", revenue: "$360/يوم", status: "✅" },
    { icon: "💭", name: "WhatsApp", revenue: "$230/يوم", status: "✅" },
    { icon: "🎮", name: "Discord", revenue: "$225/يوم", status: "✅" },
    { icon: "📺", name: "Twitch", revenue: "$430/يوم", status: "✅" },
    { icon: "🛍️", name: "Amazon", revenue: "$140/يوم", status: "✅" },
    { icon: "🔍", name: "Google Ads", revenue: "$500/يوم", status: "✅" },
    { icon: "🏪", name: "E-commerce", revenue: "$330/يوم", status: "✅" },
    { icon: "🤝", name: "Affiliate", revenue: "$300/يوم", status: "✅" }
  ];

  return (
    <SmoothLayout title="🔗 التكامل مع المنصات" subtitle="12 منصة عالمية - أرباح تلقائية">
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>📊 الإجمالي</h2>
          <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>يومياً</div><div style={{ fontSize: "2rem", fontWeight: "bold" }}>$3,610</div></div>
            <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>شهرياً</div><div style={{ fontSize: "2rem", fontWeight: "bold" }}>$108K</div></div>
            <div><div style={{ fontSize: "0.9rem", opacity: 0.9 }}>المنصات</div><div style={{ fontSize: "2rem", fontWeight: "bold" }}>12</div></div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {platforms.map((p, i) => (
            <div key={i} style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{p.icon}</div>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{p.name}</h3>
              <p style={{ margin: "0.5rem 0", color: "#4CAF50", fontWeight: "bold" }}>{p.revenue}</p>
              <p style={{ margin: 0, fontSize: "0.85rem" }}>{p.status} نشط</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", marginTop: "2rem" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>🚀 المزايا</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {[
            "تكامل تلقائي مع 12 منصة عالمية",
            "أرباح من كل منصة بشكل مستقل",
            "نظام سحب موحد وآمن",
            "تقارير فورية ودقيقة",
            "تحسين مستمر من AI",
            "بدون تدخل يدوي"
          ].map((f, i) => (
            <li key={i} style={{ padding: "0.5rem 0", borderBottom: "1px solid #f0f0f0" }}>
              ✅ {f}
            </li>
          ))}
        </ul>
      </div>
    </SmoothLayout>
  );
}
