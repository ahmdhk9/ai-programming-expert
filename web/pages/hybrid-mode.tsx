import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HybridMode() {
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState("synced");
  const [pendingItems, setPendingItems] = useState(0);
  const [improvements, setImprovements] = useState<any>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const toggleOfflineMode = async () => {
    setIsOnline(!isOnline);
    if (isOnline) {
      // عند الذهاب للـ offline
      setSyncStatus("preparing-offline");
    } else {
      // عند العودة للـ online
      setSyncStatus("syncing");
      setTimeout(() => setSyncStatus("synced"), 2000);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#FF9800", color: "white", padding: "2rem", textAlign: "center" }}>
        <h1>🔄 Hybrid Mode - Online & Offline</h1>
        <p>يعمل بدون انترنت ويتزامن تلقائياً عند الاتصال</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem" }}>
          <Link href="/">🏠 Home</Link>
        </nav>

        {/* Status */}
        <div style={{
          backgroundColor: isOnline ? "#e8f5e9" : "#fff3e0",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
            {isOnline ? "🟢" : "🟡"}
          </div>
          <h2 style={{
            margin: "0 0 1rem 0",
            color: isOnline ? "#2e7d32" : "#e65100",
          }}>
            {isOnline ? "Online Mode" : "Offline Mode"}
          </h2>
          <p style={{ margin: 0, color: "#666" }}>
            {isOnline
              ? "جميع الخدمات متاحة + مزامنة سحابية"
              : "جميع الخدمات محلية + pending sync"}
          </p>

          <button
            onClick={toggleOfflineMode}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: isOnline ? "#FF9800" : "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isOnline ? "🔌 Go Offline" : "📡 Go Online"}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#FF9800" }}>
              {isOnline ? "∞" : "All"}
            </div>
            <div style={{ color: "#666", marginTop: "0.5rem" }}>Available Features</div>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#2196F3" }}>
              {syncStatus === "syncing" ? "⏳" : syncStatus === "synced" ? "✅" : "⏱️"}
            </div>
            <div style={{ color: "#666", marginTop: "0.5rem" }}>
              {syncStatus === "syncing" ? "Syncing..." : syncStatus === "synced" ? "Synced" : "Ready"}
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#4CAF50" }}>
              {pendingItems}
            </div>
            <div style={{ color: "#666", marginTop: "0.5rem" }}>Pending Sync Items</div>
          </div>

          <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "8px" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#9C27B0" }}>
              📈
            </div>
            <div style={{ color: "#666", marginTop: "0.5rem" }}>Self-Improving</div>
          </div>
        </div>

        {/* Features in Hybrid Mode */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem" }}>
          <h2 style={{ marginTop: 0 }}>✨ Hybrid Mode Features</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                emoji: "🌐",
                title: "Online Mode",
                features: [
                  "جميع الـ 50 ميزة",
                  "مزامنة سحابية",
                  "AI models قوية",
                  "تعاون جماعي",
                  "تحديثات فورية",
                ],
              },
              {
                emoji: "📱",
                title: "Offline Mode",
                features: [
                  "جميع الـ 50 ميزة",
                  "models محلية خفيفة",
                  "عمل مستقل تام",
                  "بدون تأخير",
                  "sync عند الاتصال",
                ],
              },
              {
                emoji: "🔄",
                title: "Smart Sync",
                features: [
                  "مزامنة تلقائية",
                  "ضغط البيانات",
                  "تحديثات ذكية",
                  "حل التضاربات",
                  "تطور مستمر",
                ],
              },
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "8px" }}>
                <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.5rem" }}>{item.emoji} {item.title}</h3>
                <ul style={{ margin: 0, paddingLeft: "1.5rem", color: "#666" }}>
                  {item.features.map((f, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem" }}>✅ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
