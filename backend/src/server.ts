import dotenv from "dotenv-flow";
import connectDB from "./config/database";
import app from "./app"; // ✅ Import your Express app

// ✅ Load .env (supports .env, .env.dev, .env.prod etc.)
dotenv.config();

const PORT = process.env.PORT || 3300;

// ✅ Connect DB and Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌱 Environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
