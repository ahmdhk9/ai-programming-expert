import React, { useState } from "react";
import Link from "next/link";

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    fontFamily: "system-ui, -apple-system, sans-serif"
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "3rem 2rem",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  },
  commandBox: {
    background: "white",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    marginBottom: "2rem",
    border: "1px solid #e0e0e0"
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    color: "#333",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontFamily: "monospace",
    marginBottom: "1rem",
    fontSize: "14px",
    transition: "border-color 0.3s"
  },
  button: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
    transition: "transform 0.2s"
  }
};

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
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Link href="/developer/dashboard" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "14px" }}>
            ← رجوع
          </Link>
          <h1 style={{ margin: "1rem 0 0.5rem 0", fontSize: "2.5rem" }}>🎮 غرفة التحكم الرئيسية</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>أداة تطوير ذكية لتنفيذ أي أمر بسهولة</p>
        </div>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        {/* Command Executor */}
        <div style={styles.commandBox}>
          <h2 style={{ color: "#667eea", marginTop: 0 }}>⚡ محرر الأوامر الذكي</h2>
          <p style={{ color: "#666", marginBottom: "1rem", fontSize: "14px" }}>قل ما تريده بالعربية: "أضيف API"، "أصلح الخطأ"، "حسّن الأداء"</p>
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="اكتب أي أمر هنا..."
            style={{
              ...styles.textarea,
              borderColor: command ? "#667eea" : "#e0e0e0"
            }}
          />
          <button
            onClick={executeCommand}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              transform: loading ? "scale(0.98)" : "scale(1)"
            }}
          >
            {loading ? "⏳ جاري التنفيذ..." : "🚀 تنفيذ"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            {/* Status */}
            <div style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              border: `2px solid ${result.status === 'completed' ? '#4CAF50' : '#FF9800'}`
            }}>
              <h3 style={{ color: "#667eea", marginTop: 0 }}>📊 الحالة</h3>
              <div style={{ color: "#666", lineHeight: "1.8", fontSize: "14px" }}>
                <div><strong>الأمر:</strong> {result.command.substring(0, 50)}</div>
                <div><strong>الحالة:</strong> {result.status === 'completed' ? '✅ مكتمل' : '⏳ قيد التنفيذ'}</div>
                <div><strong>المراحل:</strong> {result.phases.length}</div>
              </div>
            </div>

            {/* Generated Files */}
            {result.phases[1]?.files && (
              <div style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                border: "2px solid #667eea"
              }}>
                <h3 style={{ color: "#667eea", marginTop: 0 }}>📄 الملفات</h3>
                <div style={{ color: "#666", fontSize: "13px", lineHeight: "1.8" }}>
                  {result.phases[1].files.slice(0, 3).map((f: any, idx: number) => (
                    <div key={idx}>✅ {f.path}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {result.phases[3]?.issues && (
              <div style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                border: "2px solid #4CAF50"
              }}>
                <h3 style={{ color: "#4CAF50", marginTop: 0 }}>🔒 الأمان</h3>
                <div style={{ color: "#666", fontSize: "14px" }}>
                  {result.phases[3].issues.length === 0 ? (
                    <div>✅ آمن 100%</div>
                  ) : (
                    <div>⚠️ {result.phases[3].issues[0]}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1rem",
          marginTop: "2rem"
        }}>
          {[
            { icon: "⚡", label: "توليد كود", desc: "فوري" },
            { icon: "🧪", label: "اختبار", desc: "تلقائي" },
            { icon: "🔒", label: "أمان", desc: "محسّن" },
            { icon: "🏗️", label: "بناء", desc: "ذكي" },
            { icon: "🚀", label: "نشر", desc: "فوري" },
            { icon: "📊", label: "مراقبة", desc: "مستمرة" }
          ].map((feature) => (
            <div key={feature.label} style={{
              background: "white",
              padding: "1.5rem 1rem",
              borderRadius: "12px",
              textAlign: "center",
              color: "#667eea",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid #e0e0e0",
              transition: "all 0.3s"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{feature.icon}</div>
              <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "0.25rem" }}>{feature.label}</div>
              <div style={{ fontSize: "0.75rem", color: "#999" }}>{feature.desc}</div>
            </div>
          ))}
        </div>

        {/* UI Editor Link */}
        <div style={{ marginTop: "2rem" }}>
          <Link href="/developer/ui-editor" style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
          }}>
            🎨 محرر الواجهات
          </Link>
        </div>
      </div>
    </div>
  );
}
