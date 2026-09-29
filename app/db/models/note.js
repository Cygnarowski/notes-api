import mongoose from "mongoose";
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "Field is required"],
    maxLength: [50, "The maximum number of characters is 50"],
  },
  content: {
    type: String,
    required: [true, "Field is required"],
    maxLength: [200, "The maximum number of characters is 200"],
  },
  tag: {
    type: String,
  },
  status: {
    type: Boolean,
    required: [true, "Field is required"],
  },
  date: {
    type: String,
    required: [true, "Field is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Note = mongoose.model("Notes", noteSchema);

export default Note;
