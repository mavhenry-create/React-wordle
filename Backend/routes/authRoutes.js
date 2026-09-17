import { Router } from "express";
import { findOrCreateUser, updateUserSettings } from "../data/users.js";
import { getUserStats } from "../data/gameData.js";
import { requireUser } from "../middleware/authentication.js";
const router = Router();

router.get("/profile", async (req, res) => {
  try {
    const session = await req.auth0.client.getSession();

    if (!session) {
      return res.status(401).json({ message: "Login required" });
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
  const { difficulty } = req.body;
  const user = await updateUserSettings(req.user.id, { difficulty });
  return res.json({ user });
})

export default router;
