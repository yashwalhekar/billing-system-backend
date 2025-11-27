import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/menu", menuRoutes);

app.get("/", (req, res) =>
  res.send("Restaurant Billing Backend is Running 🚀")
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
