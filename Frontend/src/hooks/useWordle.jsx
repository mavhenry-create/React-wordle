import { useState, useEffect, useCallback } from "react";
import { startGame, verifyWord } from "../components/gameAPI.js";

const STATE_TO_COLOR = {
  correct: "green",
  present: "yellow",
  absent: "grey",
};

const useWordle = () => {
  const [gameReady, setGameReady] = useState(false);
  const [wordLength, setWordLength] = useState(5);
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    startGame()
      .then((match) => {
        setWordLength(match.wordLength);
        setGameReady(true);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, []);

  const submitGuess = useCallback(
    (word) => {
      setIsSubmitting(true);
      verifyWord(word)
        .then((result) => {
          setHistory((prev) => [...prev, word]);
          
          const formatted = result.guess.map((g) => ({
            key: g.letter,
            color: STATE_TO_COLOR[g.state],
          }));

          setGuesses((prev) => {
            const next = [...prev];
            next[turn] = formatted;
            return next;
          });

          setUsedKeys((prev) => {
            const next = { ...prev };
            formatted.forEach((l) => {
              const current = next[l.key];
              if (l.color === "green") next[l.key] = "green";
              if (l.color === "yellow" && current !== "green")
                next[l.key] = "yellow";
              if (l.color === "grey" && !current) next[l.key] = "grey";
            });
            return next;
          });

          setTurn((prev) => prev + 1);
          setGameOver(result.gameOver);
          setIsCorrect(result.isCorrect);
          setCurrentGuess("");
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          
        }).finally(() => {
          setIsSubmitting(false);
        });
    },
    [turn],
  );

  const handleKeyup = ({ key }) => {
    console.log(key);
    if (key === "Enter") {
      if (!gameReady || gameOver || turn > 5 || isSubmitting) return;
      if (history.includes(currentGuess)) {
        setError("You already tried that word!");
        return;
      }

      if (currentGuess.length !== wordLength) {
        setError(`Word must be ${wordLength} letters!`);
        return;
      }

      setHistory((prev) => [...prev, currentGuess]);
      submitGuess(currentGuess);

      return;
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[a-zA-Z]$/.test(key)) {
      const letter = key.toUpperCase();
      if (currentGuess.length < wordLength) {
        setCurrentGuess((prev) => {
          return prev + letter;
        });
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    error,
    wordLength,
    handleKeyup,
  };
};

export default useWordle;
