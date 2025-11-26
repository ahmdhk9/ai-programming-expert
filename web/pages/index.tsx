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
        <div style={{ marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>
          👨‍💻 أحمد البصراوي - Dark Ahmed
        </div>
        <h1 style={{ fontSize: "3.5rem", margin: "0 0 1rem 0", fontWeight: "bold" }}>
          🤖 AI Programming Expert
        </h1>
        <p style={{ fontSize: "1.3rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
          نظام ذكي يبني مشاريع متكاملة تلقائياً - من تطوير أحمد البصراوي العويني التميمي
        </p>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: "700px", margin: "0 auto 2rem" }}>
          اطلب، واحصل على موقع/تطبيق جاهز مع روابط حية ولوحة تحكم
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
            ⚡ ابدأ الآن
          </Link>
          <Link href="/50-features" style={{
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
            🔥 50 ميزة متقدمة
          </Link>
        </div>

        {/* Quick Stats */}
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>2+</div>
            <div style={{ opacity: 0.9 }}>Active Projects</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>100%</div>
            <div style={{ opacity: 0.9 }}>Automated</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>∞</div>
            <div style={{ opacity: 0.9 }}>Possibilities</div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
        <h2 style={{ textAlign: "center", color: "white", fontSize: "2.5rem", marginBottom: "3rem" }}>
          🚀 كيف يعمل؟
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {[
            { num: "1️⃣", title: "اطلب", desc: "قل للخبير ما تريد بالضبط" },
            { num: "2️⃣", title: "ننشئ", desc: "نبني الموقع/التطبيق كاملاً" },
            { num: "3️⃣", title: "نشر", desc: "ننشر على خوادم مجانية" },
            { num: "4️⃣", title: "ربط", desc: "نعطيك الروابط والمفاتيح" },
            { num: "5️⃣", title: "تطور", desc: "تطلب أي تعديل ونعمل عليه" },
            { num: "6️⃣", title: "نهائي", desc: "موقع جاهز + لوحة تحكم" },
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.num}</div>
              <h3 style={{ margin: "0.5rem 0", color: "#333" }}>{item.title}</h3>
              <p style={{ color: "#666", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <h2 style={{ textAlign: "center", color: "white", fontSize: "2.5rem", marginBottom: "2rem" }}>
          ✨ المميزات
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {[
            { emoji: "📐", title: "فهم عميق", desc: "نفهم مشروعك بالكامل" },
            { emoji: "💻", title: "كود احترافي", desc: "كود منظم وآمن وسريع" },
            { emoji: "🚀", title: "نشر تلقائي", desc: "نشر على أفضل الخوادم" },
            { emoji: "📊", title: "لوحة تحكم", desc: "مراقب كل شيء من مكان واحد" },
            { emoji: "🔧", title: "تطوير مستمر", desc: "تعديلات وتحسينات بسهولة" },
            { emoji: "🔒", title: "أمان عالي", desc: "حماية شاملة لبياناتك" },
          ].map((feature, idx) => (
            <div key={idx} style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.emoji}</div>
              <h3 style={{ margin: "0.5rem 0", color: "#333" }}>{feature.title}</h3>
              <p style={{ color: "#666", margin: 0 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "3rem 2rem", marginTop: "2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", color: "white", fontSize: "2rem", marginBottom: "2rem" }}>
            📝 أمثلة على الطلبات
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              "أنشئ لي موقع مراقبة سوق الفوركس",
              "أنشئ متجر إلكتروني للملابس",
              "أنشئ لوحة تحكم للإحصائيات",
              "أنشئ تطبيق إدارة المشاريع",
            ].map((example, idx) => (
              <div key={idx} style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "1.5rem",
                borderRadius: "8px",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)"
              }}>
                <div style={{ fontSize: "1.2rem" }}>{example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <footer style={{ backgroundColor: "rgba(0,0,0,0.2)", padding: "3rem 2rem", color: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h3 style={{ textAlign: "center", marginTop: 0, marginBottom: "2rem" }}>🎯 جميع الأدوات المتاحة</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1rem",
            textAlign: "center",
            marginBottom: "2rem"
          }}>
            <Link href="/chat" style={{ color: "white", textDecoration: "none", padding: "1rem", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>💬 Chat</Link>
            <Link href="/contact-developer" style={{ color: "white", textDecoration: "none", padding: "1rem", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>📧 Contact</Link>
            <Link href="/roadmap" style={{ color: "white", textDecoration: "none", padding: "1rem", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>🛣️ Roadmap</Link>
            <Link href="/dream-machine" style={{ color: "white", textDecoration: "none", padding: "1rem", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>✨ Dream</Link>
            <Link href="/standalone-download" style={{ color: "white", textDecoration: "none", padding: "1rem", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>📥 Download</Link>
            <Link href="/hybrid-mode" style={{ color: "white", textDecoration: "none", padding: "1rem", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>🔄 Hybrid</Link>
            <Link href="/marketplace" style={{ color: "white", textDecoration: "none", padding: "1rem", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>🏪 Store</Link>
            <Link href="/50-features" style={{ color: "white", textDecoration: "none", padding: "1rem", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>🔥 Features</Link>
          </div>
          <div style={{ textAlign: "center", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
            <p style={{ opacity: 0.8 }}>🚀 AI Programming Expert 2025 - من تطوير أحمد البصراوي 👨‍💻</p>
            <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>📧 ahmdalbsrawe@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Quick links to auth pages will be added via nav
