import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdvancedUsersAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // محاكاة جلب المستخدمين
    setUsers([
      {
        id: 1,
        name: "أحمد محمد",
        email: "ahmed@example.com",
        role: "pro",
        location: "بغداد",
        ip: "192.168.1.1",
        lastActive: new Date(),
        features: 8,
        activities: 45
      },
      {
        id: 2,
        name: "فاطمة علي",
        email: "fatima@example.com",
        role: "user",
        location: "بصرة",
        ip: "192.168.1.2",
        lastActive: new Date(Date.now() - 3600000),
        features: 3,
        activities: 12
      }
    ]);
  };

  const grantFeature = (userId: number, feature: string) => {
    console.log(`منح ميزة ${feature} للمستخدم ${userId}`);
    alert(`✅ تم منح ميزة ${feature}`);
  };

  const deleteUser = (userId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      alert(`✅ تم حذف المستخدم`);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>👥 إدارة المستخدمين المتقدمة</h1>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        {/* Filters */}
        <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            {["الكل", "نشط", "غير نشط", "pro", "user"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "0.75rem",
                  backgroundColor: filter === f ? "#667eea" : "#f0f0f0",
                  color: filter === f ? "white" : "#333",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Users Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "1.5rem" }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>{user.name}</h3>
                  <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{user.email}</p>
                </div>
                <span style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: user.role === "pro" ? "#e8f5e9" : "#f5f5f5",
                  color: user.role === "pro" ? "#2e7d32" : "#666",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: "bold"
                }}>
                  {user.role}
                </span>
              </div>

              {/* Location & Device */}
              <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1rem", fontSize: "0.9rem" }}>
                <div>📍 الموقع: {user.location}</div>
                <div>🌐 الـ IP: {user.ip}</div>
                <div>⏱️ آخر نشاط: الآن</div>
                <div>✨ الميزات: {user.features}/10</div>
                <div>📊 الأنشطة: {user.activities}</div>
              </div>

              {/* Actions */}
              <div style={{ display: "grid", gap: "0.75rem" }}>
                <button
                  onClick={() => grantFeature(user.id, "advancedAI")}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  ✨ منح ميزات
                </button>
                <button
                  onClick={() => setSelectedUser(user.id)}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  👁️ عرض التفاصيل
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#ff6b6b",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  🗑️ حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
