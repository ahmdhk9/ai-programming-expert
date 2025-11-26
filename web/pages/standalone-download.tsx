import React, { useState } from "react";
import Link from "next/link";

export default function StandaloneDownload() {
  const [selectedType, setSelectedType] = useState("web");

  const downloadOptions = [
    {
      id: "web",
      emoji: "🌐",
      name: "Web - Progressive Web App",
      desc: "يعمل على أي متصفح، offline mode كامل",
      size: "8.2 MB",
      features: ["Offline", "Install", "Updates", "Sync"],
    },
    {
      id: "desktop-windows",
      emoji: "🪟",
      name: "Windows - Desktop App",
      desc: "تطبيق Windows عادي، يعمل بدون انترنت",
      size: "85 MB",
      features: ["Standalone", "Full Power", "Auto Update", "Cloud Sync"],
    },
    {
      id: "desktop-mac",
      emoji: "🍎",
      name: "macOS - Desktop App",
      desc: "تطبيق Mac نativo، ميزات متقدمة",
      size: "82 MB",
      features: ["Native", "Offline", "Updates", "Sync"],
    },
    {
      id: "desktop-linux",
      emoji: "🐧",
      name: "Linux - Desktop App",
      desc: "تطبيق Linux مفتوح المصدر",
      size: "79 MB",
      features: ["Open Source", "Offline", "Updates", "Sync"],
    },
    {
      id: "mobile-ios",
      emoji: "📱",
      name: "iOS - iPhone/iPad",
      desc: "تطبيق iOS أصلي مع كل الميزات",
      size: "95 MB",
      features: ["Native", "Offline", "Push", "Sync"],
    },
    {
      id: "mobile-android",
      emoji: "🤖",
      name: "Android - Smart Device",
      desc: "تطبيق Android مع تحسينات",
      size: "92 MB",
      features: ["Native", "Offline", "Push", "Sync"],
    },
  ];

  const current = downloadOptions.find((o) => o.id === selectedType)!;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#2196F3", color: "white", padding: "2rem", textAlign: "center" }}>
        <h1>📥 Standalone Download</h1>
        <p>حمّل النسخة المحلية واستمتع بكل الميزات بدون انترنت</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem" }}>
          <Link href="/">🏠 Home</Link>
        </nav>

        {/* Platform Selection */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0 }}>🖥️ اختر المنصة التي تريد</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            {downloadOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedType(opt.id)}
                style={{
                  padding: "1rem",
                  backgroundColor: selectedType === opt.id ? "#2196F3" : "#f5f5f5",
                  color: selectedType === opt.id ? "white" : "black",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{opt.emoji}</div>
                {opt.name.split(" - ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Download Details */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
            <div style={{ fontSize: "4rem" }}>{current.emoji}</div>
            <div>
              <h2 style={{ margin: 0 }}>{current.name}</h2>
              <p style={{ color: "#666", margin: "0.5rem 0" }}>{current.desc}</p>
              <div style={{ color: "#999", fontSize: "0.9rem" }}>📦 {current.size}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {current.features.map((f) => (
              <div key={f} style={{ backgroundColor: "#e3f2fd", padding: "0.75rem", borderRadius: "4px", textAlign: "center", fontWeight: "bold", color: "#2196F3" }}>
                ✅ {f}
              </div>
            ))}
          </div>

          <button
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            📥 حمّل الآن
          </button>

          <details style={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
            <summary style={{ fontWeight: "bold", cursor: "pointer", marginBottom: "1rem" }}>
              📖 معلومات التثبيت والميزات
            </summary>
            <div style={{ color: "#666", lineHeight: "1.8" }}>
              <h4>✨ الميزات الرئيسية:</h4>
              <ul>
                <li>✅ يعمل 100% بدون انترنت</li>
                <li>✅ نفس الـ 50 ميزة الكاملة</li>
                <li>✅ تحديثات تلقائية عند الاتصال</li>
                <li>✅ مزامنة ذكية مع السحابة</li>
                <li>✅ يتطور من تلقاء نفسه</li>
                <li>✅ كود مفتوح المصدر</li>
              </ul>

              <h4>🔧 التثبيت:</h4>
              <p>انقر على الزر أعلاه وسيبدأ التحميل تلقائياً. بعد التحميل، اتبع الخطوات البسيطة.</p>

              <h4>🔄 التحديثات:</h4>
              <p>التطبيق يتحدث تلقائياً عند الاتصال بالانترنت. كل التحديثات مجانية 100%.</p>

              <h4>☁️ المزامنة:</h4>
              <p>اختياري تماماً - يمكنك تفعيل المزامنة مع الحساب السحابي للعمل على أجهزة متعددة.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
