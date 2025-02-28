import express from "express";
import { 
  getAllReports, 
  getReportById, 
  updateReportStatus, 
  deleteReport, 
  takeAdminAction 
} from "../controllers/reportControllers.js";

const router = express.Router();

// Get all reports
router.get("/", getAllReports);

// Get a single report by ID
router.get("/:id", getReportById);

// Update report status
router.put("/:id/status", updateReportStatus);

// Take action on a report
router.put("/:id/action", takeAdminAction);

// Delete a report
router.delete("/:id", deleteReport);

export default router;
