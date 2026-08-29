import server from "./config.js";
import app from "./app.js";
import { connectDB } from "./db/mongoose.js";
await connectDB();

app.listen(server.port, () => {
  console.log(`Server works on port: ${server.port}`);
});
