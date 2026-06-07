import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { password, email, fullName } = req.body;
    if (!password || !email || !fullName) {
      return res.status(400).json({ message: "Some fields is missing !" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password need to have 6 letters " });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ message: "Email already exits, please use a different one" });
    }
    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: "https://i.redd.it/wqjevesqvnf91.jpg",
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login = (req, res) => {
  res.send("log-in");
};
export const signin = (req, res) => {
  res.send("sign-in");
};
