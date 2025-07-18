import { Request, Response } from "express";
import User from "../models/User.model";

export const updateMeetingTime = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const { isMeeting, meetingStartTime } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    await User.findByIdAndUpdate(userId, { isMeeting, meetingStartTime });

    res.status(200).json({ message: "Meeting state updated successfully" });
  } catch (err) {
    console.error("❌ Error in updateMeetingTime:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
