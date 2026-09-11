import { useEffect } from "react";
import useWordle from "../hooks/useWordle.jsx";
import Grid from "./GameBoard/Grid/grid.jsx";
import Keyboard from "./GameBoard/KeyBoard/keyboard.jsx";

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
     
    if (isCorrect) {
      window.removeEventListener("keyup", handleKeyup);
    }
    
    if (turn > 5) {
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

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
