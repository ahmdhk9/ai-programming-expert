import React, { useState } from "react";

export default function ConnectGitHub() {
  const [repoUrl, setRepoUrl] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", maxWidth: "500px", width: "100%" }}>
        <h1 style={{ color: "#667eea", marginBottom: "1.5rem", textAlign: "center" }}>🔗 اتصل بـ GitHub</h1>

        {!connected ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="text" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="رابط المستودع" style={{ padding: "0.75rem", border: "1px solid #e0e0e0", borderRadius: "8px", direction: "rtl" }} />
            <button onClick={() => setConnected(true)} style={{ padding: "1rem", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>✅ اتصل</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ padding: "1rem", background: "#f0fff4", borderRadius: "8px" }}><h3 style={{ color: "#4CAF50", margin: 0 }}>✅ متصل!</h3></div>
            <a href={`/dev/editor/myproject`} style={{ padding: "0.75rem", background: "#667eea", color: "white", textDecoration: "none", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>📝 محرر الكود</a>
            <a href={`/dev/preview/myproject`} style={{ padding: "0.75rem", background: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>👁️ المعاينة الحية</a>
          </div>
        )}
      </div>
    </div>
  );
}
