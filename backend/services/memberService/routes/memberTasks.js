import express from "express";
import {Task} from "models-pms";

const router = express.Router();

// Get tasks assigned to a particular user
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ assignedTo: userId })
            .populate({
                path: "donationId",
                populate: {
                    path: "donorId", // Populate the donarId inside donationId
                    select: "name email address phone", // Select specific fields for donar
                },
            })
            .populate("assignedTo", "name email"); // Populating assigned user details

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});


// Update task status
router.post("/:taskId/status", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        if (!["todo", "pending", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task status updated", task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating task status" });
    }
});

export default router;
