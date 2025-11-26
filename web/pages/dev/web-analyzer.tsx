import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function WebAnalyzer() {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeUrl = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/web/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "خطأ في الاتصال" });
    }
    setAnalyzing(false);
  };

  return (
    <SmoothLayout title="🌐 محلل الويب" subtitle="فحص الأمان والتحليل الذكي">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>🔍 فحص الموقع</h2>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" style={{ width: "100%", padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem", boxSizing: "border-box" }} />
          <button onClick={analyzeUrl} disabled={analyzing} style={{ width: "100%", padding: "0.75rem", background: analyzing ? "#999" : "#667eea", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            {analyzing ? "⏳ يحلل..." : "🔎 حلل الآن"}
          </button>
        </div>

        {result && (
          <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
            <h2 style={{ marginTop: 0, color: result.safe ? "#4CAF50" : "#FF6B6B" }}>
              {result.safe ? "✅ آمن" : result.error ? "❌ خطأ" : "⚠️ تحذير"}
            </h2>
            {result.trustScore !== undefined && (
              <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#667eea" }}>
                درجة الثقة: {result.trustScore}/100
              </p>
            )}
            {result.vulnerabilities && result.vulnerabilities.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <h4>⚠️ الثغرات:</h4>
                {result.vulnerabilities.map((v: string, i: number) => (
                  <div key={i} style={{ padding: "0.5rem", background: "#fff3cd", borderRadius: "4px", marginBottom: "0.25rem" }}>
                    {v}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </SmoothLayout>
  );
}
