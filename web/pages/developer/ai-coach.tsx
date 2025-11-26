import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function AICoachdeveloper() {
  const [context, setContext] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [understanding, setUnderstanding] = useState<any>(null);
  const messagesEnd = useRef(null);

  useEffect(() => {
    loadContext();
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadContext = async () => {
    try {
      const res = await fetch("/api/dev/context");
      const data = await res.json();
      setContext(data);
      addSystemMessage("تم تحميل السياق. أنا أفهم أين أنت الآن في مشروعك.");
    } catch (err) {
      console.error("Error loading context:", err);
    }
  };

  const addSystemMessage = (msg: string) => {
    setMessages(prev => [...prev, { role: "system", content: msg }]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch("/api/dev/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, context })
      });

      const data = await res.json();
      
      setMessages(prev => [...prev, {
        role: "coach",
        content: data.response,
        plan: data.plan,
        nextSteps: data.nextSteps
      }]);

      setUnderstanding(data.understanding);
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
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🧠 مدرب الذكاء الاصطناعي</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
        {/* Main Chat */}
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
                  color: msg.role === "user" ? "#667eea" : msg.role === "system" ? "#999" : "#2196F3"
                }}>
                  {msg.role === "user" ? "أنت" : msg.role === "system" ? "📝 نظام" : "🧠 المدرب"}
                </div>
                <div style={{
                  backgroundColor: msg.role === "user" ? "#e3f2fd" : msg.role === "system" ? "#f5f5f5" : "#f0f4c3",
                  padding: "1rem",
                  borderRadius: "8px",
                  whiteSpace: "pre-wrap"
                }}>
                  {msg.content}
                </div>
                {msg.plan && (
                  <div style={{
                    backgroundColor: "#fff9c4",
                    padding: "0.75rem",
                    marginTop: "0.5rem",
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                  }}>
                    <strong>📋 الخطة:</strong> {msg.plan}
                  </div>
                )}
                {msg.nextSteps && (
                  <div style={{
                    backgroundColor: "#e8f5e9",
                    padding: "0.75rem",
                    marginTop: "0.5rem",
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                  }}>
                    <strong>✅ الخطوات التالية:</strong> {msg.nextSteps}
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
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="قل لي ماذا تريد أن تعمل..."
              style={{
                padding: "1rem",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem"
              }}
            />
            <button
              onClick={sendMessage}
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
              📤 إرسال
            </button>
          </div>
        </div>

        {/* Sidebar - Context Info */}
        <div style={{
          display: "grid",
          gridTemplateRows: "auto auto auto",
          gap: "1rem",
          height: "fit-content"
        }}>
          {/* Understanding */}
          {understanding && (
            <div style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem" }}>📍 الفهم</h3>
              <div style={{ fontSize: "0.75rem", lineHeight: "1.6", color: "#666" }}>
                <div>🎯 الهدف: {understanding.action}</div>
                <div>📌 الهدف: {understanding.target}</div>
                <div>📊 مرتبط: {understanding.isRelated ? "نعم" : "لا"}</div>
              </div>
            </div>
          )}

          {/* Context */}
          {context && (
            <div style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem" }}>🔍 السياق</h3>
              <div style={{ fontSize: "0.75rem", lineHeight: "1.6", color: "#666" }}>
                <div>📂 المشروع: {context.stage}</div>
                <div>✨ الميزات: {context.features || 0}</div>
                <div>⏱️ المدة: {context.duration || "0"}</div>
              </div>
            </div>
          )}

          {/* Status */}
          <div style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.85rem" }}>✅ الحالة</h3>
            <div style={{ fontSize: "0.75rem", lineHeight: "1.6", color: "#666" }}>
              <div>🎯 الحالة: فعالة</div>
              <div>💡 فهم: عالي</div>
              <div>📈 التقدم: 78%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
