import React, { useState } from "react";
import Link from "next/link";

export default function MigrationCenter() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    domain: "",
    host: "",
    username: "",
    password: "",
    type: "vps"
  });
  const [migration, setMigration] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const startMigration = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dev/start-migration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deploymentId: "temp", projectConfig: config })
      });
      const data = await res.json();
      setMigration(data);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1a2e" }}>
      <header style={{ backgroundColor: "#16213e", padding: "2rem", color: "white" }}>
        <Link href="/developer/dashboard" style={{ color: "#00d4ff", textDecoration: "none" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0" }}>🚀 مركز الهجرة والنشر</h1>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {step === 1 && (
          <div style={{ backgroundColor: "#0f3460", padding: "2rem", borderRadius: "12px", border: "2px solid #00d4ff" }}>
            <h2 style={{ color: "#00d4ff" }}>الخطوة 1: معلومات السيرفر</h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              <input
                placeholder="النطاق/الدومين (مثل: example.com)"
                value={config.domain}
                onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                style={{ padding: "0.75rem", backgroundColor: "#1a1a2e", color: "#00d4ff", border: "1px solid #00d4ff", borderRadius: "8px" }}
              />
              <input
                placeholder="عنوان السيرفر (IP أو hostname)"
                value={config.host}
                onChange={(e) => setConfig({ ...config, host: e.target.value })}
                style={{ padding: "0.75rem", backgroundColor: "#1a1a2e", color: "#00d4ff", border: "1px solid #00d4ff", borderRadius: "8px" }}
              />
              <input
                placeholder="اسم المستخدم"
                value={config.username}
                onChange={(e) => setConfig({ ...config, username: e.target.value })}
                style={{ padding: "0.75rem", backgroundColor: "#1a1a2e", color: "#00d4ff", border: "1px solid #00d4ff", borderRadius: "8px" }}
              />
              <input
                placeholder="كلمة المرور"
                type="password"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
                style={{ padding: "0.75rem", backgroundColor: "#1a1a2e", color: "#00d4ff", border: "1px solid #00d4ff", borderRadius: "8px" }}
              />
              <button
                onClick={() => setStep(2)}
                style={{ padding: "1rem", backgroundColor: "#00d4ff", color: "#1a1a2e", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}
              >
                التالي →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ backgroundColor: "#0f3460", padding: "2rem", borderRadius: "12px", border: "2px solid #00d4ff" }}>
            <h2 style={{ color: "#00d4ff" }}>الخطوة 2: تأكيد المعلومات</h2>
            <div style={{ color: "#00d4ff", lineHeight: "2", marginBottom: "1rem" }}>
              <div>🌐 الدومين: {config.domain}</div>
              <div>🖥️ السيرفر: {config.host}</div>
              <div>👤 المستخدم: {config.username}</div>
              <div>✅ كل المعلومات صحيحة؟</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <button
                onClick={() => setStep(1)}
                style={{ padding: "1rem", backgroundColor: "#666", color: "white", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}
              >
                ← رجوع
              </button>
              <button
                onClick={startMigration}
                disabled={loading}
                style={{ padding: "1rem", backgroundColor: "#00d4ff", color: "#1a1a2e", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "⏳ جاري الهجرة..." : "🚀 ابدأ الهجرة"}
              </button>
            </div>
          </div>
        )}

        {migration && migration.status === 'completed' && (
          <div style={{ backgroundColor: "#0f3460", padding: "2rem", borderRadius: "12px", border: "2px solid #00d4ff" }}>
            <h2 style={{ color: "#4CAF50" }}>✅ الهجرة مكتملة!</h2>
            <div style={{ color: "#00d4ff", lineHeight: "2" }}>
              {migration.phases.map((phase: any, idx: number) => (
                <div key={idx} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#16213e", borderRadius: "8px" }}>
                  <div style={{ fontWeight: "bold" }}>✅ {phase.phase}</div>
                  {phase.actions && phase.actions.map((action: string, i: number) => (
                    <div key={i} style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>{action}</div>
                  ))}
                </div>
              ))}
              <div style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#1a1a2e", borderRadius: "8px" }}>
                <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>🌐 الرابط الجديد:</div>
                <div style={{ fontSize: "1.2rem", color: "#4CAF50", marginTop: "0.5rem" }}>
                  https://{config.domain}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
