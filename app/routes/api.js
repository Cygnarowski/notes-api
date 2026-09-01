import express from "express";

import healthCheck from "../controllers/api/health-controller.js";
import noteController from "../controllers/api/note-controller.js";

const router = new express.Router();

router.get("/health", healthCheck);
router.get("/notes/:id", noteController.showNote);
router.post("/notes", noteController.createNote);
router.patch("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.removeNote);
router.get("/notes", noteController.showNotes);

export default router;
