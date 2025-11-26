import React, { useState } from "react";
import Link from "next/link";

export default function TokensAdmin() {
  const [tokens, setTokens] = useState([
    { id: 1, name: "Groq API", token: "gsk_***", status: "active" },
    { id: 2, name: "Mistral API", token: "mst_***", status: "active" },
    { id: 3, name: "Firebase", token: "fb_***", status: "active" }
  ]);
  const [newToken, setNewToken] = useState({ name: "", token: "" });

  const addToken = () => {
    if (newToken.name && newToken.token) {
      setTokens([...tokens, { id: Date.now(), ...newToken, status: "active" }]);
      setNewToken({ name: "", token: "" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", marginBottom: "1rem", display: "inline-block" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🔑 إدارة التوكنات</h1>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {/* Add Token Form */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>➕ إضافة توكن جديد</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "1rem" }}>
            <input
              type="text"
              placeholder="اسم الخدمة"
              value={newToken.name}
              onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
              style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}
            />
            <input
              type="password"
              placeholder="التوكن"
              value={newToken.token}
              onChange={(e) => setNewToken({ ...newToken, token: e.target.value })}
              style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}
            />
            <button
              onClick={addToken}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ✅ إضافة
            </button>
          </div>
        </div>

        {/* Tokens List */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>الخدمة</th>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>التوكن</th>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>الحالة</th>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "1rem" }}>{t.name}</td>
                  <td style={{ padding: "1rem" }}>
                    <code style={{ backgroundColor: "#f5f5f5", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>
                      {t.token}
                    </code>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{ color: "#4CAF50", fontWeight: "bold" }}>🟢 {t.status}</span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <button style={{ padding: "0.5rem 1rem", backgroundColor: "#ff6b6b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      🗑️ حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
