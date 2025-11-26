import React, { useState } from "react";
import Link from "next/link";

export default function DeploymentCenter() {
  const [deploymentType, setDeploymentType] = useState("smart");
  const [status, setStatus] = useState<any>(null);

  const startSmartDeploy = async () => {
    try {
      const res = await fetch("/api/dev/smart-deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: [],
          options: { incremental: true }
        })
      });
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <header style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "2rem", color: "white" }}>
        <Link href="/developer/dashboard" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "1rem 0 0 0" }}>🚀 مركز النشر المتقدم</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Deployment Types */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>📋 أنواع النشر</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { id: "smart", name: "🎯 نشر ذكي", desc: "الملفات المتغيرة فقط" },
              { id: "blue-green", name: "🔵 Blue-Green", desc: "صفر توقف" },
              { id: "canary", name: "🐤 Canary", desc: "تدرج آمن" },
              { id: "rolling", name: "🔄 Rolling", desc: "تحديث تدريجي" }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setDeploymentType(type.id)}
                style={{
                  padding: "1.5rem",
                  background: deploymentType === type.id ? "#667eea" : "white",
                  color: deploymentType === type.id ? "white" : "#333",
                  border: `2px solid ${deploymentType === type.id ? "#667eea" : "#e0e0e0"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  textAlign: "center"
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{type.name}</div>
                <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Smart Deployment */}
        {deploymentType === "smart" && (
          <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>🎯 النشر الذكي</h3>
            <p style={{ color: "#666" }}>ينشر فقط الملفات المتغيرة - سرعة ودقة عالية</p>
            <button
              onClick={startSmartDeploy}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
              }}
            >
              🚀 ابدأ النشر
            </button>

            {status && (
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f0f4ff", borderRadius: "8px", color: "#333" }}>
                <div style={{ fontWeight: "bold", marginBottom: "1rem" }}>✅ النشر مكتمل!</div>
                <div style={{ lineHeight: "1.8", fontSize: "14px" }}>
                  <div>⏱️ الوقت الإجمالي: {status.totalTime}</div>
                  <div>⏸️ وقت التوقف: {status.downtime}</div>
                  <div>📝 نوع النشر: {status.type}</div>
                  <div style={{ marginTop: "1rem" }}>
                    <strong>المراحل:</strong>
                    {status.stages.map((stage: any, idx: number) => (
                      <div key={idx} style={{ paddingLeft: "1rem", marginTop: "0.25rem" }}>
                        ✅ {stage.stage} - {stage.time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Blue-Green */}
        {deploymentType === "blue-green" && (
          <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>🔵 Blue-Green Deployment</h3>
            <p style={{ color: "#666" }}>نشر بدون توقف - تحويل سلس بين الإصدارات</p>
            <div style={{ background: "#f0f4ff", padding: "1rem", borderRadius: "8px", marginTop: "1rem", lineHeight: "1.8", fontSize: "14px" }}>
              <div>✅ النسخة الحالية (Blue) تعمل</div>
              <div>🔄 النسخة الجديدة (Green) تُنشر</div>
              <div>🧪 اختبارات دخان على Green</div>
              <div>📊 تحويل الحركة تدريجياً</div>
              <div>🧹 تنظيف النسخة القديمة</div>
            </div>
          </div>
        )}

        {/* GitHub Automation */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginTop: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>🤖 أتمتة GitHub</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🔀", title: "حل التعارضات", desc: "تلقائياً بدون تدخل" },
              { icon: "🔧", title: "الإصلاح الذاتي", desc: "Linting و Formatting" },
              { icon: "🧪", title: "CI/CD متقدم", desc: "6 مراحل متوازية" },
              { icon: "📦", title: "إدارة الاعتماديات", desc: "تحديثات تلقائية آمنة" },
              { icon: "✨", title: "تحسين الأداء", desc: "حذف الأكواد الميتة" },
              { icon: "🔒", title: "فحص الأمان", desc: "تلقائي على كل PR" }
            ].map(item => (
              <div key={item.title} style={{ borderLeft: "4px solid #667eea", paddingLeft: "1rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#667eea" }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
