import { upsertStreamUser } from "../../config/stream.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import cloudinary from "../../config/cloudinary.js";


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
    await upsertStreamUser({
      id: newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.profilePic || "",
    });
    console.log(`Stream user created for ${newUser._id}`);
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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Some fields is missing !" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password !" });
    }
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid password!" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({ message: "Logout successfully" });
};
export const onboard = async (req, res) => {
  try {
    const userId = req.user._id;
    let { fullName, bio, nativeLanguage, learningLanguage, location, profilePic } =
      req.body;
    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    if (profilePic && profilePic.startsWith("data:image/")) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
          folder: "learning_languages_avatars",
        });
        profilePic = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Error uploading image to Cloudinary" });
      }
    }

    const updateData = {
      fullName,
      bio,
      nativeLanguage,
      learningLanguage,
      location,
      isOnboarded: true,
    };

    if (profilePic !== undefined) {
      updateData.profilePic = profilePic;
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true },
    );
    if (!updated) {
      return res.status(401).json({ message: "User not found" });
    }
    await upsertStreamUser({
      id: updated._id.toString(),
      name: updated.fullName,
      image: updated.profilePic || "",
    });
    console.log(`Stream user updated for ${updated._id}`);
    return res.status(200).json({ success: true, user: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
