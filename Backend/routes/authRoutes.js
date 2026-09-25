import { Router } from "express";
import { body } from "express-validator";
import { findOrCreateUser, updateUserSettings, changeOrUpdateUserName, deleteUser } from "../data/users.js";
import { getUserStats } from "../data/gameData.js";
import { requireUser } from "../middleware/authentication.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/profile", async (req, res) => {
  try {
    const session = await req.auth0.client.getSession();

    if (!session) {
      return res.json({ user: null, isGuest: true });
    }

    const auth0User = await req.auth0.client.getUser();

    const user = await findOrCreateUser(auth0User);
    const stats = await getUserStats(user.id);
    return res.json({ user, stats });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.patch("/settings", requireUser, async (req, res) => {
  const { difficulty, wordLength } = req.body;
  const user = await updateUserSettings(req.user.id, { difficulty, wordLength });
  return res.json({ user });
});

router.patch("/username", requireUser, validate([
  body("newUserName").trim()
  .isLength({ min: 3 })
  .withMessage("Username must be at least 3 characters long")
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage("Username can only contain letters, numbers, and underscores")
]), async (req, res) => {
  const { newUserName } = req.body;
  const user = await changeOrUpdateUserName(req.user.id, newUserName);
  return res.json({ user });
});

router.delete("/account", requireUser, async (req, res) => {
  await deleteUser(req.user.id);
  return res.json({success: true});
});

export default router;
