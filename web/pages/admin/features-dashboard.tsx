import React, { useState } from "react";
import Link from "next/link";

export default function FeaturesDashboard() {
  const [features] = useState([
    { name: "Real-time Collaboration", emoji: "👥", status: "active", priority: "high" },
    { name: "Advanced Analytics", emoji: "📊", status: "active", priority: "high" },
    { name: "AI Code Generation", emoji: "🤖", status: "active", priority: "high" },
    { name: "Video Generation", emoji: "🎬", status: "active", priority: "high" },
    { name: "3D Design Tool", emoji: "🎨", status: "pending", priority: "high" },
    { name: "Game Development", emoji: "🎮", status: "planning", priority: "medium" },
    { name: "Mobile App Builder", emoji: "📱", status: "planning", priority: "medium" },
    { name: "Cloud Storage Sync", emoji: "☁️", status: "active", priority: "high" },
    { name: "Team Management", emoji: "🏢", status: "active", priority: "medium" },
    { name: "Version Control", emoji: "📝", status: "active", priority: "medium" },
    { name: "API Integration", emoji: "🔌", status: "active", priority: "high" },
    { name: "Marketplace", emoji: "🛍️", status: "planning", priority: "medium" }
  ]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>✨ لوحة الميزات والتطويرات</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          {features.map((feature) => (
            <div
              key={feature.name}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderTop: `4px solid ${
                  feature.status === "active" ? "#4CAF50" :
                  feature.status === "pending" ? "#FF9800" : "#9e9e9e"
                }`
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div style={{ fontSize: "2rem" }}>{feature.emoji}</div>
                <span style={{
                  padding: "0.25rem 0.75rem",
                  backgroundColor: feature.priority === "high" ? "#ffebee" : "#f0f4c3",
                  color: feature.priority === "high" ? "#c62828" : "#9caf50",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "bold"
                }}>
                  {feature.priority === "high" ? "🔴 عالي" : "🟡 متوسط"}
                </span>
              </div>

              <h3 style={{ margin: "0 0 0.5rem 0" }}>{feature.name}</h3>

              <div style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "bold",
                backgroundColor: feature.status === "active" ? "#e8f5e9" :
                  feature.status === "pending" ? "#fff3e0" : "#f5f5f5",
                color: feature.status === "active" ? "#2e7d32" :
                  feature.status === "pending" ? "#e65100" : "#666"
              }}>
                {feature.status === "active" ? "🟢 مفعل" :
                  feature.status === "pending" ? "🟡 قيد التطوير" : "🔵 مخطط"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
