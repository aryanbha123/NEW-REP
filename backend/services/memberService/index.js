import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import morgan from "morgan";
import taskMembers from './routes/memberTasks.js';
import { dbUrl } from "models-pms";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev")); // Logging middleware should be before routes

// Connect to MongoDB
mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/tasks", taskRoutes);
app.use("/" , taskMembers);
// Start Server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
