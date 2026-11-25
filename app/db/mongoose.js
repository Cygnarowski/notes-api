import { env } from "../config.js";
import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(env.MONGODB_URI);
}
