import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getMembersWithTaskCount,
} from "../controllers/taskController.js";

// express 
const router = express.Router();

router.get("/", getTasks);
router.get("/count", getMembersWithTaskCount);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
