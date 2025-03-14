import { Router } from "express";
import puzzleCtrl from "../controllers/puzzles.js";

const router = Router();

router.get("/puzzles", puzzleCtrl.getPuzzle);

export default router;
