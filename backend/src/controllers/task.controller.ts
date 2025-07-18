import { Request, Response, NextFunction } from "express";
import Task from "../models/task.model";

// ✅ Create a new task
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("📦 Incoming Task Payload:", req.body);
    const { ticketNo, title, status, timeSpent } = req.body;

    // ✅ Attach the logged-in user (from req.user set by auth middleware)
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const newTask = await Task.create({
      ticketNo,
      title,
      status,
      timeSpent,
      user: userId, // 👈 Link the task to user
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error("❌ Error in createTask:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get all tasks for logged-in user
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const { date } = req.query;
    let tasks;

    if (date) {
      const selectedDate = new Date(date as string);
      const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
      tasks = await Task.find({
        user: userId,
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      });
    } else {
      tasks = await Task.find({ user: userId });
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.error("❌ Error in getTasks:", err);
    next(err);
  }
};

// ✅ Update a task
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, timeSpent } = req.body;

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: userId }, // 👈 Ensure user owns the task
      { status, timeSpent },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("❌ Error in updateTask:", err);
    next(err);
  }
};

// ✅ Delete a task
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    const deletedTask = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};
