import { Request, Response } from "express";
import User from "../models/User.model";

// ✅ Already existing
export const register = async (req: Request, res: Response) => {
  // your register logic
};

export const login = async (req: Request, res: Response) => {
  // your login logic
};

// ✅ NEW: Get logged-in user profile
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId; // ⬅️ userId set by protect middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
