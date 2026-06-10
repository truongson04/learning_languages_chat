import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import { connectDb } from "../config/db.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hello sơn");
});
await connectDb();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  }),
);
routes(app);

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT} `);
});
