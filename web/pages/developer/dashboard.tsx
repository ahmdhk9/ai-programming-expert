import React from "react";
import Link from "next/link";

export default function DeveloperDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", padding: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#667eea", marginBottom: "1rem" }}>👋 مرحباً بك!</h1>
        <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>انقر على الزر أدناه للذهاب إلى لوحة التحكم الموحدة</p>
        
        <Link
          href="/developer/unified-panel"
          style={{
            display: "inline-block",
            padding: "1rem 3rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
          }}
        >
          🎛️ لوحة التحكم الموحدة
        </Link>
      </div>
    </div>
  );
}
