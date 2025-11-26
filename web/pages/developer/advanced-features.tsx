import React, { useState } from "react";
import Link from "next/link";

export default function AdvancedFeatures() {
  const [features, setFeatures] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  React.useEffect(() => {
    fetch("/api/features/advanced")
      .then(res => res.json())
      .then(data => setFeatures(data.features))
      .catch(err => console.error(err));
  }, []);

  const getIcon = (name: string) => {
    const icons: any = {
      'Real-time': '🔄',
      'AI-Powered': '🧠',
      'Analytics': '📊',
      'Template': '📦',
      'Voice': '🎤',
      'Multi-Language': '🌐',
      'Notifications': '🔔',
      'API': '⚙️',
      'Performance': '⚡',
      'Backup': '💾',
      'Team': '👥',
      'Workflow': '⚙️'
    };
    for (const key in icons) {
      if (name.includes(key)) return icons[key];
    }
    return '✨';
  };

  const getColor = (idx: number) => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140'];
    return colors[idx % colors.length];
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <header style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "3rem 2rem", color: "white" }}>
        <Link href="/developer/dashboard" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "1rem 0 0 0", fontSize: "2.5rem" }}>✨ الميزات المتقدمة</h1>
        <p style={{ margin: "0.5rem 0 0 0", opacity: 0.9 }}>12 ميزة متطورة من أفضل المنصات العالمية</p>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              overflow: "hidden",
              border: `3px solid ${getColor(idx)}`,
              transition: "all 0.3s"
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as any).style.transform = "translateY(-8px)";
                (e.currentTarget as any).style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as any).style.transform = "translateY(0)";
                (e.currentTarget as any).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ padding: "2rem", borderBottom: `3px solid ${getColor(idx)}`, background: `${getColor(idx)}15` }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{getIcon(feature.feature)}</div>
                <h3 style={{ margin: 0, color: getColor(idx), fontSize: "1.3rem" }}>{feature.feature}</h3>
              </div>

              <div style={{ padding: "1.5rem" }}>
                {feature.capabilities && (
                  <div>
                    <h4 style={{ margin: "0 0 0.75rem 0", color: "#667eea", fontSize: "0.9rem" }}>المميزات:</h4>
                    <ul style={{ margin: 0, paddingLeft: "1.5rem", lineHeight: "1.8", color: "#666", fontSize: "0.9rem" }}>
                      {feature.capabilities.map((cap: string, i: number) => (
                        <li key={i} style={{ marginBottom: "0.5rem" }}>✅ {cap}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {feature.metrics && (
                  <div>
                    <h4 style={{ margin: "0 0 0.75rem 0", color: "#667eea", fontSize: "0.9rem" }}>المقاييس:</h4>
                    <ul style={{ margin: 0, paddingLeft: "1.5rem", lineHeight: "1.8", color: "#666", fontSize: "0.9rem" }}>
                      {feature.metrics.map((metric: string, i: number) => (
                        <li key={i} style={{ marginBottom: "0.5rem" }}>📈 {metric}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#f0fff4", borderRadius: "8px", color: "#4CAF50", fontWeight: "bold", fontSize: "0.85rem" }}>
                  ✅ {feature.status === 'ready' ? 'جاهز الآن' : 'قريباً'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ marginTop: "3rem", background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
          <h2 style={{ marginTop: 0, color: "#667eea" }}>📊 الإحصائيات</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#667eea" }}>12</div>
              <div style={{ color: "#666", marginTop: "0.5rem" }}>ميزة متقدمة</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#4CAF50" }}>100%</div>
              <div style={{ color: "#666", marginTop: "0.5rem" }}>جاهزة الآن</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#FF9800" }}>🌍</div>
              <div style={{ color: "#666", marginTop: "0.5rem" }}>من أفضل المنصات</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#2196F3" }}>∞</div>
              <div style={{ color: "#666", marginTop: "0.5rem" }}>قابلة للتوسع</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
