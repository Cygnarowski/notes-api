import Note from "../../db/models/note.js";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError.js";

class NoteController {
  showNote = async (req, res, next) => {
    const id = req.params.id;
    try {
      const note = await Note.findById(id);
      if (!note) {
        return next(new ApiError("The note does not exist.", 404, "error"));
      }
      return res.status(200).json({ note });
    } catch (err) {
      return next(err);
    }
  };

  createNote = async (req, res, next) => {
    console.log(req.body);
    try {
      const note = new Note({
        id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        tag: req.body.tag,
        status: req.body.status,
        date: req.body.date,
        user: "",
      });
      await note.save();
      return res.status(201).json({ note });
    } catch (err) {
      return next(err);
    }
  };

  updateNote = async (req, res, next) => {
    const id = req.params.id;
    try {
      const note = await Note.findById(id);
      if (req.body.title) {
        note.title = req.body.title;
      }
      if (req.body.content) {
        note.content = req.body.content;
      }
      if (req.body.tag) {
        note.tag = req.body.tag;
      }
      if (req.body.status) {
        note.status = req.body.status;
      }
      if (req.body.date) {
        note.date = req.body.date;
      }
      if (req.body.user) {
        note.user = req.body.user;
      }
      await note.save();
      return res.status(201).json({ note });
    } catch (err) {
      return next(err);
    }
  };

  removeNote = async (req, res, next) => {
    const id = req.params.id;
    try {
      const note = await Note.findById(id);
      await Note.deleteOne({ _id: id });
      return res.status(200).json({});
    } catch (err) {
      return next(err);
    }
  };

  showNotes = async (req, res, next) => {
    try {
      const notes = await Note.find({});
      if (notes.length === 0) {
        return next(new ApiError("The notes do not exist.", 404, "error"));
      }
      return res.status(200).json({ notes });
    } catch (err) {
      return next(err);
    }
  };
}

export default new NoteController();
