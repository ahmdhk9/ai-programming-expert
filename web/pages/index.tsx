import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Header */}
      <header style={{
        padding: "2rem",
        color: "white",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <h1 style={{ fontSize: "3rem", margin: 0 }}>🚀 AI Programming Expert</h1>
        <p style={{ margin: "1rem 0 0 0", opacity: 0.9 }}>منصة ذكية متطورة لتطوير التطبيقات</p>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          {/* Left */}
          <div style={{ color: "white" }}>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>مرحباً بك</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", opacity: 0.9 }}>
              منصة متكاملة تجمع كل ما تحتاجه للتطوير في مكان واحد
            </p>
            <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
              <Link
                href="/developer/unified-panel"
                style={{
                  display: "inline-block",
                  padding: "1rem 2rem",
                  background: "white",
                  color: "#667eea",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  textAlign: "center",
                  transition: "all 0.25s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.transform = "scale(1)";
                }}
              >
                👨‍💻 للمطورين
              </Link>
              <Link
                href="/web-apps"
                style={{
                  display: "inline-block",
                  padding: "1rem 2rem",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  textAlign: "center",
                  transition: "all 0.25s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.background = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.background = "rgba(255,255,255,0.2)";
                }}
              >
                🌐 التطبيقات
              </Link>
            </div>
          </div>

          {/* Right - Stats */}
          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              { icon: "🎯", title: "10 أدوات", desc: "متكاملة" },
              { icon: "🧠", title: "16 نظام", desc: "ذكي" },
              { icon: "100", title: "100+ ميزة", desc: "متقدمة" },
              { icon: "⚡", title: "60 FPS", desc: "سلس" }
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  color: "white",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  animation: "slideIn 0.5s ease-out"
                }}
              >
                <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
                <div>
                  <div style={{ fontWeight: "bold" }}>{stat.title}</div>
                  <div style={{ opacity: 0.8 }}>{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "3rem",
        padding: "2rem",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        color: "white",
        textAlign: "center",
        opacity: 0.8
      }}>
        <p>منصة مفتوحة ومجانية للمطورين في كل مكان</p>
      </div>
    </div>
  );
}
