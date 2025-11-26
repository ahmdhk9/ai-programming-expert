import React from "react";
import Link from "next/link";

export default function AIModels() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#1a73e8", color: "white", padding: "2rem" }}>
        <h1>🧠 AI Models - نماذج الذكاء الصناعي</h1>
        <p>جميع النماذج المفتوحة المصدر المتكاملة</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            {
              name: "Groq LLaMA 2",
              emoji: "⚡",
              desc: "توليد الكود بسرعة خارقة",
              capabilities: ["Code", "Debugging", "Design"],
              speed: "Ultra-fast",
              cost: "Free",
              color: "#FF6B6B",
            },
            {
              name: "Mistral 7B",
              emoji: "🎯",
              desc: "تحليل وتصنيف النصوص",
              capabilities: ["Analysis", "Summary", "Classification"],
              speed: "Fast",
              cost: "Free",
              color: "#4ECDC4",
            },
            {
              name: "Replicate",
              emoji: "🎨",
              desc: "توليد الصور والفيديوهات",
              capabilities: ["Images", "Videos", "Editing"],
              speed: "Medium",
              cost: "Low",
              color: "#45B7D1",
            },
            {
              name: "OpenAI GPT-4",
              emoji: "🚀",
              desc: "التفكير المتقدم والتحليل",
              capabilities: ["Reasoning", "Planning", "Complex"],
              speed: "Fast",
              cost: "Optional",
              color: "#9D84B7",
            },
          ].map((model, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ backgroundColor: model.color, color: "white", padding: "2rem", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{model.emoji}</div>
                <h2 style={{ margin: "0.5rem 0" }}>{model.name}</h2>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <p style={{ color: "#666", marginBottom: "1rem" }}>{model.desc}</p>
                <div style={{ marginBottom: "1rem" }}>
                  <strong>الإمكانيات:</strong>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    {model.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid #eee", fontSize: "0.9rem" }}>
                  <span>⚡ {model.speed}</span>
                  <span>💰 {model.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
