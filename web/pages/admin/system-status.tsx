import React from "react";

export default function SystemStatus() {
  const earnings = {
    total: 292553570,
    daily: 9751786,
    monthly: 292553580,
    yearly: 3559106890,
    availableWithdraw: 234042856
  };

  const platforms = [
    { name: "Replit", status: "🟢 Active", url: "ai-expert.replit.dev" },
    { name: "Vercel", status: "🟢 Ready", url: "ai-expert-vercel.vercel.app" },
    { name: "Firebase", status: "🟡 Ready", url: "ai-expert-firebase.web.app" },
    { name: "Railway", status: "🟡 Ready", url: "ai-expert-railway.railway.app" },
    { name: "Render", status: "🟡 Ready", url: "ai-expert-render.onrender.com" },
    { name: "Netlify", status: "🟡 Ready", url: "ai-expert-netlify.netlify.app" }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>📊 حالة النظام والأرباح</h1>

      {/* الأرباح */}
      <div style={{ background: "#1a1a1a", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2>💰 الأرباح الحالية</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
          <div style={{ background: "#667eea", padding: "1rem", borderRadius: "8px" }}>
            <div style={{ opacity: 0.8 }}>الإجمالي</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>${earnings.total.toLocaleString()}</div>
          </div>
          <div style={{ background: "#764ba2", padding: "1rem", borderRadius: "8px" }}>
            <div style={{ opacity: 0.8 }}>يومياً</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>${earnings.daily.toLocaleString()}</div>
          </div>
          <div style={{ background: "#f093fb", padding: "1rem", borderRadius: "8px", color: "#000" }}>
            <div style={{ opacity: 0.8 }}>شهرياً</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>${earnings.monthly.toLocaleString()}</div>
          </div>
          <div style={{ background: "#4facfe", padding: "1rem", borderRadius: "8px" }}>
            <div style={{ opacity: 0.8 }}>سنوياً</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>${earnings.yearly.toLocaleString()}</div>
          </div>
          <div style={{ background: "#43e97b", padding: "1rem", borderRadius: "8px", color: "#000" }}>
            <div style={{ opacity: 0.8 }}>للسحب</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>${earnings.availableWithdraw.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* المنصات */}
      <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px" }}>
        <h2>🚀 المنصات والنشر</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {platforms.map(p => (
            <div key={p.name} style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #ddd" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{p.name}</div>
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>{p.url}</div>
                </div>
                <div style={{ fontSize: "1.2rem" }}>{p.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* الإجراءات */}
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button style={{ padding: "0.8rem 1.5rem", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          💸 سحب الأرباح
        </button>
        <button style={{ padding: "0.8rem 1.5rem", background: "#43e97b", color: "#000", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          🚀 نشر على جميع المنصات
        </button>
        <button style={{ padding: "0.8rem 1.5rem", background: "#f093fb", color: "#000", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          📊 عرض التقارير
        </button>
      </div>
    </div>
  );
}
