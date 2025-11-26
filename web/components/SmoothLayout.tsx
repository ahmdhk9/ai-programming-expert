import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SmoothLayout({ children, title, subtitle }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { icon: "👤", label: "حسابي", href: "/account/dashboard" },
    { icon: "💰", label: "سحب", href: "/account/withdraw" },
    { icon: "🎯", label: "التحكم", href: "/developer/unified-panel" },
    { icon: "📝", label: "محرر", href: "/dev/editor/myproject" },
    { icon: "💎", label: "محفظة", href: "/dev/crypto-wallet" },
    { icon: "🪙", label: "عملات", href: "/dev/crypto-coins" },
    { icon: "🤖", label: "AI", href: "/dev/ai-developer" },
    { icon: "📊", label: "تحليلات", href: "/dev/analytics-advanced" },
    { icon: "🚀", label: "أرباح", href: "/dev/smart-earnings" },
    { icon: "🔒", label: "أمان", href: "/dev/security-dashboard" }
  ];

  if (!mounted) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <div style={{
        width: sidebarOpen ? "240px" : "0",
        backgroundColor: "#fff",
        borderRight: "1px solid #e0e0e0",
        transition: "width 0.3s",
        overflow: "hidden",
        position: "fixed",
        height: "100vh",
        zIndex: 1000,
        left: 0,
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #f0f0f0" }}>
          <h2 style={{ margin: 0, color: "#667eea", fontSize: "1.1rem" }}>🚀 AI Pro</h2>
        </div>
        <nav style={{ flex: 1, overflow: "auto", padding: "0.5rem" }}>
          {menuItems.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: "flex",
              alignItems: "center",
              padding: "0.6rem 0.8rem",
              margin: "0.2rem 0",
              color: "#555",
              borderRadius: "6px",
              transition: "all 0.2s",
              fontSize: "13px",
              cursor: "pointer",
              textDecoration: "none"
            }} onMouseEnter={(e) => {
              (e.currentTarget as any).style.backgroundColor = "#f0f4ff";
              (e.currentTarget as any).style.color = "#667eea";
            }} onMouseLeave={(e) => {
              (e.currentTarget as any).style.backgroundColor = "transparent";
              (e.currentTarget as any).style.color = "#555";
            }}>
              <span style={{ fontSize: "1rem", marginRight: "0.5rem" }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div style={{ marginLeft: sidebarOpen ? "240px" : "0", flex: 1, display: "flex", flexDirection: "column", transition: "margin 0.3s" }}>
        <header style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.6rem" }}>{title}</h1>
            {subtitle && <p style={{ margin: "0.3rem 0 0 0", opacity: 0.9, fontSize: "0.9rem" }}>{subtitle}</p>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: "1.3rem", cursor: "pointer", padding: "0.4rem 0.8rem", borderRadius: "6px" }}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </header>
        <main style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
