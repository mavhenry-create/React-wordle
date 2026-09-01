import crypto from "crypto";
import { verifyToken, hashToken } from "../utils/jwt.js";
import { isTokenBlacklisted } from "../data/tokenblacklist.js";

export async function optionalAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      const hashedToken = hashToken(token);
      const blacklisted = await isTokenBlacklisted(hashedToken);
      if (!blacklisted) {
        req.user = decoded;
        return next();
      }
    }
  }

  let guestId = req.headers["x-guest-id"];
  if (!guestId) {
    guestId = `guest_${crypto.randomUUID()}`;
    res.setHeader("x-guest-id", guestId);
  }
  req.user = { id: guestId, guest: true };
  next();
}

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const hashedToken = hashToken(token);
  const blacklisted = await isTokenBlacklisted(hashedToken);
  if (blacklisted) {
    return res.status(401).json({ message: "Token is revoked" });
  }

  req.user = decoded;
  next();
}
