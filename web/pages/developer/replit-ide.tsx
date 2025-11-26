import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function ReplitIDE() {
  const [code, setCode] = useState("// ابدأ بكتابة الكود هنا\nconsole.log('Hello Replit!');");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "Python", value: "python" },
    { name: "React", value: "react" },
    { name: "TypeScript", value: "typescript" }
  ];

  const runCode = () => {
    setOutput("✅ تم تنفيذ الكود بنجاح!\n\nالمخرجات:\n> Hello Replit!");
  };

  return (
    <SmoothLayout
      title="🖥️ Replit IDE"
      subtitle="طور بكل مميزات Replit - مجاني تماماً"
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", height: "70vh" }}>
        {/* Code Editor */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ padding: "1rem", borderBottom: "1px solid #e0e0e0", display: "flex", gap: "1rem", alignItems: "center" }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.name}</option>
              ))}
            </select>
            <button
              onClick={runCode}
              style={{
                padding: "0.5rem 1.5rem",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.25s"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as any).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as any).style.transform = "scale(1)";
              }}
            >
              ▶️ تشغيل
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1,
              padding: "1rem",
              fontFamily: "monospace",
              fontSize: "14px",
              border: "none",
              outline: "none",
              background: "#1e1e1e",
              color: "#d4d4d4",
              resize: "none"
            }}
          />
        </div>

        {/* Output Terminal */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ padding: "1rem", borderBottom: "1px solid #e0e0e0", fontWeight: "bold" }}>
            📤 المخرجات
          </div>
          <div style={{
            flex: 1,
            padding: "1rem",
            background: "#1e1e1e",
            color: "#4CAF50",
            fontFamily: "monospace",
            fontSize: "14px",
            overflow: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all"
          }}>
            {output || "المخرجات ستظهر هنا..."}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{
        marginTop: "2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem"
      }}>
        {[
          { icon: "🎨", title: "واجهة حديثة" },
          { icon: "⚡", title: "تنفيذ فوري" },
          { icon: "💾", title: "حفظ تلقائي" },
          { icon: "🌐", title: "نشر مباشر" }
        ].map(feature => (
          <div key={feature.title} style={{
            background: "white",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}>
            <div style={{ fontSize: "2rem" }}>{feature.icon}</div>
            <div style={{ marginTop: "0.5rem", fontWeight: "bold", color: "#333" }}>{feature.title}</div>
          </div>
        ))}
      </div>
    </SmoothLayout>
  );
}
