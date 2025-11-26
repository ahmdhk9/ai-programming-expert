import React, { useState } from "react";
import Link from "next/link";

interface VideoProject {
  id: string;
  title: string;
  description: string;
  status: "planning" | "generating" | "completed" | "error";
  progress: number;
  videoUrl?: string;
  script?: string;
  createdAt: string;
}

export default function VideoCreator() {
  const [videos, setVideos] = useState<VideoProject[]>([
    {
      id: "1",
      title: "شرح الفوركس",
      description: "فيديو توعوي عن تداول الفوركس",
      status: "completed",
      progress: 100,
      videoUrl: "https://example.com/forex-tutorial.mp4",
      createdAt: "2025-11-26",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("30");
  const [style, setStyle] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVideo = async () => {
    if (!prompt) return;
    setIsGenerating(true);

    const newVideo: VideoProject = {
      id: Date.now().toString(),
      title: prompt.substring(0, 50),
      description: prompt,
      status: "generating",
      progress: 0,
      script: prompt,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setVideos([newVideo, ...videos]);

    // محاكاة التقدم
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 500));
      setVideos((prev) =>
        prev.map((v) =>
          v.id === newVideo.id ? { ...v, progress: i } : v
        )
      );
    }

    setVideos((prev) =>
      prev.map((v) =>
        v.id === newVideo.id
          ? {
              ...v,
              status: "completed",
              progress: 100,
              videoUrl: "https://example.com/video-" + newVideo.id + ".mp4",
            }
          : v
      )
    );

    setPrompt("");
    setIsGenerating(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#e91e63", color: "white", padding: "2rem" }}>
        <h1>🎬 Video Creator - منشئ الفيديوهات</h1>
        <p>أنشئ فيديوهات احترافية بالوصف فقط</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/">← Home</Link>
          <Link href="/chat">💬 Chat</Link>
          <Link href="/universal">✨ Universal Creator</Link>
        </nav>

        {/* Video Generator */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2>🎥 أنشئ فيديو جديد</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="اكتب وصف الفيديو... مثال: فيديو توعوي عن الفوركس مدته دقيقة واحدة"
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>المدة (ثانية)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "4px", border: "1px solid #ddd" }}
              >
                <option value="15">15 ثانية</option>
                <option value="30">30 ثانية</option>
                <option value="60">دقيقة واحدة</option>
                <option value="180">3 دقائق</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>الأسلوب</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "4px", border: "1px solid #ddd" }}
              >
                <option value="professional">احترافي</option>
                <option value="casual">عادي</option>
                <option value="educational">تعليمي</option>
                <option value="animated">رسومات متحركة</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateVideo}
            disabled={isGenerating || !prompt}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: isGenerating ? "#ccc" : "#e91e63",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: isGenerating ? "not-allowed" : "pointer",
            }}
          >
            {isGenerating ? "⏳ جاري الإنشاء..." : "🎬 أنشئ الفيديو"}
          </button>
        </div>

        {/* Videos List */}
        <h2>📹 الفيديوهات الخاصة بك</h2>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                borderLeft: `4px solid ${
                  video.status === "completed" ? "#4CAF50" : video.status === "generating" ? "#FF9800" : "#f44336"
                }`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>🎬 {video.title}</h3>
                  <p style={{ color: "#666", margin: "0.5rem 0" }}>{video.description}</p>
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginTop: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {video.status === "completed"
                      ? "✅ مكتمل"
                      : video.status === "generating"
                      ? `⏳ جاري الإنشاء ${video.progress}%`
                      : "❌ خطأ"}
                  </div>
                </div>
                {video.status === "completed" && (
                  <button
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#e91e63",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    📥 تحميل
                  </button>
                )}
              </div>

              {video.progress > 0 && video.status === "generating" && (
                <div style={{ marginTop: "1rem", backgroundColor: "#f0f0f0", borderRadius: "4px", overflow: "hidden" }}>
                  <div
                    style={{
                      backgroundColor: "#e91e63",
                      height: "8px",
                      width: `${video.progress}%`,
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
