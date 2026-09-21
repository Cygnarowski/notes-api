import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Field is required"],
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

const User = mongoose.model("Users", userSchema);

export default User;
