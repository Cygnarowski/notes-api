import { env } from "./config.js";
import app from "./app.js";
import { connectDB } from "./db/mongoose.js";

await connectDB();
app.listen(env.PORT, () => {
  console.log(`Server works on port: ${env.PORT}`);
});
