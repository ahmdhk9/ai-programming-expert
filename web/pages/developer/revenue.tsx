import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RevenuePanel() {
  const [stats, setStats] = useState<any>(null);
  const [earnings, setEarnings] = useState<any>(null);

  useEffect(() => {
    fetchRevenueData();
    const interval = setInterval(fetchRevenueData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRevenueData = async () => {
    try {
      const [statsRes, earningsRes] = await Promise.all([
        fetch("/api/dev/revenue-stats"),
        fetch("/api/dev/my-earnings")
      ]);

      const statsData = await statsRes.json();
      const earningsData = await earningsRes.json();

      setStats(statsData);
      setEarnings(earningsData);
    } catch (err) {
      console.error("Error fetching revenue:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/dashboard" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>💰 الأرباح والعائدات</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Main Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <div style={{ color: "#999", fontSize: "0.9rem" }}>إجمالي الأرباح</div>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4CAF50", marginTop: "0.5rem" }}>
              ${earnings?.totalEarned?.toFixed(2) || "0.00"}
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <div style={{ color: "#999", fontSize: "0.9rem" }}>هذا الشهر</div>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2196F3", marginTop: "0.5rem" }}>
              ${earnings?.thisMonth?.toFixed(2) || "0.00"}
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <div style={{ color: "#999", fontSize: "0.9rem" }}>اليوم</div>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#FF9800", marginTop: "0.5rem" }}>
              ${earnings?.today?.toFixed(2) || "0.00"}
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <div style={{ color: "#999", fontSize: "0.9rem" }}>التنبؤ السنوي</div>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#9C27B0", marginTop: "0.5rem" }}>
              ${stats?.yearlyProjection?.toFixed(2) || "0.00"}
            </div>
          </div>
        </div>

        {/* Withdrawal Button */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>💸 طلب السحب</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "end" }}>
            <input
              type="number"
              placeholder="المبلغ المراد سحبه"
              style={{ padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px" }}
            />
            <button
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              🏧 سحب
            </button>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>📊 مصادر الدخل</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              { source: "الإعلانات", amount: earnings?.adRevenue || 0, icon: "📢" },
              { source: "الاشتراكات", amount: earnings?.subscriptionRevenue || 0, icon: "💳" },
              { source: "الخدمات", amount: earnings?.serviceRevenue || 0, icon: "🛠️" }
            ].map((item) => (
              <div key={item.source} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px"
              }}>
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    {item.icon} {item.source}
                  </div>
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4CAF50" }}>
                  ${item.amount?.toFixed(2) || "0.00"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
