import React, { useState } from "react";
import Link from "next/link";

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    apiUrl: "https://api.aiexpert.dev",
    domain: "aiexpert.dev",
    maxUsers: "10000",
    features: ["code", "video", "chat", "offline"]
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>⚙️ إعدادات النظام</h1>
      </header>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>API URL</label>
            <input
              type="text"
              value={settings.apiUrl}
              onChange={(e) => setSettings({ ...settings, apiUrl: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>النطاق</label>
            <input
              type="text"
              value={settings.domain}
              onChange={(e) => setSettings({ ...settings, domain: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>الحد الأقصى للمستخدمين</label>
            <input
              type="number"
              value={settings.maxUsers}
              onChange={(e) => setSettings({ ...settings, maxUsers: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box" }}
            />
          </div>

          <button
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            💾 حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
}
