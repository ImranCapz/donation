import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
