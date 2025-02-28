import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import donationRoutes from "./routes/donationRoutes.js";
import { corsConfig, dbUrl } from "models-pms";
import reportRouter from "./routes/reportRoutes.js";
import morgan from "morgan";
import driveRouter from './routes/driveRoute.js'
dotenv.config(); // Load environment variables

const app = express(); // ✅ Fixed this line

(async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

// Middleware (ORDER MATTERS)
app.use(cors(corsConfig));
app.use(express.json()); // ✅ Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // ✅ Parse URL-encoded request bodies
app.use(morgan("dev")); // ✅ Logging middleware

// Routes
app.use("/donations", donationRoutes);
app.use("/reports", reportRouter);
app.use('/drive', driveRouter)
// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
