import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("الرجاء ملء جميع الحقول");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("✅ تم إنشاء الحساب بنجاح! جاري إعادة التوجيه...");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setError(data.message || "حدث خطأ في الإنشاء");
      }
    } catch (err) {
      setError("خطأ في الاتصال");
    } finally {
      setIsLoading(false);
    }
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
          إنشاء حساب جديد
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

        {success && (
          <div style={{
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem"
          }}>
            {success}
          </div>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            👤 الاسم الكامل
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أحمد البصراوي"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            📧 البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            🔐 كلمة المرور
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#333" }}>
            ✓ تأكيد كلمة المرور
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button
          onClick={handleRegister}
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
            marginBottom: "1.5rem"
          }}
        >
          {isLoading ? "⏳ جاري الإنشاء..." : "✨ إنشاء الحساب"}
        </button>

        <div style={{ textAlign: "center", color: "#666" }}>
          هل لديك حساب بالفعل؟{" "}
          <Link href="/auth/login" style={{ color: "#667eea", textDecoration: "none", fontWeight: "bold" }}>
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
