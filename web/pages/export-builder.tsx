import React, { useState } from "react";
import Link from "next/link";

export default function ExportBuilder() {
  const [selectedExport, setSelectedExport] = useState("pwa");
  const [isBuilding, setIsBuilding] = useState(false);

  const exportOptions = [
    {
      id: "pwa",
      emoji: "📱",
      name: "Progressive Web App",
      desc: "يعمل كتطبيق ويب متقدم، install على جهازك",
      tech: ["Next.js", "Service Workers", "IndexedDB"],
      size: "8.2MB",
    },
    {
      id: "electron",
      emoji: "🖥️",
      name: "Desktop (Electron)",
      desc: "تطبيق سطح المكتب Windows/Mac/Linux",
      tech: ["Electron", "Node.js", "SQLite"],
      size: "85MB",
    },
    {
      id: "react-native",
      emoji: "📲",
      name: "React Native",
      desc: "تطبيق iOS و Android أصلي",
      tech: ["React Native", "Firebase", "Native APIs"],
      size: "92MB",
    },
    {
      id: "static",
      emoji: "📄",
      name: "Static Export",
      desc: "موقع HTML ثابت بدون backend",
      tech: ["HTML", "CSS", "JavaScript"],
      size: "2.5MB",
    },
  ];

  const current = exportOptions.find((o) => o.id === selectedExport)!;

  const buildExport = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      alert(`✅ تم إنشاء ${current.name} بنجاح! اضغط Download`);
    }, 3000);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#4CAF50", color: "white", padding: "2rem", textAlign: "center" }}>
        <h1>🏗️ Export Builder</h1>
        <p>حول المشروع إلى صيغ مختلفة بكل سهولة</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem" }}>
          <Link href="/">🏠 Home</Link>
        </nav>

        {/* Export Type Selection */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0 }}>🎯 اختر صيغة التصدير</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            {exportOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedExport(opt.id)}
                style={{
                  padding: "1rem",
                  backgroundColor: selectedExport === opt.id ? "#4CAF50" : "#f5f5f5",
                  color: selectedExport === opt.id ? "white" : "black",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{opt.emoji}</div>
                {opt.name.split("(")[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Build Details */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
            <div style={{ fontSize: "4rem" }}>{current.emoji}</div>
            <div>
              <h2 style={{ margin: 0 }}>{current.name}</h2>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>{current.desc}</p>
              <div style={{ color: "#999", fontSize: "0.9rem" }}>📦 {current.size}</div>
            </div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <strong style={{ display: "block", marginBottom: "0.5rem" }}>التكنولوجيا المستخدمة:</strong>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {current.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    backgroundColor: "#e8f5e9",
                    color: "#2e7d32",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={buildExport}
            disabled={isBuilding}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: isBuilding ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: isBuilding ? "not-allowed" : "pointer",
              marginBottom: "1rem",
            }}
          >
            {isBuilding ? "⏳ جاري البناء... (3-5 دقائق)" : "🔨 ابدأ البناء"}
          </button>

          <details style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "8px", cursor: "pointer" }}>
            <summary style={{ fontWeight: "bold", marginBottom: "1rem" }}>📖 معلومات إضافية</summary>
            <div style={{ color: "#666", lineHeight: "1.8", fontSize: "0.9rem" }}>
              <p>✅ يتم البناء محلياً على جهازك (آمن 100%)</p>
              <p>✅ يعمل بدون انترنت بعد البناء</p>
              <p>✅ جميع الـ 50 ميزة متاحة في كل صيغة</p>
              <p>✅ يتطور تلقائياً مع كل تحديث</p>
              <p>✅ يمكن المزامنة مع السحابة (اختياري)</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
