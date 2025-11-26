import React, { useState } from "react";
import Link from "next/link";

interface CreatedItem {
  id: string;
  type: string;
  title: string;
  description: string;
  status: "creating" | "completed" | "error";
  progress: number;
  url?: string;
  createdAt: string;
}

export default function UniversalCreator() {
  const [items, setItems] = useState<CreatedItem[]>([]);
  const [selectedType, setSelectedType] = useState("website");
  const [prompt, setPrompt] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const creatorTypes = [
    { value: "website", emoji: "🌐", label: "موقع ويب" },
    { value: "app", emoji: "📱", label: "تطبيق موبايل" },
    { value: "dashboard", emoji: "📊", label: "لوحة تحكم" },
    { value: "api", emoji: "⚙️", label: "API" },
    { value: "bot", emoji: "🤖", label: "بوت ذكي" },
    { value: "game", emoji: "🎮", label: "لعبة" },
    { value: "tool", emoji: "🛠️", label: "أداة" },
    { value: "extension", emoji: "🔌", label: "إضافة" },
  ];

  const createItem = async () => {
    if (!prompt) return;
    setIsCreating(true);

    const typeInfo = creatorTypes.find((t) => t.value === selectedType);
    const newItem: CreatedItem = {
      id: Date.now().toString(),
      type: selectedType,
      title: prompt.substring(0, 40),
      description: prompt,
      status: "creating",
      progress: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setItems([newItem, ...items]);

    // محاكاة التقدم
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 300));
      setItems((prev) =>
        prev.map((item) =>
          item.id === newItem.id ? { ...item, progress: i } : item
        )
      );
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === newItem.id
          ? {
              ...item,
              status: "completed",
              progress: 100,
              url: `https://${selectedType}-${newItem.id}.vercel.app`,
            }
          : item
      )
    );

    setPrompt("");
    setIsCreating(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <header style={{ backgroundColor: "#9c27b0", color: "white", padding: "2rem" }}>
        <h1>✨ Universal Creator - منشئ أي شيء</h1>
        <p>اطلب أي شيء وسننشئه لك تلقائياً</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
          <Link href="/">← Home</Link>
          <Link href="/chat">💬 Chat</Link>
          <Link href="/video-creator">🎬 Video Creator</Link>
        </nav>

        {/* Creator */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <h2>🎯 اختر النوع والوصف</h2>

          {/* Type Selection */}
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", marginBottom: "1rem", fontWeight: "bold" }}>نوع المشروع:</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem" }}>
              {creatorTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  style={{
                    padding: "1rem",
                    backgroundColor: selectedType === type.value ? "#9c27b0" : "#f5f5f5",
                    color: selectedType === type.value ? "white" : "black",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{type.emoji}</div>
                  <div>{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="اكتب الوصف بالتفصيل... ماذا تريد بالضبط؟"
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              minHeight: "120px",
              fontFamily: "inherit",
              marginBottom: "1rem",
            }}
          />

          <button
            onClick={createItem}
            disabled={isCreating || !prompt}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: isCreating ? "#ccc" : "#9c27b0",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: isCreating ? "not-allowed" : "pointer",
            }}
          >
            {isCreating ? "⏳ جاري الإنشاء..." : "🚀 أنشئ الآن"}
          </button>
        </div>

        {/* Items List */}
        <h2>📚 منتجاتك</h2>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {items.length === 0 ? (
            <div style={{ backgroundColor: "white", padding: "2rem", textAlign: "center", borderRadius: "12px" }}>
              <p style={{ color: "#999" }}>لم تنشئ أي شيء بعد. ابدأ الآن!</p>
            </div>
          ) : (
            items.map((item) => {
              const typeInfo = creatorTypes.find((t) => t.value === item.type);
              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    borderLeft: `4px solid ${item.status === "completed" ? "#4CAF50" : "#FF9800"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div>
                      <h3 style={{ margin: "0 0 0.5rem 0" }}>
                        {typeInfo?.emoji} {item.title}
                      </h3>
                      <p style={{ color: "#666", margin: "0.5rem 0" }}>{item.description}</p>
                      <div style={{ color: "#999", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                        {typeInfo?.label} • {item.createdAt}
                      </div>
                    </div>
                    {item.status === "completed" && (
                      <button
                        style={{
                          padding: "0.75rem 1.5rem",
                          backgroundColor: "#9c27b0",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        🔗 فتح
                      </button>
                    )}
                  </div>

                  {item.status === "creating" && (
                    <div style={{ marginTop: "1rem", backgroundColor: "#f0f0f0", borderRadius: "4px", overflow: "hidden" }}>
                      <div
                        style={{
                          backgroundColor: "#9c27b0",
                          height: "8px",
                          width: `${item.progress}%`,
                          transition: "width 0.3s",
                        }}
                      />
                      <div style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", color: "#999" }}>
                        {item.progress}% - {item.status === "creating" ? "جاري الإنشاء" : "مكتمل"}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
