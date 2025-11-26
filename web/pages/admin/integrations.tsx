import React, { useState } from "react";
import Link from "next/link";

export default function IntegrationsAdmin() {
  const [integrations] = useState([
    { name: "Groq", url: "https://groq.com", status: "connected" },
    { name: "Mistral", url: "https://mistral.ai", status: "connected" },
    { name: "Firebase", url: "https://firebase.google.com", status: "connected" },
    { name: "GitHub", url: "https://github.com", status: "pending" }
  ]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🔌 التكاملات</h1>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {integrations.map((integration) => (
            <div key={integration.name} style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{integration.name}</h3>
                <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>{integration.url}</p>
              </div>
              <div>
                <span style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: integration.status === "connected" ? "#e8f5e9" : "#fff3e0",
                  color: integration.status === "connected" ? "#2e7d32" : "#e65100",
                  borderRadius: "20px",
                  fontWeight: "bold"
                }}>
                  {integration.status === "connected" ? "🟢 مرتبط" : "🟡 معلق"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
