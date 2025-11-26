import React, { useState, useEffect } from "react";

export default function SourcesDiscovery() {
  const [stats, setStats] = useState(null);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const [statsRes, sourcesRes] = await Promise.all([
          fetch('/api/discovery/stats'),
          fetch('/api/discovery/sample/100')
        ]);
        setStats(await statsRes.json());
        setSources(await sourcesRes.json());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    
    fetch_data();
    const interval = setInterval(fetch_data, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (!searchCategory) return;
    
    try {
      const res = await fetch('/api/discovery/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: searchCategory, keyword: searchCategory })
      });
      const result = await res.json();
      setSources(result.sources.slice(0, 100));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>🔍 جاري البحث...</div>;

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
      <h1>🔍 نظام اكتشاف المصادر اللانهائي</h1>

      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>🚀 البحث المستمر عن آلاف المصادر</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <div style={{ opacity: 0.8 }}>إجمالي المصادر</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats?.total_sources?.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>الإمكانية اليومية</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats?.daily_potential}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>الإمكانية الشهرية</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats?.monthly_potential}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>الإمكانية السنوية</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats?.yearly_potential}</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2>🔎 البحث في المصادر</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="text"
            placeholder="ابحث عن فئة (freelancing, crypto, surveys...)"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            style={{ flex: 1, padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />
          <button
            onClick={handleSearch}
            style={{ padding: "0.8rem 1.5rem", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            ✅ ابحث
          </button>
        </div>
      </div>

      <div style={{ background: "white", border: "1px solid #ddd", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "1rem", borderBottom: "1px solid #eee", fontWeight: "bold" }}>
          عينة من المصادر المكتشفة ({sources.length || 0})
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0" }}>
          {sources.slice(0, 50).map((source, i) => (
            <div key={i} style={{ padding: "1rem", borderRight: i % 4 !== 3 ? "1px solid #eee" : "none", borderBottom: "1px solid #eee", fontSize: "0.85rem" }}>
              <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>Source {i + 1}</div>
              <div style={{ color: "#666" }}>ID: {source.substring(0, 30)}...</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#e3f2fd", padding: "1.5rem", borderRadius: "12px", marginTop: "2rem" }}>
        <h3>ℹ️ الحالة:</h3>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>✅ البحث يعمل بدون توقف</li>
          <li>✅ {stats?.total_sources?.toLocaleString()} مصدر مكتشف حتى الآن</li>
          <li>✅ يتم اكتشاف مصادر جديدة كل 30 ثانية</li>
          <li>✅ الأرباح المحتملة: ${stats?.yearly_potential}/سنة</li>
        </ul>
      </div>
    </div>
  );
}