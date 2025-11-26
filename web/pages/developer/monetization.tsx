import React, { useState } from "react";
import Link from "next/link";

export default function MonetizationPanel() {
  const [monetizationSetup, setMonetizationSetup] = useState({
    googleAds: false,
    stripe: false,
    paypal: false,
    telecom: false
  });

  const setupOption = async (option: string) => {
    setMonetizationSetup({
      ...monetizationSetup,
      [option]: true
    });
    alert(`✅ تم تفعيل ${option}!\nيمكنك الآن البدء في الكسب`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/dashboard" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>💰 المسار الكامل للأرباح</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Ads Section */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0 }}>📢 الإعلانات</h2>
            <span style={{ color: monetizationSetup.googleAds ? "#4CAF50" : "#999" }}>
              {monetizationSetup.googleAds ? "✅ مفعل" : "❌ معطل"}
            </span>
          </div>
          <p style={{ color: "#666", marginBottom: "1rem" }}>اكسب من الإعلانات التي تظهر في تطبيقك</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { name: "Google AdSense", emoji: "🔍", revenue: "~$5-50 لكل 1000 ظهور" },
              { name: "Facebook Audience", emoji: "👥", revenue: "~$3-30 لكل 1000 ظهور" },
              { name: "Adirects", emoji: "🎯", revenue: "~$2-20 لكل 1000 ظهور" }
            ].map((ad) => (
              <button
                key={ad.name}
                onClick={() => setupOption("googleAds")}
                style={{
                  padding: "1rem",
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{ad.emoji}</div>
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{ad.name}</div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>{ad.revenue}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0 }}>💳 طرق الدفع</h2>
            <span>احصل على الدفع من المستخدمين</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { name: "Stripe", emoji: "🔵", fee: "2.9% + $0.30", setup: "stripe" },
              { name: "PayPal", emoji: "🅿️", fee: "3.49%", setup: "paypal" },
              { name: "Telecom", emoji: "📱", fee: "خصم قليل", setup: "telecom" },
              { name: "Google Pay", emoji: "🔷", fee: "2%", setup: "stripe" }
            ].map((method) => (
              <button
                key={method.name}
                onClick={() => setupOption(method.setup)}
                style={{
                  padding: "1rem",
                  backgroundColor: monetizationSetup[method.setup as keyof typeof monetizationSetup] ? "#e8f5e9" : "#f9f9f9",
                  border: `2px solid ${monetizationSetup[method.setup as keyof typeof monetizationSetup] ? "#4CAF50" : "#ddd"}`,
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{method.emoji}</div>
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{method.name}</div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>الرسم: {method.fee}</div>
                <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.5rem" }}>
                  {monetizationSetup[method.setup as keyof typeof monetizationSetup] ? "✅ مفعل" : "انقر للتفعيل"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Subscriptions */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>🎫 الاشتراكات المتكررة</h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>الدخل المستقر من الاشتراكات الشهرية</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { tier: "مجاني", price: "$0", features: "محدود" },
              { tier: "أساسي", price: "$4.99", features: "كامل" },
              { tier: "احترافي", price: "$9.99", features: "+ أولويات" }
            ].map((sub) => (
              <div
                key={sub.tier}
                style={{
                  padding: "1rem",
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #ddd",
                  borderRadius: "8px"
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{sub.tier}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#667eea", marginBottom: "0.5rem" }}>
                  {sub.price}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>{sub.features}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
