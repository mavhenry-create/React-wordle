import { getRandomWord, isValidWord } from "../services/gameService.js";
import { scoreGuess } from "../utils/wordScoring.js";
import { saveContextForUser, getContextForUser, clearContextForUser } from "../data/matchContext.js";
import { saveGame } from "../data/gameData.js";
import { claimGuestGame, completeGuestGame, hasCompletedGuestGame } from "../data/guests.js";

const Word_LENGTH = 5;
const MAX_TURNS = 6;

export async function startGame(req, res) {
  
  const wordLength = req.user?.word_length ?? 5;
  const difficulty = req.user?.difficulty ?? 5;
  const word = await getRandomWord(wordLength, difficulty);

  if (req.isGuest) {
    const completed = await hasCompletedGuestGame(req.playerId);

    if (completed) {
      return res.status(403).json({
        error: "Guests can only play once. Create an account to play again.",
      });
    }
    await claimGuestGame(req.playerId);
  }

  saveContextForUser(req.playerId, {
    solution: word.toUpperCase(),
    guesses: [],
    difficulty,
    wordLength,
  });

  res.json({
    wordLength,
    maxTurns: MAX_TURNS,
  });
}

export async function verifyWord(req, res) {
  const state = getContextForUser(req.playerId);
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

if (gameOver) {
  if (req.isGuest) {
    await completeGuestGame(req.playerId);
  } else {
    await saveGame({
    userId: req.playerId,
    solution: state.solution,
    won: isCorrect,
    guessesUsed: state.guesses.length,
    difficulty: state.difficulty,
    wordLength: state.wordLength,
  });
  }
  
  clearContextForUser(req.playerId);
} else {
  saveContextForUser(req.playerId, state);
}

return res.json({
  guess,
  turn: state.guesses.length,
  isCorrect,
  gameOver,
  ...(gameOver ? { correctWord: state.solution } : {}),
});

}
