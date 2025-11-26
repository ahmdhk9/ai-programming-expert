import React, { useState } from "react";
import Link from "next/link";

export default function UIEditor() {
  const [theme, setTheme] = useState({
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
    backgroundColor: "#f5f7fa",
    textColor: "#333"
  });

  const [selectedPage, setSelectedPage] = useState("master-control");
  const [customCSS, setCustomCSS] = useState("");

  const pages = [
    { id: "master-control", name: "غرفة التحكم" },
    { id: "dashboard", name: "لوحة المطور" },
    { id: "workshop", name: "ورشة التطوير" },
    { id: "migration", name: "الهجرة" }
  ];

  const applyTheme = async () => {
    try {
      const res = await fetch("/api/dev/apply-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, page: selectedPage, customCSS })
      });
      const data = await res.json();
      alert("تم تطبيق الثيم بنجاح!");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <header style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "2rem", color: "white" }}>
        <Link href="/developer/dashboard" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "1rem 0 0 0" }}>🎨 محرر الواجهات والمحتويات</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
          {/* Sidebar - Controls */}
          <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", height: "fit-content" }}>
            <h3 style={{ marginTop: 0, color: "#667eea" }}>⚙️ الإعدادات</h3>

            {/* Page Selection */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "0.5rem" }}>الصفحة</label>
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e0e0e0" }}
              >
                {pages.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Color Picker */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "0.5rem" }}>اللون الأساسي</label>
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                style={{ width: "100%", height: "50px", borderRadius: "8px", border: "none", cursor: "pointer" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", marginBottom: "0.5rem" }}>اللون الثانوي</label>
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                style={{ width: "100%", height: "50px", borderRadius: "8px", border: "none", cursor: "pointer" }}
              />
            </div>

            {/* Apply Button */}
            <button
              onClick={applyTheme}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
              }}
            >
              ✅ تطبيق الثيم
            </button>
          </div>

          {/* Main - Preview */}
          <div>
            {/* CSS Editor */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
              <h3 style={{ marginTop: 0, color: "#667eea" }}>💻 CSS مخصص</h3>
              <textarea
                value={customCSS}
                onChange={(e) => setCustomCSS(e.target.value)}
                placeholder="أضف CSS مخصص هنا..."
                style={{
                  width: "100%",
                  height: "200px",
                  padding: "1rem",
                  backgroundColor: "#f8f9fa",
                  color: "#333",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  resize: "vertical"
                }}
              />
            </div>

            {/* Preview */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <h3 style={{ marginTop: 0, color: "#667eea" }}>👁️ معاينة</h3>
              <div style={{
                background: theme.backgroundColor,
                padding: "2rem",
                borderRadius: "12px",
                textAlign: "center",
                color: theme.textColor
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎨</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: theme.primaryColor, marginBottom: "1rem" }}>
                  الثيم الجديد
                </div>
                <button style={{
                  padding: "10px 20px",
                  background: theme.primaryColor,
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}>
                  عرض
                </button>
              </div>
            </div>

            {/* Theme Templates */}
            <div style={{ marginTop: "2rem" }}>
              <h3 style={{ color: "#667eea" }}>🎨 قوالب جاهزة</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                {[
                  { name: "أزرق عصري", primary: "#667eea", secondary: "#764ba2" },
                  { name: "أخضر طبيعي", primary: "#4CAF50", secondary: "#2E7D32" },
                  { name: "برتقالي دافئ", primary: "#FF9800", secondary: "#F57C00" },
                  { name: "أحمر جريء", primary: "#f44336", secondary: "#c62828" }
                ].map(tmpl => (
                  <button
                    key={tmpl.name}
                    onClick={() => setTheme({ ...theme, primaryColor: tmpl.primary, secondaryColor: tmpl.secondary })}
                    style={{
                      padding: "1rem",
                      background: `linear-gradient(135deg, ${tmpl.primary} 0%, ${tmpl.secondary} 100%)`,
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    {tmpl.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
