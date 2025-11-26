import React from "react";
import Link from "next/link";

export default function RoadmapAdmin() {
  const roadmap = [
    {
      phase: "Phase 1",
      title: "Real-time Collaboration",
      emoji: "👥",
      items: ["Live chat", "Pair programming", "Co-editing"],
      timeline: "الأسبوع 1-2",
      status: "في التخطيط"
    },
    {
      phase: "Phase 2",
      title: "Mobile Apps",
      emoji: "📱",
      items: ["iOS app", "Android app", "Push notifications"],
      timeline: "الأسبوع 3-4",
      status: "في التخطيط"
    },
    {
      phase: "Phase 3",
      title: "3D & Gaming",
      emoji: "🎮",
      items: ["3D editor", "Game engine", "Physics simulation"],
      timeline: "الأسبوع 5-6",
      status: "في التخطيط"
    },
    {
      phase: "Phase 4",
      title: "Marketplace",
      emoji: "🛍️",
      items: ["Template store", "Code snippets", "Monetization"],
      timeline: "الأسبوع 7-8",
      status: "في التخطيط"
    },
    {
      phase: "Phase 5",
      title: "Enterprise",
      emoji: "🏢",
      items: ["SSO", "Audit logs", "Compliance"],
      timeline: "الأسبوع 9-10",
      status: "في التخطيط"
    }
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🗺️ خريطة الطريق</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gap: "2rem" }}>
          {roadmap.map((phase) => (
            <div
              key={phase.phase}
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                borderLeft: "4px solid #667eea",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                    <div style={{ fontSize: "2rem" }}>{phase.emoji}</div>
                    <div>
                      <h2 style={{ margin: 0, color: "#667eea" }}>{phase.title}</h2>
                      <p style={{ margin: "0.25rem 0 0 0", color: "#999" }}>{phase.phase}</p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "bold"
                  }}
                >
                  ⏰ {phase.timeline}
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h3 style={{ margin: "0 0 1rem 0" }}>الميزات:</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
                  {phase.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "1rem",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontWeight: "500"
                      }}
                    >
                      ✨ {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
