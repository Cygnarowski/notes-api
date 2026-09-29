import bcrypt from "bcrypt";
import User from "../db/models/user.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const checkUser = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError("Invalid email or password", 401, "error");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isPasswordCorrect) {
    throw new ApiError("Invalid email or password", 401, "error");
  }

  const token = jwt.sign(
    { email: existingUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  return {
    status: "success",
    token,
  };
};

export default checkUser;
