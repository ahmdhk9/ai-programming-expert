const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend Agent is healthy 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Root Endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Backend Agent is running!",
    features: [
      "Code Generation",
      "Bug Fixing",
      "Architecture Design",
      "Testing Automation",
      "Smart Deployment",
      "Performance Monitoring",
      "Security Audits",
    ],
  });
});

// AI Agent Chat API
app.post("/api/agent", (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  // استجابة ذكية مؤقتة
  const response = generateSmartResponse(message, history);

  res.json({
    response,
    timestamp: new Date().toISOString(),
  });
});

// API Routes Info
app.get("/api/routes", (req, res) => {
  res.json({
    routes: [
      { method: "GET", path: "/health", description: "Health check" },
      { method: "GET", path: "/", description: "Server info" },
      { method: "POST", path: "/api/agent", description: "AI agent chat" },
      { method: "GET", path: "/api/routes", description: "This list" },
    ],
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on 0.0.0.0:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
  console.log(`📚 API Routes: http://localhost:${PORT}/api/routes`);
});

// Smart Response Generator
function generateSmartResponse(message, history) {
  const msg = message.toLowerCase();

  const responses = {
    code: "📝 **كتابة الكود الذكي**\n\nأستطيع كتابة:\n• React/Vue Components\n• API Endpoints\n• Database Queries\n• Tests\n\nما نوع الكود الذي تريده؟",
    bug: "🐛 **تصحيح الأخطاء**\n\nأحلل:\n• رسائل الخطأ\n• Stack Traces\n• Logic Errors\n\nأرسل لي الخطأ!",
    deploy: "🚀 **النشر الذكي**\n\nأتولى:\n• CI/CD Setup\n• Environment Config\n• Monitoring\n\nمتى تريد النشر؟",
    test: "🧪 **الاختبار التلقائي**\n\nأكتب:\n• Unit Tests\n• Integration Tests\n• E2E Tests\n\nأي نوع؟",
    performance: "📊 **تحسين الأداء**\n\nأحلل:\n• Bottlenecks\n• Query Optimization\n• Memory Usage\n\nأرسل الكود!",
    help: "👋 **أهلاً!**\n\nأنا الخبير البرمجي الذكي. يمكنك:\n📝 طلب كود\n🐛 إصلاح الأخطاء\n🏗️ تصميم\n🧪 اختبار\n🚀 نشر\n📊 تحسين\n🔒 أمان",
  };

  if (msg.includes("كود") || msg.includes("code") || msg.includes("function")) return responses.code;
  if (msg.includes("خطأ") || msg.includes("bug") || msg.includes("error")) return responses.bug;
  if (msg.includes("نشر") || msg.includes("deploy")) return responses.deploy;
  if (msg.includes("اختبار") || msg.includes("test")) return responses.test;
  if (msg.includes("أداء") || msg.includes("performance")) return responses.performance;
  if (msg.includes("مساعدة") || msg.includes("help")) return responses.help;

  return "✨ كيف يمكنني مساعدتك؟ 💡\n\nطلب:\n📝 كود\n🐛 إصلاح\n🏗️ تصميم\n🧪 اختبار\n🚀 نشر\n📊 أداء";
}

module.exports = app;
