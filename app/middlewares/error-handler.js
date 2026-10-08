import ApiError from "../utils/ApiError.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "Invalid note id",
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
