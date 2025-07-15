import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model";

export const registerUser = async ({ email, password }: { email: string; password: string; }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: 400, data: { message: "User already exists" } };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  return { status: 201, data: { message: "User registered successfully" } };
};

export const loginUser = async ({ email, password }: { email: string; password: string; }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { status: 400, data: { message: "Invalid credentials" } };
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return { status: 200, data: { token } };
};
export const getAllUsers = async () => {
  return await User.find({});
};

export const createUser = async (data: { name: string, email: string, password: string }) => {
  const user = new User(data);
  return await user.save();
};