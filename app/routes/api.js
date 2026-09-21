import express from "express";

import healthCheck from "../controllers/api/health-controller.js";
import noteController from "../controllers/api/note-controller.js";
import validate from "../midllewares/validate-middleware.js";
import {
  createNoteSchema,
  noteIdSchema,
  getNotesSchema,
  updateNoteSchema,
} from "../validators/note-validator.js";
import { createUserSchema } from "../validators/user-validator.js";
import userController from "../controllers/api/user-controller.js";

const router = new express.Router();

router.get("/health", healthCheck);
router.get("/notes/:id", validate(noteIdSchema), noteController.showNote);
router.post("/notes", validate(createNoteSchema), noteController.createNote);
router.patch(
  "/notes/:id",
  validate(updateNoteSchema),
  noteController.updateNote,
);
router.delete("/notes/:id", validate(noteIdSchema), noteController.removeNote);
router.get("/notes", validate(getNotesSchema), noteController.showNotes);

router.post("/users", validate(createUserSchema), userController.createUser);

export default router;
