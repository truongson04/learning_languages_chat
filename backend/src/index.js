import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { connectDb } from "../config/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hello sơn");
});
await connectDb();
routes(app);

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT} `);
});
