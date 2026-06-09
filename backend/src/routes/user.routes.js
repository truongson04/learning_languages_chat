import express from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import {
  acceptFriendRequest,
  getFriends,
  getRecommended,
  sendFriendRequest,
  getFriendRequest,
  getSentFriendRequest,
} from "../controllers/user.controllers.js";
const userRouter = express.Router();
// apply middleware
userRouter.use(protect);
userRouter.get("/", getRecommended);
userRouter.get("/friends", getFriends);
userRouter.post("/friend-request/:id", sendFriendRequest);
userRouter.put("/friend-request/accept/:id", acceptFriendRequest);
userRouter.get("/friend-request", getFriendRequest);
userRouter.get("/sent-request", getSentFriendRequest);
export default userRouter;
