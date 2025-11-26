import React, { useState } from "react";
import Link from "next/link";

export default function Features50() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const allCapabilities = [
    { id: "code", name: "Code Generator", speed: "⚡⚡⚡⚡⚡", models: ["Groq", "Mistral"] },
    { id: "errors", name: "Auto Error Fixer", speed: "⚡⚡⚡⚡⚡", models: ["Groq"] },
    { id: "ui", name: "UI Generator", speed: "⚡⚡⚡⚡", models: ["Replicate"] },
    { id: "db", name: "Auto Database", speed: "⚡⚡⚡⚡⚡", models: ["Firebase"] },
    { id: "deploy", name: "Auto Deploy", speed: "⚡⚡⚡⚡⚡", models: ["CI/CD"] },
    { id: "langs", name: "Multi-Language", speed: "⚡⚡⚡⚡⚡", models: ["Universal"] },
    { id: "templates", name: "Templates Library", speed: "⚡⚡⚡⚡⚡", models: ["Local"] },
    { id: "blueprint", name: "Blueprint AI", speed: "⚡⚡⚡⚡", models: ["Groq"] },
    { id: "integrations", name: "Auto Integrations", speed: "⚡⚡⚡⚡", models: ["API"] },
    { id: "cloud", name: "Free Cloud", speed: "⚡⚡⚡⚡", models: ["Firebase"] },
    { id: "mobile", name: "Mobile App Builder", speed: "⚡⚡⚡⚡", models: ["React Native"] },
    { id: "game", name: "Game Builder", speed: "⚡⚡⚡", models: ["Babylon.js"] },
    { id: "website", name: "Website Builder", speed: "⚡⚡⚡⚡⚡", models: ["Next.js"] },
    { id: "ecom", name: "eCommerce Builder", speed: "⚡⚡⚡⚡", models: ["Custom"] },
    { id: "writer", name: "Movie/Series Writer", speed: "⚡⚡⚡", models: ["Groq", "Mistral"] },
    { id: "3d", name: "3D Object Generator", speed: "⚡⚡", models: ["Replicate"] },
    { id: "voice", name: "Voice Generator", speed: "⚡⚡⚡", models: ["TTS"] },
    { id: "cartoon", name: "Cartoon Video", speed: "⚡⚡", models: ["Replicate"] },
    { id: "book", name: "Book Creator", speed: "⚡⚡⚡⚡", models: ["Groq"] },
    { id: "music", name: "Music Generator", speed: "⚡⚡", models: ["MusicGen"] },
  ];
  
  const capabilities = allCapabilities;
  const filtered = capabilities.filter(
    (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = {
    "البرمجة الأساسية (1-10)": capabilities.slice(0, 10),
    "التطبيقات والمحتوى (11-20)": capabilities.slice(10, 20),
    "التحويلات الذكية (21-30)": capabilities.slice(20, 30),
    "المتجر والأدوات (31-40)": capabilities.slice(30, 40),
    "الأتمتة المتقدمة (41-50)": capabilities.slice(40, 50),
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#00695c", color: "white", padding: "2rem" }}>
        <h1>⚡ 50 ميزة متقدمة - Super AI Engine</h1>
        <p>جميع الميزات المتقدمة في محرك واحد فائق الذكاء</p>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/">🏠 Home</Link>
          <Link href="/chat">💬 Chat</Link>
        </nav>

        {/* Search */}
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن ميزة..."
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Stats */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem" }}>
            <div>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#00695c" }}>50</div>
              <div style={{ color: "#666" }}>ميزة متقدمة</div>
            </div>
            <div>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#ff6f00" }}>⚡⚡⚡⚡⚡</div>
              <div style={{ color: "#666" }}>أقصى سرعة</div>
            </div>
            <div>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#d32f2f" }}>100%</div>
              <div style={{ color: "#666" }}>أتمتة كاملة</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        {searchTerm === ""
          ? Object.entries(categories).map(([category, items]) => (
              <div key={category} style={{ marginBottom: "3rem" }}>
                <h2 style={{ color: "#00695c", borderBottom: "2px solid #00695c", paddingBottom: "0.5rem" }}>
                  {category}
                </h2>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                  marginTop: "1rem",
                }}>
                  {items.map((item) => (
                    <FeatureCard key={item.id} feature={item} />
                  ))}
                </div>
              </div>
            ))
          : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}>
              {filtered.map((item) => (
                <FeatureCard key={item.id} feature={item} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

function FeatureCard({ feature }: any) {
  const speedCount = (feature.speed?.match(/⚡/g) || []).length;
  const speedPercent = (speedCount / 5) * 100;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "1.5rem",
        borderLeft: `4px solid #00695c`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as any;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as any;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", color: "#00695c" }}>{feature.name}</h3>
      
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.2rem" }}>{feature.speed}</span>
        <div style={{ backgroundColor: "#f0f0f0", borderRadius: "4px", overflow: "hidden", flex: 1, height: "6px" }}>
          <div
            style={{
              backgroundColor: "#ff6f00",
              height: "100%",
              width: `${speedPercent}%`,
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <strong style={{ fontSize: "0.85rem", color: "#666" }}>Models:</strong>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
          {feature.models.map((model: string, idx: number) => (
            <span
              key={idx}
              style={{
                backgroundColor: "#e0f2f1",
                color: "#00695c",
                padding: "0.25rem 0.75rem",
                borderRadius: "12px",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {model}
            </span>
          ))}
        </div>
      </div>

      <button
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#00695c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        استخدم الآن
      </button>
    </div>
  );
}
