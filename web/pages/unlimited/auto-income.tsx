import React, { useState, useEffect } from "react";

export default function UnlimitedAutoIncome() {
  const [status, setStatus] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const [statusRes, earningsRes] = await Promise.all([
          fetch('/api/unlimited/status'),
          fetch('/api/unlimited/earnings')
        ]);
        setStatus(await statusRes.json());
        setEarnings(await earningsRes.json());
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    
    fetch_data();
    const interval = setInterval(fetch_data, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleWithdraw = async () => {
    if (!withdrawAmount) return alert('أدخل المبلغ');
    
    try {
      const res = await fetch('/api/unlimited/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: withdrawAmount, wallet: 'your_wallet' })
      });
      const result = await res.json();
      alert(`✅ تم السحب: $${withdrawAmount}`);
      setWithdrawAmount('');
    } catch (error) {
      alert('خطأ في السحب');
    }
  };

  if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>⏳ جاري التحميل...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>🚀 نظام الأرباح اللامحدود - بدون قيود</h1>

      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>💰 الأرباح الحية</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <div style={{ opacity: 0.8 }}>كل ثانية</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.perSecond}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>كل دقيقة</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.perMinute}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>كل ساعة</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.perHour}</div>
          </div>
          <div>
            <div style={{ opacity: 0.8 }}>يومياً</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${earnings?.totalDaily}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#d4edda", padding: "1.5rem", borderRadius: "8px" }}>
          <div>أسبوعياً</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#28a745" }}>${earnings?.totalWeekly}</div>
        </div>
        <div style={{ background: "#cfe2ff", padding: "1.5rem", borderRadius: "8px" }}>
          <div>شهرياً</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#0d6efd" }}>${earnings?.totalMonthly}</div>
        </div>
        <div style={{ background: "#fff3cd", padding: "1.5rem", borderRadius: "8px" }}>
          <div>سنوياً</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#856404" }}>${earnings?.totalYearly}</div>
        </div>
        <div style={{ background: "#f8d7da", padding: "1.5rem", borderRadius: "8px" }}>
          <div>إجمالي</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#842029" }}>${earnings?.allTimeEarnings}</div>
        </div>
      </div>

      <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2>💳 السحب الفوري - بدون قيود</h2>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <input
            type="number"
            placeholder="أدخل المبلغ (USD)"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            style={{ flex: 1, padding: "0.8rem", borderRadius: "6px", border: "1px solid #ddd" }}
          />
          <button
            onClick={handleWithdraw}
            style={{ padding: "0.8rem 1.5rem", background: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            ✅ اسحب الآن
          </button>
        </div>
      </div>

      <div style={{ background: "#e3f2fd", padding: "2rem", borderRadius: "12px" }}>
        <h2>📊 معلومات النظام</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <div style={{ fontWeight: "bold" }}>المصادر النشطة</div>
            <div style={{ fontSize: "1.3rem", color: "#0066cc" }}>{status?.sources_active}</div>
          </div>
          <div>
            <div style={{ fontWeight: "bold" }}>الرسوم</div>
            <div style={{ fontSize: "1.3rem", color: "#28a745" }}>{status?.fees}</div>
          </div>
          <div>
            <div style={{ fontWeight: "bold" }}>التجميع</div>
            <div style={{ fontSize: "1.3rem", color: "#0066cc" }}>{status?.collection}</div>
          </div>
          <div>
            <div style={{ fontWeight: "bold" }}>الإعداد المطلوب</div>
            <div style={{ fontSize: "1.3rem", color: "#28a745" }}>{status?.setup_required}</div>
          </div>
        </div>
      </div>
    </div>
  );
}