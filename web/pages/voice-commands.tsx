import React, { useState } from "react";
import Link from "next/link";

export default function VoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [commands, setCommands] = useState<string[]>([]);

  const startListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const mockCommands = [
        "أنشئ موقع للتجارة الإلكترونية",
        "صنع لعبة ثلاثية الأبعاد",
        "أنشئ بوت تيليجرام ذكي",
      ];
      setCommands([...commands, mockCommands[Math.floor(Math.random() * mockCommands.length)]]);
    }, 2000);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#001a4d", padding: "2rem" }}>
      <header style={{ backgroundColor: "#0033ff", color: "white", padding: "2rem", textAlign: "center", borderRadius: "12px", marginBottom: "2rem" }}>
        <h1>🎙️ Voice Commands</h1>
        <p>أعطِ أوامر صوتية بالعربية واصنع أي شيء</p>
      </header>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <button
          onClick={startListening}
          disabled={isListening}
          style={{
            width: "100%",
            padding: "2rem",
            backgroundColor: isListening ? "#666" : "#0033ff",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: isListening ? "not-allowed" : "pointer",
            marginBottom: "2rem",
            animation: isListening ? "pulse 1s infinite" : "none",
          }}
        >
          {isListening ? "🎤 جاري الاستماع..." : "🎙️ اضغط واتكلم"}
        </button>

        <div style={{ backgroundColor: "#0033ff", borderRadius: "12px", padding: "1.5rem", color: "white" }}>
          <h3 style={{ margin: "0 0 1rem 0" }}>📝 الأوامر المكتشفة:</h3>
          {commands.length === 0 ? (
            <p style={{ opacity: 0.7 }}>لم تعطِ أوامر بعد... اضغط الزر وتكلم!</p>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              {commands.map((cmd, idx) => (
                <div key={idx} style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "1rem", borderRadius: "8px" }}>
                  {idx + 1}. {cmd}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
