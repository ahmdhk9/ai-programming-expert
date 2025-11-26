import React, { useState, useEffect } from "react";

export default function MegaSources() {
  const [stats, setStats] = useState(null);
  const [allSources, setAllSources] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const [statsRes, sourcesRes] = await Promise.all([
          fetch('/api/mega/stats'),
          fetch('/api/mega/all-sources')
        ]);
        setStats(await statsRes.json());
        setAllSources(await sourcesRes.json());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetch_data();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;

  const filtered = selectedType === 'all' 
    ? allSources 
    : allSources.filter(s => s.type === selectedType);

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      <h1>💰 نظام الدخل الضخم - 95+ مصدر</h1>

      {/* الإحصائيات */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#667eea", color: "white", padding: "1.5rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.9rem" }}>إجمالي المصادر</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats?.totalSources}</div>
        </div>
        <div style={{ background: "#43e97b", color: "#000", padding: "1.5rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.9rem" }}>الدخل اليومي</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats?.totalEarnings?.daily}</div>
        </div>
        <div style={{ background: "#f093fb", color: "#000", padding: "1.5rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.9rem" }}>الدخل الشهري</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats?.totalEarnings?.monthly}</div>
        </div>
        <div style={{ background: "#feca57", color: "#000", padding: "1.5rem", borderRadius: "8px" }}>
          <div style={{ fontSize: "0.9rem" }}>الدخل السنوي</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats?.totalEarnings?.yearly}</div>
        </div>
      </div>

      {/* تصفية حسب النوع */}
      <div style={{ marginBottom: "2rem" }}>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ padding: "0.8rem", borderRadius: "6px", fontSize: "1rem", border: "1px solid #ddd" }}
        >
          <option value="all">جميع المصادر ({allSources.length})</option>
          <option value="faucet">محافظ مجانية ({stats?.byType?.faucet})</option>
          <option value="task">مواقع المهام ({stats?.byType?.task})</option>
          <option value="content">شبكات المحتوى ({stats?.byType?.content})</option>
          <option value="survey">الاستطلاعات ({stats?.byType?.survey})</option>
          <option value="cashback">العودة النقدية ({stats?.byType?.cashback})</option>
          <option value="referral">برامج الإحالة ({stats?.byType?.referral})</option>
          <option value="crypto">Crypto & Web3 ({stats?.byType?.crypto})</option>
        </select>
      </div>

      {/* قائمة المصادر */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
        {filtered.map((source, i) => (
          <div key={i} style={{
            background: "white",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{source.name}</div>
            <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
              نوع: {source.type}
            </div>
            {source.reward && <div style={{ fontSize: "0.85rem", color: "#28a745" }}>💵 ${source.reward}</div>}
            {source.min && <div style={{ fontSize: "0.85rem", color: "#28a745" }}>💵 ${source.min}-${source.max}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
