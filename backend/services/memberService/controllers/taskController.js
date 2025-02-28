import {Task} from "models-pms";
import {User} from 'models-pms';
// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo").populate("donationId");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignedTo").populate("donationId");
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { assignedTo, donationId, status } = req.body;
    const newTask = new Task({ assignedTo, donationId, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getMembersWithTaskCount = async (req, res) => {
  try {
    console.log("W1");
    const members = await User.aggregate([
      {
        $match: { role: "member" }, // Filter users with role 'member'
      },
      {
        $lookup: {
          from: "tasks", // Matches the 'Task' collection
          localField: "_id",
          foreignField: "assignedTo",
          as: "tasks",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1, // Assuming the User model has a 'name' field
          email: 1, // Assuming the User model has an 'email' field
          taskCount: {
            todo: {
              $size: {
                $filter: {
                  input: "$tasks",
                  as: "task",
                  cond: { $eq: ["$$task.status", "todo"] },
                },
              },
            },
            pending: {
              $size: {
                $filter: {
                  input: "$tasks",
                  as: "task",
                  cond: { $eq: ["$$task.status", "pending"] },
                },
              },
            },
            completed: {
              $size: {
                $filter: {
                  input: "$tasks",
                  as: "task",
                  cond: { $eq: ["$$task.status", "completed"] },
                },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(members);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
