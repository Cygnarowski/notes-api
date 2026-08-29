import express from "express";

import healthCheck from "../controllers/api/health-controller.js";
const router = new express.Router();

router.get("/health", healthCheck);

export default router;
