import { useEffect } from "react";
import useWordle from "../hooks/useWordle.jsx";
import Grid from "./grid.jsx";
import Keyboard from "./keyboard.jsx";

export default function Wordle() {
  const {
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    wordLength,
    error,
  } = useWordle();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div>
      {error && <p>{error}</p>}
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        length={wordLength}
      />
      <Keyboard usedKeys={usedKeys} />
    </div>
  );
}
