import React, { useState } from "react";
import Link from "next/link";

export default function PaymentMethodsAdmin() {
  const [methods, setMethods] = useState<any[]>([
    { id: "stripe", name: "Stripe", type: "USD", fee: 2.9, enabled: true },
    { id: "paypal", name: "PayPal", type: "USD", fee: 3.49, enabled: true },
    { id: "bitcoin", name: "Bitcoin", type: "Crypto", fee: 1, enabled: true },
    { id: "ethereum", name: "Ethereum", type: "Crypto", fee: 1, enabled: true },
    { id: "usdt", name: "USDT", type: "Crypto", fee: 0.5, enabled: true },
    { id: "usdc", name: "USDC", type: "Crypto", fee: 0.5, enabled: true }
  ]);

  const [newMethod, setNewMethod] = useState({ name: "", type: "", fee: 0 });

  const addMethod = () => {
    if (newMethod.name && newMethod.type) {
      setMethods([...methods, { ...newMethod, id: Date.now(), enabled: true }]);
      setNewMethod({ name: "", type: "", fee: 0 });
      alert("✅ تم إضافة طريقة دفع جديدة");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>💳 إدارة طرق الدفع</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Add New Method */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>➕ إضافة طريقة دفع جديدة</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "1rem", alignItems: "end" }}>
            <input
              type="text"
              placeholder="اسم الطريقة"
              value={newMethod.name}
              onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
              style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}
            />
            <select
              value={newMethod.type}
              onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
              style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}
            >
              <option value="">اختر النوع</option>
              <option value="USD">USD (عملة عادية)</option>
              <option value="Crypto">Crypto (عملة رقمية)</option>
            </select>
            <input
              type="number"
              placeholder="الرسم %"
              value={newMethod.fee}
              onChange={(e) => setNewMethod({ ...newMethod, fee: parseFloat(e.target.value) })}
              style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}
            />
            <button
              onClick={addMethod}
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

        {/* Payment Methods List */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          {methods.map((method) => (
            <div
              key={method.id}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: `2px solid ${method.enabled ? "#4CAF50" : "#ff6b6b"}`
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.3rem" }}>💳 {method.name}</h3>
                  <p style={{ margin: 0, color: "#666" }}>{method.type}</p>
                </div>
                <span style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: method.enabled ? "#e8f5e9" : "#ffebee",
                  color: method.enabled ? "#2e7d32" : "#c62828",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  fontSize: "0.85rem"
                }}>
                  {method.enabled ? "🟢 مفعل" : "🔴 معطل"}
                </span>
              </div>

              <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
                <div style={{ color: "#666", fontSize: "0.9rem" }}>الرسم: {method.fee}%</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <button
                  style={{
                    padding: "0.75rem",
                    backgroundColor: method.enabled ? "#ff9800" : "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {method.enabled ? "❌ تعطيل" : "✅ تفعيل"}
                </button>
                <button
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
