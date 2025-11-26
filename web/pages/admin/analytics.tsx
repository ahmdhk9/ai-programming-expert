import React from "react";
import Link from "next/link";

export default function AnalyticsAdmin() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>📊 التحليلات والإحصائيات</h1>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
          {[
            { title: "المستخدمون النشطون", data: "1,234" },
            { title: "المشاريع المنشأة", data: "567" },
            { title: "معدل الاستخدام", data: "78.5%" },
            { title: "أوقات الاستجابة", data: "45ms" }
          ].map((item) => (
            <div key={item.title} style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ margin: "0 0 1rem 0", color: "#333" }}>{item.title}</h3>
              <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#667eea" }}>{item.data}</div>
              <div style={{ marginTop: "1rem", height: "100px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                📈 رسم بياني
              </div>
            </div>
          ))}
        </div>

        {/* Activity Log */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", marginTop: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>📝 السجل النشط</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              { time: "الآن", event: "مستخدم جديد سجل", icon: "👤" },
              { time: "قبل 5 دقائق", event: "مشروع تم نشره", icon: "🚀" },
              { time: "قبل ساعة", event: "توكن تمت إضافته", icon: "🔑" }
            ].map((log, idx) => (
              <div key={idx} style={{ display: "flex", gap: "1rem", padding: "1rem", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <div style={{ fontSize: "1.5rem" }}>{log.icon}</div>
                <div>
                  <div style={{ fontWeight: "bold" }}>{log.event}</div>
                  <div style={{ color: "#999", fontSize: "0.9rem" }}>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
