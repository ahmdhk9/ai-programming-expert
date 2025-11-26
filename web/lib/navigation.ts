export const navigation = [
  { href: "/", label: "🏠 Home" },
  { href: "/chat", label: "💬 Chat AI" },
  { href: "/universal", label: "✨ Universal Creator" },
  { href: "/video-creator", label: "🎬 Video Generator" },
  { href: "/resources", label: "📊 Resources Monitor" },
  { href: "/projects", label: "📚 My Projects" },
  { href: "/dashboard", label: "📈 Dashboard" },
];

export const aiCapabilities = {
  codeGeneration: {
    emoji: "💻",
    title: "كتابة الكود",
    models: ["Groq", "Mistral"],
  },
  videoGeneration: {
    emoji: "🎬",
    title: "توليد الفيديوهات",
    models: ["Replicate Flux"],
  },
  imageGeneration: {
    emoji: "🖼️",
    title: "توليد الصور",
    models: ["Replicate"],
  },
  analysis: {
    emoji: "📊",
    title: "تحليل البيانات",
    models: ["Mistral", "OpenAI"],
  },
};
