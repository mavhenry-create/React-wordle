import { Router } from "express";
import { startGame, verifyWord } from "../controllers/gameController.js";
import { identifyPlayer } from "../middleware/identifyPlayer.js";
import { gameLimit, verifyLimit } from "../middleware/ratelimit.js";
const router = Router();

router.post("/start", identifyPlayer, gameLimit, startGame);
router.post("/verify", identifyPlayer, verifyLimit, verifyWord);

export default router;
