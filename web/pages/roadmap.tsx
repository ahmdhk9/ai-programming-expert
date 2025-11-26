import React, { useState } from "react";
import Link from "next/link";

export default function Roadmap() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#1a1a2e", color: "white", padding: "2rem", textAlign: "center", borderBottom: "3px solid #667eea" }}>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem", color: "#667eea" }}>
          👨‍💻 أحمد البصراوي
        </div>
        <h1>🛣️ Roadmap - الخطة المستقبلية</h1>
        <p>الميزات والتطويرات التي نخطط لإضافتها</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem" }}>
          <Link href="/">🏠 Home</Link>
        </nav>

        {/* Needed Features */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>🔧 الميزات المطلوبة</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              { emoji: "🔌", title: "GitHub Integration", desc: "الوصول المباشر لـ GitHub والتحديث التلقائي" },
              { emoji: "🤖", title: "Advanced AI Models", desc: "إضافة نماذج أكثر تقدماً" },
              { emoji: "⚡", title: "Performance Boost", desc: "تحسين السرعة بـ 50%" },
              { emoji: "🎨", title: "UI Templates", desc: "مكتبة قوالب واجهات" },
              { emoji: "📊", title: "Analytics Dashboard", desc: "لوحة تحليل متقدمة" },
              { emoji: "🔐", title: "Advanced Security", desc: "طبقات أمان إضافية" },
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #667eea" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{item.emoji}</div>
                <h3 style={{ margin: "0.5rem 0" }}>{item.title}</h3>
                <p style={{ color: "#666", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Developments */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>🚀 التطويرات المستقبلية</h2>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {[
              { timeline: "Q1 2026", items: ["API Marketplace", "Community Plugins", "Advanced Caching"] },
              { timeline: "Q2 2026", items: ["Mobile Apps", "Desktop Apps", "Cloud Sync"] },
              { timeline: "Q3 2026", items: ["AI Training", "Custom Models", "Enterprise Features"] },
              { timeline: "Q4 2026", items: ["Global Expansion", "Multi-language", "Advanced Analytics"] },
            ].map((quarter, idx) => (
              <div key={idx} style={{ backgroundColor: "#f0f4ff", padding: "1.5rem", borderRadius: "8px", borderLeft: "4px solid #667eea" }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#667eea" }}>{quarter.timeline}</h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {quarter.items.map((item) => (
                    <span key={item} style={{ backgroundColor: "#667eea", color: "white", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "0.9rem" }}>
                      ✅ {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Integration */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>🔌 GitHub Integration</h2>
          <div style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px", marginBottom: "1rem" }}>
            <h3 style={{ margin: "0 0 1rem 0" }}>✨ المميزات المتاحة</h3>
            <ul style={{ margin: 0, paddingLeft: "1.5rem", lineHeight: "2" }}>
              <li>📊 مزامنة البيانات تلقائياً من المستودع</li>
              <li>🔄 التحديث الفوري عند أي تغيير</li>
              <li>📈 إحصائيات المشروع الكاملة</li>
              <li>🎯 تتبع التطور والتحسينات</li>
              <li>🔐 وصول آمن مع OAuth</li>
              <li>📝 Auto-generated Documentation</li>
            </ul>
          </div>
          <button
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            🔗 ربط حساب GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
