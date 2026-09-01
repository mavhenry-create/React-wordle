import { Router } from "express";
import { body, validationResult } from "express-validator";
import { addTokenToBlacklist } from "../data/tokenblacklist.js";
import { generateToken, verifyToken, hashToken } from "../utils/jwt.js";
import { authenticate } from "../middleware/authentication.js";
import bcrypt from "bcryptjs";
import { getUserByUsername, createUser } from "../data/users.js";

const router = Router();

router.post(
  "/register",
  [
    body("username")
      .trim()
      .notEmpty()
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters long."),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email address.")
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateToken({ id: newUser.id, username: newUser.username });
    return res.status(201).json({ token });
  },
);

router.post(
  "/login",
  [
    body("username").trim().notEmpty().withMessage("Username is required."),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
      const user = await getUserByUsername(username);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const token = generateToken({ id: user.id, username: user.username });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  },
);

router.get("/profile", authenticate, async (req, res) => {
  return res.status(200).json({ message: "User profile data", user: req.user });
});

router.post("/logout", authenticate, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const hashedToken = hashToken(token);
    const expireAt = new Date(req.user.exp * 1000);

    await addTokenToBlacklist(hashedToken, expireAt);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
