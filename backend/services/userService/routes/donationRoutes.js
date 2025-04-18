import express from "express";
import { createDonation, getAllDonations, getDonationById, updateDonationStatus, createStripePaymentIntent, handleStripeWebhook } from "../controllers/donationController.js";
import {} from 'models-pms'
const router = express.Router();

router.post("/",createDonation);
router.get("/", getAllDonations);
router.get("/:id", getDonationById);
router.put("/:id/status", updateDonationStatus);
router.post("/create-payment-intent", createStripePaymentIntent);
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;
