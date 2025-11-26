import React, { useState, useEffect } from "react";

export default function AIFactory() {
  const [stats, setStats] = useState(null);
  const [generated, setGenerated] = useState([]);
  const [published, setPublished] = useState([]);
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("article");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, generatedRes, publishedRes] = await Promise.all([
        fetch('/api/content/stats'),
        fetch('/api/content/generated'),
        fetch('/api/content/published')
      ]);
      setStats(await statsRes.json());
      setGenerated(await generatedRes.json());
      setPublished(await publishedRes.json());
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleGenerate = async () => {
    if (!topic) return alert('أدخل عنوان أو موضوع');

    try {
      let res;
      if (type === 'article') {
        res = await fetch('/api/content/generate/article', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, category: 'programming' })
        });
      } else if (type === 'story') {
        res = await fetch('/api/content/generate/story', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: topic, genre: 'fiction' })
        });
      } else {
        res = await fetch('/api/content/generate/linkedin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic })
        });
      }
      
      const content = await res.json();
      alert(`✅ تم التوليد!\n📝 ${content.wordCount} كلمة\n🆔 ${content.id}`);
      setTopic("");
      fetchData();
    } catch (error) {
      alert('خطأ');
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>⏳ جاري التحميل...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>🤖 مصنع المحتوى بـ AI</h1>

      {stats && (
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            <div>
              <div>محتوى مُولّد</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.generated}</div>
            </div>
            <div>
              <div>منشور</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.published}</div>
            </div>
            <div>
              <div>أرباحك</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats.earnings}</div>
            </div>
            <div>
              <div>متوسط الأرباح</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats.averageEarningsPerArticle}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px" }}>
          <h2>🚀 توليد محتوى جديد</h2>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: "100%", padding: "0.8rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            <option value="article">📝 مقالة تقنية</option>
            <option value="story">📖 قصة قصيرة</option>
            <option value="linkedin">💼 منشور LinkedIn</option>
          </select>

          <input
            type="text"
            placeholder={type === 'article' ? 'عنوان المقالة' : type === 'story' ? 'عنوان القصة' : 'موضوع المنشور'}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ width: "100%", padding: "0.8rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />

          <button
            onClick={handleGenerate}
            style={{ width: "100%", padding: "1rem", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            🤖 توليد المحتوى
          </button>
        </div>

        <div style={{ background: "#e3f2fd", padding: "2rem", borderRadius: "12px" }}>
          <h2>📊 الإحصائيات</h2>
          <div style={{ fontSize: "0.9rem", lineHeight: "1.8" }}>
            <div>✅ محتوى مولد: {stats?.generated}</div>
            <div>🌐 محتوى منشور: {stats?.published}</div>
            <div>💰 إجمالي الأرباح: ${stats?.earnings}</div>
            <div>📈 معدل النجاح: {stats?.successRate}%</div>
            <div>🏆 متوسط الأرباح/مقالة: ${stats?.averageEarningsPerArticle}</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff3cd", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h3>🌐 منصات النشر المتاحة:</h3>
        <ul style={{ columnCount: 3, listStyle: "none", paddingLeft: 0 }}>
          <li>✅ Medium - مقالات + أرباح</li>
          <li>✅ Dev.to - تقنية</li>
          <li>✅ Hashnode - برمجة</li>
          <li>✅ LinkedIn - احترافي</li>
          <li>✅ Gumroad - منتجات</li>
          <li>✅ Amazon KDP - كتب</li>
        </ul>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div style={{ background: "#d4edda", padding: "2rem", borderRadius: "12px" }}>
          <h3>📝 محتوى مولد ({generated.length})</h3>
          {generated.slice(-5).map((item) => (
            <div key={item.id} style={{ marginBottom: "0.8rem", paddingBottom: "0.8rem", borderBottom: "1px solid #ccc" }}>
              <div style={{ fontWeight: "bold" }}>{item.title || item.type}</div>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>{item.wordCount} كلمة</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#d1ecf1", padding: "2rem", borderRadius: "12px" }}>
          <h3>🌐 محتوى منشور ({published.length})</h3>
          {published.slice(-5).map((item) => (
            <div key={item.id} style={{ marginBottom: "0.8rem", paddingBottom: "0.8rem", borderBottom: "1px solid #ccc" }}>
              <div style={{ fontWeight: "bold" }}>{item.platform}</div>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#0066cc" }}>
                🔗 اقرأ
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}