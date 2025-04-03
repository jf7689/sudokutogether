import { Router } from "express";
import lobbyCtrl from "../controllers/lobbies.js";

const router = Router();

router.get("/lobbies", lobbyCtrl.getLobby);
router.post("/lobbies", lobbyCtrl.createLobby);

export default router;
