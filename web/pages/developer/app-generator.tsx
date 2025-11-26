import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function AppGenerator() {
  const [description, setDescription] = useState("");
  const [appName, setAppName] = useState("");
  const [generatedApp, setGeneratedApp] = useState<any>(null);

  const generateApp = async () => {
    if (!description.trim()) return;

    const response = await fetch("/api/dev/generate-app-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, name: appName || "تطبيقي الجديد" })
    });
    const data = await response.json();
    setGeneratedApp(data);
  };

  return (
    <SmoothLayout
      title="📱 مولد التطبيقات"
      subtitle="وصف التطبيق - نحن نسويه تلقائياً"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Input Panel */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          animation: "slideIn 0.5s ease-out",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>📝 اكتب وصف التطبيق</h2>

          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="اسم التطبيق..."
            style={{
              padding: "0.75rem",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              direction: "rtl",
              outline: "none"
            }}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="مثلاً: أريد تطبيق إدارة مشاريع يعمل على الآيفون والويب مع إشعارات وتطبيق يمكن تنزيله من المتصفح..."
            style={{
              padding: "0.75rem",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              minHeight: "150px",
              direction: "rtl",
              outline: "none",
              fontFamily: "inherit"
            }}
          />

          <button
            onClick={generateApp}
            style={{
              padding: "1rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            ✨ إنشاء التطبيق
          </button>

          <div style={{ padding: "1rem", background: "#f0f4ff", borderRadius: "8px", fontSize: "0.9rem", color: "#667eea" }}>
            💡 نصيحة: اذكر المنصة (ايفون، اندرويد، ويب) والميزات التي تريدها!
          </div>
        </div>

        {/* Output Panel */}
        {generatedApp && (
          <div style={{
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            animation: "slideIn 0.5s ease-out 200ms both",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}>
            <h2 style={{ marginTop: 0, color: "#4CAF50" }}>✅ تم الإنشاء!</h2>

            <div style={{ padding: "1rem", background: "#f0fff4", borderRadius: "8px", borderLeft: "4px solid #4CAF50" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#4CAF50" }}>📱 {generatedApp.name}</h3>
              <p style={{ margin: "0 0 0.75rem 0", color: "#666", fontSize: "0.9rem" }}>
                {description.substring(0, 100)}...
              </p>

              <div style={{ display: "grid", gap: "0.5rem" }}>
                {generatedApp.download && (
                  <>
                    <a
                      href={generatedApp.download.web}
                      style={{
                        display: "block",
                        padding: "0.75rem",
                        background: "#667eea",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontWeight: "bold"
                      }}
                    >
                      🌐 فتح في الويب
                    </a>
                    <a
                      href={generatedApp.download.download}
                      style={{
                        display: "block",
                        padding: "0.75rem",
                        background: "#4CAF50",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontWeight: "bold"
                      }}
                    >
                      📥 تنزيل التطبيق
                    </a>
                    <button
                      style={{
                        padding: "0.75rem",
                        background: "#FF9800",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      📱 تثبيت على الهاتف
                    </button>
                  </>
                )}
              </div>
            </div>

            <div style={{
              padding: "1rem",
              background: "#f5f5f5",
              borderRadius: "8px",
              fontSize: "0.9rem"
            }}>
              <h4 style={{ margin: "0 0 0.75rem 0" }}>🎯 المنصات:</h4>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {generatedApp.platforms.map((p: string) => (
                  <span key={p} style={{
                    padding: "0.25rem 0.75rem",
                    background: "#667eea",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "0.85rem"
                  }}>
                    {p === "ios" ? "📱 iOS" : p === "android" ? "📱 Android" : p === "web" ? "🌐 Web" : "📥 PWA"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </SmoothLayout>
  );
}
