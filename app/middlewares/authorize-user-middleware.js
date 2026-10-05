import User from "../db/models/user.js";
import verifyToken from "../services/jwt-service.js";
import ApiError from "../utils/ApiError.js";

const authorizeUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ");
    if (token === undefined) {
      return next(new ApiError("Unauthorized", 401, "error"));
    }

    if (token[0] !== "Bearer") {
      return next(new ApiError("Unauthorized", 401, "error"));
    }

    if (token.length !== 2) {
      return next(new ApiError("Unauthorized", 401, "error"));
    }

    if (!token[1]) {
      return next(new ApiError("Unauthorized", 401, "error"));
    }

    const userEmail = verifyToken(token[1]);
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return next(new ApiError("Unauthorized", 401, "error"));
    }
    req.user = user;
  } catch (err) {
    return next(err);
  }

  next();
};

export default authorizeUser;
