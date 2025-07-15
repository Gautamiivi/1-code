import { Request, Response } from "express";
import User from "../models/User.model";
import { registerUser, loginUser } from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  const result = await registerUser(req.body);
  res.status(result.status).json(result.data);
};

export const login = async (req: Request, res: Response) => {
  const result = await loginUser(req.body);
  res.status(result.status).json(result.data);
};
// ✅ Get logged-in user profile
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId; // 👈 From protect middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getMe:", err);
    res.status(500).json({ message: "Server error" });
  }
};