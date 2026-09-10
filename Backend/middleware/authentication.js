import { findOrCreateUser } from "../data/users.js";

export async function requireUser(req, res, next) {
  try {
    const session = await req.auth0.client.getSession();

    if (!session) {
      return res.status(401).json({ message: "Login required" });
    }

    const auth0User = await req.auth0.client.getUser();

    req.user = await findOrCreateUser(auth0User);

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed" });
  }
}