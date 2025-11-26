import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("الرجاء ملء جميع الحقول");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setError(data.message || "خطأ في تسجيل الدخول");
      }
    } catch (err) {
      setError("خطأ في الاتصال");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  const handleGuestLogin = () => {
    localStorage.setItem("isGuest", "true");
    localStorage.setItem("user", JSON.stringify({ name: "زائر" }));
    router.push("/dashboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "2rem",
        maxWidth: "450px",
        width: "100%",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}>
        <h1 style={{ textAlign: "center", margin: "0 0 0.5rem 0", color: "#667eea" }}>
          🚀 AI Programming Expert
        </h1>
        <h2 style={{ textAlign: "center", margin: "0 0 2rem 0", fontSize: "1.5rem", color: "#333" }}>
          تسجيل الدخول
        </h2>

        {error && (
          <div style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem"
          }}>
            ❌ {error}
          </div>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            📧 البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box",
              transition: "border-color 0.3s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            🔐 كلمة المرور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#667eea"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: isLoading ? "#ccc" : "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: isLoading ? "not-allowed" : "pointer",
            marginBottom: "1rem"
          }}
        >
          {isLoading ? "⏳ جاري الدخول..." : "🔓 دخول"}
        </button>

        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <div style={{ borderTop: "2px solid #ddd", margin: "1rem 0" }}></div>
          <span style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "0 0.5rem",
            color: "#999",
            fontSize: "0.9rem"
          }}>أو</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#fff",
            color: "#333",
            border: "2px solid #ddd",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem"
          }}
        >
          🔵 دخول مع Google
        </button>

        <button
          onClick={handleGuestLogin}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#f5f5f5",
            color: "#333",
            border: "2px solid #ddd",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "1.5rem"
          }}
        >
          👤 دخول كزائر
        </button>

        <div style={{ textAlign: "center", color: "#666" }}>
          ليس لديك حساب؟{" "}
          <Link href="/auth/register" style={{ color: "#667eea", textDecoration: "none", fontWeight: "bold" }}>
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
}
