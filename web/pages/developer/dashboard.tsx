import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DeveloperDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dev/revenue-stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{
        backgroundColor: "white",
        padding: "1.5rem 2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ margin: 0, color: "#667eea", fontSize: "1.5rem" }}>
          👨‍💻 لوحة المطور - أحمد البصراوي
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.href = "/";
          }}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🚪 خروج
        </button>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        {/* Quick Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {[
            { label: "أرباح اليوم", value: "$" + (stats?.dailyProjection?.toFixed(2) || "0.00"), emoji: "📈", color: "#FF9800" },
            { label: "هذا الشهر", value: "$" + (stats?.monthlyProjection?.toFixed(2) || "0.00"), emoji: "📊", color: "#2196F3" },
            { label: "التنبؤ السنوي", value: "$" + (stats?.yearlyProjection?.toFixed(2) || "0.00"), emoji: "🎯", color: "#4CAF50" },
            { label: "المستخدمون", value: "1,234", emoji: "👥", color: "#9C27B0" }
          ].map((item) => (
            <div key={item.label} style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <div style={{ color: "#666", fontSize: "0.9rem" }}>{item.label}</div>
                <div style={{ fontSize: "1.5rem" }}>{item.emoji}</div>
              </div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: item.color }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {[
            { emoji: "💰", label: "الأرباح", href: "/developer/revenue" },
            { emoji: "💳", label: "الدفع", href: "/developer/monetization" },
            { emoji: "🤖", label: "AI مساعد", href: "/developer/ai-assistant" },
            { emoji: "⚙️", label: "الإعدادات", href: "/admin/settings" },
            { emoji: "📊", label: "الإحصائيات", href: "/admin/analytics" },
            { emoji: "🔐", label: "الأمان", href: "/admin/security" }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                backgroundColor: "white",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#333",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.emoji}</div>
              <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{item.label}</div>
            </Link>
          ))}
        </div>

        {/* Instructions */}
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ marginTop: 0 }}>📋 خطوات البدء السريعة</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              { step: 1, title: "إضافة طرق الدفع", desc: "اذهب إلى المسار الكامل وأضف Stripe أو PayPal" },
              { step: 2, title: "تفعيل الإعلانات", desc: "اختر Google AdSense وابدأ الكسب من الإعلانات" },
              { step: 3, title: "إعداد الاشتراكات", desc: "اختر الخطط والأسعار والتحديثات التلقائية" },
              { step: 4, title: "مراقبة الأرباح", desc: "تابع أرباحك في لوحة الأرباح بالوقت الفعلي" }
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1rem",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px"
                }}
              >
                <div
                  style={{
                    backgroundColor: "#667eea",
                    color: "white",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>{item.title}</div>
                  <div style={{ color: "#666", fontSize: "0.9rem" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
