import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/index.ts";
import taskRoutes from "./routes/tasks";
import authRoutes from "./routes/auth";
import householdRoutes from "./routes/households";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/households", householdRoutes);

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});