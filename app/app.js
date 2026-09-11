import express from "express";
import apiRouter from "./routes/api.js";
import { errorHandler } from "./midllewares/error-handler.js";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
