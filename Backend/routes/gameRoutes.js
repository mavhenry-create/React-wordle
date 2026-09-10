import { Router } from "express";
import { startGame, verifyWord } from "../controllers/gameController.js";
import { requireUser } from "../middleware/authentication.js";

const router = Router();

router.post("/start", requireUser, startGame);
router.post("/verify", requireUser, verifyWord);

export default router;
