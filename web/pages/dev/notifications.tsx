import React, { useState } from "react";
import SmoothLayout from "@/components/SmoothLayout";

export default function Notifications() {
  const [notifications] = useState([
    { id: 1, type: '🎉', title: 'أول أرباح!', message: 'المنصة بدأت تكسب $1,200', time: 'الآن', read: false },
    { id: 2, type: '📊', title: 'تقرير يومي', message: '$520 أرباح اليوم', time: '1 ساعة' },
    { id: 3, type: '💎', title: 'فرصة ذهبية', message: 'تم اكتشاف فرصة بـ $2,500', time: '2 ساعة' },
    { id: 4, type: '🚀', title: 'مشروع جديد', message: 'تم نشر تطبيق جديد', time: '5 ساعات' },
    { id: 5, type: '🤝', title: 'شراكة جديدة', message: 'عرض شراكة قيد المفاوضات', time: 'أمس' }
  ]);

  return (
    <SmoothLayout title="📬 الإشعارات والبريد" subtitle="جميع التنبيهات الفورية">
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ margin: 0, color: "#667eea" }}>📧 الإشعارات الفورية</h2>
          <span style={{ background: "#667eea", color: "white", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "0.9rem" }}>
            {notifications.filter(n => !n.read).length} جديد
          </span>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          {notifications.map(n => (
            <div key={n.id} style={{
              background: n.read ? "#f5f5f5" : "#f0f4ff",
              padding: "1.5rem",
              borderRadius: "8px",
              borderLeft: `4px solid ${n.read ? '#ddd' : '#667eea'}`,
              display: "flex",
              gap: "1rem"
            }}>
              <span style={{ fontSize: "1.5rem" }}>{n.type}</span>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 0.5rem 0" }}>{n.title}</h4>
                <p style={{ margin: "0 0 0.5rem 0", color: "#666" }}>{n.message}</p>
                <span style={{ fontSize: "0.85rem", color: "#999" }}>{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem" }}>
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
          <h3 style={{ marginTop: 0, color: "#667eea" }}>⚙️ إعدادات البريد</h3>
          <div style={{ display: "grid", gap: "1rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" defaultChecked /> ✅ إشعارات فورية
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" defaultChecked /> 📊 تقارير يومية
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" defaultChecked /> 💎 فرص ذهبية
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" defaultChecked /> 📈 تقارير أسبوعية
            </label>
          </div>
        </div>

        <div style={{ background: "white", padding: "2rem", borderRadius: "12px" }}>
          <h3 style={{ marginTop: 0, color: "#667eea" }}>📋 أنواع الإشعارات</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>🎉 أول أرباح ومحافظ</li>
            <li>📊 تقارير يومية/أسبوعية</li>
            <li>💎 فرص ذهبية مكتشفة</li>
            <li>🚀 مشاريع جديدة</li>
            <li>🤝 عروض شراكات</li>
            <li>⚡ نبهات سريعة</li>
          </ul>
        </div>
      </div>
    </SmoothLayout>
  );
}
