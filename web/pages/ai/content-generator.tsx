import React, { useState, useEffect } from "react";

export default function AIContentGenerator() {
  const [stats, setStats] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("fiction");
  const [pages, setPages] = useState("50");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const [statsRes, platformsRes] = await Promise.all([
          fetch('/api/ai/stats'),
          fetch('/api/ai/platforms')
        ]);
        setStats(await statsRes.json());
        setPlatforms(await platformsRes.json());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    
    fetch_data();
  }, []);

  const handleGenerateBook = async () => {
    if (!title) return alert('أدخل عنوان الكتاب');
    
    try {
      const res = await fetch('/api/ai/generate-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, pages: parseInt(pages) })
      });
      const book = await res.json();
      alert(`✅ تم توليد الكتاب: "${book.title}"\n📄 ${book.pages} صفحة\n💵 السعر المقترح: $${book.price}`);
      setTitle("");
      
      const statsRes = await fetch('/api/ai/stats');
      setStats(await statsRes.json());
    } catch (error) {
      alert('خطأ في التوليد');
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>⏳ جاري التحميل...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>🤖 مولد المحتوى بالذكاء الاصطناعي</h1>

      {stats && (
        <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
          <h2 style={{ margin: 0 }}>💰 أرباحك من بيع المحتوى</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <div>المحتوى المُولّد</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.totalContent}</div>
            </div>
            <div>
              <div>الأرباح الحالية</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats.totalEarnings}</div>
            </div>
            <div>
              <div>المنصات المتاحة</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.platforms}</div>
            </div>
            <div>
              <div>متوسط السعر</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>${stats.averagePrice}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px" }}>
          <h2>📝 توليد محتوى جديد</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              placeholder="عنوان الكتاب/المحتوى"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
            />
            
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
            >
              <option value="fiction">قصة خيالية</option>
              <option value="self_help">تطوير ذاتي</option>
              <option value="tutorial">دليل تعليمي</option>
              <option value="template">نموذج</option>
            </select>

            <input
              type="number"
              placeholder="عدد الصفحات"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
            />

            <button
              onClick={handleGenerateBook}
              style={{ padding: "1rem", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
            >
              🤖 توليد المحتوى
            </button>
          </div>
        </div>

        <div style={{ background: "#e3f2fd", padding: "2rem", borderRadius: "12px" }}>
          <h2>🏪 منصات البيع المتاحة</h2>
          {platforms.map((p, i) => (
            <div key={i} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #ccc" }}>
              <div style={{ fontWeight: "bold" }}>{p.name}</div>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>
                العمولة: {(p.commission * 100).toFixed(1)}% | السعر الأدنى: ${p.min_price}
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#667eea" }}>
                🔗 زيارة الموقع
              </a>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#d4edda", padding: "2rem", borderRadius: "12px" }}>
        <h3>✨ كيفية الربح:</h3>
        <ol style={{ paddingLeft: "1.5rem" }}>
          <li>الذكاء الاصطناعي يولد محتوى (كتب، دورات، نماذج)</li>
          <li>تحميل المحتوى على منصات البيع (Gumroad, Amazon, Etsy)</li>
          <li>كل عملية بيع = أرباح حقيقية في محفظتك</li>
          <li>النظام يتتبع كل شيء ويحسب الأرباح تلقائياً</li>
        </ol>
      </div>
    </div>
  );
}