import React from "react";
import Link from "next/link";

export default function WebApps() {
  const apps = [
    { name: "لوحة التحكم", desc: "إدارة المشاريع", icon: "🎛️", href: "/developer/unified-panel", type: "dev" },
    { name: "Replit IDE", desc: "محرر أكواد كامل", icon: "🖥️", href: "/developer/replit-ide", type: "dev" },
    { name: "مراقب الأخطاء", desc: "اكتشاف وإصلاح", icon: "🔍", href: "/developer/error-monitor", type: "dev" },
    { name: "الميزات المتقدمة", desc: "12 ميزة متطورة", icon: "✨", href: "/developer/advanced-features", type: "dev" },
    { name: "الهجرة", desc: "نقل المشاريع", icon: "🌐", href: "/developer/migration", type: "dev" },
    { name: "النشر", desc: "نشر ذكي", icon: "🚀", href: "/developer/deployment-center", type: "dev" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ color: "#667eea", textAlign: "center", marginBottom: "0.5rem" }}>🌐 تطبيقات الويب</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>أدوات قوية للمطورين</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {apps.map((app) => (
            <Link
              key={app.name}
              href={app.href}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                animation: "slideIn 0.5s ease-out"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as any).style.transform = "translateY(-8px)";
                (e.currentTarget as any).style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as any).style.transform = "translateY(0)";
                (e.currentTarget as any).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{app.icon}</div>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#333", fontSize: "1.2rem" }}>{app.name}</h3>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{app.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
