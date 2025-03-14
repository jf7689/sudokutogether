import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import puzzlesRouter from "./routes/puzzles.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET"],
  })
);

app.use(express.json());

app.use("/api", puzzlesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
