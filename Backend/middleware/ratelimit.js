import rateLimit from "express-rate-limit";

export const gameLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests, please try again later."
    }
});

export const verifyLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 32,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests, please try again later."
    }
});

export default { gameLimit, verifyLimit };