import Note from "../../db/models/note.js";

class NoteController {
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
      res.status(422).json({ errors: error });
    }
  };
}

export default new NoteController();
