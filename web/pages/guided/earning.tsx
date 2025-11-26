import React, { useState, useEffect } from "react";

export default function GuidedEarning() {
  const [steps, setSteps] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = "user_123";

  useEffect(() => {
    const fetch_data = async () => {
      try {
        await fetch(`/api/guided/start/${userId}`, { method: 'POST' });
        const [stepsRes, statsRes] = await Promise.all([
          fetch(`/api/guided/next-steps/${userId}`),
          fetch(`/api/guided/stats/${userId}`)
        ]);
        setSteps(await stepsRes.json());
        setStats(await statsRes.json());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    
    fetch_data();
  }, []);

  const handleComplete = async (platformId, stepId) => {
    try {
      const res = await fetch(`/api/guided/complete-step/${userId}/${platformId}/${stepId}`, {
        method: 'POST'
      });
      const result = await res.json();
      
      if (result.success) {
        alert(`✅ تم تسجيل: ${result.step}\n💵 ربح: $${result.earning}\nإجمالي: $${result.totalEarnings}`);
        
        const [stepsRes, statsRes] = await Promise.all([
          fetch(`/api/guided/next-steps/${userId}`),
          fetch(`/api/guided/stats/${userId}`)
        ]);
        setSteps(await stepsRes.json());
        setStats(await statsRes.json());
      }
    } catch (error) {
      alert('خطأ في التسجيل');
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>⏳ جاري التحميل...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>🎯 مسار الكسب الموجه - ابدأ الآن وكسب أموال حقيقية</h1>

      {stats && (
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
          <h2 style={{ margin: 0 }}>💰 أرباحك حتى الآن</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <div>إجمالي الأرباح</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats.totalEarnings}</div>
            </div>
            <div>
              <div>الخطوات المكتملة</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.stepsCompleted}</div>
            </div>
            <div>
              <div>يومياً (متوقع)</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats.estimatedDailyEarning}</div>
            </div>
            <div>
              <div>شهرياً (متوقع)</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats.estimatedMonthlyEarning}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {steps.map((platform, i) => (
          <div key={i} style={{ background: "white", border: "2px solid #667eea", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ background: "#667eea", color: "white", padding: "1rem", fontSize: "1.5rem" }}>
              {platform.icon} {platform.name}
            </div>
            
            <div style={{ padding: "1rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.3rem" }}>
                  التقدم: {platform.completionPercentage}%
                </div>
                <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "8px", overflow: "hidden" }}>
                  <div style={{ background: "#28a745", height: "100%", width: `${platform.completionPercentage}%` }}></div>
                </div>
              </div>

              <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                  الخطوة التالية: {platform.nextStep.title}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
                  {platform.nextStep.description}
                </div>
                {platform.nextStep.url && (
                  <a href={platform.nextStep.url} target="_blank" rel="noopener noreferrer" style={{ color: "#667eea", textDecoration: "underline", fontSize: "0.85rem" }}>
                    🔗 افتح الموقع
                  </a>
                )}
              </div>

              <button
                onClick={() => handleComplete(steps[i].id, platform.nextStep.id)}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ✅ تم إكمال الخطوة
              </button>

              <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.85rem", color: "#666" }}>
                عند إكمال المنصة: +${platform.earning}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}