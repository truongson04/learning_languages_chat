import express from "express";
import { protect } from "../middlewares/auth.middlewares.js";
const chatRouter = express.Router();
chatRouter.get("/stream-token", protect, get);
export default chatRouter;
