import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import studentRoutes from "./routes/studentRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
// for advance we can use compressor, helmet and request limiter
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", studentRoutes);
app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
