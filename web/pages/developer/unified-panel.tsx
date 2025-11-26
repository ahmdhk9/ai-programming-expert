import React, { useState, useEffect } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function UnifiedPanel() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        stability: "99.99%",
        performance: "98%",
        errors: 0,
        deployTime: "0s",
        systems: 16,
        features: 100,
        revenue: "$1,250"
      });
      setLoading(false);
    }, 300);
  }, []);

  const StatCard = ({ title, value, color, delay }: any) => (
    <div style={{
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      borderLeft: `4px solid ${color}`,
      animation: loading ? "none" : `slideIn 0.5s ease-out ${delay}ms both`,
      cursor: "pointer",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
    }}
      onMouseEnter={(e) => {
        (e.currentTarget as any).style.transform = "translateY(-4px)";
        (e.currentTarget as any).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as any).style.transform = "translateY(0)";
        (e.currentTarget as any).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{ fontSize: "0.85rem", color: "#999", marginBottom: "0.5rem" }}>{title}</div>
      <div style={{ fontSize: "2rem", fontWeight: "bold", color }}>{value}</div>
    </div>
  );

  const QuickButton = ({ icon, label, delay }: any) => (
    <button
      style={{
        padding: "1rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: loading ? "none" : `scaleIn 0.4s ease-out ${delay}ms both`
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as any).style.transform = "scale(1.08) translateY(-2px)";
        (e.currentTarget as any).style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as any).style.transform = "scale(1)";
        (e.currentTarget as any).style.boxShadow = "none";
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{icon}</div>
      <div style={{ fontSize: "0.85rem" }}>{label}</div>
    </button>
  );

  return (
    <SmoothLayout
      title="🎛️ لوحة التحكم"
      subtitle="السيطرة الكاملة بسلاسة وسرعة"
    >
      <div style={{ animation: loading ? "none" : "fadeIn 0.5s ease-out" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          <StatCard title="الاستقرار" value={stats?.stability} color="#4CAF50" delay={0} />
          <StatCard title="الأداء" value={stats?.performance} color="#2196F3" delay={80} />
          <StatCard title="الأخطاء" value={stats?.errors} color="#4CAF50" delay={160} />
          <StatCard title="النشر" value={stats?.deployTime} color="#FF9800" delay={240} />
        </div>

        {/* Quick Actions */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "2rem",
          animation: loading ? "none" : "slideIn 0.5s ease-out 200ms both"
        }}>
          <h2 style={{ marginTop: 0, color: "#667eea", marginBottom: "1.5rem" }}>⚡ إجراءات سريعة</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🚀", label: "نشر" },
              { icon: "🔍", label: "فحص" },
              { icon: "🔄", label: "مزامنة" },
              { icon: "📊", label: "إحصائيات" },
              { icon: "🔧", label: "إعدادات" },
              { icon: "💾", label: "نسخة" }
            ].map((btn, idx) => (
              <QuickButton key={btn.label} icon={btn.icon} label={btn.label} delay={320 + idx * 40} />
            ))}
          </div>
        </div>

        {/* System Status */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          animation: loading ? "none" : "slideIn 0.5s ease-out 400ms both"
        }}>
          <h2 style={{ marginTop: 0, color: "#667eea", marginBottom: "1.5rem" }}>📊 حالة النظام</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "✅ الخدمات", text: "16 نظام ذكي", color: "#f0fff4", border: "#4CAF50" },
              { title: "🚀 الميزات", text: "100+ ميزة متقدمة", color: "#f0f4ff", border: "#667eea" },
              { title: "📈 الأرباح", text: "$1,250 الشهر", color: "#fff0f4", border: "#667eea" }
            ].map((item, idx) => (
              <div
                key={item.title}
                style={{
                  padding: "1rem",
                  background: item.color,
                  borderRadius: "8px",
                  borderLeft: `4px solid ${item.border}`,
                  animation: loading ? "none" : `slideIn 0.5s ease-out ${480 + idx * 80}ms both`,
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.transform = "translateX(0)";
                }}
              >
                <h4 style={{ margin: 0, color: item.border }}>{item.title}</h4>
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "14px", color: "#666" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SmoothLayout>
  );
}
