import React from "react";
import { useRouter } from "next/router";

export default function LivePreview() {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div style={{ display: "flex", height: "100vh", background: "#fff" }}>
      <div style={{ width: "200px", background: "#f5f5f5", padding: "1rem", borderRight: "1px solid #ddd", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ margin: 0 }}>🎨 أدوات</h3>
        <button style={{ padding: "0.75rem", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>🔄 تحديث</button>
        <button style={{ padding: "0.75rem", background: "#4CAF50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>📱 هاتف</button>
        <a href={`/dev/editor/${projectId}`} style={{ padding: "0.75rem", background: "#2196F3", color: "white", textDecoration: "none", borderRadius: "6px", textAlign: "center" }}>📝 تعديل</a>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#2d2d30", padding: "0.75rem 1rem", borderBottom: "1px solid #ddd", color: "white", fontSize: "12px" }}>
          📍 {projectId} • معاينة مباشرة
        </div>
        <div style={{ flex: 1, background: "#fff", padding: "2rem" }}>
          <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "2rem", borderRadius: "12px", color: "white", textAlign: "center", minHeight: "300px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 style={{ margin: "0 0 1rem 0" }}>✨ المعاينة الحية</h1>
            <p>التطبيق: {projectId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
