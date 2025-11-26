import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function DeveloperEarnings() {
  const [earnings] = useState({
    totalEarnings: 5250.75,
    monthlyEarnings: 1250.50,
    apps: [
      { name: "تطبيقي الأول", downloads: 5421, revenue: 750.25, earnings: 600 },
      { name: "لعبة الذكاء", downloads: 2100, revenue: 525.50, earnings: 420 }
    ],
    withdrawal: 4250.75
  });

  return (
    <SmoothLayout title="💰 الأرباح والإحصائيات" subtitle="تتبع أرباحك من التطبيقات">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)", padding: "2rem", borderRadius: "12px", color: "white", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>إجمالي الأرباح</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>${earnings.totalEarnings}</div>
          <div style={{ fontSize: "0.85rem" }}>منذ البداية</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)", padding: "2rem", borderRadius: "12px", color: "white", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>الشهر الحالي</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>${earnings.monthlyEarnings}</div>
          <div style={{ fontSize: "0.85rem" }}>نوفمبر 2025</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "2rem", borderRadius: "12px", color: "white", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>متاح للسحب</div>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>${earnings.withdrawal}</div>
          <button style={{ marginTop: "0.75rem", padding: "0.5rem 1rem", background: "rgba(255,255,255,0.2)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>اسحب الآن</button>
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>📊 التطبيقات</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          {earnings.apps.map(app => (
            <div key={app.name} style={{ padding: "1.5rem", background: "#f5f5f5", borderRadius: "8px" }}>
              <h4 style={{ margin: "0 0 1rem 0" }}>{app.name}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#999" }}>التنزيلات</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#667eea" }}>{app.downloads}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#999" }}>الإيرادات</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2196F3" }}>${app.revenue}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#999" }}>أرباحك</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4CAF50" }}>${app.earnings}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SmoothLayout>
  );
}
