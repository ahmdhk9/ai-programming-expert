import React, { useState } from "react";
import Link from "next/link";

export default function Marketplace() {
  const [projects] = useState([
    { id: 1, name: "متجر إلكتروني كامل", emoji: "🛍️", price: "مجاني", rating: "5⭐" },
    { id: 2, name: "تطبيق توصيل طعام", emoji: "🍕", price: "مجاني", rating: "4.8⭐" },
    { id: 3, name: "منصة كورسات اونلاين", emoji: "📚", price: "مجاني", rating: "5⭐" },
    { id: 4, name: "شبكة اجتماعية", emoji: "👥", price: "مجاني", rating: "4.9⭐" },
    { id: 5, name: "بوت ذكي متقدم", emoji: "🤖", price: "مجاني", rating: "5⭐" },
    { id: 6, name: "لعبة بروازل", emoji: "🎮", price: "مجاني", rating: "4.7⭐" },
    { id: 7, name: "لوحة تحكم إحصائيات", emoji: "📊", price: "مجاني", rating: "5⭐" },
    { id: 8, name: "تطبيق ملاحظات ذكي", emoji: "📝", price: "مجاني", rating: "4.8⭐" },
  ]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#9b59b6", color: "white", padding: "2rem", textAlign: "center" }}>
        <h1>🏪 Marketplace</h1>
        <p>متجر يضم مشاريع جاهزة يمكنك استخدامها أو تعديلها</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {projects.map((p) => (
            <div key={p.id} style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <div style={{ backgroundColor: "#9b59b6", color: "white", padding: "2rem", textAlign: "center", fontSize: "3rem" }}>
                {p.emoji}
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ margin: "0 0 1rem 0" }}>{p.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", color: "#666" }}>
                  <span>{p.price}</span>
                  <span>{p.rating}</span>
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#9b59b6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  استخدم الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
