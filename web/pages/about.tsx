import Link from "next/link";

export default function About() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#0070f3", color: "white", padding: "2rem", textAlign: "center" }}>
        <h1>🤖 About AI Programming Expert</h1>
        <p style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}>
          نظام ذكي متطور لأتمتة دورة حياة التطوير الكاملة
        </p>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {/* Navigation */}
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/" style={{ color: "#0070f3", textDecoration: "none", fontWeight: "bold" }}>
            ← Home
          </Link>
          <Link href="/dashboard" style={{ color: "#0070f3", textDecoration: "none", fontWeight: "bold" }}>
            Dashboard
          </Link>
          <Link href="/chat" style={{ color: "#0070f3", textDecoration: "none", fontWeight: "bold" }}>
            Chat
          </Link>
        </nav>

        {/* Vision */}
        <section style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px", marginBottom: "2rem" }}>
          <h2>📐 الرؤية</h2>
          <p>
            نظام متطور مصمم ليكون مساعداً رقمياً شاملاً يعمل على مستوى المفاهيم والأنظمة،
            يفهم السياق المعقد للمشاريع ويتخذ قرارات تصميمية وينفذ مهام تطوير معقدة بشكل مستقل.
          </p>
        </section>

        {/* Key Features */}
        <section style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px", marginBottom: "2rem" }}>
          <h2>✨ المميزات الرئيسية</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {[
              { emoji: "📐", title: "فهم عميق للسياق", desc: "تحليل متطلبات المشروع والعلاقات بين المكونات" },
              { emoji: "⚙️", title: "أتمتة SDLC", desc: "من المتطلبات إلى الإنتاج - كل شيء مؤتمتاً" },
              { emoji: "🧠", title: "قرارات تصميمية ذكية", desc: "اقتراح هياكل برمجية وأنماط تصميم مناسبة" },
              { emoji: "💻", title: "كتابة الكود المستقلة", desc: "وحدات برمجية كاملة ومدمجة مع النظام" },
              { emoji: "🧪", title: "اختبار تلقائي شامل", desc: "Unit Tests و Integration Tests بشكل تلقائي" },
              { emoji: "🚀", title: "النشر الذكي", desc: "اختيار البيئات المثالية وإدارة CI/CD" },
              { emoji: "📊", title: "مراقبة الأداء", desc: "لوحات تحكم وتقارير تفصيلية مستمرة" },
              { emoji: "🔒", title: "الأمان بالتصميم", desc: "دمج معايير الأمان في كل مرحلة" },
            ].map((feature, idx) => (
              <div key={idx} style={{ borderLeft: "4px solid #0070f3", paddingLeft: "1rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{feature.emoji}</div>
                <h3 style={{ margin: "0.5rem 0" }}>{feature.title}</h3>
                <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px", marginBottom: "2rem" }}>
          <h2>🛠️ Technology Stack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            <div>
              <h3 style={{ borderBottom: "2px solid #0070f3", paddingBottom: "0.5rem" }}>Frontend</h3>
              <ul style={{ lineHeight: "1.8", color: "#666" }}>
                <li>Next.js 14 - React Framework</li>
                <li>TypeScript - Type Safety</li>
                <li>Firebase - Database & Auth</li>
                <li>Vercel - Deployment</li>
              </ul>
            </div>
            <div>
              <h3 style={{ borderBottom: "2px solid #0070f3", paddingBottom: "0.5rem" }}>Backend</h3>
              <ul style={{ lineHeight: "1.8", color: "#666" }}>
                <li>Express.js - Server</li>
                <li>Node.js 20 - Runtime</li>
                <li>Fly.io - Deployment</li>
                <li>Morgan + Helmet - Security</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px" }}>
          <h2>🔄 كيفية العمل</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "2rem" }}>1️⃣</div>
            <div>
              <strong>اكتب طلبك</strong>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>تحدث مع الخبير البرمجي وصف ما تريده</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "2rem" }}>2️⃣</div>
            <div>
              <strong>الفهم والتحليل</strong>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>النظام يحلل السياق والمتطلبات</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "2rem" }}>3️⃣</div>
            <div>
              <strong>الإنجاز الذكي</strong>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>كتابة الكود وإدارة المشروع بالكامل</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "2rem" }}>4️⃣</div>
            <div>
              <strong>النشر والمراقبة</strong>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>نشر تلقائي ومراقبة الأداء المستمرة</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
