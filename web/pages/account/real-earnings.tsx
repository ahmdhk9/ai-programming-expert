import React, { useState, useEffect } from "react";

export default function RealEarningsPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/earnings/real-status');
        const data = await res.json();
        setStatus(data);
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };

    fetchStatus();
    // حدّث كل دقيقة
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>جاري التحميل...</div>;
  if (!status) return <div>خطأ في التحميل</div>;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
      <h1>💰 الأرباح الحقيقية - مصادر متعددة</h1>

      {/* الإجمالي */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0 }}>💵 إجمالي الأرباح الحقيقية</h2>
        <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginTop: "1rem" }}>
          ${status.totalEarnings}
        </div>
        <div style={{ fontSize: "0.9rem", opacity: 0.9, marginTop: "0.5rem" }}>
          المتوسط اليومي: ${status.dailyAverage}
        </div>
      </div>

      {/* مصادر الدخل */}
      <div style={{ background: "#f5f5f5", padding: "2rem", borderRadius: "12px" }}>
        <h2>📊 مصادر الدخل المتصلة</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {status.activeSources.map((source, i) => (
            <div key={i} style={{
              background: source.status.includes('✅') ? '#d4edda' : '#f8d7da',
              padding: "1rem",
              borderRadius: "8px",
              border: source.status.includes('✅') ? '1px solid #28a745' : '1px solid #dc3545'
            }}>
              <div style={{ fontWeight: "bold" }}>{source.name}</div>
              <div style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>{source.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* تعليمات */}
      <div style={{ background: "#e3f2fd", padding: "1.5rem", borderRadius: "12px", marginTop: "2rem" }}>
        <h3>⚙️ للبدء باستقبال أرباح حقيقية:</h3>
        <ol style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
          <li>أضف بيانات Google AdSense</li>
          <li>أضف معرف Amazon Affiliate</li>
          <li>ربط Stripe للمبيعات</li>
          <li>أضف محفظة للـ Staking</li>
          <li>ستستقبل الأرباح تلقائياً</li>
        </ol>
      </div>

      {/* ملاحظة مهمة */}
      <div style={{ background: "#fff3cd", padding: "1.5rem", borderRadius: "12px", marginTop: "2rem", border: "1px solid #ffc107" }}>
        <h3>⚠️ مهم جداً:</h3>
        <p>
          الأرباح هنا <strong>حقيقية 100%</strong> - ستحتاج فقط لإضافة مفاتيح API الخاصة بك.
          بعد الإضافة، المنصة ستجمع الأرباح تلقائياً وتحويلها لمحفظتك.
        </p>
      </div>
    </div>
  );
}
