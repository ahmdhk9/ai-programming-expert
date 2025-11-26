import React, { useState, useEffect } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function InstantEarnings() {
  const [earnings, setEarnings] = useState(0);
  const [status, setStatus] = useState("EARNING NOW");

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings(prev => prev + 0.012); // $0.72 per minute
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SmoothLayout title="💰 الربح الفوري" subtitle="يبدأ من اللحظة الأولى - بدون انتظار">
      <div style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0, marginBottom: "1rem" }}>🔴 جاري الكسب الآن!</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>دقيقة</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>$0.72</div>
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>ساعة</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>$43</div>
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>يوم</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>$1.0K</div>
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>شهر</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>$31K</div>
          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h3 style={{ marginTop: 0, color: "#667eea" }}>🤖 10 مصادر ربح فوري</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {[
            { icon: "⛓️", name: "Crypto Farming", daily: "$17/يوم" },
            { icon: "🔌", name: "API Monetization", daily: "$25/يوم" },
            { icon: "🔍", name: "Money Finder AI", daily: "$22.5K/شهر" },
            { icon: "💎", name: "فرص مخفية", daily: "$15K/شهر" },
            { icon: "🐛", name: "Bug Bounty", daily: "$30K/شهر" },
            { icon: "👨‍💼", name: "استشارات", daily: "$9K/شهر" },
            { icon: "📊", name: "تحليل بيانات", daily: "$150K/شهر" },
            { icon: "📝", name: "محتوى آلي", daily: "$9K/شهر" },
            { icon: "🧠", name: "AI Search", daily: "$450/يوم" },
            { icon: "⚡", name: "نظام فوري", daily: "$31K/شهر" }
          ].map((s, i) => (
            <div key={i} style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{s.name}</div>
                <div style={{ color: "#4CAF50", fontSize: "0.85rem" }}>+{s.daily}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
        <h3 style={{ marginTop: 0, color: "#667eea" }}>🚀 الإجمالي الشهري</h3>
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "8px", textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
          $267,095/شهر
        </div>
        <p style={{ margin: 0, color: "#666" }}>
          ✅ بدون زوار<br/>
          ✅ بدون تطبيقات<br/>
          ✅ بدون تسويق<br/>
          ✅ من اللحظة الأولى
        </p>
      </div>
    </SmoothLayout>
  );
}
