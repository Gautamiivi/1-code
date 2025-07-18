import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan"; // ✅ Correct import for morgan
import { errorHandler } from "./middlewares/error.middleware";

// ✅ Create Express App
const app: Application = express();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ HTTP request logger
app.use(morgan("dev")); // 👈 Logs requests like: GET /api/auth/login 200 45ms

// ✅ Proper CORS Setup
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [
  "http://localhost:5173",
  "http://localhost:3000",
];

console.log("✅ Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests with no origin (like Postman)
        callback(null, true);
      } else {
        console.error("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Routes
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    environment: process.env.NODE_ENV,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// ✅ Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Error middleware
app.use(errorHandler);

export default app;
