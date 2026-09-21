import User from "../../db/models/user.js";
import ApiError from "../../utils/ApiError.js";

class UserController {
  async createUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const existUser = await User.findOne({ email });
      if (existUser) {
        return next(new ApiError("The user already exists.", 409, "error"));
      }
      const user = new User({
        email,
        password,
      });
      await user.save();
      return res.status(201).json({
        user: user.email,
        message: "The user has been created.",
        status: "success",
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default new UserController();
