import express from "express";
import cors from "cors";
import { corsConfig, dbUrl } from "models-pms";
import { LoginController } from "./controllers/login.js";
import { signUpController } from "./controllers/signUp.js";
import foregtPassRoutes from './foregetPass.js';
import { getProfile, isAuthenticatedMiddleware } from "./controllers/getProfile.js";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();
const PORT = 5002;


(async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
})() // IIVF

// app.use(cors(corsConfig));
app.use(express.json());
app.use(morgan("dev"));

app.use('/login', LoginController);
app.post('/signup', signUpController);
app.get('/profile', isAuthenticatedMiddleware, getProfile)
app.use('/f' , foregtPassRoutes)
// Start Auth Service
app.listen(PORT, () => console.log(`✅ Auth Service running on port ${PORT}`))
