import React, { useState, useEffect } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function DynamicBuilder() {
  const [selectedType, setSelectedType] = useState("website");
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<any>(null);
  const [code, setCode] = useState("");

  const appTypes = [
    { id: "website", name: "موقع ويب", icon: "🌐", desc: "موقع احترافي" },
    { id: "dashboard", name: "لوحة تحكم", icon: "📊", desc: "إدارة البيانات" },
    { id: "ecommerce", name: "متجر إلكتروني", icon: "🛍️", desc: "بيع المنتجات" },
    { id: "app", name: "تطبيق ويب", icon: "📱", desc: "تطبيق متقدم" },
    { id: "portfolio", name: "محفظة", icon: "🎨", desc: "عرض أعمالك" },
    { id: "blog", name: "مدونة", icon: "📝", desc: "نشر المقالات" }
  ];

  const themes = [
    { id: "modern", name: "حديث", colors: ["#667eea", "#764ba2"] },
    { id: "dark", name: "داكن", colors: ["#1e1e1e", "#333"] },
    { id: "light", name: "فاتح", colors: ["#f5f7fa", "#ffffff"] },
    { id: "minimal", name: "بسيط", colors: ["#333", "#999"] },
    { id: "vibrant", name: "نابض", colors: ["#ff006e", "#8338ec"] }
  ];

  const generateCode = () => {
    const baseCode = `
// ${selectedType === "website" ? "موقع ويب" : selectedType === "dashboard" ? "لوحة تحكم" : selectedType}
import React, { useState } from "react";

export default function App() {
  const [data, setData] = useState([]);

  return (
    <div style={{
      background: "linear-gradient(135deg, ${themes.find(t => t.id === selectedTheme)?.colors[0]} 0%, ${themes.find(t => t.id === selectedTheme)?.colors[1]} 100%)",
      minHeight: "100vh",
      padding: "2rem"
    }}>
      <h1>✨ ${description || "تطبيقك الجديد"}</h1>
      <p>تم إنشاء هذا ${selectedType} تلقائياً</p>
    </div>
  );
}
    `.trim();
    setCode(baseCode);
  };

  const handleGeneratePreview = () => {
    generateCode();
    setPreview({
      type: selectedType,
      theme: selectedTheme,
      description: description || "تطبيق جديد",
      colors: themes.find(t => t.id === selectedTheme)?.colors
    });
  };

  const theme = themes.find(t => t.id === selectedTheme);
  const appType = appTypes.find(t => t.id === selectedType);

  return (
    <SmoothLayout
      title="🛠️ محرر ديناميكي ذكي"
      subtitle="اختر الشكل والنوع ووصف ما تريد - سننشئه تلقائياً"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Configuration Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Type Selection */}
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            animation: "slideIn 0.5s ease-out"
          }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>📱 نوع التطبيق</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {appTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  style={{
                    padding: "1rem",
                    background: selectedType === type.id ? "#667eea" : "#f0f0f0",
                    color: selectedType === type.id ? "white" : "#333",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    fontSize: "0.85rem"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedType !== type.id) {
                      (e.currentTarget as any).style.background = "#e0e0e0";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedType !== type.id) {
                      (e.currentTarget as any).style.background = "#f0f0f0";
                    }
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{type.icon}</div>
                  <div style={{ fontWeight: "bold" }}>{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            animation: "slideIn 0.5s ease-out 100ms both"
          }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>🎨 اختر الشكل</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem" }}>
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  style={{
                    padding: "1rem",
                    background: `linear-gradient(135deg, ${t.colors[0]} 0%, ${t.colors[1]} 100%)`,
                    border: selectedTheme === t.id ? "3px solid #333" : "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    height: "60px"
                  }}
                  title={t.name}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            animation: "slideIn 0.5s ease-out 200ms both"
          }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>📝 وصف التطبيق</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="مثلاً: تطبيق لإدارة المشاريع مع خوارزميات متقدمة..."
              style={{
                width: "100%",
                height: "100px",
                padding: "0.75rem",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontFamily: "inherit",
                fontSize: "14px",
                direction: "rtl",
                outline: "none"
              }}
            />
            <button
              onClick={handleGeneratePreview}
              style={{
                marginTop: "1rem",
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.25s"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as any).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as any).style.transform = "scale(1)";
              }}
            >
              ✨ إنشاء
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Live Preview */}
          {preview && (
            <div style={{
              background: `linear-gradient(135deg, ${preview.colors[0]} 0%, ${preview.colors[1]} 100%)`,
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              color: preview.colors[0] === "#1e1e1e" ? "white" : preview.colors[0].includes("f") ? "#333" : "white",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              animation: "slideIn 0.5s ease-out"
            }}>
              <h2 style={{ margin: "0 0 1rem 0", fontSize: "2rem" }}>
                {appType?.icon} {appType?.name}
              </h2>
              <p style={{ margin: 0, fontSize: "1.1rem", opacity: 0.9 }}>
                {preview.description}
              </p>
              <p style={{ margin: "1rem 0 0 0", fontSize: "0.9rem", opacity: 0.7 }}>
                ✅ معاينة حية
              </p>
            </div>
          )}

          {/* Code Output */}
          {code && (
            <div style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              animation: "slideIn 0.5s ease-out 300ms both"
            }}>
              <h3 style={{ marginTop: 0, color: "#667eea" }}>💻 الكود المُنتج</h3>
              <pre style={{
                background: "#1e1e1e",
                padding: "1rem",
                borderRadius: "8px",
                overflow: "auto",
                color: "#d4d4d4",
                fontSize: "12px",
                maxHeight: "200px",
                margin: 0
              }}>
                {code}
              </pre>
            </div>
          )}

          {/* Stats */}
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            animation: "slideIn 0.5s ease-out 400ms both"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.85rem", color: "#999" }}>النوع</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#667eea" }}>{appType?.icon}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.85rem", color: "#999" }}>الشكل</div>
              <div style={{
                fontSize: "1.5rem",
                background: `linear-gradient(135deg, ${theme?.colors[0]} 0%, ${theme?.colors[1]} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                ■
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmoothLayout>
  );
}
