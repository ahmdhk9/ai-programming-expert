import React, { useState } from "react";
import Link from "next/link";

export default function ContactDeveloper() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [sent, setSent] = useState(false);

  const sendMessage = async () => {
    if (!message || !email || !subject) {
      alert("الرجاء ملء جميع الحقول");
      return;
    }

    // إرسال الرسالة
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "ahmdalbsrawe@gmail.com",
          subject: `[رسالة من المنصة] ${subject}`,
          message: `من: ${email}\n\n${message}`,
        }),
      });

      if (response.ok) {
        setSent(true);
        setMessage("");
        setEmail("");
        setSubject("");
        setTimeout(() => setSent(false), 5000);
      }
    } catch (error) {
      console.error("خطأ:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#1a1a2e", color: "white", padding: "2rem", textAlign: "center", borderBottom: "3px solid #667eea" }}>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem", color: "#667eea" }}>
          👨‍💻 أحمد البصراوي
        </div>
        <h1>📧 تواصل مع المطور</h1>
        <p>أرسل رسالتك مباشرة لـ أحمد البصراوي</p>
      </header>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem" }}>
          <Link href="/">🏠 Home</Link>
        </nav>

        {sent && (
          <div style={{ backgroundColor: "#e8f5e9", border: "2px solid #4CAF50", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem", color: "#2e7d32" }}>
            ✅ تم إرسال رسالتك بنجاح! سيرد عليك أحمد البصراوي قريباً.
          </div>
        )}

        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              📧 بريدك الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              📝 الموضوع
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="موضوع الرسالة"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              💬 الرسالة
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              style={{
                width: "100%",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                minHeight: "250px",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={sendMessage}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            📤 أرسل الرسالة
          </button>
        </div>

        {/* Contact Info */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginTop: "2rem" }}>
          <h2 style={{ marginTop: 0 }}>معلومات التواصل</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>📧</span>
              <div>
                <strong>البريد الإلكتروني</strong>
                <br />
                <a href="mailto:ahmdalbsrawe@gmail.com" style={{ color: "#667eea", textDecoration: "none" }}>
                  ahmdalbsrawe@gmail.com
                </a>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>👨‍💻</span>
              <div>
                <strong>المطور</strong>
                <br />
                أحمد البصراوي العويني التميمي
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>🚀</span>
              <div>
                <strong>المنصة</strong>
                <br />
                AI Programming Expert v4.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
