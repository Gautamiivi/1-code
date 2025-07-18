import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "addTask" | "inProgress" | "pending" | "qa" | "done";
  timeSpent: number; // in seconds
  user: mongoose.Types.ObjectId; // Reference to User
}

const TaskSchema = new Schema({
  ticketNo: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ["addTask", "inProgress", "pending", "qa", "done"], default: "addTask" },
  timeSpent: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 👈 THIS
}, { timestamps: true });

export default mongoose.model<ITask>("Task", TaskSchema);
