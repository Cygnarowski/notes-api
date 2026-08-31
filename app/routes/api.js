import express from "express";

import healthCheck from "../controllers/api/health-controller.js";
import noteController from "../controllers/api/note-controller.js";

const router = new express.Router();

router.get("/health", healthCheck);
router.post("/add", noteController.createNote);

export default router;
