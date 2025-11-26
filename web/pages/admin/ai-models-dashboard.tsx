import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AIModelsDashboard() {
  const [models, setModels] = useState<any>(null);
  const [learning, setLearning] = useState<any>(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [modelsRes, learningRes] = await Promise.all([
        fetch("/api/dev/ai-models-status"),
        fetch("/api/dev/learning-report")
      ]);

      const modelsData = await modelsRes.json();
      const learningData = await learningRes.json();

      setModels(modelsData);
      setLearning(learningData);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🤖 لوحة نماذج AI المتعددة</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Active Model */}
        <div style={{
          backgroundColor: "#e3f2fd",
          border: "2px solid #2196F3",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "2rem"
        }}>
          <h2 style={{ margin: 0, color: "#1976D2" }}>🎯 النموذج النشط</h2>
          <div style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
            {models?.activeModel || "جاري الفحص..."}
          </div>
        </div>

        {/* Models Performance */}
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "2rem"
        }}>
          <h2 style={{ margin: "0 0 1rem 0" }}>📊 أداء النماذج</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {models?.performance && Object.entries(models.performance).map(([key, perf]: any) => (
              <div key={key} style={{
                backgroundColor: "#f9f9f9",
                padding: "1rem",
                borderRadius: "8px",
                border: `2px solid ${perf.rate > 80 ? "#4CAF50" : perf.rate > 50 ? "#FF9800" : "#f44336"}`
              }}>
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{key}</div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  <div>✅ نجاح: {perf.success}</div>
                  <div>❌ فشل: {perf.fail}</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#667eea", marginTop: "0.25rem" }}>
                    {perf.rate.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fallback Chain */}
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "2rem"
        }}>
          <h2 style={{ margin: "0 0 1rem 0" }}>🔄 سلسلة الاسترجاع</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {models?.fallbackChain?.map((model: string, idx: number) => (
              <div key={model} style={{
                backgroundColor: idx === 0 ? "#4CAF50" : "#2196F3",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "24px",
                fontWeight: "bold"
              }}>
                {idx + 1}. {model}
              </div>
            ))}
          </div>
        </div>

        {/* Learning System */}
        {learning && (
          <div style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ margin: "0 0 1rem 0" }}>🧠 نظام التعلم الذاتي</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
              <div style={{ backgroundColor: "#f0f4c3", padding: "1rem", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>المعرفة المحفوظة</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#F9A825" }}>{learning.knowledge}</div>
              </div>
              <div style={{ backgroundColor: "#e8f5e9", padding: "1rem", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>الأنماط المكتشفة</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4CAF50" }}>{learning.patterns}</div>
              </div>
              <div style={{ backgroundColor: "#f3e5f5", padding: "1rem", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>التحسينات</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#9C27B0" }}>{learning.improvements}</div>
              </div>
              <div style={{ backgroundColor: "#fff3e0", padding: "1rem", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>التعديلات</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FF9800" }}>{learning.adaptations}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
