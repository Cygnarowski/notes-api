import express from "express";

import healthCheck from "../controllers/api/health-controller.js";
import noteController from "../controllers/api/note-controller.js";
import validate from "../middlewares/validate-middleware.js";
import {
  createNoteSchema,
  noteIdSchema,
  getNotesSchema,
  updateNoteSchema,
} from "../validators/note-validator.js";
import {
  createUserSchema,
  loginUserSchema,
} from "../validators/user-validator.js";
import userController from "../controllers/api/user-controller.js";
import authorizeUser from "../middlewares/authorize-user-middleware.js";

const router = new express.Router();

router.get("/health", healthCheck);
router.get(
  "/notes/:id",
  validate(noteIdSchema),
  authorizeUser,
  noteController.showNote,
);
router.post(
  "/notes",
  validate(createNoteSchema),
  authorizeUser,
  noteController.createNote,
);
router.patch(
  "/notes/:id",
  validate(updateNoteSchema),
  authorizeUser,
  noteController.updateNote,
);
router.delete(
  "/notes/:id",
  validate(noteIdSchema),
  authorizeUser,
  noteController.removeNote,
);
router.get(
  "/notes",
  validate(getNotesSchema),
  authorizeUser,
  noteController.showNotes,
);

router.post("/users", validate(createUserSchema), userController.createUser);
router.post("/login", validate(loginUserSchema), userController.loginUser);

export default router;
