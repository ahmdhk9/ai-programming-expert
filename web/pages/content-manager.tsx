import React, { useState } from "react";
import Link from "next/link";

interface Channel {
  id: string;
  name: string;
  platform: string;
  subscribers: number;
  status: "active" | "inactive";
  nextUpload?: string;
}

interface Content {
  id: string;
  title: string;
  type: string;
  status: "draft" | "scheduled" | "published" | "processing";
  progress: number;
  scheduledFor?: string;
  platforms: string[];
}

export default function ContentManager() {
  const [channels, setChannels] = useState<Channel[]>([
    { id: "1", name: "قناتي الرئيسية", platform: "YouTube", subscribers: 45200, status: "active", nextUpload: "2025-11-27" },
    { id: "2", name: "حسابي", platform: "TikTok", subscribers: 128000, status: "active" },
    { id: "3", name: "الحساب", platform: "Instagram", subscribers: 89000, status: "active" },
  ]);

  const [contents, setContents] = useState<Content[]>([
    {
      id: "1",
      title: "أفضل 10 نصائح في البرمجة",
      type: "فيديو مقالة",
      status: "scheduled",
      progress: 100,
      scheduledFor: "2025-11-27 10:00",
      platforms: ["YouTube", "Instagram"],
    },
  ]);

  const [selectedType, setSelectedType] = useState("film");
  const [contentTitle, setContentTitle] = useState("");

  const contentTypes = [
    { value: "film", emoji: "🎬", label: "فيلم" },
    { value: "series", emoji: "📺", label: "مسلسل" },
    { value: "cartoon", emoji: "🎨", label: "رسوم متحركة" },
    { value: "voiceover", emoji: "🎙️", label: "دبلجة و صوت" },
    { value: "translation", emoji: "🌍", label: "ترجمة" },
    { value: "shorts", emoji: "⚡", label: "فيديوهات قصيرة" },
    { value: "podcast", emoji: "🎧", label: "بودكاست" },
    { value: "documentary", emoji: "📹", label: "وثائقي" },
  ];

  const createContent = () => {
    if (!contentTitle) return;

    const newContent: Content = {
      id: Date.now().toString(),
      title: contentTitle,
      type: contentTypes.find((t) => t.value === selectedType)?.label || "",
      status: "processing",
      progress: 0,
      platforms: ["YouTube", "TikTok"],
    };

    setContents([newContent, ...contents]);
    setContentTitle("");

    // محاكاة المعالجة
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
      }
      setContents((prev) =>
        prev.map((c) =>
          c.id === newContent.id
            ? { ...c, progress: Math.min(100, progress), status: progress >= 100 ? "published" : "processing" }
            : c
        )
      );
    }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#c2185b", color: "white", padding: "2rem" }}>
        <h1>📺 Content Manager - مدير المحتوى</h1>
        <p>أنشئ وأدر ونشر المحتوى عبر جميع القنوات بآلية واحدة</p>
      </header>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/">← Home</Link>
          <Link href="/chat">💬 Chat</Link>
          <Link href="/storage-advisor">💾 Storage</Link>
        </nav>

        {/* Channels Status */}
        <h2>🎬 قنواتك المتصلة</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {channels.map((channel) => (
            <div key={channel.id} style={{ backgroundColor: "white", borderRadius: "12px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: 0 }}>{channel.name}</h3>
                  <div style={{ color: "#999", fontSize: "0.9rem" }}>{channel.platform}</div>
                </div>
                <div style={{ fontSize: "1.2rem", color: "#4CAF50" }}>✅</div>
              </div>
              <div style={{ color: "#666", marginBottom: "0.5rem" }}>👥 {channel.subscribers.toLocaleString()}</div>
              <button style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#c2185b",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}>
                📤 انشر الآن
              </button>
            </div>
          ))}
        </div>

        {/* Create Content */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ marginTop: 0 }}>🎥 أنشئ محتوى جديد</h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>نوع المحتوى:</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "1rem" }}>
              {contentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  style={{
                    padding: "1rem",
                    backgroundColor: selectedType === type.value ? "#c2185b" : "#f5f5f5",
                    color: selectedType === type.value ? "white" : "black",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontSize: "1.5rem" }}>{type.emoji}</div>
                  <div style={{ fontSize: "0.85rem" }}>{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            placeholder="اكتب اسم المحتوى والتفاصيل..."
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              minHeight: "100px",
              fontFamily: "inherit",
              marginBottom: "1rem",
            }}
          />

          <button
            onClick={createContent}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: "#c2185b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🚀 ابدأ الإنتاج
          </button>
        </div>

        {/* Content List */}
        <h2>📝 محتوياتك</h2>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {contents.map((content) => (
            <div key={content.id} style={{ backgroundColor: "white", borderRadius: "12px", padding: "1.5rem", borderLeft: "4px solid #c2185b" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>{content.title}</h3>
                  <div style={{ color: "#999", fontSize: "0.9rem" }}>{content.type} • {content.platforms.join(" + ")}</div>
                </div>
                <div
                  style={{
                    backgroundColor: content.status === "published" ? "#e8f5e9" : "#fff3e0",
                    color: content.status === "published" ? "#2e7d32" : "#e65100",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                  }}
                >
                  {content.status === "published" ? "✅ منشور" : `⏳ ${Math.floor(content.progress)}%`}
                </div>
              </div>
              {content.progress < 100 && (
                <div style={{ backgroundColor: "#f0f0f0", borderRadius: "4px", overflow: "hidden" }}>
                  <div
                    style={{
                      backgroundColor: "#c2185b",
                      height: "8px",
                      width: `${content.progress}%`,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
