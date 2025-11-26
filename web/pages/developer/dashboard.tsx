import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DeveloperDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await fetch("/api/dev/ai-status");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const tools = [
    { emoji: "🎮", label: "التحكم الرئيسي", href: "/developer/master-control", desc: "أداة تطوير ذكية" },
    { emoji: "🌐", label: "الهجرة", href: "/developer/migration", desc: "انقل المنصة بسهولة" },
    { emoji: "🏗️", label: "ورشة التطوير", href: "/developer/workshop", desc: "طور بالكلام" },
    { emoji: "🎨", label: "محرر الواجهات", href: "/developer/ui-editor", desc: "عدّل الواجهات" },
    { emoji: "🧠", label: "مدرب ذكي", href: "/developer/ai-coach", desc: "استشارة ذكية" },
    { emoji: "💰", label: "الأرباح", href: "/developer/revenue", desc: "تتبع أرباحك" }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <header style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "3rem 2rem", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: "2.5rem" }}>👨‍💻 لوحة المطور</h1>
          <p style={{ color: "rgba(255,255,255,0.9)", margin: "0.5rem 0 0 0" }}>بيئة تطوير ذكية متكاملة</p>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Stats */}
        {stats && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", border: "2px solid #667eea" }}>
              <div style={{ fontSize: "0.9rem", color: "#999", marginBottom: "0.5rem" }}>النموذج النشط</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>{stats?.coachStatus?.stage || "جاهز"}</div>
            </div>
            <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", border: "2px solid #4CAF50" }}>
              <div style={{ fontSize: "0.9rem", color: "#999", marginBottom: "0.5rem" }}>الاستقرار</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#4CAF50" }}>99.99%</div>
            </div>
            <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", border: "2px solid #2196F3" }}>
              <div style={{ fontSize: "0.9rem", color: "#999", marginBottom: "0.5rem" }}>الأداء</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#2196F3" }}>98%</div>
            </div>
          </div>
        )}

        {/* Tools Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {tools.map((tool) => (
            <Link
              key={tool.label}
              href={tool.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem 1rem",
                background: "white",
                borderRadius: "16px",
                textDecoration: "none",
                color: "#333",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "all 0.3s",
                border: "1px solid #e0e0e0"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{tool.emoji}</div>
              <div style={{ fontWeight: "bold", marginBottom: "0.25rem", fontSize: "14px", textAlign: "center" }}>{tool.label}</div>
              <div style={{ fontSize: "0.7rem", color: "#999", textAlign: "center" }}>{tool.desc}</div>
            </Link>
          ))}
        </div>

        {/* Feature Highlights */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>✨ المميزات الرئيسية</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            <div style={{ borderLeft: "4px solid #667eea", paddingLeft: "1rem" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#667eea" }}>🎮 التحكم الكامل</h3>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>تنفيذ أي أمر بالكلام الطبيعي</p>
            </div>
            <div style={{ borderLeft: "4px solid #4CAF50", paddingLeft: "1rem" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#4CAF50" }}>🌐 الهجرة الذكية</h3>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>انقل المنصة لأي سيرفر تلقائياً</p>
            </div>
            <div style={{ borderLeft: "4px solid #FF9800", paddingLeft: "1rem" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#FF9800" }}>🎨 محرر الواجهات</h3>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>عدّل التصاميم بدون كود</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
