import React from "react";

export default function AdminLinks() {
  const links = {
    "لوحات التحكم الرئيسية": [
      { name: "Master Dashboard", url: "/dev/master-dashboard", desc: "لوحة التحكم الرئيسية" },
      { name: "Hidden Wallets", url: "/dev/hidden-wallets", desc: "المحافظ المخفية والأرباح" },
      { name: "Instant Earnings", url: "/dev/instant-earnings", desc: "الأرباح الفورية" },
      { name: "Infinite Sources", url: "/dev/infinite-sources", desc: "مصادر الدخل اللانهائية" }
    ],
    "البيانات والتحليلات": [
      { name: "Analytics", url: "/dev/analytics-advanced", desc: "التحليلات المتقدمة" },
      { name: "Research Engine", url: "/dev/research-engine", desc: "محرك البحث العالمي" },
      { name: "Growth Tracking", url: "/dev/auto-growth", desc: "تتبع النمو الآلي" }
    ],
    "الحسابات والسحب": [
      { name: "Account Dashboard", url: "/account/dashboard", desc: "لوحة حسابك" },
      { name: "Earnings", url: "/account/earnings", desc: "الأرباح والعمولات" },
      { name: "Withdraw", url: "/account/withdraw", desc: "سحب الأموال" },
      { name: "Transactions", url: "/account/transactions", desc: "سجل العمليات" }
    ],
    "API والتكامل": [
      { name: "API Docs", url: "/api/docs", desc: "توثيق API" },
      { name: "Webhooks", url: "/api/webhooks", desc: "Webhooks والتنبيهات" },
      { name: "Integration", url: "/dev/integrations", desc: "التكاملات" }
    ]
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>🔐 روابط إدارة المنصة</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
        {Object.entries(links).map(([category, items]) => (
          <div key={category} style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: "8px" }}>
            <h2 style={{ marginTop: 0 }}>{category}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {items.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  style={{
                    padding: "1rem",
                    background: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    color: "#333",
                    border: "1px solid #ddd",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#667eea";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#333";
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{link.name}</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
