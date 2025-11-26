import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SystemHealth() {
  const [health, setHealth] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);

  useEffect(() => {
    fetchHealthData();
    const interval = setInterval(fetchHealthData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchHealthData = async () => {
    try {
      const [healthRes, perfRes] = await Promise.all([
        fetch("/api/admin/system-health"),
        fetch("/api/admin/performance")
      ]);

      const healthData = await healthRes.json();
      const perfData = await perfRes.json();

      setHealth(healthData.health);
      setPerformance(perfData);
    } catch (err) {
      console.error("Error fetching health data:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🏥 صحة النظام</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* System Status */}
        <div style={{
          backgroundColor: health?.status === "healthy" ? "#e8f5e9" : "#fff3e0",
          border: `2px solid ${health?.status === "healthy" ? "#4CAF50" : "#FF9800"}`,
          padding: "2rem",
          borderRadius: "12px",
          marginBottom: "2rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "2rem" }}>
              {health?.status === "healthy" ? "🟢" : "🟡"}
            </div>
            <div>
              <h2 style={{ margin: 0 }}>
                الحالة: {health?.status === "healthy" ? "سليم" : "تنبيه"}
              </h2>
              <p style={{ margin: "0.25rem 0 0 0", opacity: 0.7 }}>
                آخر تحديث: {new Date(health?.timestamp).toLocaleTimeString('ar-SA')}
              </p>
            </div>
          </div>
        </div>

        {/* Errors and Warnings */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3 style={{ margin: "0 0 1rem 0" }}>❌ الأخطاء</h3>
            {health?.errors?.length > 0 ? (
              health.errors.map((err: string, idx: number) => (
                <div key={idx} style={{ padding: "0.75rem", backgroundColor: "#ffebee", borderRadius: "8px", marginBottom: "0.5rem", color: "#c62828" }}>
                  {err}
                </div>
              ))
            ) : (
              <p style={{ color: "#999" }}>لا توجد أخطاء</p>
            )}
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3 style={{ margin: "0 0 1rem 0" }}>⚠️ التحذيرات</h3>
            {health?.warnings?.length > 0 ? (
              health.warnings.map((warn: string, idx: number) => (
                <div key={idx} style={{ padding: "0.75rem", backgroundColor: "#fff3e0", borderRadius: "8px", marginBottom: "0.5rem", color: "#e65100" }}>
                  {warn}
                </div>
              ))
            ) : (
              <p style={{ color: "#999" }}>لا توجد تحذيرات</p>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>📊 مقاييس الأداء</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            {performance && [
              { label: "إجمالي الطلبات", value: performance.totalRequests, icon: "📨" },
              { label: "الطلبات البطيئة", value: performance.slowRequests, icon: "🐢" },
              { label: "متوسط الوقت", value: performance.avgResponseTime + "ms", icon: "⏱️" },
              { label: "نسبة الكاش", value: performance.cacheHitRate, icon: "💾" }
            ].map((metric) => (
              <div key={metric.label} style={{
                backgroundColor: "#f9f9f9",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{metric.icon}</div>
                <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>{metric.label}</div>
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#667eea" }}>{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
