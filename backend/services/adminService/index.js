import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { corsConfig, dbUrl } from "models-pms";
import morgan from "morgan";
import plantationRouter from './routes/plantationRoute.js';
import reportRouter from './routes/reportRoutes.js'
import donationRouter from './routes/donationRoutes.js';
import visualiseReports from './routes/visuliseRoute.js';
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
app.use("/drive", plantationRouter);
app.use('/donations',donationRouter);
app.use('/reports',reportRouter)
app.use('/data' ,visualiseReports)
// Start Server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
