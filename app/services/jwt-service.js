import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.email;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError("Token expired", 401, "error");
    }
    if (err.name === "JsonWebTokenError") {
      throw new ApiError("Unauthorized", 401, "error");
    }
    throw new ApiError("Unauthorized", 401, "error");
  }
};

export default verifyToken;
