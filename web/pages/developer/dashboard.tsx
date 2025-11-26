import React from "react";
import Link from "next/link";

export default function DeveloperDashboard() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      animation: "fadeIn 0.5s ease-out"
    }}>
      <div style={{ textAlign: "center", animation: "slideIn 0.5s ease-out" }}>
        <h1 style={{ fontSize: "3rem", color: "#667eea", marginBottom: "1rem" }}>🚀</h1>
        <h2 style={{ fontSize: "2rem", color: "#333", marginBottom: "1rem" }}>أهلاً بك</h2>
        <p style={{ fontSize: "1rem", color: "#666", marginBottom: "2rem" }}>اذهب للوحة التحكم</p>
        
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
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            animation: "slideIn 0.5s ease-out 200ms both"
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as any).style.transform = "translateY(-2px)";
            (e.currentTarget as any).style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.5)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as any).style.transform = "translateY(0)";
            (e.currentTarget as any).style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
          }}
        >
          🎛️ لوحة التحكم الموحدة
        </Link>
      </div>
    </div>
  );
}
