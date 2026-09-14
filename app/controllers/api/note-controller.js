import Note from "../../db/models/note.js";
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
    const { id, title, content, tag, status, order } = req.query;

    try {
      const filter = {};
      if (id) {
        filter._id = id;
      }
      if (title) {
        const titleSearchField = title;
        const regex = new RegExp(titleSearchField, "i");
        filter.title = regex;
      }
      if (content) {
        const contentSearchField = content;
        const regex = new RegExp(contentSearchField, "i");
        filter.content = regex;
      }
      if (tag) {
        filter.tag = tag;
      }
      if (status) {
        filter.status = status;
      }

      const allowedSortFields = ["date"];
      const sortField = allowedSortFields.includes(req.query.sort)
        ? req.query.sort
        : "date";
      let sortOrder = -1;
      if (order !== "desc") {
        sortOrder = 1;
      }

      const pageNumber = Number(req.query.page);
      const limitNumber = Number(req.query.limit);
      const validPage =
        Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
      const validLimit =
        Number.isInteger(limitNumber) && limitNumber > 0 ? limitNumber : 1;
      const skip = (validPage - 1) * validLimit;
      const notes = await Note.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(validLimit);
      const totalResults = await Note.countDocuments(filter);
      const totalPages = Math.ceil(totalResults / validLimit);

      return res.status(200).json({
        page: validPage,
        limit: validLimit,
        totalResults,
        totalPages,
        notes,
      });
    } catch (err) {
      return next(err);
    }
  };
}

export default new NoteController();
