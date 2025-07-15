import express from "express";
import dotenv from "dotenv-flow";
import cors from "cors";
import connectDB from "./config/database";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task";
import { errorHandler } from "./middlewares/error.middleware";

// ✅ Load .env files
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3300;

// ✅ Fix CORS for multiple origins
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Parse JSON requests
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Connect DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
}).catch((err) => {
  console.error("❌ Failed to connect to DB:", err);
  process.exit(1);
});
