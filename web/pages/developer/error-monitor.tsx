import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ErrorMonitor() {
  const [errors, setErrors] = useState<any[]>([]);
  const [report, setReport] = useState<any>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const checkErrors = async () => {
    if (!code.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/dev/detect-errors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, file: "current.js" })
      });
      const data = await res.json();
      setErrors(data.errors);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadReport = async () => {
    try {
      const res = await fetch("/api/dev/error-report");
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    loadReport();
    const interval = setInterval(loadReport, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <header style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "2rem", color: "white" }}>
        <Link href="/developer/dashboard" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "1rem 0 0 0" }}>🔍 مراقب الأخطاء الذكي</h1>
        <p>اكتشاف فوري للأخطاء والإصلاح التلقائي</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Code Editor */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>📝 محرر الكود</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="الصق الكود هنا للفحص..."
            style={{
              width: "100%",
              height: "200px",
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "13px",
              marginBottom: "1rem",
              resize: "vertical"
            }}
          />
          <button
            onClick={checkErrors}
            disabled={loading}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "⏳ جاري الفحص..." : "🔍 فحص الكود"}
          </button>
        </div>

        {/* Report Summary */}
        {report && (
          <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>📊 التقرير</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "#f0f4ff", padding: "1rem", borderRadius: "8px", textAlign: "center", borderLeft: "4px solid #667eea" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>{report.totalErrors}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>إجمالي الأخطاء</div>
              </div>
              <div style={{ background: "#f0fff4", padding: "1rem", borderRadius: "8px", textAlign: "center", borderLeft: "4px solid #4CAF50" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#4CAF50" }}>{report.totalFixed}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>مُصلحة</div>
              </div>
              <div style={{ background: "#fff0f4", padding: "1rem", borderRadius: "8px", textAlign: "center", borderLeft: "4px solid #FF9800" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#FF9800" }}>{report.fixRate}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>معدل الإصلاح</div>
              </div>
            </div>
            <div style={{ padding: "1rem", background: "#f8f9fa", borderRadius: "8px", color: "#333", fontSize: "14px" }}>
              <strong>الحالة:</strong> {report.status}
            </div>
          </div>
        )}

        {/* Errors Display */}
        {errors.length > 0 && (
          <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>⚠️ الأخطاء المكتشفة ({errors.length})</h3>
            <div style={{ display: "grid", gap: "1.5rem" }}>
              {errors.map((error, idx) => (
                <div key={idx} style={{ border: `2px solid ${getSeverityColor(error.severity)}`, borderRadius: "8px", padding: "1.5rem", background: getSeverityBg(error.severity) }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.5rem", marginRight: "0.75rem" }}>{error.icon}</span>
                    <div>
                      <h4 style={{ margin: 0, color: getSeverityColor(error.severity) }}>{error.type}</h4>
                      <p style={{ margin: "0.25rem 0 0 0", fontSize: "12px", color: "#666" }}>{error.file} : {error.line}</p>
                    </div>
                  </div>

                  <div style={{ background: "white", padding: "1rem", borderRadius: "6px", fontFamily: "monospace", fontSize: "12px", marginBottom: "1rem", border: "1px solid #e0e0e0" }}>
                    <div style={{ color: "#999", marginBottom: "0.5rem" }}>الكود:</div>
                    <div style={{ color: "#333" }}>{error.code}</div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#333" }}>📍 الرسالة:</p>
                    <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{error.message}</p>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold", color: "#667eea" }}>💡 الحل:</p>
                    <p style={{ margin: 0, color: "#333", fontSize: "14px" }}>{error.solution}</p>
                  </div>

                  <div style={{ background: "#f0fff4", padding: "1rem", borderRadius: "6px", borderLeft: "4px solid #4CAF50" }}>
                    <p style={{ margin: 0, color: "#4CAF50", fontWeight: "bold" }}>✅ تم الإصلاح التلقائي!</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {errors.length === 0 && code && !loading && (
          <div style={{ background: "#f0fff4", padding: "2rem", borderRadius: "16px", textAlign: "center", color: "#4CAF50" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h3>الكود نظيف!</h3>
            <p>لم يتم العثور على أي أخطاء</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getSeverityColor(severity: string) {
  const colors: any = {
    critical: "#f44336",
    high: "#FF9800",
    medium: "#FFC107",
    low: "#4CAF50"
  };
  return colors[severity] || "#999";
}

function getSeverityBg(severity: string) {
  const bgs: any = {
    critical: "#ffebee",
    high: "#fff3e0",
    medium: "#fffde7",
    low: "#f1f8e9"
  };
  return bgs[severity] || "#f5f5f5";
}
