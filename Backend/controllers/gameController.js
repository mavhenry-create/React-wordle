import { getRandomWord, isValidWord } from "../services/gameService.js";
import { scoreGuess } from "../utils/wordScoring.js";
import { saveContextForUser, getContextForUser } from "../data/matchContext.js";

const WORD_LENGTH = 5;
const MAX_TURNS = 6;

export async function startGame(req, res) {
  const word = await getRandomWord(WORD_LENGTH);
  saveContextForUser(req.user.id, {
    solution: word.toUpperCase(),
    guesses: [],
  });
  res.json({ wordLength: WORD_LENGTH, maxTurns: MAX_TURNS});
}

export async function verifyWord(req, res) {
  const state = getContextForUser(req.user.id);
  if (!state) {
    return res
      .status(400)
      .json({ error: "No active game. Start a new game first." });
  }

  const { word } = req.body;
  if (!word || word.length !== state.solution.length) {
    return res
      .status(400)
      .json({ error: `Word must be ${state.solution.length} letters long.` });
  }

  const valid = await isValidWord(word);
  if (!valid) {
    return res.status(400).json({ error: "Invalid word." });
  }

  const guess = scoreGuess(word, state.solution);
  state.guesses.push(guess);

  const isCorrect = word.toUpperCase() === state.solution;
  const gameOver = isCorrect || state.guesses.length >= MAX_TURNS;

  saveContextForUser(req.user.id, state);
  res.json({
    guess,
    turn: state.guesses.length,
    isCorrect,
    gameOver,
    ...(gameOver ? { correctWord: state.solution } : {}),
  });
}
