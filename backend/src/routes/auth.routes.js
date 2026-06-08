import express from "express";
import {
  login,
  logout,
  onboard,
  signup,
} from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/auth.middlewares.js";
const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/onboarding", protect, onboard);
authRouter.get("/me", protect, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});
export default authRouter;
