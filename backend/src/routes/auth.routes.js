import express from "express";
import { login, signin, signup } from "../controllers/auth.controllers.js";
const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.get("/login", login);
authRouter.get("/signin", signin);
export default authRouter;
