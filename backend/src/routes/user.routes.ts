import { Router } from "express";
import { updateMeetingTime } from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.put("/meeting-state", protect, updateMeetingTime);

export default router;