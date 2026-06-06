import authRouter from "./auth.routes.js";

export default function routes(app) {
  app.use("/api/auth", authRouter);
}
