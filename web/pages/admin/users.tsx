import React, { useState } from "react";
import Link from "next/link";

export default function UsersAdmin() {
  const [users] = useState([
    { id: 1, name: "أحمد البصراوي", email: "ahmed@example.com", role: "admin", projects: 5 },
    { id: 2, name: "مستخدم 1", email: "user1@example.com", role: "user", projects: 2 },
    { id: 3, name: "مستخدم 2", email: "user2@example.com", role: "user", projects: 1 }
  ]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>👥 إدارة المستخدمين</h1>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>الاسم</th>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>البريد</th>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>الدور</th>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>المشاريع</th>
                <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "1rem" }}>{user.name}</td>
                  <td style={{ padding: "1rem" }}>{user.email}</td>
                  <td style={{ padding: "1rem" }}>{user.role}</td>
                  <td style={{ padding: "1rem" }}>{user.projects}</td>
                  <td style={{ padding: "1rem" }}>
                    <button style={{ padding: "0.5rem 1rem", backgroundColor: "#667eea", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "0.5rem" }}>
                      👁️ عرض
                    </button>
                    <button style={{ padding: "0.5rem 1rem", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      ✏️ تعديل
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
