import Note from "../../db/models/note.js";

class NoteController {
  showNote = async (req, res) => {
    const id = req.params.id;
    const note = await Note.findOne({ _id: id });
    if (!note) {
      return res.status(404).json({ message: "Not exist" });
    }
    try {
      res.status(200).json({ note });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  createNote = async (req, res) => {
    console.log(req.body);
    const note = new Note({
      id: req.body._id,
      title: req.body.title,
      content: req.body.content,
      tag: req.body.tag,
      status: req.body.status,
      date: req.body.date,
      user: "",
    });
    try {
      await note.save();
      res.status(201).json({ note });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  };

  updateNote = async (req, res) => {
    const id = req.params.id;
    const note = await Note.findOne({ _id: id });
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

    try {
      await note.save();
      res.status(201).json({ note });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  };

  removeNote = async (req, res) => {
    const id = req.params.id;
    const note = await Note.findOne({ _id: id });
    try {
      await Note.deleteOne({ _id: id });
      const notes = await Note.find({});
      res.status(200).json({ notes });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  };

  showNotes = async (req, res) => {
    const notes = await Note.find({});
    if (notes.length === 0) {
      return res.status(404).json({ message: "Not exist" });
    }
    try {
      res.status(200).json({ notes });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  };
}

export default new NoteController();
