import React from "react";
import Link from "next/link";

export default function FreeForever() {
  const services = [
    { name: "Vercel", free: "∞ مشاريع", used: "✅ Frontend" },
    { name: "Firebase", free: "5GB", used: "✅ Database" },
    { name: "Fly.io", free: "3 shared CPU", used: "✅ Backend" },
    { name: "Replicate", free: "API مجاني", used: "✅ AI/Video" },
    { name: "Groq", free: "∞ مجاني", used: "✅ Code Gen" },
    { name: "Mistral", free: "API مجاني", used: "✅ Analysis" },
    { name: "GitHub", free: "∞ repos", used: "✅ Version" },
    { name: "Cloudflare", free: "CDN", used: "✅ Speed" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#27ae60", color: "white", padding: "2rem", textAlign: "center" }}>
        <h1>💚 100% Free Forever</h1>
        <p>لا توجد تكاليف مخفية - كل شيء مجاني للأبد</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#27ae60" }}>✅ الخدمات المجانية المستخدمة</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {services.map((s) => (
              <div key={s.name} style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #27ae60" }}>
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{s.name}</div>
                <div style={{ color: "#27ae60", marginBottom: "0.5rem" }}>📦 {s.free}</div>
                <div style={{ color: "#666", fontSize: "0.9rem" }}>{s.used}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "#e8f8f5", borderRadius: "12px", padding: "2rem", borderLeft: "4px solid #27ae60" }}>
          <h3 style={{ marginTop: 0, color: "#27ae60" }}>💰 التكلفة الشهرية:</h3>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#27ae60" }}>$0 / الشهر</div>
          <p style={{ color: "#666" }}>
            الجميع يستحق الأدوات القوية بدون تكاليف. هذه المنصة مبنية على خدمات مجانية موثوقة.
          </p>
        </div>
      </div>
    </div>
  );
}
