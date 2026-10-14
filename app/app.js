import express from "express";
import apiRouter from "./routes/api.js";
import { errorHandler } from "./middlewares/error-handler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger-config.js";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

export default app;
