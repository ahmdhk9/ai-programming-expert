import React, { useState } from "react";
import Link from "next/link";

export default function DeveloperLayout({ children, title, subtitle }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: "🎯", label: "لوحة التحكم", href: "/developer/unified-panel" },
    { icon: "🎮", label: "التحكم الرئيسي", href: "/developer/master-control" },
    { icon: "🚀", label: "مركز النشر", href: "/developer/deployment-center" },
    { icon: "🌐", label: "الهجرة", href: "/developer/migration" },
    { icon: "🏗️", label: "ورشة التطوير", href: "/developer/workshop" },
    { icon: "🔍", label: "مراقب الأخطاء", href: "/developer/error-monitor" },
    { icon: "🎨", label: "محرر الواجهات", href: "/developer/ui-editor" },
    { icon: "✨", label: "الميزات", href: "/developer/advanced-features" },
    { icon: "🧠", label: "مدرب ذكي", href: "/developer/ai-coach" },
    { icon: "💰", label: "الأرباح", href: "/developer/revenue" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <div style={{
        width: sidebarOpen ? "280px" : "0",
        backgroundColor: "white",
        borderRight: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "all 0.3s",
        overflow: "hidden",
        position: "fixed",
        height: "100vh",
        zIndex: 1000,
        left: 0
      }}>
        <div style={{ padding: "2rem 1.5rem" }}>
          <h2 style={{ margin: 0, color: "#667eea", fontSize: "1.2rem" }}>🚀 AI Expert</h2>
        </div>
        <nav style={{ padding: "0 0.5rem" }}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 1rem",
                margin: "0.25rem 0",
                color: "#333",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "all 0.3s",
                fontSize: "14px"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as any).style.backgroundColor = "#f0f4ff";
                (e.currentTarget as any).style.color = "#667eea";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as any).style.backgroundColor = "transparent";
                (e.currentTarget as any).style.color = "#333";
              }}
            >
              <span style={{ fontSize: "1.2rem", marginRight: "0.75rem" }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div style={{
        marginLeft: sidebarOpen ? "280px" : "0",
        flex: 1,
        transition: "all 0.3s"
      }}>
        <header style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "2rem" }}>{title}</h1>
            {subtitle && <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>{subtitle}</p>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.5rem 1rem",
              borderRadius: "8px"
            }}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </header>

        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
