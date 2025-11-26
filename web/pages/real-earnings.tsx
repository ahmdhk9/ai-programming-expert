import React, { useState, useEffect } from "react";

export default function RealEarnings() {
  const [earnings, setEarnings] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('stripe');
  const [apiKey, setApiKey] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [earningsRes, platformsRes] = await Promise.all([
        fetch('/api/earnings'),
        fetch('/api/platforms')
      ]);
      setEarnings(await earningsRes.json());
      setPlatforms(await platformsRes.json());
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleConnect = async () => {
    if (!apiKey) return alert('أدخل مفتاح API');

    try {
      const res = await fetch(`/api/connect/${selectedPlatform}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });
      const result = await res.json();
      if (result.success) {
        alert(result.message);
        setApiKey('');
        fetchData();
      } else {
        alert('خطأ: ' + result.error);
      }
    } catch (error) {
      alert('خطأ في الاتصال');
    }
  };

  const handleRecordEarning = async () => {
    if (!amount || !selectedPlatform) return alert('أدخل المبلغ');

    try {
      const res = await fetch('/api/earnings/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: selectedPlatform, amount: parseFloat(amount) })
      });
      const result = await res.json();
      if (result.success) {
        alert(`✅ تم تسجيل: $${amount}`);
        setAmount('');
        fetchData();
      }
    } catch (error) {
      alert('خطأ');
    }
  };

  if (loading) return <div>⏳ جاري التحميل...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>💰 أرباح حقيقية 100%</h1>

      <div style={{ background: "#28a745", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>إجمالي أرباحك الحقيقية</h2>
        <div style={{ fontSize: "3rem", fontWeight: "bold", marginTop: "1rem" }}>
          ${earnings?.totalEarnings}
        </div>
        <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
          {earnings?.transactions} معاملة حقيقية موثقة
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px" }}>
          <h2>🔗 ربط المنصات الحقيقية</h2>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            style={{ width: "100%", padding: "0.8rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            <option value="stripe">Stripe - معالج الدفع</option>
            <option value="adsense">Google AdSense - الإعلانات</option>
            <option value="amazon">Amazon Associates - الإحالات</option>
            <option value="gumroad">Gumroad - المنتجات الرقمية</option>
            <option value="upwork">Upwork - العمل الحر</option>
            <option value="youtube">YouTube - الفيديوهات</option>
          </select>

          <input
            type="password"
            placeholder="مفتاح API"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: "100%", padding: "0.8rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />

          <button
            onClick={handleConnect}
            style={{ width: "100%", padding: "0.8rem", background: "#667eea", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            🔗 ربط الآن
          </button>
        </div>

        <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px" }}>
          <h2>📊 تسجيل أرباح حقيقية</h2>
          <input
            type="number"
            placeholder="المبلغ (USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: "0.8rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />

          <button
            onClick={handleRecordEarning}
            style={{ width: "100%", padding: "0.8rem", background: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            ✅ تسجيل الأرباح
          </button>
        </div>
      </div>

      <div style={{ background: "#d4edda", padding: "2rem", borderRadius: "12px" }}>
        <h3>✨ المنصات المتصلة:</h3>
        {platforms.length === 0 ? (
          <p>لم تربط أي منصة بعد</p>
        ) : (
          <ul>
            {platforms.map((p, i) => (
              <li key={i}>✅ {p.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}