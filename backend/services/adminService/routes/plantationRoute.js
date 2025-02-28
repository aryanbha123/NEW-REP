import express from "express";
import {
  createPlantationDrive,
  getAllPlantationDrives,
  getPlantationDriveById,
  updatePlantationDrive,
  deletePlantationDrive
} from "../controllers/plantaionController.js";

const router = express.Router();

router.post("/", createPlantationDrive); // Create a new Plantation Drive
router.get("/", getAllPlantationDrives); // Get all Plantation Drives
router.get("/:id", getPlantationDriveById); // Get a Plantation Drive by ID
router.put("/:id", updatePlantationDrive); // Update a Plantation Drive
router.delete("/:id", deletePlantationDrive); // Delete a Plantation Drive

export default router;
