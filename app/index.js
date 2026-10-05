import server from "./config.js";
import app from "./app.js";
import { connectDB } from "./db/mongoose.js";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
await connectDB();
app.listen(server.port, () => {
  console.log(`Server works on port: ${server.port}`);
});
