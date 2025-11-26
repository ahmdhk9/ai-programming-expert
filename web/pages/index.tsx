import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Hero Section */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "4rem 2rem",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "3.5rem", margin: "0 0 1rem 0", fontWeight: "bold" }}>
          🤖 AI Programming Expert
        </h1>
        <p style={{ fontSize: "1.3rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
          نظام ذكي متطور لأتمتة دورة حياة التطوير الكاملة
        </p>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: "700px", margin: "0 auto 2rem" }}>
          من الفكرة الأولية وحتى النشر والصيانة - كل شيء مؤتمتاً بذكاء
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
          <Link href="/chat" style={{
            padding: "1rem 2rem",
            backgroundColor: "white",
            color: "#667eea",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
          }}>
            💬 اتكلم مع الخبير
          </Link>
          <Link href="/dashboard" style={{
            padding: "1rem 2rem",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            border: "2px solid white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer"
          }}>
            📊 لوحة التحكم
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
        <h2 style={{ textAlign: "center", color: "white", fontSize: "2.5rem", marginBottom: "3rem" }}>
          ✨ المميزات
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem"
        }}>
          {[
            { emoji: "📐", title: "فهم عميق", desc: "تحليل السياق والمتطلبات بذكاء" },
            { emoji: "💻", title: "كتابة الكود", desc: "إنشاء وحدات برمجية متكاملة" },
            { emoji: "🧪", title: "الاختبار", desc: "اختبارات شاملة بشكل تلقائي" },
            { emoji: "🚀", title: "النشر", desc: "نشر ذكي وآمن إلى الإنتاج" },
            { emoji: "📊", title: "المراقبة", desc: "لوحات تحكم وتقارير مفصلة" },
            { emoji: "🔒", title: "الأمان", desc: "حماية متقدمة في كل مرحلة" },
          ].map((feature, idx) => (
            <div key={idx} style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.3s"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.emoji}</div>
              <h3 style={{ margin: "0.5rem 0", color: "#333" }}>{feature.title}</h3>
              <p style={{ color: "#666", margin: 0 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <footer style={{ backgroundColor: "rgba(0,0,0,0.2)", padding: "2rem", color: "white", textAlign: "center" }}>
        <nav style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1rem" }}>
          <Link href="/chat" style={{ color: "white", textDecoration: "none" }}>💬 Chat</Link>
          <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>📊 Dashboard</Link>
          <Link href="/about" style={{ color: "white", textDecoration: "none" }}>ℹ️ About</Link>
        </nav>
        <p>🚀 مشروع AI Programming Expert 2025</p>
      </footer>
    </div>
  );
}
