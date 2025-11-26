import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function SubscriptionPlans() {
  const [current, setCurrent] = useState("free");
  const [plans] = useState([
    { id: "free", name: "مجاني", price: 0, apps: 1, storage: "1GB", support: "بريد", commission: "30%" },
    { id: "pro", name: "احترافي", price: 9.99, apps: 3, storage: "10GB", support: "أولوية", commission: "20%" },
    { id: "ent", name: "مؤسسي", price: 49.99, apps: 999, storage: "100GB", support: "24/7", commission: "10%" }
  ]);

  return (
    <SmoothLayout title="📦 خطط الاشتراك" subtitle="اختر الخطة المناسبة لك">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
        {plans.map(plan => (
          <div key={plan.id} style={{
            background: current === plan.id ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: current === plan.id ? "0 8px 24px rgba(102, 126, 234, 0.4)" : "0 2px 8px rgba(0,0,0,0.05)",
            color: current === plan.id ? "white" : "#333"
          }}>
            <h3 style={{ margin: 0, fontSize: "1.5rem" }}>{plan.name}</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "1rem 0", color: current === plan.id ? "white" : "#667eea" }}>
              {plan.price === 0 ? "مجاني" : `$${plan.price}/شهر`}
            </div>

            <div style={{ margin: "1.5rem 0", fontSize: "0.9rem" }}>
              <p>✅ {plan.apps} تطبيقات</p>
              <p>✅ {plan.storage} تخزين</p>
              <p>✅ دعم {plan.support}</p>
              <p>✅ عمولة {plan.commission}</p>
            </div>

            <button onClick={() => setCurrent(plan.id)} style={{
              width: "100%",
              padding: "0.75rem",
              background: current === plan.id ? "rgba(255,255,255,0.2)" : "#667eea",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}>
              {current === plan.id ? "✅ الخطة الحالية" : "اختر"}
            </button>
          </div>
        ))}
      </div>
    </SmoothLayout>
  );
}
