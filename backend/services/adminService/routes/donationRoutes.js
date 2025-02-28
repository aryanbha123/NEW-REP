import express from "express";
import { 
  getAllDonations, 
  updateDonationStatus, 
  getDonationById 
} from "../controllers/donationControllers.js";
const router = express.Router();

// Get all  (Admin View)
router.get("/", getAllDonations);
// Get a single donation by ID
router.get("/:id", getDonationById);
// Update  status (approve/reject)
router.put("/:id", updateDonationStatus);

export default router;
