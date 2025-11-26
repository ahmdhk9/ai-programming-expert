import React, { useState } from "react";
import Link from "next/link";

interface StorageOption {
  name: string;
  emoji: string;
  free: string;
  paid: string;
  speed: string;
  reliability: string;
  recommendation: string;
  setupSteps: string[];
}

export default function StorageAdvisor() {
  const [selectedUse, setSelectedUse] = useState("videos");
  const [needSize, setNeedSize] = useState("100");

  const storageOptions: Record<string, StorageOption> = {
    googleDrive: {
      name: "Google Drive",
      emoji: "🔵",
      free: "15 GB",
      paid: "$9.99/شهر (100GB)",
      speed: "سريع",
      reliability: "عالي جداً",
      recommendation: "مثالي للنسخ الاحتياطية والملفات الوسيطة",
      setupSteps: [
        "1. انتقل إلى Google Drive",
        "2. انقر على 'جديد' → 'مجلد'",
        "3. أضفه للمشروع بـ API",
        "أرسل لي البريد وسأدمجه",
      ],
    },
    aws: {
      name: "AWS S3",
      emoji: "🟨",
      free: "12 شهر مجاني (5GB)",
      paid: "$0.023/GB",
      speed: "سريع جداً",
      reliability: "99.99% uptime",
      recommendation: "للملفات الكبيرة والبث المباشر",
      setupSteps: [
        "1. اذهب إلى aws.amazon.com",
        "2. أنشئ حساب S3",
        "3. اطلب Access Key و Secret Key",
        "أعطني المفاتيح وسأوصلها",
      ],
    },
    cloudinary: {
      name: "Cloudinary",
      emoji: "🟦",
      free: "25 GB/شهر",
      paid: "$99/شهر (1TB)",
      speed: "سريع مع CDN",
      reliability: "عالي",
      recommendation: "للصور والفيديوهات مع معالجة تلقائية",
      setupSteps: [
        "1. سجل على Cloudinary.com",
        "2. احصل على Cloud Name و API Key",
        "3. فعّل الخدمة",
        "أعطني المفتاح وسأكمل",
      ],
    },
    backblaze: {
      name: "Backblaze B2",
      emoji: "🟧",
      free: "10 GB أول شهر",
      paid: "$6/TB",
      speed: "سريع",
      reliability: "99.99%",
      recommendation: "للنسخ الاحتياطية الرخيصة",
      setupSteps: [
        "1. اذهب إلى backblaze.com",
        "2. أنشئ حساب B2",
        "3. اطلب Application Key",
        "أرسل لي المفتاح",
      ],
    },
    mega: {
      name: "Mega",
      emoji: "🔴",
      free: "20 GB",
      paid: "$9.99/شهر (200GB)",
      speed: "سريع مع تشفير",
      reliability: "عالي",
      recommendation: "للملفات السرية والخاصة",
      setupSteps: [
        "1. سجل على Mega.nz",
        "2. أنشئ مجلد مشترك",
        "3. أضفني كمتعاون",
        "جاهز للاستخدام",
      ],
    },
  };

  const useCases: Record<string, { emoji: string; label: string; recommended: string[] }> = {
    videos: {
      emoji: "🎬",
      label: "الفيديوهات",
      recommended: ["aws", "cloudinary", "backblaze"],
    },
    documents: {
      emoji: "📄",
      label: "الملفات والمستندات",
      recommended: ["googleDrive", "mega"],
    },
    backups: {
      emoji: "💾",
      label: "النسخ الاحتياطية",
      recommended: ["backblaze", "aws"],
    },
    streaming: {
      emoji: "📡",
      label: "البث المباشر",
      recommended: ["aws", "cloudinary"],
    },
    private: {
      emoji: "🔒",
      label: "الملفات السرية",
      recommended: ["mega", "aws"],
    },
  };

  const currentUseCase = useCases[selectedUse];
  const recommendedServices = currentUseCase.recommended;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#5c6bc0", color: "white", padding: "2rem" }}>
        <h1>💾 Storage Advisor - مستشار التخزين الذكي</h1>
        <p>النظام يوصي بأفضل خدمة تخزين حسب احتياجاتك</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/">← Home</Link>
          <Link href="/content-manager">📺 Content</Link>
          <Link href="/chat">💬 Chat</Link>
        </nav>

        {/* Use Case Selection */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0 }}>🎯 ما نوع الملفات التي ستخزنها؟</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem" }}>
            {Object.entries(useCases).map(([key, useCase]) => (
              <button
                key={key}
                onClick={() => setSelectedUse(key)}
                style={{
                  padding: "1.5rem",
                  backgroundColor: selectedUse === key ? "#5c6bc0" : "#f5f5f5",
                  color: selectedUse === key ? "white" : "black",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{useCase.emoji}</div>
                {useCase.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size Input */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <label style={{ display: "block", marginBottom: "1rem", fontWeight: "bold" }}>
            حجم التخزين المطلوب (GB):
          </label>
          <input
            type="range"
            value={needSize}
            onChange={(e) => setNeedSize(e.target.value)}
            min="10"
            max="5000"
            step="10"
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <div style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>
            {needSize} GB
          </div>
        </div>

        {/* Recommendations */}
        <h2>✨ الخدمات الموصى بها لك:</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          {recommendedServices.map((serviceKey) => {
            const service = storageOptions[serviceKey];
            return (
              <div key={serviceKey} style={{
                backgroundColor: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}>
                <div style={{
                  backgroundColor: "#5c6bc0",
                  color: "white",
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}>
                  <div style={{ fontSize: "2.5rem" }}>{service.emoji}</div>
                  <div>
                    <h3 style={{ margin: 0 }}>{service.name}</h3>
                    <div style={{ opacity: 0.9 }}>⭐⭐⭐⭐⭐</div>
                  </div>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ color: "#666", marginBottom: "0.5rem" }}>المجاني:</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{service.free}</div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ color: "#666", marginBottom: "0.5rem" }}>المدفوع:</div>
                    <div>{service.paid}</div>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #eee",
                  }}>
                    <div>
                      <div style={{ color: "#999", fontSize: "0.85rem" }}>السرعة</div>
                      <div style={{ fontWeight: "bold" }}>{service.speed}</div>
                    </div>
                    <div>
                      <div style={{ color: "#999", fontSize: "0.85rem" }}>الموثوقية</div>
                      <div style={{ fontWeight: "bold" }}>{service.reliability}</div>
                    </div>
                  </div>

                  <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
                    {service.recommendation}
                  </p>

                  <details style={{ marginBottom: "1rem", cursor: "pointer" }}>
                    <summary style={{ fontWeight: "bold", color: "#5c6bc0", marginBottom: "0.5rem" }}>
                      📋 خطوات الإعداد
                    </summary>
                    <div style={{ paddingLeft: "1rem", fontSize: "0.9rem", lineHeight: "1.8" }}>
                      {service.setupSteps.map((step, idx) => (
                        <div key={idx} style={{ marginBottom: "0.5rem" }}>
                          {step}
                        </div>
                      ))}
                    </div>
                  </details>

                  <button style={{
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: "#5c6bc0",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}>
                    ✅ تفعيل الآن
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* All Options */}
        <h2>📚 جميع الخدمات المتاحة:</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {Object.entries(storageOptions).map(([key, service]) => (
            <div key={key} style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "8px",
              textAlign: "center",
              opacity: recommendedServices.includes(key) ? 1 : 0.7,
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{service.emoji}</div>
              <h3 style={{ margin: "0.5rem 0" }}>{service.name}</h3>
              <div style={{ color: "#999", fontSize: "0.9rem" }}>
                {service.free}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
