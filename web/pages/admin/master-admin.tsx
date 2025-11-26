import React, { useState, useEffect } from "react";

export default function MasterAdmin() {
  const [health, setHealth] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('/api/system/health')
      .then(r => r.json())
      .then(setHealth)
      .catch(console.error);

    fetch('/api/system/alerts')
      .then(r => r.json())
      .then(setAlerts)
      .catch(console.error);
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>🛡️ لوحة التحكم الإدارية</h1>

      {/* صحة النظام */}
      {health && (
        <div style={{ background: health.status === 'healthy' ? "#d4edda" : "#fff3cd", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
          <h2>📊 حالة النظام</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>الحالة</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{health.status === 'healthy' ? '✅ جيد' : '⚠️ تحذير'}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>الطلبات</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{health.requests}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>الأخطاء</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: health.errors > 0 ? "red" : "green" }}>{health.errors}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>معدل الخطأ</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{health.errorRate}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>التشغيل</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{Math.floor(health.uptime / 3600)}h</div>
            </div>
          </div>
        </div>
      )}

      {/* الإنذارات */}
      <div style={{ background: "#f8f9fa", padding: "1.5rem", borderRadius: "8px" }}>
        <h2>🚨 الإنذارات الأخيرة ({alerts.length})</h2>
        {alerts.length === 0 ? (
          <div style={{ color: "#999" }}>لا توجد إنذارات</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {alerts.slice(-5).map(alert => (
              <div key={alert.id} style={{ padding: "0.5rem", background: "white", borderLeft: "3px solid #dc3545", borderRadius: "4px" }}>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>{alert.message}</div>
                <div style={{ fontSize: "0.8rem", color: "#999" }}>{new Date(alert.timestamp).toLocaleString('ar-IQ')}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* الإحصائيات السريعة */}
      <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
        <div style={{ background: "#667eea", color: "white", padding: "1.5rem", borderRadius: "8px" }}>
          <div>المحافظ المضافة</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>5+</div>
        </div>
        <div style={{ background: "#43e97b", color: "#000", padding: "1.5rem", borderRadius: "8px" }}>
          <div>معدل النمو</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold" }}>350%</div>
        </div>
      </div>
    </div>
  );
}
