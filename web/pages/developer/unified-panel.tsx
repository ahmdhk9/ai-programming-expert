import React, { useState, useEffect } from "react";
import DeveloperLayout from "@/components/DeveloperLayout";

export default function UnifiedPanel() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setStats({
      stability: "99.99%",
      performance: "98%",
      errors: 0,
      deployTime: "0s",
      systems: 16,
      features: 100,
      revenue: "$1,250"
    });
  };

  const StatCard = ({ title, value, color }: any) => (
    <div style={{
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ fontSize: "0.85rem", color: "#999", marginBottom: "0.5rem" }}>{title}</div>
      <div style={{ fontSize: "2rem", fontWeight: "bold", color }}>{value}</div>
    </div>
  );

  return (
    <DeveloperLayout
      title="🎛️ لوحة التحكم الموحدة"
      subtitle="السيطرة الكاملة على المنصة من مكان واحد"
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <StatCard title="الاستقرار" value={stats?.stability} color="#4CAF50" />
        <StatCard title="الأداء" value={stats?.performance} color="#2196F3" />
        <StatCard title="الأخطاء" value={stats?.errors} color="#4CAF50" />
        <StatCard title="وقت النشر" value={stats?.deployTime} color="#FF9800" />
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "2rem" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>⚡ إجراءات سريعة</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          {[
            { icon: "🚀", label: "نشر الآن" },
            { icon: "🔍", label: "فحص الأخطاء" },
            { icon: "🔄", label: "مزامنة" },
            { icon: "📊", label: "إحصائيات" },
            { icon: "🔧", label: "إعدادات" },
            { icon: "💾", label: "نسخة احتياطية" }
          ].map((btn) => (
            <button
              key={btn.label}
              style={{
                padding: "1rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as any).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as any).style.transform = "scale(1)";
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{btn.icon}</div>
              <div style={{ fontSize: "0.85rem" }}>{btn.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>📊 حالة النظام</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          <div style={{ padding: "1rem", background: "#f0fff4", borderRadius: "8px", borderLeft: "4px solid #4CAF50" }}>
            <h4 style={{ margin: 0, color: "#4CAF50" }}>✅ الخدمات النشطة</h4>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "14px", color: "#666" }}>16 نظام ذكي يعمل</p>
          </div>
          <div style={{ padding: "1rem", background: "#f0f4ff", borderRadius: "8px", borderLeft: "4px solid #667eea" }}>
            <h4 style={{ margin: 0, color: "#667eea" }}>🚀 الميزات</h4>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "14px", color: "#666" }}>100+ ميزة متقدمة</p>
          </div>
          <div style={{ padding: "1rem", background: "#fff0f4", borderRadius: "8px", borderLeft: "4px solid #667eea" }}>
            <h4 style={{ margin: 0, color: "#667eea" }}>📈 الأرباح</h4>
            <p style={{ margin: "0.5rem 0 0 0", fontSize: "14px", color: "#666" }}>{stats?.revenue} هذا الشهر</p>
          </div>
        </div>
      </div>
    </DeveloperLayout>
  );
}
