import express from "express";
import cors from "cors";
import env from "./config/env.js";
import puzzlesRouter from "./routes/puzzles.js";

const app = express();
const port = env.port || 3000;

app.use(
  cors({
    origin: [env.origin],
    methods: ["GET"],
  })
);

app.use(express.json());

app.use("/api", puzzlesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
