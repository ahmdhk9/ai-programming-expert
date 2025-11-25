const express = require("express");
const morgan = require("morgan"); // لمتابعة الطلبات
const helmet = require("helmet"); // لأمان الـ headers

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware للأمان واللوج
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// مسار الصحة
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend Agent is healthy 🚀" });
});

// المسار الرئيسي
app.get("/", (req, res) => {
  res.send("🚀 Backend Agent is running!");
});

// Error handler بسيط
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
