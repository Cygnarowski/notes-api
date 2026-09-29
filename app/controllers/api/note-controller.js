import Note from "../../db/models/note.js";
import ApiError from "../../utils/ApiError.js";
import QueryBuilder from "../../utils/QueryBuilder.js";

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
        owner: req.user._id,
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
      const queryBuilder = new QueryBuilder(
        Note.find(),
        req.query,
        req.validated.query,
      );
      queryBuilder.filter();
      queryBuilder.sort();
      queryBuilder.paginate();
      const notes = await queryBuilder.query;
      const totalResults = await Note.countDocuments(queryBuilder.filterQuery);
      const totalPages = Math.ceil(
        totalResults / queryBuilder.validatedQuery.limit,
      );
      return res.status(200).json({
        page: queryBuilder.validatedQuery.page,
        limit: queryBuilder.validatedQuery.limit,
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
