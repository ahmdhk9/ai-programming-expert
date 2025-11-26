import React, { useState } from "react";
import Link from "next/link";

export default function MasterControl() {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const executeCommand = async () => {
    if (!command.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/dev/execute-command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command })
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1a2e" }}>
      <header style={{ backgroundColor: "#16213e", padding: "2rem", color: "white" }}>
        <Link href="/developer/dashboard" style={{ color: "#00d4ff", textDecoration: "none" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0" }}>🎮 غرفة التحكم الرئيسية</h1>
        <p style={{ margin: "0.5rem 0 0 0", opacity: 0.8 }}>قوة المطور الكاملة - بدون حدود</p>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        {/* Command Executor */}
        <div style={{
          backgroundColor: "#0f3460",
          border: "2px solid #00d4ff",
          padding: "2rem",
          borderRadius: "12px",
          marginBottom: "2rem"
        }}>
          <h2 style={{ color: "#00d4ff", marginTop: 0 }}>⚡ محرر الأوامر</h2>
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="اكتب أي أمر: مثل 'أضيف API جديد', 'أصلح الخطأ في الصفحة', 'حسّن الأداء'"
            style={{
              width: "100%",
              height: "100px",
              padding: "1rem",
              backgroundColor: "#1a1a2e",
              color: "#00d4ff",
              border: "1px solid #00d4ff",
              borderRadius: "8px",
              fontFamily: "monospace",
              marginBottom: "1rem",
              resize: "vertical"
            }}
          />
          <button
            onClick={executeCommand}
            disabled={loading}
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#00d4ff",
              color: "#1a1a2e",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "⏳ جاري التنفيذ..." : "🚀 تنفيذ"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
            {/* Status */}
            <div style={{
              backgroundColor: "#0f3460",
              border: `2px solid ${result.status === 'completed' ? '#00d4ff' : '#ffa500'}`,
              padding: "1.5rem",
              borderRadius: "12px"
            }}>
              <h3 style={{ color: "#00d4ff", marginTop: 0 }}>📊 الحالة</h3>
              <div style={{ color: "#00d4ff", lineHeight: "1.8" }}>
                <div>الأمر: {result.command.substring(0, 50)}</div>
                <div>الحالة: {result.status === 'completed' ? '✅ مكتمل' : '⏳ قيد التنفيذ'}</div>
                <div>المراحل: {result.phases.length}</div>
                <div>الوقت: {new Date(result.timestamp).toLocaleTimeString('ar-SA')}</div>
              </div>
            </div>

            {/* Generated Files */}
            {result.phases[1]?.files && (
              <div style={{
                backgroundColor: "#0f3460",
                border: "2px solid #00d4ff",
                padding: "1.5rem",
                borderRadius: "12px"
              }}>
                <h3 style={{ color: "#00d4ff", marginTop: 0 }}>📄 الملفات المُولّدة</h3>
                <div style={{ color: "#00d4ff", fontSize: "0.9rem", lineHeight: "2" }}>
                  {result.phases[1].files.map((f: any, idx: number) => (
                    <div key={idx}>✅ {f.path}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Testing */}
            {result.phases[2] && (
              <div style={{
                backgroundColor: "#0f3460",
                border: "2px solid #00d4ff",
                padding: "1.5rem",
                borderRadius: "12px"
              }}>
                <h3 style={{ color: "#00d4ff", marginTop: 0 }}>🧪 الاختبارات</h3>
                <div style={{ color: "#00d4ff", lineHeight: "1.8" }}>
                  <div>✅ عدد الاختبارات: {result.phases[2].coverage}</div>
                  <div>✅ التغطية: {result.phases[2].coverage}</div>
                </div>
              </div>
            )}

            {/* Security */}
            {result.phases[3]?.issues && (
              <div style={{
                backgroundColor: "#0f3460",
                border: "2px solid #00d4ff",
                padding: "1.5rem",
                borderRadius: "12px"
              }}>
                <h3 style={{ color: "#00d4ff", marginTop: 0 }}>🔒 الأمان</h3>
                <div style={{ color: "#00d4ff", fontSize: "0.9rem", lineHeight: "1.8" }}>
                  {result.phases[3].issues.length === 0 ? (
                    <div>✅ آمن بنسبة 100%</div>
                  ) : (
                    result.phases[3].issues.map((issue: string, idx: number) => (
                      <div key={idx}>⚠️ {issue}</div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Deployment */}
            {result.phases[5]?.url && (
              <div style={{
                backgroundColor: "#0f3460",
                border: "2px solid #00d4ff",
                padding: "1.5rem",
                borderRadius: "12px"
              }}>
                <h3 style={{ color: "#00d4ff", marginTop: 0 }}>🌐 النشر</h3>
                <div style={{ color: "#00d4ff", lineHeight: "1.8", wordBreak: "break-all" }}>
                  <div>📍 الرابط: {result.phases[5].url}</div>
                  <div>✅ الاستقرار: {result.phases[5].uptime}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginTop: "3rem"
        }}>
          {[
            { icon: "⚡", label: "توليد كود", desc: "أي شيء" },
            { icon: "🧪", label: "اختبار", desc: "تلقائي" },
            { icon: "🔒", label: "أمان", desc: "عسكري" },
            { icon: "🏗️", label: "بناء", desc: "محسّن" },
            { icon: "🚀", label: "نشر", desc: "فوري" },
            { icon: "📊", label: "مراقبة", desc: "24/7" }
          ].map((feature) => (
            <div key={feature.label} style={{
              backgroundColor: "#0f3460",
              border: "1px solid #00d4ff",
              padding: "1.5rem",
              borderRadius: "8px",
              textAlign: "center",
              color: "#00d4ff"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{feature.icon}</div>
              <div style={{ fontWeight: "bold" }}>{feature.label}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
