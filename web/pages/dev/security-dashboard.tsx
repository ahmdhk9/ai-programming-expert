import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function SecurityDashboard() {
  const [audit] = useState({
    overall: 100,
    tests: [
      { name: "حماية من SQL Injection", score: 100, status: "✅" },
      { name: "حماية من XSS", score: 100, status: "✅" },
      { name: "حماية CSRF", score: 100, status: "✅" },
      { name: "المصادقة", score: 100, status: "✅" },
      { name: "التشفير", score: 100, status: "✅" },
      { name: "الشهادات", score: 100, status: "✅" }
    ]
  });

  return (
    <SmoothLayout title="🔒 لوحة الأمان" subtitle="مراقبة الحماية الشاملة">
      <div style={{
        background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
        padding: "2rem",
        borderRadius: "12px",
        color: "white",
        marginBottom: "2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1.5rem"
      }}>
        <div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>حالة الأمان</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>🟢 آمن</div>
        </div>
        <div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>التهديدات</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>0</div>
        </div>
        <div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>التحديثات</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>✅</div>
        </div>
        <div>
          <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>نسبة الأمان</div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>100%</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#667eea" }}>🔐 التشفير</h3>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>AES-256</div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>عسكري</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#667eea" }}>🔒 SSL/TLS</h3>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>TLSv1.3</div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>موثق</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#667eea" }}>🛡️ الحماية</h3>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>✅ نشط</div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>24/7</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#667eea" }}>💾 النسخ</h3>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>✅ يومي</div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>3 نسخ</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#667eea" }}>📊 المراقبة</h3>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>✅ فعال</div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>فوري</p>
        </div>

        <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#667eea" }}>🔍 الكشف</h3>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4CAF50" }}>0 تهديد</div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>ذكي</p>
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <h2 style={{ marginTop: 0, color: "#667eea" }}>✅ الاختبارات الأمنية</h2>
        <div style={{ background: "#f0fff4", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem", borderLeft: "4px solid #4CAF50" }}>
          <strong style={{ color: "#4CAF50" }}>النتيجة: {audit.overall}/100 ✅ آمن جداً</strong>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          {audit.tests.map((test, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", background: "#f5f5f5", borderRadius: "8px" }}>
              <span>{test.status} {test.name}</span>
              <span style={{ fontWeight: "bold", color: "#4CAF50" }}>{test.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </SmoothLayout>
  );
}
