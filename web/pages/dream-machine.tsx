import React, { useState } from "react";
import Link from "next/link";

export default function DreamMachine() {
  const [dream, setDream] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const createFromDream = async () => {
    if (!dream) return;
    setIsCreating(true);

    // محاكاة التحويل من فكرة إلى مشروع
    setTimeout(() => {
      setResult({
        title: dream.substring(0, 50),
        description: dream,
        type: detectProjectType(dream),
        tech: suggestTech(dream),
        timeline: "⚡ فوراً",
        cost: "💰 مجاني 100%",
        url: `https://dream-${Date.now()}.vercel.app`,
        status: "🚀 جاهز",
      });
      setIsCreating(false);
    }, 2000);
  };

  const detectProjectType = (text: string): string[] => {
    const types: Record<string, string[]> = {
      "app|تطبيق": ["📱 Mobile App", "💻 Web App"],
      "game|لعبة": ["🎮 Game", "🕹️ Interactive"],
      "site|موقع|website": ["🌐 Website", "📊 Landing Page"],
      "api|backend": ["⚙️ API", "🔌 Backend"],
      "tool|أداة": ["🛠️ Tool", "⚙️ Utility"],
      "bot|بوت": ["🤖 Bot", "🔔 Automation"],
      "ecommerce|متجر": ["🛍️ Shop", "💳 eCommerce"],
      "social|social|شبكة": ["👥 Social", "💬 Community"],
    };

    for (const [key, val] of Object.entries(types)) {
      if (new RegExp(key).test(text.toLowerCase())) return val;
    }
    return ["🎯 Project", "✨ Creation"];
  };

  const suggestTech = (text: string): string[] => {
    const suggestions: Record<string, string[]> = {
      "python|py": ["Python", "FastAPI"],
      "rust": ["Rust", "Actix"],
      "game|لعبة": ["Babylon.js", "Three.js"],
      "real-time|فوري|لايف": ["WebSocket", "Firebase", "Supabase"],
      "database|db|بيانات": ["PostgreSQL", "MongoDB", "Firebase"],
      "mobile|موبايل": ["React Native", "Flutter"],
      "blockchain|crypto": ["Solidity", "Web3.js"],
      "ai|ml|ذكاء": ["TensorFlow", "PyTorch", "Hugging Face"],
    };

    let tech: string[] = ["Next.js", "TypeScript"];
    for (const [key, val] of Object.entries(suggestions)) {
      if (new RegExp(key).test(text.toLowerCase())) {
        tech = [...tech, ...val];
        break;
      }
    }
    return [...new Set(tech)];
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a0033" }}>
      <header style={{ backgroundColor: "#2a0050", color: "#00ff88", padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>✨ Dream Machine</h1>
        <p style={{ opacity: 0.9 }}>حوّل أحلامك وأفكارك إلى مشاريع حقيقية فوراً</p>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem", color: "#00ff88" }}>
          <Link href="/" style={{ color: "#00ff88", textDecoration: "none" }}>← Home</Link>
        </nav>

        <div style={{ backgroundColor: "#2a0050", borderRadius: "12px", padding: "2rem", marginBottom: "2rem", border: "2px solid #00ff88" }}>
          <h2 style={{ color: "#00ff88", marginTop: 0 }}>💭 اكتب حلمك هنا</h2>
          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="مثال: أريد موقع يبيع قهوة مع نظام توصيل ذكي وتقييمات من الزبائن..."
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #00ff88",
              backgroundColor: "#1a0033",
              color: "#00ff88",
              fontSize: "1rem",
              minHeight: "150px",
              fontFamily: "inherit",
              marginBottom: "1rem",
            }}
          />

          <button
            onClick={createFromDream}
            disabled={isCreating || !dream}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: isCreating ? "#444" : "#00ff88",
              color: isCreating ? "#888" : "#1a0033",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: isCreating ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
          >
            {isCreating ? "⏳ تحويل الحلم إلى واقع..." : "🚀 حوّل إلى مشروع"}
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: "#2a0050", borderRadius: "12px", padding: "2rem", border: "2px solid #00ff88" }}>
            <h2 style={{ color: "#00ff88", marginTop: 0 }}>🎉 تم الإنشاء!</h2>

            <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
              <div>
                <strong style={{ color: "#00ff88" }}>المشروع:</strong>
                <div style={{ color: "#fff", marginTop: "0.5rem" }}>{result.title}</div>
              </div>

              <div>
                <strong style={{ color: "#00ff88" }}>النوع:</strong>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  {result.type.map((t: string, i: number) => (
                    <span key={i} style={{ backgroundColor: "#00ff88", color: "#1a0033", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong style={{ color: "#00ff88" }}>التكنولوجيا:</strong>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  {result.tech.map((t: string, i: number) => (
                    <span key={i} style={{ backgroundColor: "#00ff88", color: "#1a0033", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <strong style={{ color: "#00ff88" }}>⏱️ الوقت:</strong>
                  <div style={{ color: "#fff" }}>{result.timeline}</div>
                </div>
                <div>
                  <strong style={{ color: "#00ff88" }}>💰 التكلفة:</strong>
                  <div style={{ color: "#00ff88" }}>{result.cost}</div>
                </div>
              </div>

              <div>
                <strong style={{ color: "#00ff88" }}>🌐 الرابط الحي:</strong>
                <div style={{ color: "#00ff88", wordBreak: "break-all", marginTop: "0.5rem" }}>{result.url}</div>
              </div>

              <div style={{ backgroundColor: "#1a0033", padding: "1rem", borderRadius: "8px", borderLeft: "3px solid #00ff88" }}>
                <strong style={{ color: "#00ff88" }}>✅ الحالة:</strong>
                <div style={{ color: "#fff", marginTop: "0.5rem" }}>{result.status}</div>
              </div>
            </div>

            <button
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#00ff88",
                color: "#1a0033",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              🚀 افتح المشروع الآن
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
