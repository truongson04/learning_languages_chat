import { genStreamToken } from "../../config/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = await genStreamToken(req.user._id);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
