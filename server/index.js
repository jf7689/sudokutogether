import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        origin: [process.env.ORIGIN],
        methods: ["GET"]
    })
);

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})