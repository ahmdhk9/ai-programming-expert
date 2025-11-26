import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function DeveloperWorkshop() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [generatedCode, setGeneratedCode] = useState<any>(null);
  const [deployedFeatures, setDeployedFeatures] = useState<any[]>([]);
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendRequest = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch("/api/dev/generate-feature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: input })
      });

      const data = await res.json();

      setMessages(prev => [...prev, {
        role: "workshop",
        content: data.message,
        generated: data.generated,
        timestamp: new Date()
      }]);

      if (data.generated) {
        setGeneratedCode(data.generated);
      }

      if (data.deployed) {
        setDeployedFeatures(prev => [...prev, data.deployed]);
      }
    } catch (err) {
      console.error("Error:", err);
    }

    setInput("");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/developer/dashboard" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🏗️ ورشة التطوير</h1>
        <p style={{ margin: "0.5rem 0 0 0", color: "#999", fontSize: "0.9rem" }}>طور الميزات الجديدة بالكلام الطبيعي</p>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem", display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem" }}>
        {/* Main Workshop */}
        <div style={{ display: "flex", flexDirection: "column", height: "600px" }}>
          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: "1rem",
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: "1rem" }}>
                <div style={{
                  fontWeight: "bold",
                  marginBottom: "0.25rem",
                  color: msg.role === "user" ? "#667eea" : "#2196F3"
                }}>
                  {msg.role === "user" ? "أنت" : "🏗️ الورشة"}
                </div>
                <div style={{
                  backgroundColor: msg.role === "user" ? "#e3f2fd" : "#f0f4c3",
                  padding: "1rem",
                  borderRadius: "8px",
                  whiteSpace: "pre-wrap"
                }}>
                  {msg.content}
                </div>
                {msg.generated && (
                  <div style={{
                    backgroundColor: "#e8f5e9",
                    padding: "0.75rem",
                    marginTop: "0.5rem",
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                  }}>
                    <strong>✅ تم التوليد:</strong> {msg.generated.files} ملفات
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendRequest()}
              placeholder="مثل: أريد إضافة عنصر جديد لإدارة الأرباح..."
              style={{
                padding: "1rem",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem"
              }}
            />
            <button
              onClick={sendRequest}
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              🚀 طور
            </button>
          </div>
        </div>

        {/* Sidebar - Generated Features */}
        <div style={{
          display: "grid",
          gridTemplateRows: "auto auto",
          gap: "1rem",
          height: "fit-content"
        }}>
          {/* Generated Code */}
          {generatedCode && (
            <div style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem" }}>💻 الكود المولد</h3>
              <div style={{ fontSize: "0.75rem", color: "#666", maxHeight: "150px", overflowY: "auto" }}>
                {generatedCode.files?.map((f: any, idx: number) => (
                  <div key={idx} style={{ marginBottom: "0.5rem", padding: "0.5rem", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
                    📄 {f.path}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployed Features */}
          <div style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem" }}>✅ الميزات المنشورة</h3>
            <div style={{ fontSize: "0.75rem", color: "#666", maxHeight: "300px", overflowY: "auto" }}>
              {deployedFeatures.map((f, idx) => (
                <div key={idx} style={{ marginBottom: "0.5rem", padding: "0.5rem", backgroundColor: "#e8f5e9", borderRadius: "4px" }}>
                  ✨ {f.description?.substring(0, 30)}...
                </div>
              ))}
              {deployedFeatures.length === 0 && (
                <p style={{ color: "#ccc" }}>لا توجد ميزات بعد</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
