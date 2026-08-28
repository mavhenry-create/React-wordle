import {
  authenticate,
  createMatch,
  verifyMatch,
  deleteMatch,
} from "../services/gameService.js";

export async function startGame(req, res) {
    const { context } = await authenticate();
    const match = await createMatch({ wordSize: 5});
    saveContextForUser(req.user.id, context);
    const { correctWord, ...safe } = match;
    res.json(safe);
}


export async function verifyWord(req, res) {
    const token = getContextForUser(req.user.id);
    const { word } = req.body;
    const result = await verifyMatch(word, token);
    saveContextForUser(req.user.id, result.context);
    const gameOver = result.guessList.at(-1)?.guessStates?.step !== "Started";
    const { correctWord, context, ...rest } = result;
    res.json({ ...rest, gameOver, ...(gameOver ? { correctWord } : {}) });
}