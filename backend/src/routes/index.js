import authRouter from "./auth.routes.js";
import chatRouter from "./chat.routes.js";
import userRouter from "./user.routes.js";

export default function routes(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/chat", chatRouter);
}
