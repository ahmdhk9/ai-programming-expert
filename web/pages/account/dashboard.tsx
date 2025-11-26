import React from "react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ color: "white", marginBottom: "2rem" }}>
          <h1 style={{ margin: 0 }}>💎 حسابك الشخصي</h1>
          <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>ahmdalbsrawe@gmail.com</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <div style={{ fontSize: "0.9rem", color: "#999" }}>الرصيد</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#667eea" }}>$15,600</div>
          </div>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <div style={{ fontSize: "0.9rem", color: "#999" }}>اليوم</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#4CAF50" }}>$520</div>
          </div>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px" }}>
            <div style={{ fontSize: "0.9rem", color: "#999" }}>الشهر</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#FF9800" }}>$15,600</div>
          </div>
        </div>

        <Link href="/account/withdraw" style={{ display: "inline-block", padding: "1rem 2rem", background: "white", color: "#667eea", textDecoration: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
          💰 اسحب الآن
        </Link>
      </div>
    </div>
  );
}
