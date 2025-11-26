import React, { useState } from "react";
import Link from "next/link";

export default function PricingPage() {
  const [period, setPeriod] = useState("monthly");

  const plans = [
    {
      name: "مجاني",
      emoji: "🎁",
      price: 0,
      description: "للبدء",
      features: ["أداة واحدة", "استخدام محدود", "دعم جماعي"],
      cta: "ابدأ الآن",
      color: "#f0f0f0",
      textColor: "#333"
    },
    {
      name: "احترافي",
      emoji: "⭐",
      price: 9.99,
      description: "الأكثر شيوعاً",
      features: ["جميع الأدوات", "استخدام غير محدود", "أولويات", "دعم متقدم"],
      cta: "اشترك الآن",
      color: "#667eea",
      textColor: "white",
      popular: true
    },
    {
      name: "مشروع",
      emoji: "🚀",
      price: 29.99,
      description: "للشركات",
      features: ["كل شيء", "API مخصص", "دعم 24/7", "مدير حساب"],
      cta: "تواصل معنا",
      color: "#764ba2",
      textColor: "white"
    }
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ color: "#667eea", textDecoration: "none", fontWeight: "bold", fontSize: "1.2rem" }}>
          💎 AI Expert
        </Link>
        <Link href="/auth/login" style={{ color: "#667eea", textDecoration: "none", fontWeight: "bold" }}>
          دخول
        </Link>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}>
          💰 الخطط والأسعار
        </h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "3rem", fontSize: "1.1rem" }}>
          اختر الخطة المناسبة لك وابدأ الآن
        </p>

        {/* Period Toggle */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <button
            onClick={() => setPeriod("monthly")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: period === "monthly" ? "#667eea" : "#f0f0f0",
              color: period === "monthly" ? "white" : "#333",
              border: "none",
              borderRadius: "8px 0 0 8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            شهري
          </button>
          <button
            onClick={() => setPeriod("yearly")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: period === "yearly" ? "#667eea" : "#f0f0f0",
              color: period === "yearly" ? "white" : "#333",
              border: "none",
              borderRadius: "0 8px 8px 0",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            سنوي (توفير 20%)
          </button>
        </div>

        {/* Plans */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                backgroundColor: plan.color,
                color: plan.textColor,
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: plan.popular ? "0 10px 30px rgba(102, 126, 234, 0.3)" : "0 2px 8px rgba(0,0,0,0.1)",
                border: plan.popular ? "3px solid #667eea" : "none",
                position: "relative",
                transform: plan.popular ? "scale(1.05)" : "scale(1)"
              }}
            >
              {plan.popular && (
                <div style={{
                  position: "absolute",
                  top: "-15px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#667eea",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: "bold"
                }}>
                  ⭐ الأكثر شيوعاً
                </div>
              )}

              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{plan.emoji}</div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", marginTop: 0 }}>{plan.name}</h3>
              <p style={{ margin: "0 0 1.5rem 0", opacity: 0.9 }}>{plan.description}</p>

              <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                ${plan.price}
              </div>
              <p style={{ margin: "0 0 1.5rem 0", opacity: 0.8, fontSize: "0.9rem" }}>
                {period === "monthly" ? "في الشهر" : "في السنة"}
              </p>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  backgroundColor: plan.name === "مجاني" ? "#667eea" : "transparent",
                  color: plan.name === "مجاني" ? "white" : plan.textColor,
                  border: `2px solid ${plan.textColor}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginBottom: "1.5rem"
                }}
              >
                {plan.cta}
              </button>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ marginBottom: "0.75rem", paddingLeft: "1.5rem", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0 }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
