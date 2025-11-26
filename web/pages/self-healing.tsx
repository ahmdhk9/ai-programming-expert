import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Issue {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  detectedAt: string;
  fixedAt?: string;
  status: "detected" | "fixing" | "fixed" | "monitoring";
  impact: string;
}

export default function SelfHealing() {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "1",
      severity: "critical",
      title: "Database Query Optimization",
      description: "استعلام بطيء في الـ Dashboard",
      detectedAt: "2025-11-26T14:23:00",
      status: "fixed",
      fixedAt: "2025-11-26T14:25:00",
      impact: "تحسين السرعة 40%",
    },
    {
      id: "2",
      severity: "warning",
      title: "Memory Leak Detection",
      description: "تسرب ذاكرة في مكون Chat",
      detectedAt: "2025-11-26T13:15:00",
      status: "fixed",
      fixedAt: "2025-11-26T13:18:00",
      impact: "توفير 150MB",
    },
  ]);

  const [metrics, setMetrics] = useState({
    issuesDetected: 47,
    issuesFixed: 45,
    fixSuccess: 95.7,
    avgFixTime: "2.3 min",
    uptime: "99.97%",
    autoHeals: 156,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // محاكاة اكتشاف مشاكل جديدة وإصلاحها
      if (Math.random() > 0.7) {
        const newIssue: Issue = {
          id: Date.now().toString(),
          severity: ["critical", "warning", "info"][Math.floor(Math.random() * 3)] as any,
          title: "تحسين الأداء التلقائي",
          description: "تحديث ذاتي تم اكتشافه وإصلاحه",
          detectedAt: new Date().toISOString(),
          status: "fixing",
          impact: "تحسن في الأداء",
        };

        setIssues((prev) => [newIssue, ...prev.slice(0, 4)]);

        setTimeout(() => {
          setIssues((prev) =>
            prev.map((issue) =>
              issue.id === newIssue.id
                ? {
                    ...issue,
                    status: "fixed",
                    fixedAt: new Date().toISOString(),
                  }
                : issue
            )
          );
        }, 3000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "#f44336";
      case "warning":
        return "#FF9800";
      case "info":
        return "#2196F3";
      default:
        return "#999";
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#00897b", color: "white", padding: "2rem" }}>
        <h1>🔄 Self-Healing System - نظام الشفاء الذاتي</h1>
        <p>النظام يكتشف الأخطاء ويصلحها تلقائياً بذكاء</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/">← Home</Link>
          <Link href="/chat">💬 Chat</Link>
          <Link href="/resources">📊 Resources</Link>
        </nav>

        {/* Main Metrics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}>
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#00897b", marginBottom: "0.5rem" }}>
              {metrics.issuesDetected}
            </div>
            <div style={{ color: "#666" }}>مشاكل مكتشفة</div>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4CAF50", marginBottom: "0.5rem" }}>
              {metrics.issuesFixed}
            </div>
            <div style={{ color: "#666" }}>تم إصلاحها</div>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#2196F3", marginBottom: "0.5rem" }}>
              {metrics.fixSuccess}%
            </div>
            <div style={{ color: "#666" }}>نسبة النجاح</div>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#FF9800", marginBottom: "0.5rem" }}>
              {metrics.avgFixTime}
            </div>
            <div style={{ color: "#666" }}>متوسط وقت الإصلاح</div>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#9C27B0", marginBottom: "0.5rem" }}>
              {metrics.uptime}
            </div>
            <div style={{ color: "#666" }}>Uptime</div>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#673AB7", marginBottom: "0.5rem" }}>
              {metrics.autoHeals}
            </div>
            <div style={{ color: "#666" }}>إصلاحات تلقائية</div>
          </div>
        </div>

        {/* Recent Issues */}
        <h2>🔍 المشاكل المكتشفة مؤخراً</h2>
        <div style={{ display: "grid", gap: "1.5rem", marginBottom: "2rem" }}>
          {issues.map((issue) => (
            <div
              key={issue.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                borderLeft: `4px solid ${getSeverityColor(issue.severity)}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>{issue.title}</h3>
                  <p style={{ color: "#666", margin: "0.5rem 0" }}>{issue.description}</p>
                </div>
                <div
                  style={{
                    backgroundColor:
                      issue.status === "fixed"
                        ? "#e8f5e9"
                        : issue.status === "fixing"
                        ? "#fff3e0"
                        : "#f3e5f5",
                    color:
                      issue.status === "fixed"
                        ? "#2e7d32"
                        : issue.status === "fixing"
                        ? "#e65100"
                        : "#7b1fa2",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                  }}
                >
                  {issue.status === "fixed"
                    ? "✅ مُصلح"
                    : issue.status === "fixing"
                    ? "⏳ جاري الإصلاح"
                    : "🔍 قيد المراقبة"}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", paddingTop: "1rem", borderTop: "1px solid #eee" }}>
                <div style={{ fontSize: "0.9rem", color: "#999" }}>
                  🕐 {new Date(issue.detectedAt).toLocaleTimeString("ar-SA")}
                </div>
                {issue.fixedAt && (
                  <div style={{ fontSize: "0.9rem", color: "#666" }}>
                    ✅ تم الإصلاح: {new Date(issue.fixedAt).toLocaleTimeString("ar-SA")}
                  </div>
                )}
              </div>

              <div
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#f5f5f5",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                💡 التأثير: {issue.impact}
              </div>
            </div>
          ))}
        </div>

        {/* Healing Capabilities */}
        <h2>🛠️ قدرات الشفاء الذاتي</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {[
            {
              emoji: "⚡",
              title: "تحسين الأداء",
              desc: "كشف واستبدال الاستعلامات البطيئة",
            },
            {
              emoji: "💾",
              title: "إدارة الذاكرة",
              desc: "اكتشاف وإصلاح تسرب الذاكرة",
            },
            {
              emoji: "🐛",
              title: "إصلاح الأخطاء",
              desc: "تعرف الأخطاء الشائعة وإصلاحها",
            },
            {
              emoji: "🔐",
              title: "الأمان",
              desc: "اكتشاف الثغرات والتصحيحات",
            },
            {
              emoji: "📊",
              title: "الموارد",
              desc: "موازنة استهلاك الموارد",
            },
            {
              emoji: "🚀",
              title: "التحسن المستمر",
              desc: "تحسينات متتالية من تلقاء نفسه",
            },
          ].map((capability, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{capability.emoji}</div>
              <h3 style={{ margin: "0.5rem 0" }}>{capability.title}</h3>
              <p style={{ color: "#666", margin: 0 }}>{capability.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
