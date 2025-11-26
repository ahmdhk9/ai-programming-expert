import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function DeveloperAIAssistant() {
  const [messages, setMessages] = useState<any[]>([
    {
      role: "ai",
      content: "مرحباً 👋 أنا مساعدك الذكي! يمكنني مساعدتك في:\n• إضافة طرق دفع جديدة\n• تحسين الأرباح\n• إدارة الاشتراكات\n• الإجابة على أسئلة تقنية\n\nماذا تحتاج؟"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef(null);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");

    // Get AI response
    try {
      const response = await fetch("/api/dev/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "ai", content: data.response }]);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/dashboard" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🤖 مساعدك الذكي</h1>
      </header>

      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Chat Messages */}
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
            <div
              key={idx}
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "1rem",
                  borderRadius: "12px",
                  backgroundColor: msg.role === "user" ? "#667eea" : "#f0f0f0",
                  color: msg.role === "user" ? "white" : "black",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap"
                }}
              >
                {msg.content}
              </div>
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
            placeholder="اكتب سؤالك هنا..."
            style={{
              padding: "1rem",
              border: "2px solid #667eea",
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
    </div>
  );
}
