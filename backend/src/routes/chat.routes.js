import express from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { getStreamToken } from "../controllers/chat.controllers.js";
const chatRouter = express.Router();
chatRouter.get("/stream-token", protect, getStreamToken);
export default chatRouter;
