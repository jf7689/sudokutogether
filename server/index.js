import express from "express";
import { createServer } from "http";
import cors from "cors";
import env from "./config/env.js";
import puzzlesRouter from "./routes/puzzles.js";
import lobbiesRouter from "./routes/lobbies.js";
import setupSocket from "./socket/index.js";

// Express app
const app = express();
const server = createServer(app);
const port = env.port || 3000;

setupSocket(server);

app.use(
  cors({
    origin: [env.origin, "http://localhost:5174"],
    methods: ["GET"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", puzzlesRouter);
app.use("/api", lobbiesRouter);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
