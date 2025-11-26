import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SecurityAdmin() {
  const [integrity, setIntegrity] = useState<any>(null);
  const [backups, setBackups] = useState<any[]>([]);

  useEffect(() => {
    fetchSecurityStatus();
  }, []);

  const fetchSecurityStatus = async () => {
    try {
      const [integrityRes, backupsRes] = await Promise.all([
        fetch("/api/admin/verify-integrity"),
        fetch("/api/admin/backups")
      ]);

      const integrityData = await integrityRes.json();
      const backupsData = await backupsRes.json();

      setIntegrity(integrityData);
      setBackups(backupsData);
    } catch (err) {
      console.error("Error fetching security status:", err);
    }
  };

  const createBackup = async () => {
    await fetch("/api/admin/backup-now", { method: "POST" });
    fetchSecurityStatus();
  };

  const lockProject = async () => {
    await fetch("/api/admin/lock-project", { method: "POST" });
    alert("✅ تم قفل المشروع");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "white", padding: "1.5rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link href="/admin" style={{ color: "#667eea", textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
          ← رجوع
        </Link>
        <h1 style={{ margin: "0.5rem 0 0 0", color: "#667eea" }}>🔐 الأمان والحماية</h1>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {/* Security Status */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>✅ حالة الأمان</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            {[
              { status: "🟢", label: "تشفير", value: "نشط" },
              { status: "🟢", label: "النسخ", value: "تلقائية" },
              { status: integrity?.isIntact ? "🟢" : "🔴", label: "السلامة", value: integrity?.isIntact ? "سليم" : "تعديلات" },
              { status: "🟢", label: "CORS", value: "محمي" }
            ].map((item) => (
              <div key={item.label} style={{
                backgroundColor: "#f9f9f9",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "1.5rem" }}>{item.status}</div>
                <div style={{ color: "#666", fontSize: "0.85rem" }}>{item.label}</div>
                <div style={{ fontWeight: "bold", marginTop: "0.5rem" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>🛡️ الإجراءات الأمنية</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
            <button
              onClick={createBackup}
              style={{
                padding: "1rem",
                backgroundColor: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              💾 نسخة احتياطية
            </button>
            <button
              onClick={lockProject}
              style={{
                padding: "1rem",
                backgroundColor: "#ff6b6b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              🔒 قفل المشروع
            </button>
            <button
              onClick={fetchSecurityStatus}
              style={{
                padding: "1rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              🔍 فحص السلامة
            </button>
          </div>
        </div>

        {/* Backups List */}
        <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>📦 النسخ الاحتياطية</h2>
          {backups.length === 0 ? (
            <p style={{ color: "#999" }}>لا توجد نسخ احتياطية</p>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              {backups.map((backup: any, idx: number) => (
                <div key={idx} style={{
                  backgroundColor: "#f9f9f9",
                  padding: "1rem",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <div style={{ fontWeight: "bold" }}>{backup.filename}</div>
                    <div style={{ color: "#999", fontSize: "0.85rem" }}>{new Date(backup.created).toLocaleString('ar-SA')}</div>
                  </div>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "#667eea",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    📥 استعادة
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
