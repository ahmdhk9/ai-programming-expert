import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    const guestMode = localStorage.getItem("isGuest");

    if (guestMode) {
      setIsGuest(true);
      setUser({ name: "زائر" });
    } else if (userData && token) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isGuest");
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "1.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ margin: 0, color: "#667eea", fontSize: "1.5rem" }}>
            🎯 Dashboard
          </h1>
          <p style={{ margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }}>
            مرحباً {user.name}! 👋
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1.5rem",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🚪 تسجيل الخروج
        </button>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
          {[
            { emoji: "🚀", title: "المشاريع", count: "0" },
            { emoji: "⚙️", title: "الميزات المستخدمة", count: "25" },
            { emoji: "💾", title: "التخزين", count: "2.5 GB" },
            { emoji: "⏱️", title: "الوقت المستخدم", count: "0 ساعة" }
          ].map((stat) => (
            <div key={stat.title} style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
              <div style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{stat.title}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#667eea" }}>{stat.count}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0, color: "#333" }}>⚡ الإجراءات السريعة</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            {[
              { emoji: "✨", label: "حلم جديد", href: "/dream-machine" },
              { emoji: "💬", label: "محادثة ذكية", href: "/chat" },
              { emoji: "📥", label: "تحميل", href: "/standalone-download" },
              { emoji: "🎬", label: "منشئ فيديو", href: "/video-creator" }
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#333",
                  transition: "all 0.3s"
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{action.emoji}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{action.label}</div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0, color: "#333" }}>👤 معلوماتك</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid #eee" }}>
              <span style={{ color: "#666" }}>الاسم</span>
              <span style={{ fontWeight: "bold", color: "#333" }}>{user.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid #eee" }}>
              <span style={{ color: "#666" }}>البريد</span>
              <span style={{ fontWeight: "bold", color: "#333" }}>{user.email || "زائر"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0" }}>
              <span style={{ color: "#666" }}>الحالة</span>
              <span style={{ fontWeight: "bold", color: isGuest ? "#ff9800" : "#4CAF50" }}>
                {isGuest ? "🟡 زائر" : "🟢 مسجل"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
