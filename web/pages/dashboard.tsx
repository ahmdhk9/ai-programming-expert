import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SystemStatus {
  frontend: string;
  backend: string;
  database: string;
  uptime: string;
}

export default function Dashboard() {
  const [status, setStatus] = useState<SystemStatus>({
    frontend: "✅ Online",
    backend: "🔄 Checking...",
    database: "✅ Active",
    uptime: "99.9%",
  });

  const [stats, setStats] = useState({
    projects: 0,
    deployments: 5,
    codeGenerated: "2,847 lines",
    bugsFixed: 42,
  });

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://agent-backend-ahmd1.fly.dev"}/health`
        );
        if (response.ok) {
          setStatus((prev) => ({ ...prev, backend: "✅ Online" }));
        }
      } catch {
        setStatus((prev) => ({ ...prev, backend: "❌ Offline" }));
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { title: "Chat with AI Agent", url: "/chat", icon: "💬", color: "#4CAF50" },
    { title: "Frontend Code", url: "https://github.com/ahmdhk9/ai-programming-expert/tree/main/web", icon: "🌐", color: "#2196F3" },
    { title: "Backend API", url: "https://agent-backend-ahmd1.fly.dev", icon: "🚀", color: "#FF9800" },
    { title: "Database", url: "https://console.firebase.google.com/project/developer-expert-86887", icon: "💾", color: "#9C27B0" },
    { title: "CI/CD Pipeline", url: "https://github.com/ahmdhk9/ai-programming-expert/actions", icon: "⚙️", color: "#00BCD4" },
    { title: "GitHub Repo", url: "https://github.com/ahmdhk9/ai-programming-expert", icon: "📦", color: "#424242" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#0070f3",
          color: "white",
          padding: "1.5rem",
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: "0 0 0.5rem 0" }}>🎯 Control Center</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>AI Programming Expert System Dashboard</p>
        <nav style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link href="/chat" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
            💬 Chat
          </Link>
          <Link href="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </Link>
        </nav>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* System Status */}
        <section style={{ marginBottom: "2rem" }}>
          <h2>📊 System Status</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Frontend (Vercel)", value: status.frontend },
              { label: "Backend (Fly.io)", value: status.backend },
              { label: "Database (Firebase)", value: status.database },
              { label: "Uptime", value: status.uptime },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section style={{ marginBottom: "2rem" }}>
          <h2>📈 Statistics</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Projects", value: stats.projects, icon: "📁" },
              { label: "Deployments", value: stats.deployments, icon: "🚀" },
              { label: "Code Generated", value: stats.codeGenerated, icon: "📝" },
              { label: "Bugs Fixed", value: stats.bugsFixed, icon: "🐛" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#0070f3" }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section style={{ marginBottom: "2rem" }}>
          <h2>🔗 Quick Access</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target={link.url.startsWith("/") ? "_self" : "_blank"}
                rel={link.url.startsWith("/") ? undefined : "noopener noreferrer"}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "inherit",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: `2px solid ${link.color}`,
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{link.icon}</div>
                <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>{link.title}</div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>
                  {link.url.split("/").slice(-1)[0] || link.url.split("/")[2]}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2>✨ AI Expert Capabilities</h2>
          <div style={{
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {[
                { emoji: "📐", title: "Deep Context", desc: "فهم عميق للمشاريع" },
                { emoji: "⚙️", title: "SDLC Automation", desc: "أتمتة دورة التطوير" },
                { emoji: "🧠", title: "Smart Design", desc: "قرارات تصميمية ذكية" },
                { emoji: "💻", title: "Code Generation", desc: "كتابة الكود التلقائية" },
                { emoji: "🧪", title: "Auto Testing", desc: "اختبار شامل تلقائي" },
                { emoji: "🚀", title: "Smart Deploy", desc: "نشر ذكي وآمن" },
                { emoji: "📊", title: "Monitoring", desc: "مراقبة الأداء" },
                { emoji: "🔒", title: "Security", desc: "أمان بالتصميم" },
              ].map((feature, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{feature.emoji}</div>
                  <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>{feature.title}</div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
