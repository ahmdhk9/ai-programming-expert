import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SmoothLayout({ children, title, subtitle }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { icon: "🎯", label: "التحكم", href: "/developer/unified-panel" },
    { icon: "🎮", label: "الرئيسي", href: "/developer/master-control" },
    { icon: "🚀", label: "النشر", href: "/developer/deployment-center" },
    { icon: "🌐", label: "الهجرة", href: "/developer/migration" },
    { icon: "🏗️", label: "الورشة", href: "/developer/workshop" },
    { icon: "🔍", label: "الأخطاء", href: "/developer/error-monitor" },
    { icon: "🎨", label: "الواجهات", href: "/developer/ui-editor" },
    { icon: "✨", label: "الميزات", href: "/developer/advanced-features" },
    { icon: "🧠", label: "الذكاء", href: "/developer/ai-coach" },
    { icon: "💰", label: "الأرباح", href: "/developer/revenue" },
    { icon: "🖥️", label: "Replit", href: "/developer/replit-ide" },
    { icon: "🔐", label: "GitHub", href: "/developer/github-control" },
    { icon: "📱", label: "App Gen", href: "/developer/app-generator" },
    { icon: "🛠️", label: "Builder", href: "/developer/dynamic-builder" }
  ];

  if (!mounted) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      {/* Smooth Sidebar */}
      <div style={{
        width: sidebarOpen ? "260px" : "0",
        backgroundColor: "#fff",
        borderRight: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        position: "fixed",
        height: "100vh",
        zIndex: 1000,
        left: 0,
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ padding: "2rem 1.5rem", borderBottom: "1px solid #f0f0f0" }}>
          <h2 style={{ margin: 0, color: "#667eea", fontSize: "1.2rem" }}>AI Pro</h2>
        </div>

        <nav style={{ flex: 1, overflow: "auto", padding: "0.5rem" }}>
          {menuItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 1rem",
                margin: "0.25rem 0",
                color: "#555",
                borderRadius: "8px",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                fontSize: "14px",
                cursor: "pointer",
                animation: mounted ? `slideIn 0.3s ease-out ${idx * 30}ms both` : "none"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as any).style.backgroundColor = "#f0f4ff";
                (e.currentTarget as any).style.color = "#667eea";
                (e.currentTarget as any).style.paddingLeft = "1.25rem";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as any).style.backgroundColor = "transparent";
                (e.currentTarget as any).style.color = "#555";
                (e.currentTarget as any).style.paddingLeft = "1rem";
              }}
            >
              <span style={{ fontSize: "1.2rem", marginRight: "0.75rem", minWidth: "24px" }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Smooth Content */}
      <div style={{
        marginLeft: sidebarOpen ? "260px" : "0",
        flex: 1,
        transition: "margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Smooth Header */}
        <header style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          animation: mounted ? "slideIn 0.5s ease-out" : "none"
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "2rem", animation: mounted ? "slideIn 0.5s ease-out 100ms both" : "none" }}>{title}</h1>
            {subtitle && <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9, animation: mounted ? "slideIn 0.5s ease-out 150ms both" : "none" }}>{subtitle}</p>}
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
              borderRadius: "8px",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as any).style.backgroundColor = "rgba(255,255,255,0.3)";
              (e.currentTarget as any).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as any).style.backgroundColor = "rgba(255,255,255,0.2)";
              (e.currentTarget as any).style.transform = "scale(1)";
            }}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </header>

        {/* Smooth Content */}
        <main style={{
          flex: 1,
          overflow: "auto",
          padding: "2rem",
          animation: mounted ? "fadeIn 0.5s ease-out" : "none"
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
