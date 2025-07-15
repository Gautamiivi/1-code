import express from "express";
import { protect } from "../middlewares/auth.middleware";
import Task from "../models/User.model";

const router = express.Router();

// GET /api/tasks - Get all tasks for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const userTasks = await Task.find({ userId });
    res.json(userTasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/tasks - Add new task for logged-in user
router.post("/", protect, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const { title } = req.body;

    const newTask = new Task({
      title,
      userId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
