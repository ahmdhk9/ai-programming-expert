import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      content: "مرحباً! 👋 أنا الخبير البرمجي الذكي. كيف يمكنني مساعدتك؟ يمكنك طلب مني:\n\n📝 كتابة كود جديد\n🐛 تصحيح الأخطاء\n🏗️ تصميم المعمارية\n🧪 كتابة الاختبارات\n🚀 نشر التطبيق\n📊 تحليل الأداء",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await response.json();

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: data.response || "عذراً، حدث خطأ في معالجة طلبك.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: "⚠️ خطأ في الاتصال بالـ Backend. تأكد من أن الخادم يعمل.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#0070f3",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>🤖 AI Programming Expert</h1>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link href="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </Link>
        </nav>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.5rem",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: msg.role === "user" ? "#0070f3" : "#e8e8e8",
                color: msg.role === "user" ? "white" : "black",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                lineHeight: "1.5",
              }}
            >
              {msg.content}
              <div
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.5rem",
                  opacity: 0.7,
                }}
              >
                {msg.timestamp.toLocaleTimeString("ar-SA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "white",
          borderTop: "1px solid #ddd",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="اكتب طلبك للخبير البرمجي..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: loading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "...جاري الإجابة" : "إرسال"}
        </button>
      </div>
    </div>
  );
}
