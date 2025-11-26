import React, { useState, useEffect } from "react";

export default function AutoSources() {
  const [sources, setSources] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srcRes, earRes] = await Promise.all([
          fetch('/api/discovery/all-sources'),
          fetch('/api/discovery/earnings')
        ]);
        setSources(await srcRes.json());
        setEarnings(await earRes.json());
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>جاري البحث...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>🔍 مصادر الدخل المكتشفة تلقائياً</h1>
      
      {/* الإحصائيات */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#667eea", color: "white", padding: "1.5rem", borderRadius: "8px" }}>
          <div>جميع المصادر</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{sources?.total}</div>
        </div>
        <div style={{ background: "#43e97b", color: "#000", padding: "1.5rem", borderRadius: "8px" }}>
          <div>مصادر نشطة</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{sources?.active}</div>
        </div>
        <div style={{ background: "#f093fb", color: "#000", padding: "1.5rem", borderRadius: "8px" }}>
          <div>الدخل اليومي</div>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.totalDaily}</div>
        </div>
      </div>

      {/* المصادر */}
      <div style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: "12px" }}>
        <h2>📌 المصادر المكتشفة</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          {sources?.sources.map((source, i) => (
            <div key={i} style={{
              background: "white",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}>
              <div style={{ fontWeight: "bold" }}>{source.name}</div>
              <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
                {source.url}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#28a745", marginTop: "0.5rem" }}>
                {source.verified ? "✅ تحقق" : "⏳ قيد المراجعة"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
