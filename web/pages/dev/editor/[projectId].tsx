import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function DeveloperEditor() {
  const router = useRouter();
  const { projectId } = router.query;
  const [code, setCode] = useState("// أكتب الكود هنا\n");
  const [synced, setSynced] = useState(true);

  useEffect(() => {
    if (code.trim()) {
      const timer = setTimeout(() => setSynced(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [code]);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#1e1e1e" }}>
      <div style={{ width: "250px", background: "#252526", borderRight: "1px solid #404040", padding: "1rem", color: "#d4d4d4" }}>
        <h3 style={{ margin: "0 0 1rem 0", color: "#fff" }}>📁 الملفات</h3>
        {["index.js", "style.css", "index.html"].map(file => (
          <div key={file} style={{ padding: "0.75rem", background: "#2d2d30", borderRadius: "4px", marginBottom: "0.5rem" }}>{file}</div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#2d2d30", padding: "1rem", borderBottom: "1px solid #404040", display: "flex", justifyContent: "space-between", color: "#d4d4d4" }}>
          <span>🔧 {projectId}</span>
          <a href={`/dev/preview/${projectId}`} style={{ padding: "0.5rem 1rem", background: "#667eea", color: "white", textDecoration: "none", borderRadius: "4px" }}>👁️ معاينة</a>
        </div>

        <textarea value={code} onChange={(e) => { setCode(e.target.value); setSynced(false); }} style={{ flex: 1, padding: "1.5rem", background: "#1e1e1e", color: "#d4d4d4", fontFamily: "monospace", fontSize: "14px", border: "none", outline: "none", resize: "none" }} />

        <div style={{ background: "#2d2d30", padding: "0.5rem 1rem", borderTop: "1px solid #404040", color: "#d4d4d4", fontSize: "12px" }}>
          السطر: 1 | {synced ? "✅ متزامن" : "⏳ يزامن..."}
        </div>
      </div>
    </div>
  );
}
