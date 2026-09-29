import User from "../db/models/user.js";
import verifyToken from "../services/jwt-service.js";
import ApiError from "../utils/ApiError.js";

const authorizeUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ApiError("Unauthorized", 401, "error"));
  }

  const userEmail = verifyToken(token);
  if (!userEmail) {
    return next(new ApiError("Unauthorized", 401, "error"));
  }

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return next(new ApiError("Unauthorized", 401, "error"));
  }

  req.user = user;
  next();
};

export default authorizeUser;
