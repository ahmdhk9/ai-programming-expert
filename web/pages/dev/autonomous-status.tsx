import React, { useState, useEffect } from "react";

export default function AutonomousStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/autonomous/status')
      .then(r => r.json())
      .then(setStatus)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>جاري التحميل...</div>;
  if (!status) return <div>خطأ في التحميل</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>🤖 النظام المستقل الذاتي</h1>
      
      {/* الحالة الأساسية */}
      <div style={{ background: "#1a1a1a", color: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h2>✨ الحالة الحالية</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          <div style={{ background: "#667eea", padding: "1rem", borderRadius: "8px" }}>
            <div style={{ opacity: 0.8 }}>النظام</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{status.system}</div>
          </div>
          <div style={{ background: "#764ba2", padding: "1rem", borderRadius: "8px" }}>
            <div style={{ opacity: 0.8 }}>الحالة</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{status.status}</div>
          </div>
          <div style={{ background: "#f093fb", padding: "1rem", borderRadius: "8px", color: "#000" }}>
            <div style={{ opacity: 0.8 }}>التشغيل</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{status.uptime}</div>
          </div>
          <div style={{ background: "#43e97b", padding: "1rem", borderRadius: "8px", color: "#000" }}>
            <div style={{ opacity: 0.8 }}>الاستقلالية</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>✅ مستقل</div>
          </div>
        </div>
      </div>

      {/* الاكتشافات */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: "12px" }}>
          <h3>🔍 الاكتشافات اليومية</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div>📱 منصات مكتشفة: {status.today_report?.discovered?.platforms}</div>
            <div>💡 فرص جديدة: {status.today_report?.discovered?.opportunities}</div>
            <div>💰 مصادر دخل: {status.today_report?.discovered?.income_sources}</div>
          </div>
        </div>

        <div style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: "12px" }}>
          <h3>🚀 النشر والحسابات</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div>🟢 منصات نشطة: {status.deployed?.active}</div>
            <div>🟡 منصات جاهزة: {status.deployed?.ready}</div>
            <div>⏳ قيد الإعداد: {status.deployed?.pending}</div>
          </div>
        </div>
      </div>

      {/* التقرير اليومي */}
      <div style={{ background: "#fff3cd", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem" }}>
        <h3>📊 التقرير اليومي</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>الدخل اليوم</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              ${status.today_report?.earnings?.today?.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>الإجمالي</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              ${status.today_report?.earnings?.total?.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>النمو</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#28a745" }}>
              {status.today_report?.earnings?.growth}
            </div>
          </div>
        </div>
      </div>

      {/* التعلم المستمر */}
      <div style={{ background: "#e3f2fd", padding: "1.5rem", borderRadius: "12px" }}>
        <h3>🧠 التعلم والتطور</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>عمليات البحث</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {status.learning?.searches_today?.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>الاكتشافات</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {status.learning?.discoveries_today}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>درجة التحسن</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#007bff" }}>
              {status.learning?.optimization_score}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
