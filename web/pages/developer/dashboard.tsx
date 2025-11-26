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
    { emoji: "💰", label: "الأرباح", href: "/developer/revenue", desc: "تتبع أرباحك الحية" },
    { emoji: "🧠", label: "مدرب ذكي", href: "/developer/ai-coach", desc: "استشارة ذكية للمشروع" },
    { emoji: "🏗️", label: "ورشة التطوير", href: "/developer/workshop", desc: "طور الميزات بالكلام" },
    { emoji: "📊", label: "التحليلات", href: "/developer/analytics", desc: "بيانات مفصلة" },
    { emoji: "🗺️", label: "الخريطة", href: "/developer/roadmap", desc: "خطة التطوير" },
    { emoji: "🎯", label: "المشاريع", href: "/developer/projects", desc: "إدارة المشاريع" }
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h1 style={{ margin: 0, color: "#667eea" }}>👨‍💻 لوحة المطور</h1>
        <p style={{ color: "#999", margin: "0.5rem 0 0 0" }}>مرحباً بك في بيئة التطوير الذكية</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Stats */}
        {stats && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <div style={{ fontSize: "0.85rem", color: "#999" }}>النموذج النشط</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#667eea" }}>{stats?.coachStatus?.stage || "جاهز"}</div>
            </div>
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <div style={{ fontSize: "0.85rem", color: "#999" }}>الاستقرار</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4CAF50" }}>99.99%</div>
            </div>
            <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <div style={{ fontSize: "0.85rem", color: "#999" }}>الأداء</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2196F3" }}>98%</div>
            </div>
          </div>
        )}

        {/* Tools Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {tools.map((tool) => (
            <Link
              key={tool.label}
              href={tool.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem 1rem",
                backgroundColor: "white",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#333",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{tool.emoji}</div>
              <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>{tool.label}</div>
              <div style={{ fontSize: "0.75rem", color: "#999", textAlign: "center" }}>{tool.desc}</div>
            </Link>
          ))}
        </div>

        {/* Quick Tips */}
        <div style={{ marginTop: "2rem", backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>💡 نصائح سريعة</h2>
          <ul style={{ lineHeight: "1.8", color: "#666" }}>
            <li>استخدم ورشة التطوير لإضافة ميزات جديدة بدون كتابة كود</li>
            <li>المدرب الذكي يساعدك في فهم سياق المشروع</li>
            <li>تابع أرباحك الحية في لوحة الأرباح</li>
            <li>الخريطة توضح خطة التطوير المستقبلية</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
