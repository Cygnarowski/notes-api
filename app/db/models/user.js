import mongoose from "mongoose";
import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError.js";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Field is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Field is required"],
    minLength: [8, "The minimum number of characters is 8"],
    maxLength: [50, "The maximum number of characters is 50"],
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
});

userSchema.post("save", function (error, _doc, next) {
  if (error.code === 11000) {
    return next(new ApiError("Unable to complete registration.", 409, "error"));
  }
  next(error);
});

const User = mongoose.model("Users", userSchema);

export default User;
