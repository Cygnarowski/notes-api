import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

export function isValidId(req, res, next) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid note id", 400, "error"));
  }
  return next();
}
