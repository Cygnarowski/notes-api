import server from "../config.js";
import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(server.url);
}
