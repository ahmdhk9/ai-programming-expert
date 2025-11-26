import Link from "next/link";

export default function SuperDashboard() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "2rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>🚀 AI Programming Expert - لوحة التحكم الشاملة</h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            {
              href: "/chat",
              emoji: "💬",
              title: "Chat AI",
              desc: "تحدث مع الخبير البرمجي",
              color: "#667eea",
            },
            {
              href: "/universal",
              emoji: "✨",
              title: "Universal Creator",
              desc: "أنشئ أي شيء تريده",
              color: "#9c27b0",
            },
            {
              href: "/video-creator",
              emoji: "🎬",
              title: "Video Generator",
              desc: "أنشئ فيديوهات احترافية",
              color: "#e91e63",
            },
            {
              href: "/content-manager",
              emoji: "📺",
              title: "Content Manager",
              desc: "أدر القنوات والمحتوى",
              color: "#c2185b",
            },
            {
              href: "/storage-advisor",
              emoji: "💾",
              title: "Storage Advisor",
              desc: "نصائح التخزين الذكي",
              color: "#5c6bc0",
            },
            {
              href: "/self-healing",
              emoji: "🔄",
              title: "Self-Healing",
              desc: "إصلاح ذاتي للأخطاء",
              color: "#00897b",
            },
            {
              href: "/resources",
              emoji: "📊",
              title: "Resources Monitor",
              desc: "مراقبة الموارد والتكاليف",
              color: "#1976d2",
            },
            {
              href: "/ai-models",
              emoji: "🧠",
              title: "AI Models",
              desc: "معلومات النماذج المدمجة",
              color: "#1a73e8",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2rem",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              borderTop: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{item.emoji}</div>
              <h2 style={{ margin: "0.5rem 0", color: item.color }}>{item.title}</h2>
              <p style={{ color: "#666", margin: 0 }}>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
