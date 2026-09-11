import express from "express";

import healthCheck from "../controllers/api/health-controller.js";
import noteController from "../controllers/api/note-controller.js";
import { isValidId } from "../midllewares/is-valid-id-middleware.js";

const router = new express.Router();

router.get("/health", healthCheck);
router.get("/notes/:id", isValidId, noteController.showNote);
router.post("/notes", noteController.createNote);
router.patch("/notes/:id", isValidId, noteController.updateNote);
router.delete("/notes/:id", isValidId, noteController.removeNote);
router.get("/notes", noteController.showNotes);

export default router;
