import { Router } from "express";
import { startGame, verifyWord } from "../controllers/gameController.js";
import { requireUser } from "../middleware/authentication.js";
import { identifyPlayer } from "../middleware/identifyPlayer.js";
const router = Router();

router.post("/start", identifyPlayer, startGame);
router.post("/verify", identifyPlayer, verifyWord);

export default router;
