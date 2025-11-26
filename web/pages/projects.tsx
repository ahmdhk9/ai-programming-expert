import React, { useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  status: "active" | "building" | "planned";
  emoji: string;
  features: string[];
  createdAt: string;
}

export default function Projects() {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "AI Programming Expert",
      description: "منصة الخبير البرمجي الذكي الرئيسية",
      url: "https://ai-programming-expert.vercel.app",
      status: "active",
      emoji: "🤖",
      features: ["Chat AI", "Dashboard", "Code Generation"],
      createdAt: "2025-11-26",
    },
    {
      id: "2",
      name: "Forex Trading Expert",
      description: "موقع مراقبة سوق الفوركس مع التنبؤ",
      url: "https://forex-trading-expert.vercel.app",
      status: "building",
      emoji: "📈",
      features: ["Real-time Charts", "Predictions", "Alerts"],
      createdAt: "2025-11-26",
    },
  ]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#0070f3", color: "white", padding: "2rem", textAlign: "center" }}>
        <h1>📚 Your Projects</h1>
        <p>جميع المشاريع التي تم إنشاؤها</p>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {/* Navigation */}
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/" style={{ color: "#0070f3", textDecoration: "none" }}>
            ← Home
          </Link>
          <Link href="/chat" style={{ color: "#0070f3", textDecoration: "none" }}>
            💬 Chat
          </Link>
          <Link href="/dashboard" style={{ color: "#0070f3", textDecoration: "none" }}>
            📊 Dashboard
          </Link>
        </nav>

        {/* Projects Grid */}
        <div style={{ display: "grid", gap: "2rem" }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                borderLeft: `4px solid ${project.status === "active" ? "#4CAF50" : "#FF9800"}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h2 style={{ margin: "0 0 0.5rem 0" }}>
                    {project.emoji} {project.name}
                  </h2>
                  <p style={{ margin: "0.5rem 0", color: "#666" }}>{project.description}</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                    {project.features.map((feature, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: "#e3f2fd",
                          color: "#0070f3",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    backgroundColor: project.status === "active" ? "#e8f5e9" : "#fff3e0",
                    padding: "1rem",
                    borderRadius: "8px",
                    minWidth: "120px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {project.status === "active" ? "✅" : "🔨"}
                  </div>
                  <div style={{ fontWeight: "bold", color: project.status === "active" ? "#4CAF50" : "#FF9800" }}>
                    {project.status === "active" ? "Active" : "Building"}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#0070f3",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  🔗 Go to Project
                </a>
                <a
                  href={`${project.url}/chat`}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#f5f5f5",
                    color: "#0070f3",
                    textDecoration: "none",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  💬 Chat with AI
                </a>
              </div>

              <div style={{ marginTop: "1rem", color: "#999", fontSize: "0.9rem" }}>
                Created: {new Date(project.createdAt).toLocaleDateString("ar-SA")}
              </div>
            </div>
          ))}
        </div>

        {/* Create New Project */}
        <div style={{
          backgroundColor: "#e3f2fd",
          borderRadius: "12px",
          padding: "2rem",
          marginTop: "2rem",
          textAlign: "center",
        }}>
          <h3 style={{ marginTop: 0 }}>🚀 Create New Project</h3>
          <p>اذهب إلى Chat وقل للخبير: "أنشئ لي [نوع المشروع]"</p>
          <Link href="/chat" style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
            cursor: "pointer",
          }}>
            💬 Start Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
