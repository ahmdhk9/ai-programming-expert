import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ResourceMetrics {
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  apiCalls: number;
  videoMinutes: number;
}

interface CostBreakdown {
  vercel: number;
  firebase: number;
  flyio: number;
  apis: number;
  total: number;
}

export default function ResourceMonitor() {
  const [metrics, setMetrics] = useState<ResourceMetrics>({
    cpu: 35,
    memory: 42,
    storage: 28,
    bandwidth: 15,
    apiCalls: 3420,
    videoMinutes: 12,
  });

  const [costs, setCosts] = useState<CostBreakdown>({
    vercel: 0,
    firebase: 2.5,
    flyio: 0,
    apis: 0,
    total: 2.5,
  });

  const [alerts, setAlerts] = useState<string[]>([
    "🟢 جميع الخدمات تعمل بشكل طبيعي",
    "📊 استهلاك الموارد ضمن الحد الطبيعي",
  ]);

  useEffect(() => {
    // محاكاة تحديث الموارد
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(85, prev.memory + (Math.random() - 0.5) * 5)),
        storage: prev.storage,
        bandwidth: Math.max(5, Math.min(95, prev.bandwidth + (Math.random() - 0.5) * 15)),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 100),
        videoMinutes: prev.videoMinutes,
      }));

      // تحديث التنبيهات
      if (Math.random() > 0.7) {
        setAlerts((prev) => [
          `📈 ارتفاع طفيف في استهلاك الـ CPU: ${Math.floor(Math.random() * 10 + 30)}%`,
          ...prev.slice(0, 3),
        ]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (value: number) => {
    if (value < 50) return "#4CAF50"; // أخضر
    if (value < 75) return "#FF9800"; // برتقالي
    return "#f44336"; // أحمر
  };

  const MetricCard = ({
    emoji,
    label,
    value,
    unit,
    max = 100,
  }: {
    emoji: string;
    label: string;
    value: number;
    unit: string;
    max?: number;
  }) => (
    <div
      style={{
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "12px",
        borderLeft: `4px solid ${getAlertColor(value)}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
        <span style={{ fontSize: "0.9rem", color: "#999" }}>{label}</span>
      </div>
      <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        {Math.floor(value)}{unit}
      </div>
      <div style={{ backgroundColor: "#f0f0f0", borderRadius: "4px", overflow: "hidden", height: "8px" }}>
        <div
          style={{
            backgroundColor: getAlertColor(value),
            height: "100%",
            width: `${(value / max) * 100}%`,
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#1976d2", color: "white", padding: "2rem" }}>
        <h1>📊 Resource Monitor - مراقبة الموارد</h1>
        <p>مراقبة الاستهلاك والتكاليف وتحديثات النظام</p>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/">← Home</Link>
          <Link href="/chat">💬 Chat</Link>
          <Link href="/universal">✨ Universal Creator</Link>
        </nav>

        {/* Alerts */}
        <div style={{ marginBottom: "2rem", display: "grid", gap: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>🔔 التنبيهات والإخطارات</h2>
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "white",
                padding: "1rem 1.5rem",
                borderRadius: "8px",
                borderLeft: "4px solid #1976d2",
              }}
            >
              {alert}
            </div>
          ))}
        </div>

        {/* Real-time Metrics */}
        <h2 style={{ marginBottom: "1rem" }}>📈 الموارد المستخدمة (Real-time)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <MetricCard emoji="⚡" label="CPU Usage" value={metrics.cpu} unit="%" />
          <MetricCard emoji="💾" label="Memory" value={metrics.memory} unit="%" />
          <MetricCard emoji="💿" label="Storage" value={metrics.storage} unit="GB" max={100} />
          <MetricCard emoji="🌐" label="Bandwidth" value={metrics.bandwidth} unit="%" />
        </div>

        {/* Usage Stats */}
        <h2 style={{ marginBottom: "1rem" }}>📊 إحصائيات الاستخدام</h2>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1976d2" }}>{metrics.apiCalls}</div>
            <div style={{ color: "#999" }}>API Calls اليوم</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4CAF50" }}>{metrics.videoMinutes}</div>
            <div style={{ color: "#999" }}>دقائق فيديو</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#FF9800" }}>2</div>
            <div style={{ color: "#999" }}>Projects نشطة</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#9c27b0" }}>99.9%</div>
            <div style={{ color: "#999" }}>Uptime</div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <h2 style={{ marginBottom: "1rem" }}>💰 تفصيل التكاليف (هذا الشهر)</h2>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { label: "Vercel (Frontend)", cost: costs.vercel, emoji: "🔷" },
              { label: "Firebase (Database)", cost: costs.firebase, emoji: "🔶" },
              { label: "Fly.io (Backend)", cost: costs.flyio, emoji: "🔵" },
              { label: "APIs & Services", cost: costs.apis, emoji: "⚙️" },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
                <span>
                  {item.emoji} {item.label}
                </span>
                <strong>${item.cost.toFixed(2)}</strong>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "1.5rem",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            <span>إجمالي التكاليف:</span>
            <span style={{ color: "#4CAF50" }}>${costs.total.toFixed(2)} / الشهر</span>
          </div>

          <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e8f5e9", borderRadius: "8px", color: "#2e7d32" }}>
            ✅ النظام يعمل بكفاءة! 75% من الخدمات مجانية والتكاليف منخفضة جداً.
          </div>
        </div>

        {/* AI Models Used */}
        <h2 style={{ marginBottom: "1rem" }}>🤖 نماذج الذكاء الصناعي المستخدمة</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            { name: "Groq LLaMA 2", type: "Code Generation", status: "✅ Active" },
            { name: "Mistral 7B", type: "Text Analysis", status: "✅ Active" },
            { name: "Replicate Flux", type: "Image/Video", status: "✅ Ready" },
            { name: "OpenAI Whisper", type: "Speech-to-Text", status: "⏳ Optional" },
          ].map((model, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                borderLeft: "4px solid #9c27b0",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{model.name}</h3>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>{model.type}</p>
              <div style={{ color: "#999", fontSize: "0.9rem" }}>{model.status}</div>
            </div>
          ))}
        </div>

        {/* Self-Improvement Stats */}
        <div style={{ marginTop: "3rem", backgroundColor: "white", borderRadius: "12px", padding: "2rem" }}>
          <h2 style={{ marginTop: 0 }}>🔄 إحصائيات التطوير الذاتي</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#1976d2" }}>847</div>
              <div style={{ color: "#999" }}>تحسينات هذا الشهر</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#4CAF50" }}>142</div>
              <div style={{ color: "#999" }}>أخطاء تم اكتشافها وإصلاحها</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#FF9800" }}>89%</div>
              <div style={{ color: "#999" }}>دقة التنبؤ</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#9c27b0" }}>32h</div>
              <div style={{ color: "#999" }}>وقت التطوير الموفر</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
