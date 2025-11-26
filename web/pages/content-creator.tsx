import React, { useState } from "react";

export default function ContentCreator() {
  const [activeTab, setActiveTab] = useState("movies");
  const [form, setForm] = useState({});

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1a2e", color: "#00d4ff" }}>
      <header style={{ backgroundColor: "#16213e", padding: "2rem" }}>
        <h1>🎬 منشئ المحتوى المتقدم</h1>
        <p>أفلام، مسلسلات، دبلجة، ترجمة</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🎬", label: "أفلام", tab: "movies" },
            { icon: "📺", label: "مسلسلات", tab: "series" },
            { icon: "🎤", label: "دبلجة", tab: "dubbing" },
            { icon: "🌐", label: "ترجمة", tab: "translate" }
          ].map(item => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              style={{
                padding: "1rem",
                backgroundColor: activeTab === item.tab ? "#00d4ff" : "#0f3460",
                color: activeTab === item.tab ? "#1a1a2e" : "#00d4ff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {activeTab === "movies" && (
          <div style={{ backgroundColor: "#0f3460", padding: "2rem", borderRadius: "12px" }}>
            <h2>🎬 إنشاء فيلم</h2>
            <input placeholder="عنوان الفيلم" style={{ display: "block", width: "100%", padding: "0.75rem", marginBottom: "1rem", backgroundColor: "#1a1a2e", color: "#00d4ff", border: "1px solid #00d4ff", borderRadius: "8px" }} />
            <button style={{ padding: "0.75rem 1.5rem", backgroundColor: "#00d4ff", color: "#1a1a2e", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              ✅ إنشاء
            </button>
          </div>
        )}

        {activeTab === "dubbing" && (
          <div style={{ backgroundColor: "#0f3460", padding: "2rem", borderRadius: "12px" }}>
            <h2>🎤 خدمة الدبلجة الذكية</h2>
            <div style={{ color: "#00d4ff", lineHeight: "2", marginTop: "1rem" }}>
              <div>✅ دبلجة بأصوات احترافية</div>
              <div>✅ 10+ لغات</div>
              <div>✅ جودة 4K</div>
              <div>✅ تسليم فوري</div>
            </div>
          </div>
        )}

        {activeTab === "translate" && (
          <div style={{ backgroundColor: "#0f3460", padding: "2rem", borderRadius: "12px" }}>
            <h2>🌐 خدمة الترجمة الذكية</h2>
            <div style={{ color: "#00d4ff", lineHeight: "2", marginTop: "1rem" }}>
              <div>✅ ترجمة 99.9% دقيقة</div>
              <div>✅ AI + مراجعة بشرية</div>
              <div>✅ 25+ لغة</div>
              <div>✅ تسليم 24 ساعة</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
