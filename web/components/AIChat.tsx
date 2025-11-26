import React, { useState, useRef, useEffect } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState<any[]>([
    { role: "assistant", text: "مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك في التطوير اليوم؟" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    setTimeout(() => {
      let response = "أنا هنا لمساعدتك!";
      
      if (userMessage.includes("code") || userMessage.includes("كود")) {
        response = "يمكنك كتابة الكود مباشرة في محرر Replit. هل تريد مساعدة في لغة معينة؟";
      } else if (userMessage.includes("deploy") || userMessage.includes("نشر")) {
        response = "اضغط على زر النشر في لوحة التحكم. سيتم نشر تطبيقك بدون توقف!";
      } else if (userMessage.includes("error") || userMessage.includes("خطأ")) {
        response = "اذهب إلى مراقب الأخطاء - سيتم اكتشاف وإصلاح الأخطاء تلقائياً!";
      } else if (userMessage.includes("feature") || userMessage.includes("ميزة")) {
        response = "المنصة تحتوي على 100+ ميزة. اذهب إلى الميزات المتقدمة لاستكشافها.";
      }

      setMessages(prev => [...prev, { role: "assistant", text: response }]);
      setLoading(false);
    }, 300);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      overflow: "hidden"
    }}>
      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: "auto",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animation: "slideIn 0.3s ease-out"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                background: msg.role === "user" ? "#667eea" : "#f0f0f0",
                color: msg.role === "user" ? "white" : "#333",
                wordWrap: "break-word"
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "0.75rem 1rem", background: "#f0f0f0", borderRadius: "8px" }}>
              ⏳ جاري الكتابة...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "1rem",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        gap: "0.5rem"
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="اسأل مساعدك الذكي..."
          style={{
            flex: 1,
            padding: "0.75rem",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            outline: "none",
            direction: "rtl"
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.25s"
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as any).style.background = "#764ba2";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as any).style.background = "#667eea";
          }}
        >
          إرسال
        </button>
      </div>
    </div>
  );
}
