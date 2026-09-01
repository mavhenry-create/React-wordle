import { Router } from "express";
import { startGame, verifyWord } from "../controllers/gameController.js";
import { optionalAuthenticate } from "../middleware/authentication.js";

const router = Router();

router.post("/start", optionalAuthenticate, startGame);
router.post("/verify", optionalAuthenticate, verifyWord);

export default router;
