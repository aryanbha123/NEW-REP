import express from "express";
import {PlantationDrive} from "models-pms";  // Path to your PlantationDrive model

const router = express.Router();

// Route to enroll a user in a plantation drive
router.post("/enroll/:driveId", async (req, res) => {
    try {
        const { driveId } = req.params;
        const {userId} = req.body;

        // Find the plantation drive by ID
        const plantationDrive = await PlantationDrive.findById(driveId);

        if (!plantationDrive) {
            return res.status(404).json({ message: "Plantation drive not found" });
        }

        // Check if the user is already a participant
        if (plantationDrive.participants.includes(userId)) {
            return res.status(400).json({ message: "You are already enrolled in this plantation drive" });
        }

        // Add the user to the participants array
        plantationDrive.participants.push(userId);

        // Save the updated plantation drive
        await plantationDrive.save();

        res.status(200).json({ message: "Successfully enrolled in the plantation drive", plantationDrive });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;
