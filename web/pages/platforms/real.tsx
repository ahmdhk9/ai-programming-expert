import React, { useState, useEffect } from "react";

export default function RealPlatforms() {
  const [earnings, setEarnings] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const [earningsRes, platformsRes] = await Promise.all([
          fetch('/api/real-platforms/earnings'),
          fetch('/api/real-platforms/all')
        ]);
        setEarnings(await earningsRes.json());
        setPlatforms(await platformsRes.json());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    
    fetch_data();
    const interval = setInterval(fetch_data, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>⏳ جاري التحميل...</div>;

  const categories = {};
  platforms.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      <h1>💰 منصات الدخل الحقيقية - {earnings?.totalPlatforms} منصة</h1>

      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>💵 الأرباح من جميع المنصات الحقيقية</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <div>كل ثانية</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.perSecond}</div>
          </div>
          <div>
            <div>كل دقيقة</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.perMinute}</div>
          </div>
          <div>
            <div>كل ساعة</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.perHour}</div>
          </div>
          <div>
            <div>يومياً</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.perDay}</div>
          </div>
          <div>
            <div>سنوياً</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${earnings?.perYear}</div>
          </div>
        </div>
      </div>

      {Object.entries(categories).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: "2rem" }}>
          <h3 style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
            {cat === 'games' && '🎮 ألعاب تعطي أرباح'}
            {cat === 'video_watching' && '📺 مشاهدة الفيديوهات'}
            {cat === 'content' && '✍️ الكتابة والمحتوى'}
            {cat === 'mining' && '⛏️ التعدين والعملات'}
            {cat === 'surveys' && '📋 الاستطلاعات'}
            {cat === 'referral' && '👥 برامج الإحالة'}
            {cat === 'faucets' && '💸 محافظ مجانية'}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
            {items.map((p, i) => (
              <div key={i} style={{ background: "white", padding: "1rem", borderRadius: "8px", border: "2px solid #28a745" }}>
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>✅ {p.name}</div>
                <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>{p.earning_method}</div>
                <div style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  💵 ${p.min_earning}-${p.max_earning}/يوم
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}