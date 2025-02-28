import {PlantationDrive} from "models-pms";

// CREATE a new Plantation Drive
export const createPlantationDrive = async (req, res) => {
  try {
    const { title, location, date, description, createdBy } = req.body;

    if (!title || !location || !date || !createdBy) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newDrive = new PlantationDrive({ title, location, date, description, createdBy });
    await newDrive.save();

    res.status(201).json({ message: "Drive created successfully!", drive: newDrive });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all Plantation Drives
export const getAllPlantationDrives = async (req, res) => {
  try {
    const drives = await PlantationDrive.find().populate("createdBy participants");
    res.json(drives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single Plantation Drive by ID
export const getPlantationDriveById = async (req, res) => {
  try {
    const drive = await PlantationDrive.findById(req.params.id).populate("createdBy participants");
    if (!drive) return res.status(404).json({ message: "Drive not found" });
    res.json(drive);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a Plantation Drive
export const updatePlantationDrive = async (req, res) => {
  try {
    const updatedDrive = await PlantationDrive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDrive) return res.status(404).json({ message: "Drive not found" });
    res.json({ message: "Drive updated successfully!", drive: updatedDrive });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a Plantation Drive
export const deletePlantationDrive = async (req, res) => {
  try {
    const deletedDrive = await PlantationDrive.findByIdAndDelete(req.params.id);
    if (!deletedDrive) return res.status(404).json({ message: "Drive not found" });
    res.json({ message: "Drive deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
