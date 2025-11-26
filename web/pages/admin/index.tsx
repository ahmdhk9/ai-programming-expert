import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = () => {
    // كلمة السر البسيطة (يجب استخدام نظام آمن في الإنتاج)
    if (adminPassword === "ahmed2024") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      alert("كلمة السر خاطئة");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%"
        }}>
          <h1 style={{ textAlign: "center", color: "#667eea" }}>🔐 Admin Panel</h1>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "1.5rem" }}>
            أحمد البصراوي - لوحة التحكم
          </p>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="أدخل كلمة السر"
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box"
            }}
            onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
          />
          <button
            onClick={handleAdminLogin}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🔓 دخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{
        backgroundColor: "white",
        padding: "1.5rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: 0, color: "#667eea" }}>👨‍💻 Admin Panel - أحمد البصراوي</h1>
        <button
          onClick={() => {
            localStorage.removeItem("adminAuth");
            router.push("/");
          }}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          🚪 خروج
        </button>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        {/* Statistics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {[
            { emoji: "👥", label: "المستخدمون", value: "1,234" },
            { emoji: "🚀", label: "المشاريع", value: "567" },
            { emoji: "💰", label: "العائد", value: "$12,345" },
            { emoji: "📊", label: "النشاط", value: "98.5%" }
          ].map((stat) => (
            <div key={stat.label} style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>{stat.label}</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#667eea" }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Admin Links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem" }}>
          {[
            { emoji: "👥", label: "المستخدمون", href: "/admin/users" },
            { emoji: "🔑", label: "التوكنات", href: "/admin/tokens" },
            { emoji: "🌐", label: "الإعدادات", href: "/admin/settings" },
            { emoji: "📊", label: "التحليلات", href: "/admin/analytics" },
            { emoji: "🔌", label: "التكاملات", href: "/admin/integrations" },
            { emoji: "🛠️", label: "الأدوات", href: "/admin/tools" },
            { emoji: "📋", label: "السجلات", href: "/admin/logs" },
            { emoji: "⚙️", label: "النظام", href: "/admin/system" }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                backgroundColor: "white",
                borderRadius: "12px",
                textDecoration: "none",
                color: "#333",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{item.emoji}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{item.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
