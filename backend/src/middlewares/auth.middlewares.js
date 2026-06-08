import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "You are not allowed" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(401)
        .json({ message: "You are not allowed- Invalid token" });
    }
    const user = await User.findOne({ _id: decode.userId }).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized- User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
