import crypto from "node:crypto";
import { findOrCreateUser } from "../data/users.js";

export async function identifyPlayer(req, res, next) {
    const session = await req.auth0.client.getSession();

    if (session) {
        const auth0User = await req.auth0.client.getUser();
        req.playerId = (await findOrCreateUser(auth0User)).id;
        req.isGuest = false;
        return next();
    }

    let guestId = req.cookies.guestId;

    if (!guestId) {
        guestId = crypto.randomUUID();
        res.cookie("guestId", guestId, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
    }
    req.playerId = guestId;
    req.isGuest = true;
    return next();
}