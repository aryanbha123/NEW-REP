import express from "express";
import {upload} from 'models-pms'
import {
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus,
  deleteReport
} from "../controllers/reportController.js";

const router = express.Router();

router.post("/",upload.array('supportingImages') ,createReport);         
router.get("/", getAllReports);             // Get all reports
router.get("/:id", getReportById);          // Get report by ID
router.patch("/:id/status", updateReportStatus); // Update report status
router.delete("/:id", deleteReport);        // Delete a report

export default router;
