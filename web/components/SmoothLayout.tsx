import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SmoothLayout({ children, title, subtitle }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    // الرئيسية
    { icon: "🏆", label: "لوحة رئيسية", href: "/dev/master-dashboard", category: "main" },
    { icon: "♾️", label: "مصادر لانهائية", href: "/dev/infinite-sources", category: "main" },
    { icon: "🔒", label: "محافظ مخفية", href: "/dev/hidden-wallets", category: "earnings" },
    { icon: "👤", label: "حسابي", href: "/account/dashboard", category: "main" },
    
    // الأرباح
    { icon: "💰", label: "ربح فوري", href: "/dev/instant-earnings", category: "earnings" },
    { icon: "📊", label: "أرباح ذكية", href: "/dev/smart-earnings", category: "earnings" },
    { icon: "💎", label: "محفظة", href: "/dev/crypto-wallet", category: "earnings" },
    { icon: "💵", label: "تجميع", href: "/dev/micro-earnings", category: "earnings" },
    { icon: "🏆", label: "أرباح ضخم", href: "/dev/mega-earnings", category: "earnings" },
    
    // التطوير
    { icon: "📝", label: "محرر", href: "/dev/editor/myproject", category: "dev" },
    { icon: "👁️", label: "معاينة", href: "/dev/preview/myproject", category: "dev" },
    { icon: "🔗", label: "GitHub", href: "/dev/connect-github", category: "dev" },
    
    // التكامل والبحث
    { icon: "🔗", label: "تكامل", href: "/dev/integrations", category: "integration" },
    { icon: "🔬", label: "بحث عالمي", href: "/dev/research-engine", category: "integration" },
    
    // الذكاء والنمو
    { icon: "🤖", label: "AI محترف", href: "/dev/ai-developer", category: "ai" },
    { icon: "🚀", label: "نمو ذاتي", href: "/dev/auto-growth", category: "ai" },
    { icon: "📢", label: "ترويج", href: "/dev/marketing-engine", category: "ai" },
    
    // إدارة
    { icon: "📬", label: "إشعارات", href: "/dev/notifications", category: "admin" },
    { icon: "💳", label: "سحب", href: "/account/withdraw", category: "admin" }
  ];

  const categories = {
    main: "🎯 الرئيسية",
    earnings: "💰 الأرباح",
    dev: "📝 التطوير",
    integration: "🔗 التكامل",
    ai: "🤖 الذكاء",
    admin: "⚙️ الإدارة"
  };

  if (!mounted) return null;

  const sortedItems = Object.entries(categories).reduce((acc, [cat, label]) => {
    acc[cat] = { label, items: menuItems.filter(m => m.category === cat) };
    return acc;
  }, {} as any);

  return (
    <div style={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <div style={{
        width: sidebarOpen ? "260px" : "0",
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
          {Object.entries(sortedItems).map(([catKey, catData]: [string, any]) => (
            <div key={catKey}>
              <div style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#999", padding: "1rem 0.8rem 0.5rem", textTransform: "uppercase" }}>
                {catData.label}
              </div>
              {catData.items.map((item: any) => (
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
            </div>
          ))}
        </nav>
      </div>

      <div style={{ marginLeft: sidebarOpen ? "260px" : "0", flex: 1, display: "flex", flexDirection: "column", transition: "margin 0.3s" }}>
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
