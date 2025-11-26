import React, { useState, useEffect } from "react";

export default function ContinuousIncome() {
  const [status, setStatus] = useState(null);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const [statusRes, sourcesRes] = await Promise.all([
          fetch('/api/continuous/status'),
          fetch('/api/continuous/sources')
        ]);
        setStatus(await statusRes.json());
        setSources(await sourcesRes.json());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    
    fetch_data();
    const interval = setInterval(fetch_data, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>جاري التحميل...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>💰 نظام الدخل الشرعي المستمر</h1>

      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>🔄 أرباح 24/7 - تلقائياً بدون توقف</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <div style={{ opacity: 0.8 }}>كل ثانية</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>${status?.perSecond}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>كل دقيقة</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>${status?.perMinute}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>كل ساعة</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>${status?.perHour}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>يومياً</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>${status?.perDay}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#d4edda", padding: "1.5rem", borderRadius: "8px" }}>
          <div>أسبوعياً</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#28a745" }}>${status?.perWeek}</div>
        </div>
        <div style={{ background: "#cfe2ff", padding: "1.5rem", borderRadius: "8px" }}>
          <div>شهرياً</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#0d6efd" }}>${status?.perMonth}</div>
        </div>
        <div style={{ background: "#fff3cd", padding: "1.5rem", borderRadius: "8px" }}>
          <div>سنوياً</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#856404" }}>${status?.perYear}</div>
        </div>
      </div>

      <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px" }}>
        <h2>📊 المصادر النشطة ({status?.totalSources})</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          {sources.map((source, i) => (
            <div key={i} style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #ddd" }}>
              <div style={{ fontWeight: "bold" }}>{source.name}</div>
              <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
                {source.noAuth ? '✅ بدون توثيق معقد' : '✅ نشط'}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#28a745", marginTop: "0.5rem" }}>
                {source.status === 'active' ? '🟢 يعمل الآن' : '⚪ متوقف'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#e3f2fd", padding: "1.5rem", borderRadius: "12px", marginTop: "2rem" }}>
        <h3>✨ المميزات:</h3>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>✅ 12 مصدر دخل شرعي حقيقي</li>
          <li>✅ تعمل 24/7 بدون توقف</li>
          <li>✅ بدون توثيق معقد (معظمها)</li>
          <li>✅ أرباح تتراكم تلقائياً</li>
          <li>✅ قابلة للسحب مباشرة</li>
        </ul>
      </div>
    </div>
  );
}
