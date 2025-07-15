import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  userId: mongoose.Types.ObjectId; // 🔥 Linked to User
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
